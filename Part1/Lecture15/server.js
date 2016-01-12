var http = require("http");
var url = require("url");

var server = new http.Server(function(req, res){
    var requestUrl = url.parse(req.url, true);
    console.log(requestUrl);
    if(requestUrl.pathname == "/echo" && requestUrl.query.message) {
        res.setHeader("Cache-control", "no-cache");
        res.end(requestUrl.query.message);
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(12345, "127.0.0.1");