var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var vehicleSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  totalWeight: Number,
  totalVolume: Number,
  axes: Number,
  currentDistributionCenter: {type: Schema.Types.ObjectId, ref: 'DistributionCenter'}
});

var Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports.Vehicle = Vehicle;