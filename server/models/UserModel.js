var crypto = require('crypto');
var jwt = require('jsonwebtoken');

function getUserModel () {
  // Create your Schema
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/education');


  var userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    hash: String,
    salt: String
  }, {
    collection: 'user'
  });

  userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  };  

  userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
  }; 

  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };   
/*
  const UserModelSchema = new mongoose.Schema({
    username: {type: String, index: { unique: true }},
    password: String
  }, {
    collection: 'user'
  })
*/
  // Check to see if the model has been registered with mongoose
  // if it exists return that model
  if (mongoose.models && mongoose.models.UserModel) return mongoose.models.UserModel
  // if no current model exists register and return new model
  $model = mongoose.model('UserModel', userSchema);
  return $model;
}

var UserModel = getUserModel();
module.exports = UserModel;
