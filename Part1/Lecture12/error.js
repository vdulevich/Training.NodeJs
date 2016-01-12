var util = require("util");

var PhraseError = function (message) {
    this.message = message;
    Error.captureStackTrace(this, PhraseError);
}
PhraseError.prototype.name = "UnknownPhraseError";
util.inherits(PhraseError, Error);

var HttpError = function(code, message){
    this.code = code;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
}
HttpError.prototype.name = "DataBaseConnectionError";
util.inherits(HttpError, Error);

var phrases = {
    Hello: "Privet"
}

var getPhrase = function(name){
    if(!phrases[name]){
        throw new PhraseError("Phrase not found: " + name);
    }
    return phrases[name];
}

var makePage = function(name){
    if(name != "index.html"){
        throw new HttpError(404, "Page not found");
    }

}

try {
    makePage("index.html");
    getPhrase("Hello1");
}
catch (e) {
    if (e instanceof HttpError) {
        console.error("Warning: code %d, %s, stack %s", e.code, e.message, e.stack)
    }
    else if (e instanceof PhraseError) {
        console.log("Error: '%s', stack %s", e.message, e.stack)
    }
    else {
        console.log("Error: '%s', stack %s", e.message, e.stack)
    }
}