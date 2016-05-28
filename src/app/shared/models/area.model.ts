export interface IArea {
  top: number;
  left: number;
  bottom: number;
  right: number;

  // Maybe this is not really an Area property, as it's valid just while editing
  invalid: boolean;

  getWidth(): number;
  getHeight(): number;
  hasDimensions(): boolean;
  contains(x: number, y: number): boolean;
  isCrossing(rectangle: IArea): boolean;
}

export class Area implements IArea {
  public invalid: boolean = false;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {

  }

  get left() {
    return (this.width >= 0) ? this.x : this.x + this.width;
  }

  get right() {
    return (this.width < 0) ? this.x : this.x + this.width;
  }

  get top() {
    return (this.height >= 0) ? this.y : this.y + this.height;
  }

  get bottom() {
    return (this.height< 0) ? this.y : this.y + this.height;
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

  inEachOther(area: Area): boolean {
    let contains = area.left >= this.left && area.right <= this.right && area.top >= this.top && area.bottom <= this.bottom;
    let isContained = area.left <= this.left && area.right >= this.right && area.top <= this.top && area.bottom >= this.bottom;
    return contains || isContained;
  }

  overLaps(area: Area): boolean {
    return this.isCrossing(area) || this.inEachOther(area);
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

export class NewArea extends Area {
  private diagonalX: number;
  private diagonalY: number;

  constructor(
    private baseX: number,
    private baseY: number
  ) {
    super(baseX, baseY, baseX, baseY);

    this.diagonalX = baseX;
    this.diagonalY = baseY;
  }

  addMovement(movementX: number, movementY: number) {
    this.diagonalX += movementX;
    this.diagonalY += movementY;

    this.setBasicCoordinates();
  }

  setDiagonalCoordinates(diagonalX: number, diagonalY: number) {
    this.diagonalX = diagonalX;
    this.diagonalY = diagonalY;

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
