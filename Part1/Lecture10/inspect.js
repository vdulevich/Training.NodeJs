var util = require("util");

var obj = {
    a:5,
    b:3,
    inspect: function(){
        return 1;
    }
};

obj.self = obj;

console.log(util.inspect(obj));