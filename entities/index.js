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

	entities.Driver.belongsTo(entities.Person, {as: 'person', foreignKey: 'person_id'});
	entities.Driver.belongsTo(entities.Calendar, {as: 'calendar', foreignKey: 'calendar_id'});
	entities.Driver.belongsTo(entities.DistributionCenter, {as: 'currentDistributionCenter', foreignKey: 'curr_dist_center_id'});

	entities.RoutePoint.belongsTo(entities.Address, {as: 'address', foreignKey: 'address_id'});
	entities.RoutePoint.belongsTo(entities.Local, {as: 'local', foreignKey: 'local_id'});

	entities.DeliveryPoint.belongsTo(entities.Calendar, {as: 'calendar', foreignKey: 'calendar_id'});
	entities.DeliveryPoint.belongsTo(entities.RoutePoint, {as: 'routePoint', foreignKey: 'route_point_id'});

	entities.DistributionCenter.belongsTo(entities.Calendar, {as: 'calendar', foreignKey: 'calendar_id'});
	entities.DistributionCenter.belongsTo(entities.RoutePoint, {as: 'routePoint', foreignKey: 'route_point_id'});

	entities.DirectionLeg.belongsTo(entities.RoutePoint, {as: 'initialPoint', foreignKey: 'initial_point_id'});
	entities.DirectionLeg.belongsTo(entities.RoutePoint, {as: 'finalPoint', foreignKey: 'final_point_id'});

	entities.Order.belongsTo(entities.DeliveryPoint, {as: 'deliveryPoint', foreignKey: 'delivery_point_id'});
	entities.Order.belongsTo(entities.DistributionCenter, {as: 'distributionCenter', foreignKey: 'distributionCenter'});

	entities.Route.belongsTo(entities.DistributionCenter, {as: 'distributionCenter', foreignKey: 'dist_center_id'});
	entities.Route.belongsTo(entities.Vehicle, {as: 'vehicle', foreignKey: 'vehicle_id'});
	
	entities.RouteRequest.belongsTo(entities.DistributionCenter, {as: 'distributionCenter', foreignKey: 'dist_center_id'});
	
	// Route n:m Order
	entities.Route.belongsToMany(entities.Order, {as: 'orders', through: 'RouteOrder'});
	entities.Order.belongsToMany(entities.Route, {as: 'routes', through: 'RouteOrder'});

	// RouteRequest n:m Order
	entities.RouteRequest.belongsToMany(entities.Order, {as: 'orders', through:'RouteRequestOrder'});
	entities.Order.belongsToMany(entities.RouteRequest, {as: 'routeRequests', through: 'RouteOrder'});	

	// RouteArea n:m RoutePoint
	entities.RouteArea.belongsToMany(entities.RoutePoint, {as: 'routePoints', through:'RouteAreaPoint'});
	entities.RoutePoint.belongsToMany(entities.RouteArea, {as: 'routeAreas', through:'RouteAreaPoint'});

})(module.exports)

// export connection
module.exports.sequelize = sequelize;