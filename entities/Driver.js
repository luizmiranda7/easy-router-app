var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');
var Person = require('./Person');
var Calendar = require('./Calendar');

module.exports.schema = new mongoose.Schema({
  calendar: Calendar.schema,
  externalCode: ExternalCode.schema,
  person: Person.schema
});