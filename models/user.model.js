var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  age: String,
  phone: String
})

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;