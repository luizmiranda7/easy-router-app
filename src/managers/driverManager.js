var e = require('../entities');
var Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var calendarManager = require('./calendarManager');

var createOrUpdate = function(json){
  e.findByExternalCode('Driver', json.externalCode)
  .then(function(driver){
    if (driver) {
      return update(driver, json);
    }
    return update(new e.Driver({}), json);
  });
}

var update = function(driver, json){

	if(json.person.firstName){ 
		driver.person.firstName = json.person.firstName;
	}

	if(json.person.surName){ 
		driver.person.surName = json.person.surName;
	}

	if(json.person.birthdate){ 
		driver.person.birthdate = json.person.birthdate;
	}

	if(json.person.externalCode){ 
		driver.person.externalCode = json.person.externalCode;
	}

	if(json.externalCode){
		driver.externalCode = json.externalCode;
	}

	return calendarManager.createOrUpdate(json.calendar)
	.then(function(calendar){
		driver.calendar = calendar;
	})
	.then(function(){
		driver.save();
		return driver;
	});

};

var findAbleDrivers = function(distributionCenter){
	var distributionCenterUUID = distributionCenter.uuid;

	// creating not able drivers query
	var notAbleDriversQuery = e.Route.find({status: {$ne: 'EXECUTED'}});
	notAbleDriversQuery.populate({
		path: 'distributionCenter',
		match: {id: distributionCenter.id}
	});
	notAbleDriversQuery.populate('driver');
	notAbleDriversQuery.select('driver._id');

	// executing query to find not able drivers
	var notAbleDriversIdsPromise = notAbleDriversQuery.exec();
	notAbleDriversIdsPromise.then(function(notAbleDriversIds){

		// once we know the unvaliable drivers, search for able drivers
		var driverQuery = e.Driver.find({id: {$nin: notAbleDriversIds}});
		driverQuery.populate({
			path: 'currentDistributionCenter',
			match: {id: distributionCenter.id}
		});
		return driverQuery.exec();
	})
	.then(function(drivers){
		return drivers;
	})
	.catch(function(err){
	console.log('error:', err);
	});

}

module.exports = {
	findAbleDrivers
	createOrUpdate
};





