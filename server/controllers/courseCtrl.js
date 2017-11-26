var mongoose = require('mongoose');
var CourseModel = require('../models/CourseModel.js');
const fs = require('fs');
var formidable = require('formidable');

module.exports = {
  getCourses : function(req, res) {
    var courseSet = [];
    CourseModel.find({}, function (err, courses) {
        courseSet = courses;
        var response = {
          "success":true,
          "courses":courseSet
        };
        return res.status(200).json(response);

    });

  },
  createUpdate: function(req,res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

      var courseName = fields.courseName;
      var course_id = fileds.course_id;
      var oldpath = files.file.path;
      var newpath = __dirname + '/../../dist/assets/uploads/' + files.file.name;

      var filepath = 'assets/uploads/' + files.file.name;

      var coursemodel = { name: courseName,image:filepath };

      var course = new CourseModel(coursemodel);

      if(course_id != '') {
        CourseModel.findByIdAndUpdate(course_id, { $set: { name: courseName }}, { new: true }, function (err, course) {
          if (err) return handleError(err);
          var response = {
            "success":true,
            "course":course
          };    
          return res.status(200).json(response);
        });
      }
      var srcpath = __dirname + '/../../src/assets/uploads/' + files.file.name;

      fs.createReadStream(oldpath).pipe(fs.createWriteStream(srcpath));
   
      fs.renameSync(oldpath, newpath, function (err) {
        if (err) throw err;

      });      
      course.save(function (err, course) {
        if (err)  {
        }
        else {
        }
      });
      
      var response = {
        "success":true,
        "course":course
      };    
      return res.status(200).json(response);

    });
    

    
  },
  delete: function(req,res) {
    body = req.body;
    var course_id= body.course_id;
    //var Model = new CourseModel();
    CourseModel.findOneAndRemove({ _id: course_id }, function(err, todo) {
        if (!err) {
          var response = {
            "success":true
          };    
          return res.status(200).json(response);    
        }
        else {
          var response = {
            "success":false
          };    
          return res.status(200).json(response);    
        }
    });   
 
  }
}
