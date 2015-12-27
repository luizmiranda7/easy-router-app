var express = require('express');
var routeManager = require('../managers/routeManager');
var orderManager = require('../managers/orderManager');

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

    router.get("/routes", function(req, res){
        orderManager.findPendingOrders()
        .then(function(orders){
            res.render(path + "routes.html",
            {
                apiKey: "AIzaSyDP_3WejV6sd2fKNBfI6e1E4Hznr6Z60Mg",
                orders: orders
            });
        });
    });

    router.get("/order", function(req, res){
        orderManager.findPendingOrders()
        .then(function(orders){
            res.render(path + "orders.html", orders);
        });
    });

    app.use("/view", router);

};

module.exports = {
    initMethods
};