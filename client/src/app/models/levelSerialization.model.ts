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
}
