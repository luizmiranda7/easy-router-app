var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var orderSchema = mongoose.Schema({
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

var Order = mongoose.model('Order', orderSchema);
mongoose.disconnect();

module.exports.Order = Order;