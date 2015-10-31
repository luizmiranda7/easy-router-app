var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var routePointSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  address: {type: Schema.Types.ObjectId, ref: 'Address'},
  local: {type: Schema.Types.ObjectId, ref: 'Local'}
});

var RoutePoint = mongoose.model('RoutePoint', routePointSchema);

module.exports.RoutePoint = RoutePoint;