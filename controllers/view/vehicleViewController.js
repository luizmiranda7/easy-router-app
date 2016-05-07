var express = require('express');
var vehicleManager = require('../../managers/vehicleManager');
var mainConfig = require('../../configurations/mainConfig');
var e = require('../../entities');

var router = express.Router();

var path = GLOBAL.rootDirName + "/view/";
router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", function(req, res){
    vehicleManager.findAll()
    .then(function(vehicles){
        if(vehicles){
            res.render(path + "vehicles.html", {vehicles: vehicles});
        }
    });
});

router.post("/details", function(req, res){
    var vehicle = null, distributionCenters = [];
    var distributionCentersPromise = e.findAll('DistributionCenter').then(function(entities){distributionCenters = entities;});
    var vehiclePromise = vehicleManager.findVehicle(req.body).then(function(entity){vehicle = entity ? entity : {};});

    Promise.all([distributionCentersPromise, vehiclePromise])
        .then(function(){
            res.render(path + "vehicleDetails.html", {
                vehicle: vehicle,
                distributionCenters: distributionCenters
            });
        });
});

router.post("/remove", function(req, res){
    e.deleteByExternalCode('Vehicle', req.body);
});

module.exports = router;