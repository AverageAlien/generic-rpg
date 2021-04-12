import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { GameClient } from '../models/gameClient';
import { ClientPackets } from '../networkPackets/fromClient/clientPackets';
import { PacketClientSync } from '../networkPackets/fromClient/clientSync';
import { PacketEquipArmor } from '../networkPackets/fromClient/equipArmor';
import { PacketArmorEquipped } from '../networkPackets/fromServer/armorEquipped';
import { PacketPing } from '../networkPackets/fromServer/ping';
import { PacketPlayerLeft } from '../networkPackets/fromServer/playerLeft';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';

export class PlayerNetworkingService {
  constructor(private networkLevel: NetworkLevel) {}

  public addPlayerInputListeners(player: GameClient) {
    player.socketSubscriptions.push(fromEvent<number>(player.socket, ClientPackets.PING)
    .subscribe(this.listenPing(player)));

    player.socketSubscriptions.push(fromEvent<number>(player.socket, ClientPackets.PING2)
      .subscribe(this.listenPing2(player)));

    player.socketSubscriptions.push(fromEvent<PacketClientSync>(player.socket, ClientPackets.CLIENT_SYNC)
      .subscribe(this.listenClientSync(player)));

    player.socketSubscriptions.push(fromEvent<string>(player.socket, 'disconnect')
      .pipe(take(1))
      .subscribe(this.listenDisconnect(player)));
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

  private listenDisconnect(player: GameClient): (value: string) => void {
    return reason => {
      console.log(`PLAYER DISCONNECTED: ${reason}`);

      const index = this.networkLevel.clients.indexOf(player);
      const networkId = player.controlledEntity?.networkId;

      if (index < 0) {
        console.error('Player not found.');
        return;
      }

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