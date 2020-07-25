export class Vector {
  constructor(public X: number, public Y: number) {}

  public get sqrMagnitude(): number {
    return this.X * this.X + this.Y * this.Y;
  }

  public get Magnitude(): number {
    return Math.sqrt(this.sqrMagnitude);
  }

  public get Unit(): Vector {
    const mag = this.Magnitude;
    return new Vector(this.X / mag, this.Y / mag);
  }

  public add(other: Vector): Vector {
    return new Vector(this.X + other.X, this.Y + other.Y);
  }

  public sub(other: Vector): Vector {
    return new Vector(this.X - other.X, this.Y - other.Y);
  }

  public scale(scalar: number): Vector {
    return new Vector(this.X * scalar, this.Y * scalar);
  }
}
