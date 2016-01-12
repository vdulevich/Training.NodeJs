var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var util = require("util");
var Chart = require("./chart");

var chart = new Chart();
http.createServer(function(req,res){
    var urlParsed = url.parse(req.url);
    switch(urlParsed.pathname) {
        case '/index':
            sendFile("index.html", res);
            break;
        case '/connect':
            chart.connect(res)
            break;
        case '/send':
            var message = '';
            req
            .on('readable', function(){
                message += req.read();
            })
            .on('end', function(){
                chart.send(message);
                res.end('ok');
            });
            break;
        default:
            res.end("invalid url");
            break;
    }
}).listen({port : 12345, host: "192.168.13.53"});

function sendFile(filePath, res) {
    var stream = new fs.ReadStream(filePath);
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
