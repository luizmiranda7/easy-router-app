var express = require('express');
var routeManager = require('../../managers/routeManager');
var mainConfig = require('../../configurations/mainConfig');
var e = require('../../entities');

var router = express.Router();

var path = GLOBAL.rootDirName + "/view/";
router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", function(req, res){
    routeManager.findNotExecutedRoutes()
    .then(function(routes){
        if(routes){
            res.render(path + "routes.html", {routes: routes});
        }
    });
});

router.post("/details", function(req, res){
    routeManager.findRoute(req.body)
    .then(function(route){
        if(route){
            res.render(path + "routeDetails.html", {route: route});
        }
    });
});

router.post("/remove", function(req, res){
    e.deleteByExternalCode('Route', req.body);
});

module.exports = router;