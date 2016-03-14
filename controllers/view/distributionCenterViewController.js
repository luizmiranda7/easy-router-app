var express = require('express');
var distributionCenterManager = require('../../managers/distributionCenterManager');
var mainConfig = require('../../configurations/mainConfig');
var e = require('../../entities');

var router = express.Router();

var path = GLOBAL.rootDirName + "/view/";
router.get("/", function(req, res){
    e.findAll("DistributionCenter")
    .then(function(distributionCenters){
        if(distributionCenters){
            res.render(path + "distributionCenters.html", {
                distributionCenters: distributionCenters,
                apiKey: mainConfig.apiKey
            });
        }
    });
});

router.post("/details", function(req, res){
    e.findByExternalCode("DistributionCenter", req.body)
    .then(function(entity){
        var distributionCenter = entity ? entity : {};
        res.render(path + "distributionCenterDetails.html", {distributionCenter: distributionCenter});
    });
});

module.exports = router;