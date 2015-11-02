var mongoose = require('mongoose');

module.exports.directionLegSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  distance: Number,
  duration: Date,
  markedToUpdate: Date,
  lastTimeUpdate: Date,
  firstPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  lastPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}
});