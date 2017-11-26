var mongoose = require('mongoose');
var QuestionModel = require('../models/QuestionModel.js');
const fs = require('fs');
var formidable = require('formidable');

module.exports = {
  list : function(req, res) {
    var questionSet = [];
    body = req.body;
    var course_id = body.course_id;   
    QuestionModel.find({course_id:course_id}, function (err, questions) {
    		questionSet = questions;
        var response = {
          "success":true,
          "questions":questionSet
        };
        return res.status(200).json(response);

    });

  },
  create: function(req,res) {
    body = req.body;
    var question_id = body.question_id;
    var course_id = body.course_id;
    var title = body.title;
    var answerA = body.answerA;
    var answerB = body.answerB;
    var answerC = body.answerC;
    var answerD = body.answerD;
    var correctAnswer = body.correctAnswer;

    var questionmodel = { course_id: course_id,title:title,answerA:answerA,answerB:answerB,answerC:answerC,answerD:answerD,correctAnswer:correctAnswer };
    if(question_id != '') {
        QuestionModel.findByIdAndUpdate(question_id, { $set: questionmodel}, { new: true }, function (err, question) {
          if (err) return handleError(err);
          var response = {
            "success":true,
            "question":question
          };    
          return res.status(200).json(response);
        });      
    }
    else {
        var question = new QuestionModel(questionmodel);
        question.save(function (err, question) {
          if (err)  {
            console.error(err);
            var response = {"success":false};
            return res.status(403).json(response);
          }
          else {
            var response = {
              "success":true,
              "question":question
            };
            return res.status(200).json(response);
          }
        });       
    }
   
  },
  delete: function(req,res) {
    body = req.body;
    var id = body.id;
    QuestionModel.findOneAndRemove({ _id: id }, function(err, todo) {
        if (!err) {
            console.log('remove successfully');
            var response = {
              "success":true
            };    
            return res.status(200).json(response);                  
        }
        else {
            console.log('remove failed');
            var response = {
              "success":false
            };    
            return res.status(400).json(response);              
        }
    });   
   
  }
}
