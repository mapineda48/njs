export default class DateForm extends Date {
  constructor(value: string | Date, private isDateTime = false) {
    super(value instanceof Date ? value : value + (isDateTime ? "" : "T00:00"));
  }

  toString(): string {
    if (this.isNaN()) {
      return "";
    }

    if (this.isDateTime) {
      return this.toDateTimeString();
    }

    return this.toDateString();
  }

  isNaN() {
    return isNaN(this.getTime());
  }
}
