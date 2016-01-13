var util = require("util");

var HttpError = function(code, message){
    Error.apply(this, arguments);
    this.status = code;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
}

util.inherits(HttpError, Error);
HttpError.prototype.name = "HttpError";

module.exports.HttpError = HttpError;