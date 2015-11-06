var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  requestedDate: Date,
  routePoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}],
  externalCode: {type: mongoose.Schema.Types.ObjectId, ref: 'ExternalCode'}
});