var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var distributionCenterSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  prepareDuration: Number,
  routePoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'}
});

var DistributionCenter = mongoose.model('DistributionCenter', distributionCenterSchema);
mongoose.disconnect();

module.exports.DistributionCenter = DistributionCenter;