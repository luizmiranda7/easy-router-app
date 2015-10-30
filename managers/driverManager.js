var e = require('../entities');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

var findAbleDrivers = function(distributionCenter){
	var distributionCenterUUID = distributionCenter.uuid;
	e.Route.findAll({
		include: [e.DistributionCenter],
		where:{
			status: {$ne: 'EXECUTED'},
			//distributionCenter.uuid: distributionCenterUUID
		}
	}).then(function(routes){
		var driversNotAble = [];
		routes.forEach(function(item, index){ driversNotAble.push(item.getDriver().uuid)});
		e.Driver.findAll({
			where:{
				uuid: {$notIn: driversNotAble}
			}
		}).then(function(drivers){
			return drivers;
		});
	});
}

module.exports = {
	findAbleDrivers
}