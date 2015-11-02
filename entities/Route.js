var mongoose = require('mongoose');

module.exports.routeSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  surName: String,
  startDate: Date,
  endDate: Date,
  distance: Number,
  duration: Number,
  tax: Number,
  status: {
    type: String,
    enum: ['EXECUTED', 'PENDING', 'CANCELED']
  },
  deliveryPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPoint'}],
  distributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'},
  vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
  driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'}
});