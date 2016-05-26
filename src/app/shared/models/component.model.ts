import { Rectangle, BasicArea } from './area.model';

export class Component extends BasicArea {

  id: number;
  // type: string; // eg: angular, react... - later
  name: string;

  parentId: number;
  childrenIds: number[];
  imageIds: number[];

  constructor(name: string, areaData: Rectangle) {
    super(areaData.left, areaData.top, areaData.right, areaData.bottom);

    this.name = name;
  }

  getTitle(): string {
    return this.name;
  }

  equals(cmp: Component): boolean {
    return cmp === this;
  }

}
