var mongoose = require('mongoose');
var UserModel = require('../models/UserModel.js');

module.exports.register = function(req, res) {

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
      $token = user.generateJwt();
      return res.status(200).json('{"success":"true","token":"'+$token+'"}');
    }
  });

};