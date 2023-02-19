/* eslint-disable no-extend-native */

Date.prototype.toInputDateString = function toInputDateString() {
  return this.toLocalDateTimeString().slice(0, 10);
};

/**
 * https://stackoverflow.com/questions/30166338/setting-value-of-datetime-local-from-date
 * @returns string
 * ej: 2023-01-18T23:03
 */
Date.prototype.toInputDateTimeString = function toInputDateTimeString() {
  const datetime = new Date(this);

  datetime.setMinutes(datetime.getMinutes() - datetime.getTimezoneOffset());

  return datetime.toISOString().slice(0, 16);
};

Date.prototype.addDays = function addDays(days) {
  var result = new Date(this);
  result.setDate(result.getDate() + days);
  return result;
};


Date.prototype.toAppDateString = function toAppDateString(){
  return this.toLocaleDateString() + ' ' + this.toLocaleTimeString()
}