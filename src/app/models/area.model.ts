export interface Rectangle {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface Area extends Rectangle {
  getWidth(): number;
  getHeight(): number;
  isValid(): boolean;
}

export class BasicArea implements Area {
  top: number;
  left: number;
  bottom: number;
  right: number;

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

  isValid(): boolean {
    return this.right - this.left > 0 && this.bottom - this.top > 0;
  }

  contains(x: number, y: number): boolean {
    return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
  }
}

export class NewArea extends BasicArea {
  private x0: number;
  private y0: number;

  constructor(left, top) {
    super(left, top, left, top);

    this.x0 = left;
    this.y0 = top;
  }

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

  fixRectangle() {
    if (this.left > this.right) {
      let tmp = this.left;
      this.left = this.right;
      this.right = tmp;
    }

    if (this.top > this.bottom) {
      [this.top, this.bottom] = [this.bottom, this.top];
    }
  }
}
