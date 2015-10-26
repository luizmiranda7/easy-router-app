var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('easy_address', {
    uuid: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true
    },
    number: { type: Sequelize.STRING },
    kilometer: { type: Sequelize.STRING },
    street: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    state: { type: Sequelize.STRING },
    postalCode: { 
      type: Sequelize.STRING,
      field: 'postal_code'
    }
  }, {
    freezeTable: false // Model tableName will be the same as the model name
  });
  return Address;
}