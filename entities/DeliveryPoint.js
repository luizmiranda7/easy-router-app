var mongoose = require('mongoose');

module.exports.deliveryPointSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  deliveryDuration: Number,
  routePoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'}
});