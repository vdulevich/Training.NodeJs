var http = require("http");
var request = require("./request");

//var debug = require("debug")("server");
//var log = require("winston");
var log = require("./log")(module);

(new http.Server(request)).listen(12345, "127.0.0.1");
log.info("Server started");