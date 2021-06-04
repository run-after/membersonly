var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const messageController = require('../controllers/messageController');

/* GET home page. */
router.get('/', userController.index);

router.get('/sign-up', userController.sign_up_form_get);

router.post('/sign-up', userController.sign_up_form_post);

router.get('/confirm', userController.confirm_membership_get);

router.post('/confirm', userController.confirm_membership_post);

router.get('/login', userController.login_get);

router.post('/login', userController.login_post);

router.get('/logout', userController.logout);

router.get('/message/new', messageController.new_message_get);

router.post('/message/new', messageController.new_message_post);

module.exports = router;
