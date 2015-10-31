var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var routePointSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
  local: {type: mongoose.Schema.Types.ObjectId, ref: 'Local'}
});

var RoutePoint = mongoose.model('RoutePoint', routePointSchema);
mongoose.disconnect();

module.exports.RoutePoint = RoutePoint;