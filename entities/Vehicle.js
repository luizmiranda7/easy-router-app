var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  totalWeight: Number,
  totalVolume: Number,
  axes: Number,
  currentDistributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'},
  externalCode: {type: mongoose.Schema.Types.ObjectId, ref: 'ExternalCode'}
});