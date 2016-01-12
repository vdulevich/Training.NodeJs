var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var util = require("util");

http.createServer(function(req,res){
    var ulrParsed = url.parse(req.url, true);
    senFileSafe(ulrParsed.pathname, res);
}).listen({port : 12345, host: "127.0.0.1"});

function senFileSafe(filePath, res){
    res.setHeader("content-type", 'text/plain');
    res.setHeader("content-transfer-encoding", 'utf-8');

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
    var rootPath = path.dirname(require.main.filename);
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
        } else {
            sendFile(filePath, res);
        }
    });
}

function sendFile(filePath, res) {
    var stream = new fs.ReadStream(filePath);
    res.setHeader("content-type", 'application/force-download');
    res.setHeader("content-transfer-encoding", 'binary');
   /* var write = function(){
        var data = stream.read();
        if(data && !res.write(data)) {
            stream.removeListener('readable');
            res.once('drain', function(){
                stream.on('readable', write);
                write();
            })
        }
    };
    stream.on('readable', write);
    */
    stream.pipe(res);
    stream
        .on('end', function(){
            res.end();
        })
        .on('error', function(){
            res.statusCode = 500;
            res.end("Server error");
        });

    res.on('close', function(){ stream.close(); })
}