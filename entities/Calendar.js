var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');


module.exports = function(sequelize, DataTypes) {
	var Calendar = sequelize.define('easy_calendar', {
	  uuid: {
	    type: Sequelize.UUID,
	    unique: true,
	    primaryKey: true
	  }
	}, {
	  freezeTable: false // Model tableName will be the same as the model name
	});
	return Calendar;
}