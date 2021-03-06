"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GeneralError } = require('../utils/errors');
const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            // status: 'error',
            errorMessage: err.message
        });
    }
    return res.status(500).json({
        // status:'error',
        errorMessage: err.message
    });
};
// module.exports = handleErrors;
exports.default = handleErrors;
