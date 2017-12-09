var mongoose = require('mongoose');
var SubjectModel = require('../models/SubjectModel.js');

module.exports = {
  getSubjects : function(req, res) {
    var subjectSet = [];
    SubjectModel.find({}).sort('sequence').exec(function (err, subjects) {
        subjectSet = subjects;
        var response = {
          "success":true,
          "subjects":subjectSet
        };
        return res.status(200).json(response);

    });

  },
  createUpdate: function(req,res) {
      body = req.body;    
      var subjectName = body.subjectName;
      var subject_id = body.subject_id;
      var subjectImage = body.subjectImage;
      var sequence = body.sequence;
      var subjectmodel = { sequence:sequence,name: subjectName,image:subjectImage };

      if(course_id != '') {
        SubjectModel.findByIdAndUpdate(subject_id, { $set: subjectmodel}, { new: true }, function (err, subject) {
          if (err) return handleError(err);
          var response = {
            "success":true,
            "subject":subject
          };    
          return res.status(200).json(response);
        });
      }
      else {
        var subject = new SubjectModel(subjectmodel);
        subject.save(function (err, subject) {
          if (err)  {
            console.error(err);
            var response = {"success":false};
            return res.status(403).json(response);
          }
          else {
            var response = {
              "success":true,
              "subject":subject
            };
            return res.status(200).json(response);
          }
        });         
      }
    
  },
  delete: function(req,res) {
    body = req.body;
    var subject_id= body.subject_id;
    //var Model = new CourseModel();
    SubjectModel.findOneAndRemove({ _id: subject_id }, function(err, subject) {
        if (!err) {
          var response = {
            "success":true,
            "subject": subject
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
