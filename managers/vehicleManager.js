var e = require('../entities');
var Promise = require('bluebird');
var mongoose = require('mongoose'); mongoose.Promise = Promise;
var distributionCenterManager = require('./distributionCenterManager');

var createOrUpdate = function(json){
	if(!json){
		return Promise.resolve(null);
	}
	
  return e.findByExternalCode('Vehicle', json.externalCode)
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
		if(distributionCenter){
			vehicle.currentDistributionCenter = distributionCenter;
		}
	})
	.then(function(){
		return vehicle.save();
	});

};

var findAll = function(vehicle){
	return e.Vehicle.find()
	.populate('currentDistributionCenter')
	.exec();
};

var findVehicle = function(externalCode){
	return e.findByExternalCode(externalCode)
	.populate('currentDistributionCenter')
	.exec();
};

module.exports = {
	findAll,
	findVehicle,
	createOrUpdate
};