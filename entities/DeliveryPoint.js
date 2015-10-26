var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var DeliveryPoint = sequelize.define('easy_delivery_point', {
    uuid: { 
      type: Sequelize.UUID, 
      unique: true, 
      primaryKey: true 
    },
    name: { type: Sequelize.STRING },
    deliveryDuration: { type: Sequelize.INTEGER, field: 'delivery_duration' }
  }, {
    freezeTable: false // Model tableName will be the same as the model name
  });
  return DeliveryPoint;
}