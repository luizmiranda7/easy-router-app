var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');

module.exports.schema = new mongoose.Schema({
  firstName: String,
  surName: String,
  birthdate: Date,
  externalCode: ExternalCode.schema
});