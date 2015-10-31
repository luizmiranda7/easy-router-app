var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var directionLegSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  distance: Number,
  duration: Date,
  markedToUpdate: Date,
  lastTimeUpdate: Date,
  firstPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'},
  lastPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}
});

var DirectionLeg = mongoose.model('DirectionLeg', directionLegSchema);
mongoose.disconnect();

module.exports.DirectionLeg = DirectionLeg;