class NotImplementedException extends Error {
  constructor(message) {
    super();
    this.statusCode = 500;
    this.name = 'Not Implemented';
    this.message = message || 'Not Implemented';
  }
}

class BadRequestException extends Error {
  constructor(message) {
    super();
    this.name = 'BadRequest';
    this.statusCode = 400;
    this.message = message || 'Bad Request';
  }
}

class ForbiddenException extends Error {
  constructor(message) {
    super();
    this.name = 'Forbidden';
    this.statusCode = 403;
    this.message = message || 'Forbidden';
  }
}

class NotFoundException extends Error {
  constructor(message) {
    super();
    this.name = 'NotFound';
    this.statusCode = 404;
    this.message = message || 'Not Found';
  }
}

module.exports = {
  NotImplementedException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
};
