const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 50 },
    body: { type: String, required: true, maxLength: 200 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
  }, {timestamps: true}
);

module.exports = mongoose.model('Message', MessageSchema);