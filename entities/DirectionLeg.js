var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');
var RoutePoint = require('./RoutePoint');

module.exports.schema = new mongoose.Schema({
  distance: Number,
  duration: Date,
  initialPoint: RoutePoint.schema,
  finalPoint: RoutePoint.schema,
});
