import { fromEvent } from 'rxjs';
import { performance } from 'perf_hooks';
import { take } from 'rxjs/operators';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { GameClient } from '../models/gameClient';
import { ClientPackets } from '../networkPackets/fromClient/clientPackets';
import { PacketClientSync } from '../networkPackets/fromClient/clientSync';
import { PacketPing } from '../networkPackets/fromServer/ping';
import { PacketPlayerLeft } from '../networkPackets/fromServer/playerLeft';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import { PlayerDataService } from './playerDataService';
import { PacketRespawn } from '../networkPackets/fromClient/respawn';
import { PlayerDataSnapshot } from '../models/userDataSnapshot';

export class PlayerNetworkingService {
  constructor(private networkLevel: NetworkLevel, private playerDataService: PlayerDataService) {}

  public addPlayerInputListeners(player: GameClient, playerData: PlayerDataSnapshot) {
    player.socketSubscriptions.push(fromEvent<number>(player.socket, ClientPackets.PING)
    .subscribe(this.listenPing(player)));

    player.socketSubscriptions.push(fromEvent<number>(player.socket, ClientPackets.PING2)
      .subscribe(this.listenPing2(player)));

    player.socketSubscriptions.push(fromEvent<PacketClientSync>(player.socket, ClientPackets.CLIENT_SYNC)
      .subscribe(this.listenClientSync(player)));

    player.socketSubscriptions.push(fromEvent<string>(player.socket, 'disconnect')
      .pipe(take(1))
      .subscribe(this.listenDisconnect(player)));

    player.socketSubscriptions.push(fromEvent<PacketRespawn>(player.socket, ClientPackets.RESPAWN)
      .subscribe(this.listenRespawn(player, playerData)));
  }

  private listenClientSync(player: GameClient): (value: PacketClientSync) => void {
    return packet => {
      player.syncSnapshot = packet;
      player.syncSnapshotTimestamp = performance.now();
    };
  }

  private listenPing2(player: GameClient): (value: number) => void {
    return serverTimestamp => {
      player.ping = (performance.now() - serverTimestamp) * 0.5;
    };
  }

  private listenPing(player: GameClient): (value: number) => void {
    return clientTimestamp => {
      player.socket.emit(ServerPackets.PONG, {
        clientTimestamp,
        serverTimeStamp: performance.now()
      } as PacketPing);
    };
  }

  private listenRespawn(player: GameClient, data: PlayerDataSnapshot): (packet: PacketRespawn) => void {
    return respawn => {
      this.networkLevel.spawnPlayer(player, data);
    }
  }

  private listenDisconnect(player: GameClient): (value: string) => void {
    return reason => {
      const index = this.networkLevel.clients.indexOf(player);
      const networkId = player.controlledEntity?.networkId;

      if (index < 0) {
        console.error('Player not found.');
        return;
      }

      this.playerDataService.savePlayerData(player.nickname, this.networkLevel.levelName, player);

      this.networkLevel.clients.splice(index, 1);
      player.controlledEntity?.destroy();
      player.socketSubscriptions.forEach(s => s.unsubscribe());

      if (!!networkId) {
        this.networkLevel.broadcastPacket(ServerPackets.PLAYER_LEFT, {
          networkId: player.controlledEntity.networkId
        } as PacketPlayerLeft);
      }
    }
  }
}