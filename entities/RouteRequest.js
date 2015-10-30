var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var RouteRequest = sequelize.define('RouteRequest', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true
    },
    requestedDate: {
    	type: Sequelize.DATE,
    	field: 'requested_date'
    }
  }, {
    freezeTableName: false,
tableName: 'easy_route_request' // Model tableName will be the same as the model name
  });
  return RouteRequest;
}