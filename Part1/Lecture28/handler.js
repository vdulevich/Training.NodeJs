var http = require("http");
var fs = require("fs");
var redis = require("redis").createClient();


module.exports = function(req, res){

    if(req.url == "/"){
        console.log("redis get");
        redis.get("data", process.domain.bind(function(err, data){
            console.log("Error");
            throw new Error();
        }));
    } else{
        res.statusCode = 404;
        res.end("Not found");
    }
};