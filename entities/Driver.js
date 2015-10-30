var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var Driver = sequelize.define('Driver', {
	  uuid: {
	    type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
	    unique: true,
	    primaryKey: true
	  }
	}, {
	  freezeTableName: false,
tableName: 'easy_driver' // Model tableName will be the same as the model name
	});
	return Driver;
}