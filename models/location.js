var mongoose = require("mongoose")

var locationSchema = new mongoose.Schema({
  name: String,
  lat: String,
  long: String,
  images: [String]
});

module.exports = mongoose.model("Location", locationSchema);