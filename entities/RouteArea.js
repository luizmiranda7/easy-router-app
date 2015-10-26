var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var RouteArea = sequelize.define('easy_route_area', {
    uuid: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true
    },
    maxDistance: {
    	type: Sequelize.INTEGER,
    	field: 'max_distance'
    }
  }, {
    freezeTable: false // Model tableName will be the same as the model name
  });
  return RouteArea;
}