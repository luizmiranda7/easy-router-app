var express = require('express');
var orderManager = require('../../managers/orderManager');
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
    orderManager.findOrder(req.body)
    .then(function(order){
        if(order){
            res.render(path + 'orderDetails.html', {order: order});
        }
    });
});

router.post('/remove', function(req, res){
    e.deleteByExternalCode('Order', req.body);
});

module.exports = router;