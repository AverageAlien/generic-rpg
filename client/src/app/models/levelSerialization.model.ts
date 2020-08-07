// tslint:disable-next-line: no-namespace
export namespace LevelSerialization {

  export interface Level {
    layers: Layer[];
  }

  export interface Layer {
    layerId: number;
    blocks: Block[];
  }

  export interface Block {
    x: number;
    y: number;
    name: string;
  }

  export interface MinifiedLevel {
    l: [ // layers
      number, // layer id
      [number, number, number][] // blocks - x, y, block id
    ][]; // layers
  }
}
