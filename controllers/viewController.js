var express = require('express');
var routeManager = require('../managers/routeManager');
var orderManager = require('../managers/orderManager');
var mainConfig = require('../configurations/mainConfig');
var e = require('../entities');

var initMethods = function(app, rootDirName) {
    var router = express.Router();
    var path = rootDirName + "/view/";
    router.use(function(req, res, next) {
        console.log("/" + req.method);
        next();
    });

    router.get("/access", function(req, res) {
        res.render(path + "access.html",
            {
                email: 'luizmiranda7@gmail.com',
                password: 'teste10'
            });
    });

    router.get('/register', function(req, res){
        res.render(path + 'register.html');
    });

    router.get("/cover", function(req, res){
        res.render(path + "conver.html");
    });

    router.get("/orders", function(req, res){
        orderManager.findPendingOrders()
        .then(function(orders){
            res.render(path + "orders.html",
            {
                apiKey: mainConfig.apiKey,
                orders: orders
            });
        });
    });

    router.post("/orderDetails", function(req, res){
        orderManager.findOrders([req.body])
        .then(function(orders){
            if(orders){
                res.render(path + "orderDetails.html", {order: orders[0]});
            }
        });
    });

    app.use("/view", router);

};

module.exports = {
    initMethods
};