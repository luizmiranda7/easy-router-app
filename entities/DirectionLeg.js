var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://easy:easy@localhost:5432/easyrouter');

module.exports = function(sequelize, DataTypes) {
  var DirectionLeg = sequelize.define('easy_direction_leg', {
    uuid: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true
    },
    distance: { type: Sequelize.INTEGER },
    duration: { type: Sequelize.DATE },
    markedToUpdate: { type: Sequelize.DATE },
    lastTimeUpdate: { type: Sequelize.DATE }
  }, {
    freezeTable: false
  });
  return DirectionLeg;
}