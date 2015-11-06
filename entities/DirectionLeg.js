var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  distance: Number,
  duration: Date,
  markedToUpdate: boolean,
  lastTimeMarkedToUpdate: Date,
  lastTimeUpdate: Date,
  firstPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  lastPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  codigoExterno: {type: mongoose.Schema.Types.ObjectId, ref: 'CodigoExterno'}
});