var mongoose = require('mongoose');

module.exports.routeAreaSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  maxDistance: Number,
  routePoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}]
});