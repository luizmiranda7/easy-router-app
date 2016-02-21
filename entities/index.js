var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

var calendarSchema = require('./Calendar');
var driverSchema = require('./Driver');
var vehicleSchema = require('./Vehicle');
var routePointSchema = require('./RoutePoint');
var directionLegSchema = require('./DirectionLeg');
var deliveryPointSchema = require('./DeliveryPoint');
var orderSchema = require('./Order');
var routeSchema = require('./Route');
var distributionCenterSchema = require('./DistributionCenter');

var Driver = mongoose.model('Driver', driverSchema.schema);
var Vehicle = mongoose.model('Vehicle', vehicleSchema.schema);
var DirectionLeg = mongoose.model('DirectionLeg', directionLegSchema.schema);
var DeliveryPoint = mongoose.model('DeliveryPoint', deliveryPointSchema.schema);
var Order = mongoose.model('Order', orderSchema.schema);
var Route = mongoose.model('Route', routeSchema.schema);
var DistributionCenter = mongoose.model('DistributionCenter', distributionCenterSchema.schema);

var findAll = function(entityName){
	var entityModel = mongoose.model(entityName);
	return entityModel.find({}).exec();
}

var findByExternalCode = function(entityName, externalCode){
	return findByExternalCodeWithPopulationFields(entityName, externalCode, []);
};

var findByExternalCodeWithPopulationFields = function(entityName, externalCode, populationFields){
	var entityModel = mongoose.model(entityName);
	var query = entityModel.findOne({
		"externalCode.externalCode": externalCode.externalCode,
		"externalCode.origin": externalCode.origin
	});

	populationFields.forEach(function(item){
		query.populate(item);
	});
	
	return query.exec();
};

var findByExternalCodes = function(entityName, externalCodes){
	return findByExternalCodesWithPopulationFields(entityName, externalCodes, []);
}

var findByExternalCodesWithPopulationFields = function(entityName, externalCodes, populationFields){
	var externalCodesString = externalCodes.map(function(item){return item.externalCode;});
	var origins = externalCodes.map(function(item){return item.origin;});
	var entityModel = mongoose.model(entityName);
	var query = entityModel.find({
		"externalCode.externalCode":{$in: externalCodesString},
		"externalCode.origin":{$in: origins}
	});

	populationFields.forEach(function(item){
		query.populate(item);
	});

	return query.exec();
}

var deleteByExternalCode = function(entityName, externalCode){
	var entityModel = mongoose.model(entityName);
	return entityModel.find({
		'externalCode.externalCode': externalCode.externalCode,
		'externalCode.origin': externalCode.origin
	}).remove().exec();
}

var nullPromise = function(){
	return Promise.resolve(null);
}

module.exports = {
	Driver,
	Vehicle,
	DirectionLeg,
	DeliveryPoint,
	Order,
	Route,
	DistributionCenter,
	findAll,
	findByExternalCode,
	findByExternalCodes,
	findByExternalCodeWithPopulationFields,
	findByExternalCodesWithPopulationFields,
	deleteByExternalCode,
	nullPromise
}
