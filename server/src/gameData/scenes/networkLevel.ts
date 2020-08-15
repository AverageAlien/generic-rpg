import * as io from 'socket.io';
import { Scene } from 'phaser';
import { Entity } from '../gameplay/entities/baseEntity';
import { AssetService } from '../gameServices/asset.service';
import { NetworkEntitySpawner } from 'src/services/networkEntitySpawner';
import { GameClient } from 'src/models/gameClient';
import { LevelScene } from 'src/core/levelScene';
import { MapGrid } from 'src/core/mapGrid';
import { PacketSpawnPlayer } from 'src/networkPackets/fromServer/spawnPlayer';

export class NetworkLevel extends Scene implements LevelScene {
  public mapGrid: MapGrid;
  public levelName: string;
  public entities: Entity[];
  public clients: GameClient[] = [];

  protected entitySpawner: NetworkEntitySpawner;

  constructor(private server: io.Server) {
    super({ key: 'networklevel' });
  }

  create() {
    this.mapGrid = new MapGrid(this, 'tileset');

    this.entitySpawner = new NetworkEntitySpawner(this);
  }

  preload() {
    AssetService.loadBlockSprites(this.load);

    AssetService.loadEntitySprites(this.load);
  }

  update() {
    this.entities.forEach(e => e.update());
  }

  addPlayer(player: GameClient) {
    const existingPlayers = [...this.clients];

    this.clients.push(player);

    const spawnedEntity = this.entitySpawner.spawnPlayer(player, new Phaser.Math.Vector2(0, 0));

    existingPlayers.forEach(p => {
      p.socket.emit('spawnPlayer', {
        playerName: spawnedEntity.entityName,
        networkId: spawnedEntity.networkId,
        maxHealth: spawnedEntity.maxHealth,
        health: spawnedEntity.health,
        level: spawnedEntity.level,
        speed: spawnedEntity.speed,
        position: spawnedEntity.gameObject.body.position
      } as PacketSpawnPlayer)
    })
  }
}
