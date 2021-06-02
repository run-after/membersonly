var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/sign-up', userController.sign_up_form_get);

router.post('/sign-up', userController.sign_up_form_post);

router.get('/confirm', userController.confirm_membership_get);

router.post('/confirm', userController.confirm_membership_post);

router.get('/login', userController.login_get);

router.post('/login', userController.login_post);

module.exports = router;
