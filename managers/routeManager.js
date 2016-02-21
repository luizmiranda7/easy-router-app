var e = require('../entities');
var orderManager = require('./orderManager');
var directionLegManager = require('./directionLegManager');

var getScheduledRoutes = function(){
	return e.Route.find({status: 'Pending'}).exec();
};

var findNotExecutedRoutes = function(){
	return e.Route.find({
		status: { $in: ['PENDING', 'SHEDULED'] }
	})
	.populate('distributionCenter')
	.populate('vehicle')
	.populate('driver')
	.sort({ 
		startDate: -1,
		status: -1
	})
	.exec();
}

var findRoute = function(externalCode){
	return e.Route.find({
		"externalCode.externalCode": externalCode.externalCode,
		"externalCode.origin": externalCode.origin
	})
	.populate('distributionCenter')
	.populate('vehicle')
	.populate('driver')
	.sort({ 
		startDate: -1,
		status: -1
	})
	.exec();
}

module.exports = {
  getScheduledRoutes,
  findNotExecutedRoutes,
  findRoute
};