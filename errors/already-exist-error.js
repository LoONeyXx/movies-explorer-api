export default class AlreadyExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
