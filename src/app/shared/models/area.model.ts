export interface Rectangle {
  top: number;
  left: number;
  bottom: number;
  right: number;

  getWidth(): number;
  getHeight(): number;
  hasDimensions(): boolean;
  contains(x: number, y: number): boolean;
  isCrossing(rectangle: Rectangle): boolean;
}

export class BasicArea implements Rectangle {
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
    return Math.abs(this.right - this.left);
  }

  getHeight(): number {
    return Math.abs(this.bottom - this.top);
  }

  hasDimensions(): boolean {
    return this.right - this.left > 0 && this.bottom - this.top > 0;
  }

  contains(x: number, y: number): boolean {
    return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
  }

  isCrossing(area: Rectangle): boolean {
    return this.isCrossingHorizontally(area) || this.isCrossingVertically(area);
  }

  private isCrossingHorizontally(area: Rectangle): boolean {
    return area.left < this.right && area.right > this.left &&
      ((area.top > this.top && area.top < this.bottom) || (area.bottom > this.top && area.bottom < this.bottom));
  }

  private isCrossingVertically(area: Rectangle): boolean {
    return area.top < this.bottom && area.bottom > this.top &&
      ((area.left > this.left && area.left < this.right) || (area.right > this.left && area.right < this.right));
  }
}

export class NewArea extends BasicArea {
  private baseX: number;
  private baseY: number;

  private diagonalX: number;
  private diagonalY: number;

  constructor(baseX: number, baseY: number) {
    super(baseX, baseY, baseX, baseY);

    this.baseX = baseX;
    this.baseY = baseY;

    this.diagonalX = baseX;
    this.diagonalY = baseY;
  }

  addMovement(movementX: number, movementY: number) {
    this.diagonalX += movementX;
    this.diagonalY += movementY;

    console.log(this.diagonalY);

    this.setBasicCoordinates();
  }

  setBasicCoordinates() {
    // Set left-right
    if (this.baseX < this.diagonalX) {
      this.left = this.baseX;
      this.right = this.diagonalX;
    } else {
      this.left = this.diagonalX;
      this.right = this.baseX;
    }

    // Set top-bottom
    if (this.baseY < this.diagonalY) {
      this.top = this.baseY;
      this.bottom = this.diagonalY;
    } else {
      this.top = this.diagonalY;
      this.bottom = this.baseY;
    }
  }

}
