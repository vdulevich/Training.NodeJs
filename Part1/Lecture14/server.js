var http = require("http");

var server = new http.Server();
server.listen(12345, "127.0.0.1");

var emit = server.emit;

var emitTemp = function(name){
    console.log(name);
    emit.apply(server, arguments);
};

server.emit = emitTemp;

var counter = 0;
server.on('request', function(req, res){
    res.end("Response " + ++counter);
    console.log(req.url, counter);
});