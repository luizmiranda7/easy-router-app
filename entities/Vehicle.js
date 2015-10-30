var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var Vehicle = sequelize.define('Vehicle', {
	  uuid: {
	    type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
	    unique: true,
	    primaryKey: true
	  },	
	  totalWeight: { type: Sequelize.BIGINT },
	  totalVolume: { type: Sequelize.BIGINT },
	  axes: { type: Sequelize.INTEGER }
	}, {
	  freezeTableName: false,
	tableName: 'easy_vehicle' // Model tableName will be the same as the model name
	});
	return Vehicle;
}