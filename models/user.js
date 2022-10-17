var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  schedule: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);