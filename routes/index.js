var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', userController.sign_up_form_get);

router.post('/sign-up', userController.sign_up_form_post)

module.exports = router;
