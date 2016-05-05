var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');
var TimeWindow = require('./TimeWindow');

module.exports.schema = new mongoose.Schema({
  priorityLevel: Number,
  weight: Number,
  volume: Number,
  penalty: Number,
  deliverTimewindow: TimeWindow.schema,
  pickupTimewindow: TimeWindow.schema,
  status: {
    type: String,
    enum: ['PENDING', 'SCHEDULED', 'DELIVERED']
  },
  deliveryPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPoint'},
  distributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'},
  externalCode: ExternalCode.schema
});