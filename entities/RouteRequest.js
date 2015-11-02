var mongoose = require('mongoose');

module.exports.routeRequestSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  requestedDate: Date,
  routePoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}]
});