var mongoose = require('mongoose');
var ExternalCode = require('../entities/ExternalCode');

module.exports.schema = new mongoose.Schema({
  intervals: [{initialDate: Date, finalDate: Date}],
  externalCode: ExternalCode.schema
});