var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var DirectionLeg = sequelize.define('DirectionLeg', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true
    },
    distance: { type: Sequelize.INTEGER },
    duration: { type: Sequelize.DATE },
    markedToUpdate: { type: Sequelize.DATE },
    lastTimeUpdate: { type: Sequelize.DATE }
  }, {
    freezeTableName: false,
tableName: 'easy_direction_leg'
  });
  return DirectionLeg;
}