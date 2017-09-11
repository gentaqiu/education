function getUserModel () {
  // Create your Schema
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/education');

  const UserModelSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String
  }, {
    collection: 'user'
  })
  // Check to see if the model has been registered with mongoose
  // if it exists return that model
  if (mongoose.models && mongoose.models.UserModel) return mongoose.models.UserModel
  // if no current model exists register and return new model
  return mongoose.model('UserModel', UserModelSchema)
}

var UserModel = getUserModel();
module.exports = UserModel;
