var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');

module.exports.schema = new mongoose.Schema({
  totalWeight: Number,
  totalVolume: Number,
  axes: Number,
  currentDistributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'},
  externalCode: ExternalCode.schema
});