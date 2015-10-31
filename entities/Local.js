var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var localSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  latitude: String,
  longitude: String
});

var Local = mongoose.model('Local', localSchema);

module.exports.Local = Local;