var mongoose = require('mongoose');

module.exports.distributionCenterSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  prepareDuration: Number,
  routePoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'}
});