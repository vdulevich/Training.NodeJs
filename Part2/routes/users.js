var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var User = require('../models/User').User;
var router = express.Router();
var HttpError = require('../errors/index').HttpError;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users){
    if(err) next(err);
    console.log('Users found')
    res.json(users);
  });
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  try {
    var userId = new ObjectID(req.params.id);
  } catch (e) {
    return next(new HttpError(404, 'User not found'));
  }
  User.findById(userId, function(err, user){
    if(err) next(err);
    if(!user) {
      return next(new HttpError(404, 'User not found'));
    }
    req.session.requestCount = (req.session.requestCount + 1) || 1;
    console.log(req.session.requestCount);
    res.json(user);
  });
});

module.exports = router;
