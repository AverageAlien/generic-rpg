import { Vector } from './geometryObjects';

export interface DrawableObject {
  position: Vector;

  draw(ctx: CanvasRenderingContext2D): void;
}

export interface BasicShape extends DrawableObject {
  color: string;
  outlineColor: string;
  outlineSize: number;
}

export class Rectangle implements BasicShape {
  constructor(
    public position: Vector,
    public color: string,
    public size: Vector,
    public outlineColor: string = '#000000',
    public outlineSize: number = 0
  ) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;

    const cornerPos = this.position.sub(this.size.scale(0.5));

    ctx.fillRect(cornerPos.X, cornerPos.Y, this.size.X, this.size.Y);

    if (this.outlineSize > 0) {
      ctx.strokeStyle = this.outlineColor;
      ctx.lineWidth = this.outlineSize;

      const offset = this.outlineSize / 2;

      ctx.strokeRect(cornerPos.X + offset, cornerPos.Y + offset, this.size.X - offset * 2, this.size.Y - offset * 2);
    }
  }
}

export class Circle implements BasicShape {
  constructor(
    public position: Vector,
    public color: string,
    public radius: number,
    public outlineColor: string = '#000000',
    public outlineSize: number = 0
  ) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.X, this.position.Y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = this.color;
    ctx.fill();

    if (this.outlineSize > 0) {
      ctx.strokeStyle = this.outlineColor;
      ctx.lineWidth = this.outlineSize;

      ctx.beginPath();
      ctx.arc(this.position.X, this.position.Y, this.radius - this.outlineSize * 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
