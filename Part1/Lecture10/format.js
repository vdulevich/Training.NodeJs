var util = require("util");

var str = util.format("String %s, Number %d, Object %j", "test", 5 , { test: "test object" });

console.log(str);