var mongoose = require('mongoose');
var ExternalCode = require('../entities/ExternalCode');

module.exports.schema = new mongoose.Schema({
  name: String,
  prepareDuration: Number,
  routePoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'},
  externalCode: ExternalCode.schema
});