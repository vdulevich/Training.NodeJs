var EventEmitter = require("events").EventEmitter;

var server = new EventEmitter();

server.on('request', function(request){
    request.approved = true;
});

server.on('request', function(request){
    console.log(request);
});

server.on('error', function(error){
    console.log(error);
})

server.emit('request', { from: "User1"});
server.emit('request', { from: "User2"});
server.emit("error")