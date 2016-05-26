export class Utils {
  constructor() {
  }

  static generateId() {
    return Math.floor(Math.random() * 100000000000);
  }
}