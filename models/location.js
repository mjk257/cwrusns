var mongoose = require("mongoose")

var locationSchema = new mongoose.Schema({
  name: String,
  coordinates: String
});

module.exports = mongoose.model("Location", locationSchema);