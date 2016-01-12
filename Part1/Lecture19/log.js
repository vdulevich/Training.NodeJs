var winston = require("winston");

module.exports = function(module){
  return fabricFn(module.filename);
};

var fabricFn = function (path){
    if(path.match(/request.js$/)){
        winston.info(path);
        var transports = [
            new winston.transports.Console({
              colorize: true,
              timestamp: true,
              level: 'info'
            }),
            new winston.transports.File({
                level: 'debug',
                filename: 'debug.log'
            })
        ];

        return new winston.Logger({ transports: transports });
    } else {
        return new winston.Logger({ transports: []});
    }
};