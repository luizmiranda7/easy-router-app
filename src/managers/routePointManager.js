var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var createOrUpdate = function(json) {
    return e.findByExternalCode('RoutePoint', json.externalCode)
        .then(function(routePoint) {
            if (routePoint) {
                return update(routePoint, json);
            }
            return update(new e.RoutePoint({}), json);
        });
}

var update = function(routePoint, json) {

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
    if (json.externalCode) {
        routePoint.externalCode = json.externalCode;
    }
    return routePoint.save();
};


module.exports = {
    createOrUpdate
};