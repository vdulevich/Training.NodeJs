var http = require("http");
var fs = require("fs");
var util = require("util");

http.createServer(function(req,res){
    var data = { n : 1 };
    var heavyCalc = function(){
        calculation(data);
        if(!data.ready){
            setImmediate(heavyCalc, 0);
        } else{
            console.log(data);
            res.end(util.inspect(data));
        }
    };
    setImmediate(heavyCalc, 0);
}).listen({port : 12345, host: "127.0.0.1"});

var calculation = function(data){
    data.result = data.result ? data.result : data.n;
    for(i = 0; (data.n - 2) > 0 && i < 5; i++, data.n = data.n - 1) {
        data.result = data.result * (data.n - 1);
        console.log(data.result);
    }
    data.ready = !((data.n - 2) > 0);
    return data;
};