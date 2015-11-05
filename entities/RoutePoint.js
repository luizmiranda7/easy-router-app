var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
  local: {type: mongoose.Schema.Types.ObjectId, ref: 'Local'}
});