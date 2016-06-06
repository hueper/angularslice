export class ConfirmData {

  // all public should be protected and have getter
  public message: string;
  public btnYes: string;
  public btnCancel: string;

  constructor(message: string = 'Are you sure?', btnYes: string = 'Yes', btnCancel: string = 'Cancel') {
    this.message = message;
    this.btnYes = btnYes;
    this.btnCancel = btnCancel;
  }

}
