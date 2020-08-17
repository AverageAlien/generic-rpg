export interface PacketSyncSnapshot {
    entities: EntitySnapshot[];
}

interface EntitySnapshot {
    networkId: string;

    positionX: number;
    positionY: number;

    velocityX: number;
    velocityY: number;
}