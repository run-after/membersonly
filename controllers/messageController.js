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

    if (!errors.isEmpty()) {
      res.render('message_form', { title: 'Create Message', errors: errors.array() });
    } else {
      const message = new Message({
        title: req.body.title,
        body: req.body.body,
        author: req.user
      });
      message.save(function (err) {
        if (err) { return next(err); };
        res.redirect('/');
        // Might be nice to have a flash message
      });
    }

    
  }
];