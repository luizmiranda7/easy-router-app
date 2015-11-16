var mongoose = require('mongoose');

var calendarSchema = require('./Calendar');
var addressSchema = require('./Address');
var personSchema = require('./Person');
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
var externalCode = require('./ExternalCode');

var Address = mongoose.model('Address', addressSchema.schema);
var Calendar = mongoose.model('Calendar', calendarSchema.schema);
var Local = mongoose.model('Local', localSchema.schema);
var Person = mongoose.model('Person', personSchema.schema);
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
var ExternalCode = mongoose.model('ExternalCode', externalCode.schema);

var findEntityByExternalCode = function(entityName, externalCode){
	return e.ExternalCode.find({externalCode: externalCode.externalCode, origin: externalCode.origin})
	.exec()
	.then(function(attachedExternalCode){
		if(attachedExternalCode.length > 0){
			return entityModel.find({externalCode: attachedExternalCode._id});
		}
		return Promise.resolve(null);
	})
	.catch(function(err){
		console.log(err);
	});
};

module.exports = {
	Address,
	Calendar,
	Local,
	Person,
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
	ExternalCode,
	findEntityByExternalCode
}
