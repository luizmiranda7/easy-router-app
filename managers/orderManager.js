var e = require('../entities');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var deliveryPointManager = require('./deliveryPointManager');
var distributionCenterManager = require('./distributionCenterManager');

var createOrUpdate = function(json) {
    if(!json){
        return Promise.resolve(null);
    }
    
    return e.findByExternalCode('Order', json.externalCode)
    .then(function(order) {
        if (order) {
            return updateOrder(order, json);
        }
        return updateOrder(new e.Order({}), json);
    });
};

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

    if(json.externalCode){
        order.externalCode = json.externalCode;
    }

    var deliveryPointPromise = deliveryPointManager.createOrUpdate(json.deliveryPoint)
    .then(function(deliveryPoint) {
        if (deliveryPoint) {
            order.deliveryPoint = deliveryPoint;
        }
        return;
    });

    var distributionCenterPromise = distributionCenterManager.createOrUpdate(json.distributionCenter)
    .then(function(distributionCenter) {
        if (distributionCenter) {
            order.distributionCenter = distributionCenter;
        }
        return;
    });

    return Promise.all([deliveryPointPromise, distributionCenterPromise])
        .then(function() {
            return order.save();
        })
        .catch(function(err) {
            console.log(err);
        });
};

var findAll = function(){
    return e.Order.find()
    .populate('deliveryPoint')
    .populate('distributionCenter')
    .sort({
        priorityLevel: -1,
        deadline: -1
    }).exec();
};

var findPendingOrders = function() {
    return e.Order.find({
        status: 'PENDING'
    })
    .populate('deliveryPoint')
    .populate('distributionCenter')
    .sort({
        priorityLevel: -1,
        deadline: -1
    }).exec();
};

var findOrders = function(externalCodes){
    var externalCodesString = externalCodes.map(function(item){return item.externalCode;});
    var origins = externalCodes.map(function(item){return item.origin;});
    return e.Order.find({
        "externalCode.externalCode":{$in: externalCodesString},
        "externalCode.origin":{$in: origins}
    })
    .populate('deliveryPoint')
    .populate('distributionCenter')
    .exec();
};

var findOrder = function(externalCode){
    return findOrders([externalCode])
    .then(function(orders){
        if(orders.length > 0){
            return orders[0];
        }
    });
};

module.exports = {
    findAll,
    findOrder,
    findOrders,
    findPendingOrders,
    createOrUpdate
};