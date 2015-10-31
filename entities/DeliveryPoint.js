var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var deliveryPointSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  name: String,
  deliveryDuration: Number,
  routePoint: {type: Schema.Types.ObjectId, ref: 'RoutePoint'},
  calendar: {type: Schema.Types.ObjectId, ref: 'Calendar'}
});

var DeliveryPoint = mongoose.model('DeliveryPoint', deliveryPointSchema);

module.exports.DeliveryPoint = DeliveryPoint;