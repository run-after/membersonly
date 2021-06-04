const Message = require('../models/Message');
const { body, validationResult } = require('express-validator');

exports.new_message_get = (req, res) => {
  res.render('message_form', { title: 'Create Message' });
};

exports.new_message_post = [
  body('title', 'You must include a title').trim().isLength({ min: 1 }).escape(),
  body('body', 'You must include a message').trim().isLength({min: 1}).escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      body: req.body.body,
      author: req.user
    });

    if (!errors.isEmpty()) {
      res.render('message_form', { title: 'Create Message', message: message, errors: errors.array() });
    } else {
      message.save(function (err) {
        if (err) { return next(err); };
        res.redirect('/');
      });
    };    
  }
];

exports.delete_message = (req, res) => {
  Message.findByIdAndDelete(req.params.id).exec(function (err) {
    if (err) { return next(err); };
    res.redirect('/');
  });
};