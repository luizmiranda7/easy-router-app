var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

// load models
var models = ['Address', 'Calendar', 'Interval', 'Local', 'Person', 'Driver', 'Vehicle', 'RoutePoint',
'DirectionLeg', 'DeliveryPoint', 'Order', 'Route', 'RouteRequest', 'RouteArea', 'DistributionCenter'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(model);
});

(function(entities){
	entities.Calendar.hasMany(entities.Interval, {as: 'intervals'});

	entities.Driver.belongsTo(entities.Person, {foreignKey: 'person_id'});
	entities.Driver.belongsTo(entities.Calendar, {foreignKey: 'calendar_id'});
	entities.Driver.belongsTo(entities.DistributionCenter, {as: 'currentDistributionCenter', foreignKey: 'curr_dist_center_id'});

	entities.RoutePoint.belongsTo(entities.Address, {foreignKey: 'address_id'});
	entities.RoutePoint.belongsTo(entities.Local, {foreignKey: 'local_id'});

	entities.DeliveryPoint.belongsTo(entities.Calendar, {foreignKey: 'calendar_id'});
	entities.DeliveryPoint.belongsTo(entities.RoutePoint, {foreignKey: 'route_point_id'});

	entities.DistributionCenter.belongsTo(entities.Calendar, {foreignKey: 'calendar_id'});
	entities.DistributionCenter.belongsTo(entities.RoutePoint, {foreignKey: 'route_point_id'});

	entities.DirectionLeg.belongsTo(entities.RoutePoint, {as: 'initialPoint', foreignKey: 'initial_point_id'});
	entities.DirectionLeg.belongsTo(entities.RoutePoint, {as: 'finalPoint', foreignKey: 'final_point_id'});

	entities.Order.belongsTo(entities.DeliveryPoint, {foreignKey: 'delivery_point_id'});
	entities.Order.belongsTo(entities.DistributionCenter, {foreignKey: 'dist_center_id'});

	entities.Route.belongsTo(entities.DistributionCenter, {foreignKey: 'dist_center_id'});
	entities.Route.belongsTo(entities.Vehicle, {foreignKey: 'vehicle_id'});
	entities.Route.belongsTo(entities.Driver, {foreignKey: 'driver_id'});
	
	entities.RouteRequest.belongsTo(entities.DistributionCenter, {foreignKey: 'dist_center_id'});
	entities.DistributionCenter.hasOne(entities.RouteRequest);
	
	// Route n:m Order
	entities.Route.belongsToMany(entities.Order, {through: 'route_order'});
	entities.Order.belongsToMany(entities.Route, {through: 'route_order'});

	// RouteRequest n:m Order
	entities.RouteRequest.belongsToMany(entities.RoutePoint, {through:'route_request_point'});
	entities.RoutePoint.belongsToMany(entities.RouteRequest, {through: 'route_request_point'});	

	// RouteArea n:m RoutePoint
	entities.RouteArea.belongsToMany(entities.RoutePoint, {through:'route_area_point'});
	entities.RoutePoint.belongsToMany(entities.RouteArea, {through:'route_area_point'});

})(module.exports)

// export connection
module.exports.sequelize = sequelize;