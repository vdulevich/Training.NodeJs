var util = require("util");

var Animal = function (name) {
    this.name = name;
}

Animal.prototype.getName = function(){
    return this.name;
}

var Rabbit = function(){
    Rabbit.super_.prototype.constructor.call(this, "rabbit");
}

Rabbit.prototype.run = function(){
    console.log("%s is running", this.getName());
}

util.inherits(Rabbit, Animal);

var rabbit = new Rabbit();
rabbit.run();
console.log("Animal %s is running", rabbit.getName());