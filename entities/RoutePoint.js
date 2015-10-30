var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var RoutePoint = sequelize.define('RoutePoint', {
	  uuid: {
	    type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
	    unique: true,
	    primaryKey: true
	  }
	}, {
	  freezeTableName: false,
tableName: 'easy_route_point' // Model tableName will be the same as the model name
	});
	return RoutePoint;
}