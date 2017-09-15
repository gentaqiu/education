var profileCtrl = require('../controllers/profileCtrl.js');
var userCtrl = require('../controllers/userCtrl.js');

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

router.post('/users/register', userCtrl.register);
router.post('/users/login', userCtrl.login);


module.exports = router;