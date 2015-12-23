var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');

module.exports.schema = new mongoose.Schema({
  distance: Number,
  duration: Date,
  markedToUpdate: Boolean,
  lastTimeMarkedToUpdate: Date,
  lastTimeUpdate: Date,
  firstPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  lastPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}
});
