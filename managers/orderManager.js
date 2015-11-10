var e = require('../entities');

var findPendingOrders = function(){
  e.Order.find({status: 'PENDING'}).sort({priorityLevel: -1, deadline: -1}).exec();
};

module.exports = {
  findPendingOrders
};
