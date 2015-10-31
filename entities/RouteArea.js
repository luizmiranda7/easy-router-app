var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var routeAreaSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  maxDistance: Number,
  routePoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'RoutePoint'}]
});

var RouteArea = mongoose.model('RouteArea', routeAreaSchema);
mongoose.disconnect();

module.exports.RouteArea = RouteArea;