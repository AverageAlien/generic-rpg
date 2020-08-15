import * as io from 'socket.io';
import { ClientLevel } from 'src/gameData/scenes/clientLevel';
import { NetworkLevel } from 'src/gameData/scenes/networkLevel';

export class Room {
  public game: Phaser.Game;
  public roomName: string;
  public location: NetworkLevel;
}
