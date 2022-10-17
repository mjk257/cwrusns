var mongoose = require("mongoose")

//MONGOOSE BLOG CONFIG
var courseSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date,
  location: Location,
});

module.exports = mongoose.model("Course", courseSchema);