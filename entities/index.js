var mongoose = require('mongoose');

var calendarSchema = require('./Calendar');
var addressSchema = require('./Address');
var localSchema = require('./Local');
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
mongoose.connect('mongodb://localhost/easyrouter');

module.exports = {
	Address: mongoose.model('Address', addressSchema),
	Calendar: mongoose.model('Calendar', calendarSchema),
	Local: mongoose.model('Local', localSchema),
	Person: mongoose.model('Person', personSchema),
	Driver: mongoose.model('Driver', driverSchema),
	Vehicle: mongoose.model('Vehicle', vehicleSchema),
	RoutePoint: mongoose.model('RoutePoint', routePointSchema),
	DirectionLeg: mongoose.model('DirectionLeg', directionLegSchema),
	DeliveryPoint: mongoose.model('DeliveryPoint', deliveryPointSchema),
	Order: mongoose.model('Order', orderSchema),
	Route: mongoose.model('Route', routeSchema),
	RouteRequest: mongoose.model('RouteRequest', routeRequestSchema),
	RouteArea: mongoose.model('RouteArea', routeAreaSchema),
	DistributionCenter: mongoose.model('DistributionCenter', distributionCenterSchema)
}

mongoose.disconnect();