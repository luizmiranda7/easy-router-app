var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var routeRequestSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  requestedDate: Date
  routePoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}]
});

var RouteRequest = mongoose.model('RouteRequest', routeRequestSchema);
mongoose.disconnect();

module.exports.RouteRequest = RouteRequest;