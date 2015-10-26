var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
	var DistributionCenter = sequelize.define('easy_dist_center', {
		uuid: {
			type: Sequelize.UUID,
			unique: true,
			primaryKey: true
		},
		name: { type: Sequelize.STRING },
		prepareDuration: { type: Sequelize.INTEGER }
	}, {
	  freezeTable: false // Model tableName will be the same as the model name
	});
	return DistributionCenter;
}
