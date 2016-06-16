import { Rectangle, BasicArea } from './area.model';

export class ComponentData extends BasicArea {

  // type: string; // eg: angular, react... - later
  name: string;

  constructor(name: string, areaData: Rectangle) {
    super(areaData.left, areaData.top, areaData.right, areaData.bottom);

    this.name = name;
  }

  getTitle(): string {
    return this.name;
  }

  equals(cmp: ComponentData): boolean {
    return cmp === this;
  }

}
