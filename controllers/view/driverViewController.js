var express = require('express');
var driverManager = require('../../managers/driverManager');
var mainConfig = require('../../configurations/mainConfig');
var e = require('../../entities');

var router = express.Router();

var path = GLOBAL.rootDirName + "/view/";
router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", function(req, res){
    e.findAll("Driver")
    .then(function(drivers){
        if(drivers){
            res.render(path + "drivers.html", {drivers: drivers});
        }
    });
});

router.post("/details", function(req, res){
    e.findByExternalCode("Driver", [req.body])
    .then(function(driver){
        if(driver){
            res.render(path + "driverDetails.html", {driver: driver});
        }
    });
});

router.post("/remove", function(req, res){
    e.deleteByExternalCode('Driver', req.body);
});

module.exports = router;