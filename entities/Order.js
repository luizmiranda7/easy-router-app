var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');

module.exports.schema = new mongoose.Schema({
  priorityLevel: Number,
  weight: Number,
  deadline: Number,
  status: {
    type: String,
    enum: ['PENDING', 'SCHEDULED', 'DELIVERED']
  },
  deliveryPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPoint'},
  distributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'},
  externalCode: ExternalCode.schema
});