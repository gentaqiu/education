function getQuestionModel () {
  // Create your Schema
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/education');


  var questionSchema = new mongoose.Schema({
    course_id: {
      type: String,
      required: true
    },    
    title: {
      type: String,
      required: true
    },
    answerA: {
      type: String,
      required: true
    },
    answerB: {
      type: String,
      required: true
    },  
    answerC: {
      type: String,
      required: true
    }, 
    answerD: {
      type: String,
      required: true
    }, 
    correctAnswer: {
      type: String,
      required: true
    }            
  }, {
    collection: 'question'
  });
 

  if (mongoose.models && mongoose.models.QuestionModel) return mongoose.models.QuestionModel
  // if no current model exists register and return new model
  $model = mongoose.model('QuestionModel', questionSchema);
  return $model;
}

var QuestionModel = getQuestionModel();
module.exports = QuestionModel;
