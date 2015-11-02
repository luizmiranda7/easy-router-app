var mongoose = require('mongoose');

module.exports.orderSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  priorityLevel: Number,
  weight: Number,
  deadline: Number,
  status: {
    type: String,
    enum: ['PENDING', 'SCHEDULED', 'DELIVERED']
  },
  deliveryPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPoint'},
  distributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'},
});