var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");


http.createServer(function(req,res){
    var ulrParsed = url.parse(req.url, true);
    senFileSafe(ulrParsed.pathname, res);
}).listen({port : 12345, host: "127.0.0.1"});

function senFileSafe(filePath, res){
   try {
       filePath = decodeURIComponent(filePath);
   } catch(e) {
       res.statusCode = 400;
       res.end("Bad request");
       return;
   }

    if(~filePath.indexOf('\0')){
        res.statusCode = 400;
        res.end("Bad request");
        return;
    }
    var rootPath = path.dirname(require.main.filename);;
    filePath = path.normalize(path.join(rootPath, filePath));


    if(filePath.indexOf(rootPath) != 0){
        res.statusCode = 404;
        res.end("File not found");
        return;
    }

    fs.stat(filePath, function(err, stats){
        if(err || !stats.isFile()){
            res.statusCode = 404;
            res.end("File not found");
            return;
        }
    });
    sendFile(filePath, res);
}

function sendFile(filePath, res){
    fs.readFile("server.js", function(err, info){
        if(err){
            throw err;
        }
        res.end(info);
    });
}