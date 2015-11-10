var e = require('../entities');

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
}
