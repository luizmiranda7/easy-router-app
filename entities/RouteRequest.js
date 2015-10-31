var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var routeRequestSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  requestedDate: Date
  routePoints: [{type: Schema.Types.ObjectId, ref: 'RoutePoint'}]
});

var RouteRequest = mongoose.model('RouteRequest', routeRequestSchema);

module.exports.RouteRequest = RouteRequest;