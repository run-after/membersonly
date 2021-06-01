const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');

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
        res.redirect('/');
      });
    };
  }
];