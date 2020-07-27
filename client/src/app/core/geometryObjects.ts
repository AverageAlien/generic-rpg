export class Vector {
  constructor(public X: number, public Y: number) {}

  public get sqrMagnitude(): number {
    return this.X * this.X + this.Y * this.Y;
  }

  public get Magnitude(): number {
    return Math.sqrt(this.sqrMagnitude);
  }

  public get Unit(): Vector {
    if (this.X === 0 && this.Y === 0) { return new Vector(0, 0); }
    const mag = this.Magnitude;
    return new Vector(this.X / mag, this.Y / mag);
  }

  public static Random(minX: number, maxX: number, minY: number = 0, maxY: number): Vector {
    return new Vector(
      Math.random() * (maxX - minX) + minX,
      Math.random() * (maxY - minY) + minY
    );
  }

  public static RandomSquare(min: number, max: number): Vector {
    return this.Random(min, max, min, max);
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

  public flipX(): Vector {
    return new Vector(-this.X, this.Y);
  }

  public flipY(): Vector {
    return new Vector(this.X, -this.Y);
  }
}

export class Line {
  constructor(public A: Vector, public B: Vector) {}

  public intersect(other: Line): Vector {
    const determinant = (this.A.X - this.B.X) * (other.A.Y - other.B.Y) - (this.A.Y - this.B.Y) * (other.A.X - other.B.X);

    if (determinant === 0) {
      console.log('Parallel lines!');
      return new Vector(Infinity, Infinity);
    }

    const X = (this.A.X * this.B.Y - this.A.Y * this.B.X) * (other.A.X - other.B.X) -
    (this.A.X - this.B.X) * (other.A.X * other.B.Y - other.A.Y * other.B.X);
    const Y = (this.A.X * this.B.Y - this.A.Y * this.B.X) * (other.A.Y - other.B.Y) -
    (this.A.Y - this.B.Y) * (other.A.X * other.B.Y - other.A.Y * other.B.X);

    return new Vector(X / determinant, Y / determinant);
  }
}
