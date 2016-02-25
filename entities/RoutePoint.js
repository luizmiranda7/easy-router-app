var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');

module.exports.schema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  number: String,
  kilometer: String,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  externalCode: ExternalCode.schema
});