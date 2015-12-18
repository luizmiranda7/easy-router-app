var e = require('../entities');
var Promise = require('bluebird');
var mongoose = require('mongoose'); mongoose.Promise = Promise;
var calendarManager = require('./distributionCenterManager');

var createOrUpdate = function(json){
  e.findByExternalCode('Vehicle', json.externalCode)
  .then(function(vehicle){
    if (vehicle) {
      return update(vehicle, json);
    }
    return update(new e.Vehicle({}), json);
  });
}

var update = function(vehicle, json){

	if(json.totalWeight){ 
		vehicle.totalWeight = json.totalWeight;
	}

	if(json.totalVolume){ 
		vehicle.totalVolume = json.totalVolume;
	}

	if(json.axes){ 
		vehicle.axes = json.axes;
	}

	if(json.externalCode){
		vehicle.externalCode = json.externalCode;
	}

	return distributionCenterManager.createOrUpdate(json.distributionCenter)
	.then(function(distributionCenter){
		vehicle.currentDistributionCenter = distributionCenter;
	})
	.then(function(){
		vehicle.save();
		return vehicle;
	});

};

var findAbleVehicle = function(distributionCenter){
	

};

var getNextRoute = function(vehicle){

};

module.exports = {
	findAbleVehicles,
	createOrUpdate,
	getNextRoute
};