var e = require('../entities');

var createOrUpdate = function(json) {
    if (!json) {
        return e.nullPromise();
    }

    return findDirectionLeg(json.initialRoutePoint, json.finalRoutePoint)
        .then(function(directionLeg) {
            if (directionLeg) {
                return update(directionLeg, json);
            }
            return update(new e.DirectionLeg({}), json);
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

// Split a list of routePoints into a list of chunks (10) elements
var getDirectionLegVectors = function(routePoints) {
    var listMatrix = [];

    while (routePoints.length > 0) {
        var chunk = routePoints.splice(0, 10);
        listMatrix.push(chunk);
    }
    return listMatrix;
};

/*
 * Given a list of routePoints, define a DirectionLEgUpdateRequestDTO
 */
var getDirectionLegUpdateRequest = function(routePoints) {
    var vectors = getDirectionLegVectors(routePoints);

    var dto = {
        requests: []
    };
    vectors.forEach(function(vector) {
        dto.requests.push({
            initialPoints: vector,
            finalPoints: vector
        });
        if (vectors.length > 1) {
            vectors.forEach(function(vectorInner) {
                dto.requests.push({
                    initialPoints: vector,
                    finalPoints: vectorInner
                });
            });
        }
    });
    return dto;
}



module.exports = {
    createOrUpdate,
    findDirectionLeg,
    getDirectionLegUpdateRequest
};