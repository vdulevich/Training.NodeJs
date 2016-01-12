var logger = require("logger")(module);
var user = require("user");

function run() {
    var user1 = new user.User("User 1");
    var user2 = new user.User("User 2");
    user1.hello();
    console.log("Run successful");
}

if(module.parent){
    exports.run = run;
    logger.log("Required");
} else{
    run();
}