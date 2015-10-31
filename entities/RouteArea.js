var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var routeAreaSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  maxDistance: Number,
  routePoints: [{type: Schema.Types.ObjectId, ref: 'RoutePoint'}]
});

var RouteArea = mongoose.model('RouteArea', routeAreaSchema);

module.exports.RouteArea = RouteArea;