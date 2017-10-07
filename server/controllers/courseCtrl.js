var mongoose = require('mongoose');
var UserModel = require('../models/UserModel.js');
const fs = require('fs');
var formidable = require('formidable');

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
  },
  create: function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.file.path;
      var newpath = '/tmp/uploads/' + files.file.name;
      console.log(oldpath);
      console.log(newpath);
      fs.renameSync(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });

    var response = {
      "success":true
    };    
    return res.status(200).json(response);
  }
}
