export interface PacketSpawnPlayer {
    playerName: string;
    networkId: string;
    position: Phaser.Math.Vector2;
    level: number;
    maxHealth: number;
    health: number;
    speed: number;
}