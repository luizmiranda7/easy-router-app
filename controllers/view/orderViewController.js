var express = require('express');
var orderManager = require('../../managers/orderManager');
var distributionCenterManager = require('../../managers/distributionCenterManager');
var deliveryPointManager = require('../../managers/deliveryPointManager');
var mainConfig = require('../../configurations/mainConfig');
var e = require('../../entities');

var router = express.Router();
var path = GLOBAL.rootDirName + '/view/';
router.use(function(req, res, next) {
    console.log('/' + req.method);
    next();
});

router.get('/', function(req, res){
    orderManager.findAll()
    .then(function(orders){
        if(orders){
            res.render(path + 'orders.html', {apiKey: mainConfig.apiKey, orders: orders});
        }
    });
});

router.post('/details', function(req, res){
    var order = null, deliveryPoints = null, distributionCenters = null;

    var orderPromise = orderManager.findOrder(req.body).then(function(item){order = item;});
    var deliveryPointsPromise = e.findAll('DeliveryPoint').then(function(items){deliveryPoints = items;});
    var distributionCentersPromise = e.findAll('DistributionCenter').then(function(items){distributionCenters = items;});
    Promise.all([orderPromise, deliveryPointsPromise, distributionCentersPromise]).then(function(){
        if(order && deliveryPoints && distributionCenters){
            res.render(path + 'orderDetails.html', {
                order: order,
                deliveryPoints: deliveryPoints,
                distributionCenters: distributionCenters
            });
        }
    });
});

router.post('/remove', function(req, res){
    e.deleteByExternalCode('Order', req.body);
});

module.exports = router;