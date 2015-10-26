var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var Local = sequelize.define('easy_local', {
	  uuid: {
	    type: Sequelize.UUID,
	    unique: true,
	    primaryKey: true
	  },
	  latitude: { type: Sequelize.STRING },
	  longitude: { type: Sequelize.STRING }
	}, {
	  freezeTable: false // Model tableName will be the same as the model name
	});
	return Local;
}