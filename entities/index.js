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
	entities.Interval.belongsTo(entities.Calendar, {foreignKey: 'calendar_id'});

	entities.Driver.hasOne(entities.Person, {as: 'person', foreignKey: 'person_id'});
	entities.Driver.hasOne(entities.Calendar, {as: 'calendar', foreignKey: 'calendar_id'});
	entities.Driver.hasOne(entities.DistributionCenter, {as: 'currentDistributionCenter', foreignKey: 'curr_dist_center_id'});

	entities.RoutePoint.hasOne(entities.Address, {as: 'address', foreignKey: 'address_id'});
	entities.RoutePoint.hasOne(entities.Local, {as: 'local', foreignKey: 'local_id'});
	entities.RoutePoint.belongsTo(entities.Route, {foreignKey: 'route_id'});
	entities.RoutePoint.belongsTo(entities.RouteArea, {foreignKey: 'route_area_id'});

	entities.DirectionLeg.hasOne(entities.RoutePoint, {as: 'initialPoint', foreignKey: 'initial_point_id'});
	entities.DirectionLeg.hasOne(entities.RoutePoint, {as: 'finalPoint', foreignKey: 'final_point_id'});

	entities.DeliveryPoint.hasOne(entities.Calendar, {as: 'calendar', foreignKey: 'calendar_id'});
	entities.DeliveryPoint.hasOne(entities.RoutePoint, {as: 'routePoint', foreignKey: 'route_point_id'});

	entities.DistributionCenter.hasOne(entities.Calendar, {as: 'calendar', foreignKey: 'calendar_id'});
	entities.DistributionCenter.hasOne(entities.RoutePoint, {as: 'routePoint', foreignKey: 'route_point_id'});

	entities.Order.hasOne(entities.DeliveryPoint, {as: 'deliveryPoint', foreignKey: 'delivery_point_id'});
	entities.Order.belongsTo(entities.RouteRequest, {foreignKey: 'route_request_id'});

	entities.Route.hasOne(entities.DistributionCenter, {as: 'distributionCenter', foreignKey: 'dist_center_id'});
	entities.Route.hasOne(entities.Vehicle, {as: 'vehicle', foreignKey: 'vehicle_id'});
	entities.Route.hasMany(entities.RoutePoint, {as: 'routePoints'});

	entities.RouteRequest.hasMany(entities.Order, {as: 'orders'});
	entities.RouteRequest.hasOne(entities.DistributionCenter, {as: 'distributionCenter', foreignKey: 'dist_center_id'});

	entities.RouteArea.hasMany(entities.RoutePoint, {as: 'routePoints'});

})(module.exports)

// export connection
module.exports.sequelize = sequelize;