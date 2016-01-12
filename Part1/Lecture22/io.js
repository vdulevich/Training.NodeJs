var fs = require("fs");

fs.open("o.js", "r", function(){
   console.log("IO");
});

setImmediate(function(){
    console.log("setImmediate");
}, 0);

process.nextTick(function(){
    console.log("newtTick");
})