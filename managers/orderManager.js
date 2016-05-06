var e = require('../entities');
var externalCodeManager = require('./externalCodeManager');
var deliveryPointManager = require('./deliveryPointManager');
var distributionCenterManager = require('./distributionCenterManager');

var update = function(order, json) {
    if (json.priorityLevel) {
        order.priorityLevel = json.priorityLevel;
    }

    if (json.weight) {
        order.weight = json.weight;
    }

    if (json.volume) {
        order.volume = json.volume;
    }

    if (json.penalty) {
        order.penalty = json.penalty;
    }

    if (json.deliverTimeWindow) {
        order.deliverTimeWindow = json.deliverTimeWindow;
    }

    if (json.pickupTimeWindow) {
        order.pickupTimeWindow = json.pickupTimeWindow;
    }

    if (json.status) {
        order.status = json.status;
    }

    if(externalCodeManager.isValid(json.externalCode)){
        order.externalCode = json.externalCode;
    }

    var deliveryPointPromise = null;
    if (json.deliveryPoint.externalCode && json.deliveryPoint.origin) {
        deliveryPointPromise = e.findByExternalCode('DeliveryPoint', json.deliveryPoint);
    } else {
        deliveryPointPromise = deliveryPointManager.createOrUpdate(json.deliveryPoint);
    }
    deliveryPointPromise.then(function(deliveryPoint){
        if(deliveryPoint){
            order.deliveryPoint = deliveryPoint;
        }
        return;
    });

    var distributionCenterPromise = null;
    if (json.distributionCenter.externalCode && json.distributionCenter.origin) {
        distributionCenterPromise = e.findByExternalCode('DistributionCenter', json.distributionCenter);
    } else {
        distributionCenterPromise = distributionCenterManager.createOrUpdate(json.distributionCenter);
    }
    distributionCenterPromise.then(function(distributionCenter){
        if(distributionCenter){
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
    }).exec();
};

var findPendingOrders = function() {
    return e.Order.find()
    .where('status', 'PENDING')
    .where('deliverTimeWindow.start').lte(new Date())
    .where('deliverTimeWindow.end').gte(new Date())
    .where('pickupTimeWindow.start').lte(new Date())
    .where('pickupTimeWindow.end').gte(new Date())
    .populate('deliveryPoint')
    .populate('distributionCenter')
    .sort({
        priorityLevel: -1,
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
        return null;
    });
};

module.exports = {
    update: update,
    findAll: findAll,
    findOrder: findOrder,
    findOrders: findOrders,
    findPendingOrders: findPendingOrders
};