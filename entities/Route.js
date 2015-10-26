var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Route = sequelize.define('easy_route', {
    uuid: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true
    },
    startDate: { 
      type: Sequelize.DATE,
      field: 'start_date'
    },
    endDate: { 
      type: Sequelize.DATE,
      field: 'end_date'
    },
    distance: { type: Sequelize.INTEGER },
    duration: { type: Sequelize.BIGINT },
    tax: { type: Sequelize.DOUBLE }
  }, {
    freezeTable: false // Model tableName will be the same as the model name
  });
  return Route;
}