var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  latitude: String,
  longitude: String
});