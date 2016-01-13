var crypto = require("crypto");
var mongoose = require("mongoose");

var schema = mongoose.Schema({
    name:{
       type: String,
       required: true,
       unique: true
    },
    hashedPassword:{
        type: String,
        required:true
    },
    salt: {
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

schema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random().toString();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){
        return this._plainPassword;
    });

schema.methods.checkPassword = function(password){
    return this.hashedPassword == this.encryptPassword(password);
};

exports.User = mongoose.model('User', schema);

