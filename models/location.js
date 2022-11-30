var mongoose = require("mongoose")

var locationSchema = new mongoose.Schema({
  name: String,
  lat: String,
  long: String,
  images: [String],
  zone: {
    type: String,
    enum: ['Quad', 'Mather', 'North', 'South']
  },
  type: {
    type: [String],
    enum: ['Academic', 'Food', 'Leisure', 'Study']
  }
});

module.exports = mongoose.model("Location", locationSchema);