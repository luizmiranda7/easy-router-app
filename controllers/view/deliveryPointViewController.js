var express = require('express');
var deliveryPointManager = require('../../managers/deliveryPointManager');
var mainConfig = require('../../configurations/mainConfig');
var e = require('../../entities');

var router = express.Router();

var path = GLOBAL.rootDirName + "/view/";
router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", function(req, res){
    e.findAll("DeliveryPoint")
    .then(function(deliveryPoints){
        if(deliveryPoints){
            res.render(path + "deliveryPoints.html", {
                deliveryPoints: deliveryPoints,
                apiKey: mainConfig.apiKey
            });
        }
    });
});

router.post("/details", function(req, res){
    e.findByExternalCode("DeliveryPoint", req.body)
    .then(function(deliveryPoint){
        if(deliveryPoint){
            res.render(path + "deliveryPointDetails.html", {deliveryPoint: deliveryPoint});
        }
    });
});

module.exports = router;