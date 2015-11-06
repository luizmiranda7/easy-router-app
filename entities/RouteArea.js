var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  maxDistance: Number,
  routePoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}],
  codigoExterno: {type: mongoose.Schema.Types.ObjectId, ref: 'CodigoExterno'}
});