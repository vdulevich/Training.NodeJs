var url = require("url");
//var debug = require("debug")("server:request");
//var log = require("winston");
var log = require("./log")(module);

module.exports = function(req, res){
    var requestUrl = url.parse(req.url, true);
    //debug(requestUrl);
    log.info("Requested url '%s'", requestUrl.query.message);
    if(requestUrl.pathname == "/echo" && requestUrl.query.message) {
        //debug("Echo: " + requestUrl.query.message);
        log.debug("Message '%s'", requestUrl.query.message);
        res.setHeader("Cache-control", "no-cache");
        res.end(requestUrl.query.message);
        return;
    }
    //debug("Unknown url");
    log.error("Page not found '%s'", requestUrl.query.message);
    res.statusCode = 404;
    res.end("Page not found");

}