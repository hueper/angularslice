import {BaseModel} from "./base.model";

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

export class Area extends BaseModel implements IArea {
  public invalid: boolean = false;

  constructor(
    public folderId: number = null,
    public imageId: number = null,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super();
  }

  // Aliases for x, y, height, width
  get left() { return this.x; }
  get right() { return this.x + this.width; }
  get top() { return this.y }
  get bottom() { return this.y + this.height; }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
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
    private baseY:number,
    private scaleWidth:number,
    private scaleHeight:number,
    private offsetTop:number,
    private offsetLeft: number
  ) {
    super(null, null, baseX, baseY, 0, 0);

    this.diagonalX = baseX;
    this.diagonalY = baseY;
  }

  setDiagonalCoordinates(diagonalX: number, diagonalY: number) {
    this.diagonalX = diagonalX;
    this.diagonalY = diagonalY;

    this.setBasicCoordinates();
  }

  setBasicCoordinates() {
    this.x = (this.baseX < this.diagonalX) ? this.baseX : this.diagonalX;
    this.y = (this.baseY < this.diagonalY) ? this.baseY : this.diagonalY;

    this.width = Math.abs(this.baseX - this.diagonalX);
    this.height = Math.abs(this.baseY - this.diagonalY);
  }

  setFolderId(id) {
    this.folderId = id;
  }

  setImageId(id) {
    this.imageId = id;
  }

}
