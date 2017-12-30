function getSubjectModel () {
  // Create your Schema
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/education');


  var subjectSchema = new mongoose.Schema({
    sequence: {
      type: Number,
      default: 100
    }, 
    lang: {
      type: String,
      required: true
    },   
    name: {
      type: String,
      unique: true,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }, {
    collection: 'category'
  });
 

  if (mongoose.models && mongoose.models.SubjectModel) return mongoose.models.SubjectModel
  // if no current model exists register and return new model
  $model = mongoose.model('SubjectModel', subjectSchema);
  return $model;
}

var SubjectModel = getSubjectModel();
module.exports = SubjectModel;
