var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var orderSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  priorityLevel: Number,
  weight: Number,
  deadline: Number,
  status: {
    type: String,
    enum: ['PENDING', 'SCHEDULED', 'DELIVERED']
  },
  deliveryPoint: {type: Schema.Types.ObjectId, ref: 'DeliveryPoint'},
  distributionCenter: {type: Schema.Types.ObjectId, ref: 'DistributionCenter'},
});

var Order = mongoose.model('Order', orderSchema);

module.exports.Order = Order;