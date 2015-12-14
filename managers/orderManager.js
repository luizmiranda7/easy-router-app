var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var deliveryPointManager = require('./deliveryPointManager');
var distributionCenterManager = require('./distributionCenterManager');

var createOrUpdate = function(json) {
    e.findByExternalCode('Order', json.externalCode)
        .then(function(order) {
            if (order) {
                return updateOrder(order, json);
            }
            return updateOrder(new e.Order({}), json);
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

    var deliveryPointPromise = deliveryPointManager.createOrUpdate(json.deliveryPoint)
    .then(function(deliveryPoint) {
        if (deliveryPoint) {
            order.deliveryPoint = deliveryPoint;
        }
        return order;
    });

    var distributionCenterPromise = distributionCenterManager.createOrUpdate(json.distributionCenter)
    .then(function(distributionCenter) {
        if (distributionCenter) {
            order.distributionCenter = distributionCenter;
        }
        return order;
    });

    return mongoose.Promise.all([deliveryPointPromise, distributionCenterPromise])
        .then(function() {
            order.save();
            return order;
        })
        .catch(function(err) {
            console.log(err);
        });
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
    findPendingOrders,
    createOrUpdate
};