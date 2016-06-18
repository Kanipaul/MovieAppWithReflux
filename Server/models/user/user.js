var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username : String,
  password : String
});

var user = mongoose.model('UserCollection', userSchema,'UserCollection')
module.exports = user
