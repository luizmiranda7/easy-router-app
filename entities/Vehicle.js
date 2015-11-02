var mongoose = require('mongoose');

module.exports.vehicleSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  totalWeight: Number,
  totalVolume: Number,
  axes: Number,
  currentDistributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'}
});