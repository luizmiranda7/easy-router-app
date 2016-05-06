var mongoose = require('mongoose');
var Promise = require('bluebird');mongoose.Promise = Promise;

var Driver = mongoose.model('Driver', require('./Driver').schema);
var Vehicle = mongoose.model('Vehicle', require('./Vehicle').schema);
var DirectionLeg = mongoose.model('DirectionLeg', require('./DirectionLeg').schema);
var DeliveryPoint = mongoose.model('DeliveryPoint', require('./DeliveryPoint').schema);
var Order = mongoose.model('Order', require('./Order').schema);
var Route = mongoose.model('Route', require('./Route').schema);
var DistributionCenter = mongoose.model('DistributionCenter', require('./DistributionCenter').schema);

var findAll = function(entityName){
	var entityModel = mongoose.model(entityName);
	return entityModel.find({}).exec();
};

var findByExternalCode = function(entityName, externalCode){
	return findByExternalCodeWithPopulationFields(entityName, externalCode, []);
};

var findByExternalCodes = function(entityName, externalCodes){
	return findByExternalCodesWithPopulationFields(entityName, externalCodes, []);
};

var findByExternalCodeWithPopulationFields = function(entityName, externalCode, populationFields){
	return findByExternalCodesWithPopulationFields(entityName, [externalCode], [])
		.then(function(entitites){
			return entitites.pop();
		});
};

var findByExternalCodesWithPopulationFields = function(entityName, externalCodes, populationFields){
	if(externalCodes.length == 0){
		return Promise.resolve(null);
	}

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
};

var findByRoutePointExternalCode = function(entityName, routePointExternalCode){
	if(Object.keys(routePointExternalCode).length == 0)
		return Promise.resolve(null);

	return mongoose.model(entityName).findOne({
		"routePoint.externalCode.externalCode": routePointExternalCode.externalCode,
		"routePoint.externalCode.origin": routePointExternalCode.origin
	}).exec();
};

var createOrUpdate = function(entityName, json, updateFunction) {
	if(!json){
		return nullPromise();
	}

	return findByExternalCode(entityName, json.externalCode)
		.then(function(entity) {
			if (entity) {
				return updateFunction(entity, json);
			}

			var entityModel = mongoose.model(entityName);
			return updateFunction(new entityModel({
				externalCode: externalCodeManager.generateExternalCode()
			}), json);
		});
};

var deleteByExternalCode = function(entityName, externalCode){
	var entityModel = mongoose.model(entityName);
	return entityModel.find({
		'externalCode.externalCode': externalCode.externalCode,
		'externalCode.origin': externalCode.origin
	}).remove().exec();
};

var nullPromise = function(){
	return Promise.resolve(null);
};

module.exports = {
	Driver: Driver,
	Vehicle: Vehicle,
	DirectionLeg: DirectionLeg,
	DeliveryPoint: DeliveryPoint,
	Order: Order,
	Route: Route,
	DistributionCenter: DistributionCenter,

	findAll: findAll,
	findByExternalCode: findByExternalCode,
	findByExternalCodes: findByExternalCodes,
	findByExternalCodeWithPopulationFields: findByExternalCodeWithPopulationFields,
	findByExternalCodesWithPopulationFields: findByExternalCodesWithPopulationFields,
	findByRoutePointExternalCode: findByRoutePointExternalCode,
	createOrUpdate: createOrUpdate,
	deleteByExternalCode: deleteByExternalCode,
	nullPromise: nullPromise
}
