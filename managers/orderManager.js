var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var createOrder = function(json) {

  updateOrder(new e.Order({}), json)
    .then(function(order) {
      return externalCodeManager.createExternalCode(json.externalCode);
    })
    .then(function(externalCode) {
      order.externalCode = externalCode;
      return order.save();
    })
    .catch(function(err) {
      throw err;
    });
}

var updateOrder = function(order, json) {
  if (json.priorityLevel) {
    order.priorityLevel = json.priorityLevel;
  }

  if (json.weight) {
    order.weight = json.weight;
  }

  if (json.deadline) {
    order.deadline = json.deadline;
  }

  if (json.status) {
    order.status = json.status;
  }

  if (json.deliveryPoint) {
    e.findEntityByExternalCode('DeliveryPoint', json.deliveryPoint.externalCode)
    then((deliveryPoint) => {
      if (deliveryPoint) { return new Promisse(deliveryPoint); }
      return deliveryPointManager.createDeliveryPoint(json.deliveryPoint.externalCode);
    })
    .then((deliveryPoint) => {
      order.deliveryPoint = deliveryPoint._id;
    });
  }

  if (json.distributionCenter) {
    e.findEntityByExternalCode('DistributionCenter', json.distributionCenter.externalCode)
    then(function(distributionCenter) {
      if (distributionCenter) { return new Promisse(distributionCenter); }
      return distributionCenterManager.createDistributionCenter(json.distributionCenter.externalCode);
    })
    .then(function(distributionCenter) {
      order.distributionCenter = distributionCenter._id;
    });
  }

}

var findPendingOrders = function() {
  e.Order.find({
    status: 'PENDING'
  }).sort({
    priorityLevel: -1,
    deadline: -1
  }).exec();
};

module.exports = {
  findPendingOrders
};