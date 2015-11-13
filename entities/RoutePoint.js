var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  latitude: String,
  longitude: String,
  address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
  local: {type: mongoose.Schema.Types.ObjectId, ref: 'Local'},
  externalCode: {type: mongoose.Schema.Types.ObjectId, ref: 'ExternalCode'}
});