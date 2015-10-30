var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true
    },
    priorityLevel: { 
    	type: Sequelize.INTEGER,
    	field: 'priority_level'
    },
    weight: { type: Sequelize.INTEGER },
    deadline: { type: Sequelize.DATE },
    delivered: { type: Sequelize.BOOLEAN }
  }, {
    freezeTableName: false,
tableName: 'easy_order' // Model tableName will be the same as the model name
  });
  return Order;
}