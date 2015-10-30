var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var Local = sequelize.define('Local', {
	  uuid: {
	    type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
	    unique: true,
	    primaryKey: true
	  },
	  latitude: { type: Sequelize.STRING },
	  longitude: { type: Sequelize.STRING }
	}, {
	  freezeTableName: false,
tableName: 'easy_local' // Model tableName will be the same as the model name
	});
	return Local;
}