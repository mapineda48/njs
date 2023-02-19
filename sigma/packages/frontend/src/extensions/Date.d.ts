/**
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
 */
interface Date {
  toAppDateString(): string;

  /**
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
   * https://stackoverflow.com/questions/30166338/setting-value-of-datetime-local-from-date
   * @returns string
   * ej: 2023-01-18T23:03
   */
  toInputDateTimeString(): string;

  /**
   * https://github.com/react-hook-form/react-hook-form/discussions/4718
   */
  toInputDateString(): string;

  addDays(days: number): Date;
}
