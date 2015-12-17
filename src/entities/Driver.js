var mongoose = require('mongoose');
var ExternalCode = require('../entities/ExternalCode');
var Person = require('../entities/Person');

module.exports.schema = new mongoose.Schema({
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'},
  externalCode: ExternalCode.schema,
  person: Person.schema
});