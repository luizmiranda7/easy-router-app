var express = require('express');
var routeManager = require('../../managers/routeManager');
var mainConfig = require('../../configurations/mainConfig');
var e = require('../../entities');
var uuid = require('node-uuid');

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

router.post('/routeMap', function(req, res){
    var addRouteTitle = function(route){
        route.title = 'Route ' + new Date().getTime();
        return Promise.resolve(route);
    };

    var addRouteId = function(route){
        route.id = uuid.v4();
        return Promise.resolve(route);
    };

    var addEndTitle = function(route){
        return e.findByRoutePointExternalCode("DistributionCenter", JSON.parse(route.end.location.id))
            .then(function(distributionCenter){
               if(distributionCenter){
                   route.end.title = distributionCenter.name;
                   return route;
               }
            });
    };

    var addStartTitle = function(route){
        return e.findByRoutePointExternalCode("DistributionCenter", JSON.parse(route.start.location.id))
            .then(function(distributionCenter){
                if(distributionCenter){
                    route.start.title = distributionCenter.name;
                    return route;
                }
            });
    };

    var addTourActivityDetails = function(route){
        route.tourActivities.tourActivities = route.tourActivities.tourActivities.map(function(tourActivity){
            if(tourActivity.capacity){
                tourActivity.details = 'Delivery';
            } else {
                tourActivity.details = 'Pickup';
            }

            tourActivity.details += ' - ';
            tourActivity.details += tourActivity.shipment.name;
            return tourActivity;
        });

        return Promise.resolve(route);
    };

    var parsedRoutes = [];
    var parseRoutePromises = [];
    req.body.routes.forEach(function(route){
        parseRoutePromises.push(addRouteTitle(route)
            .then(function(parsedRoute){
                return addRouteId(parsedRoute);
            })
            .then(function (parsedRoute) {
                return addEndTitle(parsedRoute);
            })
            .then(function (parsedRoute) {
                return addStartTitle(parsedRoute);
            })
            .then(function (parsedRoute) {
                return addTourActivityDetails(parsedRoute);
            }).then(function (parsedRoute) {
            parsedRoutes.push(parsedRoute);
        }));
    });

    Promise.all(parseRoutePromises)
        .then(function () {
            res.render(path + "routeMap.html", {
                routes: parsedRoutes,
                cost: req.body.cost
            });
        });
});

router.post("/remove", function(req, res){
    e.deleteByExternalCode('Route', req.body);
});

module.exports = router;