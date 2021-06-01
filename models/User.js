const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 25 },
    last_name: { type: String, required: true, maxLength: 25 },
    username: { type: String, required: true },
    password: { type: String, required: true },
    member: { type: Boolean, default: false}
  }
);

module.exports = mongoose.model('User', UserSchema);