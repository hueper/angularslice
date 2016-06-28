export class Utils {
  constructor() {
  }

  static generateId(): string {
    var text = "";
    var possible = "abcdef0123456789";

    for (var i = 0; i < 24; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return `${text}`;
  }
}
