import { BasicModel } from './basic-model.model';

export class RawImage extends BasicModel {
  public binaryData: string;
  public width: number;
  public height: number;

  constructor(file: any) {
    super();

    const reader  = new FileReader();

    reader.addEventListener('load', (e:any) => {
      let image = new Image();
      image.src = e.target.result;
      this.binaryData = image.src;

      image.onload = () => {
        this.width = image.width;
        this.height = image.height;

        // Here, create it with the service

      };

    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}