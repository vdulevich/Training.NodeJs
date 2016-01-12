var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
    fs.readFile("server.js", function(err, info){
        if(err){
            console.log(err);
            res.statusCode = 404;
            res.end("Error, cannot return file");
            return;
        }
        res.end(info);
    });
}).listen({port : 12345, host: "127.0.0.1"});