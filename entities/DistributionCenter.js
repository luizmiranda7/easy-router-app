var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var distributionCenterSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  name: String,
  prepareDuration: Number,
  routePoint: {type: Schema.Types.ObjectId, ref: 'RoutePoint'},
  calendar: {type: Schema.Types.ObjectId, ref: 'Calendar'}
});

var DistributionCenter = mongoose.model('DistributionCenter', distributionCenterSchema);

module.exports.DistributionCenter = DistributionCenter;