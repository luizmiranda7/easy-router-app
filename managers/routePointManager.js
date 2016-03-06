var e = require('../entities');
var externalCodeManager = require('./externalCodeManager');

var createOrUpdate = function(routePoint, json) {
    if(!routePoint){
        routePoint = {
            externalCode: externalCodeManager.generateExternalCode()
        };
    }

    if (json.latitude) {
        routePoint.latitude = json.latitude;
    }
    if (json.longitude) {
        routePoint.longitude = json.longitude;
    }
    if (json.number) {
        routePoint.number = json.number;
    }
    if (json.kilometer) {
        routePoint.kilometer = json.kilometer;
    }
    if (json.street) {
        routePoint.street = json.street;
    }
    if (json.city) {
        routePoint.city = json.city;
    }
    if (json.state) {
        routePoint.state = json.state;
    }
    if (json.postalCode) {
        routePoint.postalCode = json.postalCode;
    }
    if(externalCodeManager.isValid(json.externalCode)) {
        routePoint.externalCode = json.externalCode;
    }
    return routePoint;
};


module.exports = {
    createOrUpdate
};