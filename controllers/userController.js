require('dotenv').config();
const User = require('../models/User');
const Message = require('../models/Message');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');



exports.index = function (req, res, next) {
  // Will sort this by date created
  Message.find().populate('author').sort([['createdAt', 'descending']]).exec(function (err, list_messages) {
    if (err) { return next(err); };
    res.render('index', { title: 'Members Only', messages: list_messages });
  });
};

exports.sign_up_form_get = (req, res, next) => {
  res.render('sign_up', { title: 'Sign up' });
};

exports.sign_up_form_post = [
  
  body('first_name', 'You must enter a first name').trim().isLength({ min: 1 }).escape(),
  body('last_name', 'You must enter a last name').trim().isLength({min: 1}).escape(),
  body('username', 'You must enter a username').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password needs to be a minimum of 6 chars').trim().isLength({ min: 6 }).escape(),
  body('password-confirmation', 'Passwords do not match').custom((value, {req}) => value === req.body.password),
  
  (req, res, next) => {

    const errors = validationResult(req);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      member: false
    });

    if (!errors.isEmpty()) {
      res.render('sign_up', { title: 'Sign up', user: user, errors: errors.array() });
      return;
    } else {
      user.save(function (err) {
        if (err) { return next(err); };
        passport.authenticate('local', function (err, user, info) {
          if (err) { return next(err); };
          req.logIn(user, function (err) {
            if (err) { return next(err); };
            return res.redirect('/confirm');
          });
        })(req, res, next);
      });
    };
  }
];

exports.confirm_membership_get = (req, res, next) => {
  res.render('confirm');
};

exports.confirm_membership_post = (req, res, next) => {
  const answer = req.body.answer;
  if (answer.toLowerCase() === process.env.SECRET_PASSWORD) {
    User.findOneAndUpdate({ _id: req.user.id }, { member: true }).exec((err, user) => {
      if (err) { return next(err); };
      res.render('index', {title: 'Confirm', user: user });
    });    
  } else {
    res.render('confirm', { message: 'Wrong, try again.' });
  };
  
};

exports.login_get = (req, res, next) => {
  res.render('login', { title: 'Log in' });
};

exports.login_post = [

  body('username', 'You must enter a username').trim().isLength({ min: 1 }).escape(),
  
  (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
      if (err) { return next(err); };
      if (!user) {
        res.render('login', { title: 'login', user: req.body.username })
      };
      req.logIn(user, function (err) {
        if (err) { return next(err); };
        return res.redirect('/');
      });
    })(req, res, next);
  }
];

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};