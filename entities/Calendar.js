var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');

module.exports.schema = new mongoose.Schema({
  intervals: [{initialDate: Date, finalDate: Date}]
});