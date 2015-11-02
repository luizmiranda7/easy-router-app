var mongoose = require('mongoose');

module.exports.localSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  latitude: String,
  longitude: String
});