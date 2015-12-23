var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');

module.exports.schema = new mongoose.Schema({
  latitude: String,
  longitude: String,
  number: String,
  kilometer: String,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  externalCode: ExternalCode.schema
});