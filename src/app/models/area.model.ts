export interface Rectangle {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface Area extends Rectangle {
  getWidth(): number;
  getHeight(): number;
  hasDimensions(): boolean;
  contains(x: number, y: number): boolean;
  isCrossing(area: Area): boolean;
}

export class BasicArea implements Area {
  top: number;
  left: number;
  bottom: number;
  right: number;

  invalid: boolean = false;

  constructor(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  getWidth(): number {
    return this.right - this.left;
  }

  getHeight(): number {
    return this.bottom - this.top;
  }

  hasDimensions(): boolean {
    return this.right - this.left > 0 && this.bottom - this.top > 0;
  }

  contains(x: number, y: number): boolean {
    return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
  }

  isCrossing(area: Area): boolean {
    return this.isCrossingHorizontally(area) || this.isCrossingVertically(area);
  }

  private isCrossingHorizontally(area: Area): boolean {
    return area.left < this.right && area.right > this.left &&
      ((area.top > this.top && area.top < this.bottom) || (area.bottom > this.top && area.bottom < this.bottom));
  }

  private isCrossingVertically(area: Area): boolean {
    return area.top < this.bottom && area.bottom > this.top &&
      ((area.left > this.left && area.left < this.right) || (area.right > this.left && area.right < this.right));
  }
}

export class NewArea extends BasicArea {
  isInvalid: boolean = false;

  private x0: number;
  private y0: number;

  constructor(left, top) {
    super(left, top, left, top);

    this.x0 = left;
    this.y0 = top;
  }

  // very clumsy name, find a better one, I couldn't...
  setBottomRight(x: number, y: number) {
    if (x < this.x0) {
      this.left = x;
    } else {
      this.right = x;
    }

    if (y < this.y0) {
      this.top = y;
    } else {
      this.bottom = y;
    }
  }

}
