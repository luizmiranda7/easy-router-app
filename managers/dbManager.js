var entities = require('../entities');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

var initialize = function(){
	forceTableCreation();
}

var forceTableCreation = function(){
	// Force table creation
	entities.Calendar.sync({force: true}).then(function () {
		entities.Interval.sync({force: true}).then(function () {
			entities.Person.sync({force: true}).then(function () {
				entities.Driver.sync({force: true}).then(function () {
					entities.Address.sync({force: true}).then(function () {
						entities.Local.sync({force: true}).then(function () {
							entities.RoutePoint.sync({force: true}).then(function () {
								entities.DeliveryPoint.sync({force: true}).then(function () {
									entities.DistributionCenter.sync({force: true}).then(function () {
								entities.DirectionLeg.sync({force: true}).then(function () {});
								entities.RouteArea.sync({force: true}).then(function () {});
									entities.Order.sync({force: true}).then(function () {
										entities.RouteRequest.sync({force: true}).then(function () {});
											entities.Vehicle.sync({force: true}).then(function () {
												entities.Route.sync({force: true}).then(function () {});
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

module.exports = {
	initialize
};