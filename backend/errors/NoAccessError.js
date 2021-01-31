const { Error } = require('mongoose');

class NoAccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = NoAccessError;
