var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var CourseSchema = new mongoose.Schema({
  name: String,
  startTime: String,
  endTime: String,
  location: String,
  days: [Number]
})

var UserSchema = new mongoose.Schema({
  password: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  schedule: [CourseSchema]
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});


module.exports = mongoose.model("User", UserSchema);