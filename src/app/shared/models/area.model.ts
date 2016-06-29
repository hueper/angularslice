import { BaseModel } from "./base.model";

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
  contains(x: number, y: number, scaleWidth: number, scaleHeight: number): boolean;
  isCrossing(rectangle: IArea, scaleWidth: number, scaleHeight: number): boolean;
}

export class Area extends BaseModel implements IArea {
  public invalid: boolean = false;

  constructor(public folderId: string,
              public imageId: string,
              public x: number,
              public y: number,
              public width: number,
              public height: number) {
    super();
  }

  // Aliases for x, y, height, width
  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y
  }

  get bottom() {
    return this.y + this.height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  hasDimensions(): boolean {
    return this.right - this.left > 0 && this.bottom - this.top > 0;
  }

  contains(x: number, y: number, scaleWidth: number, scaleHeight: number): boolean {
    return x >= this.left / scaleWidth && x <= this.right / scaleWidth && y >= this.top / scaleHeight && y <= this.bottom / scaleHeight;
  }

  inEachOther(area: Area, scaleWidth: number, scaleHeight: number): boolean {
    let contains = area.left >= this.left / scaleWidth && area.right <= this.right / scaleWidth && area.top >= this.top / scaleHeight && area.bottom <= this.bottom / scaleHeight;
    let isContained = area.left <= this.left / scaleWidth && area.right >= this.right / scaleWidth && area.top <= this.top / scaleHeight && area.bottom >= this.bottom / scaleHeight;
    return contains || isContained;
  }

  overLaps(area: Area, scaleWidth: number, scaleHeight: number): boolean {
    return this.isCrossing(area, scaleWidth, scaleHeight) || this.inEachOther(area, scaleWidth, scaleHeight);
  }

  isCrossing(area: Area, scaleWidth: number, scaleHeight: number): boolean {
    return this.isCrossingHorizontally(area, scaleWidth, scaleHeight) || this.isCrossingVertically(area, scaleWidth,
        scaleHeight);
  }

  private isCrossingHorizontally(area: Area, scaleWidth: number, scaleHeight: number): boolean {
    return area.left < this.right / scaleHeight && area.right > this.left / scaleHeight &&
      ((area.top > this.top / scaleHeight && area.top < this.bottom / scaleHeight)
      || (area.bottom > this.top / scaleHeight && area.bottom < this.bottom / scaleHeight));
  }

  private isCrossingVertically(area: Area, scaleWidth: number, scaleHeight: number): boolean {
    return area.top < this.bottom / scaleHeight && area.bottom > this.top / scaleHeight &&
      ((area.left > this.left / scaleHeight && area.left < this.right / scaleHeight) || (area.right > this.left / scaleHeight && area.right < this.right / scaleHeight));
  }
}

export class NewArea extends Area {
  private diagonalX: number;
  private diagonalY: number;

  constructor(private baseX: number,
              private baseY: number,
              private scaleWidth: number,
              private scaleHeight: number) {
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

  setFolderId(id: string) {
    this.folderId = id;
  }

  setImageId(id: string) {
    this.imageId = id;
  }

}
