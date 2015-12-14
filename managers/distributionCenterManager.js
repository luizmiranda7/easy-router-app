var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var routePointManager = require('./routePointManager');
var calendarManager = require('./calendarManager');

var createOrUpdate = function(json){
  e.findByExternalCode('DistributionCenter', json.externalCode)
  .then(function(distributionCenter){
    if (distributionCenter) {
      return update(distributionCenter, json);
    }
    return update(new e.DistributionCenter({}), json);
  });
}
	
var update = function(distributionCenter, json){

	if(json.name){ 
		distributionCenter.name = json.name;
	}

	if(json.prepareDuration){
		distributionCenter.prepareDuration = json.prepareDuration;
	}

	if(json.externalCode){
		distributionCenter.externalCode = json.externalCode;
	}

	var routePointPromise = routePointManager.createOrUpdate(json.routePoint)
	.then(function(routePoint){
		distributionCenter.routePoint = routePoint;
	});

	var calendarPromise = calendarManager.createOrUpdate(json.calendar)
	.then(function(calendar){
		distributionCenter.calendar = calendar;
	});

	return mongoose.Promise.all(routePointPromise, calendarPromise)
	.then(function(){
		distributionCenter.save();
		return distributionCenter;
	});
};


module.exports = {
	createOrUpdate
};