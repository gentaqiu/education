var profileCtrl = require('../controllers/profileCtrl.js');
var userCtrl = require('../controllers/userCtrl.js');
var voiceCtrl = require('../controllers/voiceCtrl.js');
var courseCtrl = require('../controllers/courseCtrl.js');
var fileCtrl = require('../controllers/fileCtrl.js');
var questionCtrl = require('../controllers/questionCtrl.js');
var subjectCtrl = require('../controllers/subjectCtrl.js');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/profile', auth, profileCtrl.profileRead);
router.get('/courses', courseCtrl.getCourses);

router.post('/users/register', userCtrl.register);
router.post('/users/login', userCtrl.login);
router.post('/voice/path', voiceCtrl.path);
router.post('/course/createUpdate', courseCtrl.createUpdate);
router.post('/course/delete', courseCtrl.delete);
router.post('/file/upload', fileCtrl.upload);
router.post('/question/create', questionCtrl.create);
router.post('/question/list', questionCtrl.list);
router.post('/question/delete', questionCtrl.delete);
router.post('/subject/createUpdate', subjectCtrl.createUpdate);
router.post('/subject/delete', subjectCtrl.delete);
module.exports = router;