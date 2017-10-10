var mongoose = require('mongoose');
var CourseModel = require('../models/CourseModel.js');
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

      var courseName = fields.courseName;

      var oldpath = files.file.path;
      var newpath = __dirname + '/../../dist/assets/uploads/' + files.file.name;
      console.log('newpath=');
      console.log(newpath);
      var filepath = 'assets/uploads/' + files.file.name;

      var coursemodel = { name: courseName,image:filepath };

      var course = new CourseModel(coursemodel);
      course.save(function (err, course) {
        if (err)  {
          //return res.status(403).json('{"success":"false"}');
        }
        else {
          //return res.status(200).json('{"success":"true"}');
        }
      });

      var srcpath = __dirname + '/../../src/assets/uploads/' + files.file.name;

      fs.createReadStream(oldpath).pipe(fs.createWriteStream(srcpath));
      /*
      fs.copySync(oldpath, srcpath, function (err) {
        if (err) throw err;
        //res.write('File uploaded and moved!');
        //res.end();
      });
      */      
      fs.renameSync(oldpath, newpath, function (err) {
        if (err) throw err;
        //res.write('File uploaded and moved!');
        //res.end();
      });
    });

    var response = {
      "success":true
    };    
    return res.status(200).json(response);
  }
}
