var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var DeliveryPoint = sequelize.define('DeliveryPoint', {
    uuid: { 
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, 
      unique: true, 
      primaryKey: true 
    },
    name: { type: Sequelize.STRING },
    deliveryDuration: { type: Sequelize.INTEGER, field: 'delivery_duration' }
  }, {
    freezeTableName: false,
tableName: 'easy_delivery_point' // Model tableName will be the same as the model name
  });
  return DeliveryPoint;
}