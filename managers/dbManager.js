var e = require('../entities');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

var initialize = function(){
	forceTableCreation();
}

var forceTableCreation = function(){
	// Force table creation
	e.Calendar.sync({force: true}).then(function () {
		e.Interval.sync({force: true}).then(function () {
			e.Address.sync({force: true}).then(function () {
				e.Local.sync({force: true}).then(function () {
					e.RoutePoint.sync({force: true}).then(function () {
						e.DeliveryPoint.sync({force: true}).then(function () {
							e.DistributionCenter.sync({force: true}).then(function () {
								e.Person.sync({force: true}).then(function () {
									e.Driver.sync({force: true}).then(function () {
									e.DirectionLeg.sync({force: true}).then(function () {});
									e.RouteArea.sync({force: true}).then(function () {});
									e.Order.sync({force: true}).then(function () {
										e.RouteRequest.sync({force: true}).then(function () {});
											e.Vehicle.sync({force: true}).then(function () {
												e.Route.sync({force: true}).then(function () {
													mockModel();
												});
											});
										});
									});
								});
							});
						});
					});
				});		
			});
		});
	});
}

var mockModel = function(){
	e.Route.create().then(function(route){
		e.Driver.create().then(function(driver){
			route.setDriver(driver);
			route.status='PENDING';
			e.DistributionCenter.create().then(function(distributionCenter){
				driver.setCurrentDistributionCenter(distributionCenter);
				route.setDistributionCenter(distributionCenter);
				driver.save().then(function(){});
				route.save().then(function(){});
			});
			route.save().then(function(){});
		});
	});
}

module.exports = {
	initialize,
	mockModel
};