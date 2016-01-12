var domain = require("domain");
var serverDomain = domain.create();

var server;

serverDomain.on('error', function(err){
    console.log("%s", err);
    if(server) server.close();
    setTimeout(function(){
        process.exit(1);
    }, 1000).unref();
});

serverDomain.run(function(){
    var handler = require("./handler");
    var http = require("http");
    var fs = require("fs");

    server = http.createServer(function(req, res){
        var requestDomain = domain.create();
        requestDomain.add(req);
        requestDomain.add(res);

        requestDomain.on("error", function(err){
            console.log("Request failed");
            res.end();
            serverDomain.emit("error", err);
        });

        requestDomain.run(function(){
            console.log("Request started");
            handler(req,res);
        });
    })
    server.listen({port : 12345, host: "127.0.0.1"});
});
