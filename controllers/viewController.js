var express = require('express');

var initMethods = function(app, rootDirName) {

    app.use('/view/js',  express.static(rootDirName + '/view/js'));
    app.use('/view/lib',  express.static(rootDirName + '/view/lib'));
    app.use('/view/css',  express.static(rootDirName + '/view/css'));
    app.use('/view/images',  express.static(rootDirName + '/view/images'));
    
    app.use('/view/drivers', require('./view/driverViewController'));
    app.use('/view/orders', require('./view/orderViewController'));
    app.use('/view/routes', require('./view/routeViewController'));
    app.use('/view/vehicles', require('./view/vehicleViewController'));
    app.use('/view/deliveryPoints', require('./view/deliveryPointViewController'));
    app.use('/view/distributionCenters', require('./view/distributionCenterViewController'));

    var path = rootDirName + "/view/";

		app.use(function(req, res, next) {
		    console.log("Method: " + req.method);
		    next();
		});

    app.post('/view/addressSelectorModal', function(req, res){
		   res.render(path + "addressSelectorModal.html", {
		   	title: req.body.title
		   });
		});

    app.get('/view/', function(req, res){
       res.render(path + "cover.html");
    });
    
    app.get('/view/cover', function(req, res){
       res.render(path + "cover.html");
    });
    
    app.get('/view/features', function(req, res){
       res.render(path + "features.html");
    });
    
    app.get('/view/contact', function(req, res){
       res.render(path + "contact.html");
    });
    
    app.get('/view/access', function(req, res){
       res.render(path + "access.html");
    });
};

module.exports = {
    initMethods: initMethods
};
