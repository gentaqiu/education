var UserModel = require('../models/UserModel.js');

/*
function getUserModel () {
  // Create your Schema
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/education');

  const UserModelSchema = new mongoose.Schema({
    name: String,
    email: String
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
*/
const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/users', (req, res) => {
  console.log("req===");

  console.log(req);
  body = req.body;
  var username = body.username;
  var password = body.password;

  var user = new UserModel({ username: username,password:password });
  user.save(function (err, user) {
    if (err) return console.error(err);
    console.log('save success');
    console.log(user);
  });
  res.status(200).json('{"response":"ok"}');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;