var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  latitude: String,
  longitude: String,
  codigoExterno: {type: mongoose.Schema.Types.ObjectId, ref: 'CodigoExterno'}
});