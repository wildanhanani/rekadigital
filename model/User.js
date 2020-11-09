const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
  username: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  status: { type: Number },
});
module.exports = mongoose.model('User', Userschema);
