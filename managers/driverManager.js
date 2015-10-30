var e = require('../entities');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

var findAbleDrivers = function(DistributionCenter distributionCenter){
	return e.Driver.findAll({
		include: [ DistributionCenter, {
	        model: e.Route,
	        where: { 
	        	driver_id: Sequelize.col('driver.uuid'),
	        	status: 'EXECUTED'	
        	}
	    }],
	   	where: {
	   		DistributionCenter: distributionCenter
	   	}
	}).then(function(drivers){return drivers});
}