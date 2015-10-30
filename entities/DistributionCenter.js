var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var DistributionCenter = sequelize.define('DistributionCenter', {
		uuid: {
			type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
			unique: true,
			primaryKey: true
		},
		name: { type: Sequelize.STRING },
		prepareDuration: { type: Sequelize.INTEGER }
	}, {
	  freezeTableName: false,
	tableName: 'easy_dist_center' // Model tableName will be the same as the model name
	});
	return DistributionCenter;
}
