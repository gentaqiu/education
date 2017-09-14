var UserModel = require('../models/UserModel.js');

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
  //console.log("req===");

  //console.log(req);
  body = req.body;
  var fullname = body.fullname;
  var email = body.email;
  var password = body.password;
  
  var usermodel = { name: fullname,email:email };

  var user = new UserModel(usermodel);
  user.setPassword(password);
  user.save(function (err, user) {
    if (err)  {
      //console.error(err);
      return res.status(403).json('{"success":"false"}');
    }
    else {
      //console.log(user);
      $jwt = user.generateJwt();
      return res.status(200).json('{"success":"true","JWT":"'+$jwt+'"}');
    }
  });
  
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