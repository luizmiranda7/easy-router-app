var express = require('express');

var initMethods = function(app, rootDirName) {
    app.use('/view/drivers', require('./view/driverViewController'));
    app.use('/view/orders', require('./view/orderViewController'));
    app.use('/view/routes', require('./view/routeViewController'));
    app.use('/view/vehicles', require('./view/vehicleViewController'));
};

module.exports = {
    initMethods
};