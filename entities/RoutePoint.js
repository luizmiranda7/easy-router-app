var mongoose = require('mongoose');

module.exports.routePointSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
  local: {type: mongoose.Schema.Types.ObjectId, ref: 'Local'}
});