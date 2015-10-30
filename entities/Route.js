var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Route = sequelize.define('Route', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
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
    tax: { type: Sequelize.DOUBLE },
    status: {
      type: Sequelize.ENUM,
      values: ['EXECUTED', 'PENDING', 'CANCELED']
    }
  }, {
    freezeTableName: false,
tableName: 'easy_route' // Model tableName will be the same as the model name
  });
  return Route;
}