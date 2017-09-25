var mongoose = require('mongoose');
var UserModel = require('../models/UserModel.js');

module.exports = {
  getCourses : function(req, res) {
    var response = {
      "success":true,
      "courses":
        [
          {name:"Basic",image:"assets/pronunciation.jpg"},
          {name:"Family",image:"assets/pronunciation.jpg"},
          {name:"Animal",image:"assets/pronunciation.jpg"},
        ]
    };
    return res.status(200).json(response);
  }
}
