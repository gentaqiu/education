function getCourseModel () {
  // Create your Schema
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  mongoose.connect('mongodb://localhost/education');


  var courseSchema = new mongoose.Schema({
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
    collection: 'course'
  });
 

  if (mongoose.models && mongoose.models.CourseModel) return mongoose.models.CourseModel
  // if no current model exists register and return new model
  $model = mongoose.model('CourseModel', courseSchema);
  return $model;
}

var CourseModel = getCourseModel();
module.exports = CourseModel;
