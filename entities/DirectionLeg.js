var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var directionLegSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  distance: Number,
  duration: Date,
  markedToUpdate: Date,
  lastTimeUpdate: Date,
  firstPoint: {type: Schema.Types.ObjectId, ref: 'RoutePoint'},
  lastPoint: {type: Schema.Types.ObjectId, ref: 'RoutePoint'}
});

var DirectionLeg = mongoose.model('DirectionLeg', directionLegSchema);

module.exports.DirectionLeg = DirectionLeg;