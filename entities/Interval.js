var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Interval = sequelize.define('easy_interval', {
    uuid: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true
    },
    initialDate: {
      type: Sequelize.DATE,
      field: 'initial_date'
    },
    finalDate: {
      type: Sequelize.DATE,
      field: 'final_date'
    }
  }, {
    freezeTable: false // Model tableName will be the same as the model name
  });
  return Interval;
}