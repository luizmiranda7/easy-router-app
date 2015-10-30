var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Interval = sequelize.define('Interval', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
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
    freezeTableName: false,
tableName: 'easy_interval' // Model tableName will be the same as the model name
  });
  return Interval;
}