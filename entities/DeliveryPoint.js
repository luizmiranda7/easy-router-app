var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  name: String,
  deliveryDuration: Number,
  routePoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'},
  externalCode: {type: mongoose.Schema.Types.ObjectId, ref: 'ExternalCode'}
});