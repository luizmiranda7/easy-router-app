var mongoose = require('mongoose');

var calendarSchema = require('./Calendar');
var driverSchema = require('./Driver');
var vehicleSchema = require('./Vehicle');
var routePointSchema = require('./RoutePoint');
var directionLegSchema = require('./DirectionLeg');
var deliveryPointSchema = require('./DeliveryPoint');
var orderSchema = require('./Order');
var routeSchema = require('./Route');
var routeRequestSchema = require('./RouteRequest');
var routeAreaSchema = require('./RouteArea');
var distributionCenterSchema = require('./DistributionCenter');

var Calendar = mongoose.model('Calendar', calendarSchema.schema);
var Driver = mongoose.model('Driver', driverSchema.schema);
var Vehicle = mongoose.model('Vehicle', vehicleSchema.schema);
var RoutePoint = mongoose.model('RoutePoint', routePointSchema.schema);
var DirectionLeg = mongoose.model('DirectionLeg', directionLegSchema.schema);
var DeliveryPoint = mongoose.model('DeliveryPoint', deliveryPointSchema.schema);
var Order = mongoose.model('Order', orderSchema.schema);
var Route = mongoose.model('Route', routeSchema.schema);
var RouteRequest = mongoose.model('RouteRequest', routeRequestSchema.schema);
var RouteArea = mongoose.model('RouteArea', routeAreaSchema.schema);
var DistributionCenter = mongoose.model('DistributionCenter', distributionCenterSchema.schema);

var findByExternalCode = function(entityName, externalCode){
	var entityModel = mongoose.model(entityName);
	return entityModel.findOne({
		"externalCode.externalCode": externalCode.externalCode,
		"externalCode.origin": externalCode.origin
	})
	.exec();
};

var deleteByExternalCode = function(entityName, externalCode){
	var entityModel = mongoose.model(entityName);
	return entityModel.find({
		'externalCode.externalCode': externalCode.externalCode,
		'externalCode.origin': externalCode.origin
	}).remove().exec();
}

module.exports = {
	Calendar,
	Driver,
	Vehicle,
	RoutePoint,
	DirectionLeg,
	DeliveryPoint,
	Order,
	Route,
	RouteRequest,
	RouteArea,
	DistributionCenter,
	findByExternalCode,
	deleteByExternalCode
}
