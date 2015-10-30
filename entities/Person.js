var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name'
    },
    birthdate: {
      type: Sequelize.DATE,
      field: 'birth_date'
    }
  }, {
    freezeTableName: false,
tableName: 'easy_person' // Model tableName will be the same as the model name
  });
  return Person;
}