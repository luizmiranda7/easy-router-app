var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var routeSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  firstName: String,
  surName: String,
  startDate: Date,
  endDate: Date,
  distance: Number,
  duration: Number,
  tax: Double,
  status: {
    type: String,
    enum: ['EXECUTED', 'PENDING', 'CANCELED']
  },
  deliveryPoints: [{type: Schema.Types.ObjectId, ref: 'DeliveryPoint'}],
  distributionCenter: {type: Schema.Types.ObjectId, ref: 'DistributionCenter'},
  vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle'},
  driver: {type: Schema.Types.ObjectId, ref: 'Driver'}
});

var Route = mongoose.model('Route', routeSchema);

module.exports.Route = Route;