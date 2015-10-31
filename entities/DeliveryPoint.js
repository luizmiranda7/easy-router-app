var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var deliveryPointSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  deliveryDuration: Number,
  routePoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'}
});

var DeliveryPoint = mongoose.model('DeliveryPoint', deliveryPointSchema);
mongoose.disconnect();

module.exports.DeliveryPoint = DeliveryPoint;