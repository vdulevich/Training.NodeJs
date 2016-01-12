var EventEmitter = require("events").EventEmitter;

var server = new EventEmitter();


function Request(){
    var bigData = new Array(1e6).join("*");
    var self = this;

    this.onData = function(info){
        console.log(info);
    };

    this.end = function(){
        server.removeListener('data', self.onData);
    }

    server.on('data', self.onData);
}

setInterval(function(){
    var request = new Request();
    request.end();
    console.log(process.memoryUsage().heapUsed);
    console.log(server);
}, 100);