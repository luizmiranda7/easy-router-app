var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var RouteRequest = sequelize.define('easy_route_request', {
    uuid: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true
    },
    requestedDate: {
    	type: Sequelize.DATE,
    	field: 'requested_date'
    }
  }, {
    freezeTable: false // Model tableName will be the same as the model name
  });
  return RouteRequest;
}