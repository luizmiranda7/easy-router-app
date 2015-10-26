var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var Vehicle = sequelize.define('easy_vehicle', {
	  uuid: {
	    type: Sequelize.UUID,
	    unique: true,
	    primaryKey: true
	  },	
	  totalWeight: { type: Sequelize.BIGINT },
	  totalVolume: { type: Sequelize.BIGINT },
	  axes: { type: Sequelize.INTEGER }
	}, {
	  freezeTable: false // Model tableName will be the same as the model name
	});
	return Vehicle;
}