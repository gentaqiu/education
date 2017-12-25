var mongoose = require('mongoose');
var CourseModel = require('../models/CourseModel.js');
const fs = require('fs');
var formidable = require('formidable');

module.exports = {
  getCourses : function(req, res) {
    var courseSet = [];
    CourseModel.find({}).sort('sequence').exec(function (err, courses) {
        courseSet = courses;
        var response = {
          "success":true,
          "courses":courseSet
        };
        return res.status(200).json(response);

    });

  },
  getCoursesBySubject: function(req,res) {
    var parameters = req.params;
    var subject_id = parameters.subject_id;
    CourseModel.find({subject_id:subject_id}).sort('sequence').exec(function (err, courses) {
        courseSet = courses;
        var response = {
          "success":true,
          "courses":courseSet
        };
        return res.status(200).json(response);

    });    
  },
  createUpdate: function(req,res) {
      body = req.body;    
      var courseName = body.courseName;
      var course_id = body.course_id;
      var subject_id = body.subject_id;
      var courseImage = body.courseImage;
      var sequence = body.sequence;
      var coursemodel = { subject_id:subject_id,sequence:sequence,name: courseName,image:courseImage };

      if(course_id != '') {
        CourseModel.findByIdAndUpdate(course_id, { $set: coursemodel}, { new: true }, function (err, course) {
          if (err) return handleError(err);
          var response = {
            "success":true,
            "course":course
          };    
          return res.status(200).json(response);
        });
      }
      else {
        var course = new CourseModel(coursemodel);
        course.save(function (err, course) {
          if (err)  {
            console.error(err);
            var response = {"success":false};
            return res.status(403).json(response);
          }
          else {
            var response = {
              "success":true,
              "course":course
            };
            return res.status(200).json(response);
          }
        });         
      }
    
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
