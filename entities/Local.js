var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var localSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  latitude: String,
  longitude: String
});

var Local = mongoose.model('Local', localSchema);
mongoose.disconnect();

module.exports.Local = Local;