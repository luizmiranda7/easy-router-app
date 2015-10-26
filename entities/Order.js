var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('easy_order', {
    uuid: {
      type: Sequelize.UUID,
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
    freezeTable: false // Model tableName will be the same as the model name
  });
  return Order;
}