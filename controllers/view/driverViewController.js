var express = require('express');
var driverManager = require('../../managers/driverManager');
var mainConfig = require('../../configurations/mainConfig');
var e = require('../../entities');

var router = express.Router();

var path = GLOBAL.rootDirName + "/view/";

router.get("/", function(req, res){
    e.findAll("Driver")
    .then(function(drivers){
        if(drivers){
            res.render(path + "drivers.html", {
                drivers: drivers
            });
        }
    });
});

router.post("/details", function(req, res){
    e.findByExternalCode("Driver", req.body)
    .then(function(entity){
        var driver = entity ? entity : {};
        res.render(path + "driverDetails.html", {driver: driver});
    });
});

module.exports = router;