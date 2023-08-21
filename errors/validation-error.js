export default class ValidationError extends Error {
  constructor(error, message = '') {
    super(message);
    this.error = error;
    this.message = this._getMessage(error);
    this.statusCode = 400;
  }

  _getMessage() {
    return Object.values(this.error.errors).reduce(
      (acc, curr) => `${acc} ${curr.message}`,
      '',
    );
  }
}
