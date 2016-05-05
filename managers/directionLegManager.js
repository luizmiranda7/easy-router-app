var e = require('../entities');
var externalCodeManager = require('./externalCodeManager');

var createOrUpdate = function(json) {
    if (!json) {
        return e.nullPromise();
    }

    return findDirectionLeg(json.initialRoutePoint, json.finalRoutePoint)
        .then(function(directionLeg) {
            if (directionLeg) {
                return update(directionLeg, json);
            }
            return update(new e.DirectionLeg({
                externalCode: externalCodeManager.generateExternalCode()
            }), json);
        });
}

var update = function(directionLeg, json) {

    if (directionLeg.duration) {
        directionLeg.duration = json.duration;
    }

    if (directionLeg.distance) {
        directionLeg.distance = json.distance;
    }

    if (json.initialPoint) {
        directionLeg.initialPoint = routePointManager.createOrUpdate(directionLeg.initialPoint, json.initialPoint);
    }


    if (json.initialPoint) {
        directionLeg.finalPoint = routePointManager.createOrUpdate(directionLeg.finalPoint, json.finalPoint);
    }


    return directionLeg.save();
};

// Find a directionLeg given its initial and final points
var findDirectionLeg = function(initialRoutePoint, finalRoutePoint) {
    var result = {};

    var initialRoutePointPromise = e.findByExternalCode('ExternalCode', initialRoutePoint.externalCode).then(function(i) {
        result.i = i;
    });
    var finalRoutePointPromise = e.findByExternalCode('ExternalCode', finalRoutePoint.externalCode).then(function(f) {
        result.f = f;
    });

    return Promise.all(initialRoutePointPromise, finalRoutePointPromise)
        .then(function() {
            return e.DirectionLeg.findOne({
                initalPoint: result.i,
                finalPoint: result.f
            }).exec();
        });
}

module.exports = {
    createOrUpdate,
    findDirectionLeg
};