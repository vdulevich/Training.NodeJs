var fs = require("fs");

fs.readFile(__filename, { encoding: "utf-8"}, function(err, buffer){
   if(err) {
       console.log(err);
   } else {
       console.log(buffer.toString());
   }
});