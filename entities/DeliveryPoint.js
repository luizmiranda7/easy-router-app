var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');
var Calendar = require('./Calendar');
var RoutePoint = require('./RoutePoint');

module.exports.schema = new mongoose.Schema({
  name: String,
  deliveryDuration: Number,
  routePoint: RoutePoint.schema,
  calendar: Calendar.schema,
  externalCode: ExternalCode.schema
});