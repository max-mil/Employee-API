"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.BadRequest = exports.NoChange = exports.GeneralError = void 0;
class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
    getCode() {
        if (this instanceof NoChange) {
            return 304;
        }
        if (this instanceof BadRequest) {
            return 400;
        }
        if (this instanceof NotFound) {
            return 404;
        }
        return 500;
    }
}
exports.GeneralError = GeneralError;
class NoChange extends GeneralError {
}
exports.NoChange = NoChange;
class BadRequest extends GeneralError {
}
exports.BadRequest = BadRequest;
class NotFound extends GeneralError {
}
exports.NotFound = NotFound;
module.exports = {
    GeneralError,
    NoChange,
    BadRequest,
    NotFound
};
