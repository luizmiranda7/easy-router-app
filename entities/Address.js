var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('Address', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
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
    freezeTableName: false,
tableName: 'easy_address' // Model tableName will be the same as the model name
  });
  return Address;
}