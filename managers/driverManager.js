var e = require('../entities');

var findAbleDrivers = function(distributionCenter){
	var distributionCenterUUID = distributionCenter.uuid;
	
	var notAbleDriversQuery = e.Route.find({status: {$ne: 'EXECUTED'}});
	notAbleDriversQuery.populate({
		path: 'distributionCenter',
		match: {id: distributionCenter.id}
	});
	notAbleDriversQuery.populate('driver');
	notAbleDriversQuery.select('driver.id');
	var notAbleDriversIds = notAbleDriversQuery.exec();

	var driverQuery = e.Driver.find({id: {$nin: notAbleDriversIds}});
	driverQuery.populate({
		path: 'currentDistributionCenter',
		match: {id: distributionCenter.id}
	});
	return driverQuery.exec();
}
	
module.exports = {
	findAbleDrivers
}