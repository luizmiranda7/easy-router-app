var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var Driver = sequelize.define('easy_driver', {
	  uuid: {
	    type: Sequelize.UUID,
	    unique: true,
	    primaryKey: true
	  }
	}, {
	  freezeTable: false // Model tableName will be the same as the model name
	});
	return Driver;
}