var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var vehicleSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  totalWeight: Number,
  totalVolume: Number,
  axes: Number,
  currentDistributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'}
});

var Vehicle = mongoose.model('Vehicle', vehicleSchema);
mongoose.disconnect();

module.exports.Vehicle = Vehicle;