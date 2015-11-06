var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  number: String,
  kilometer: String,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  externalCode: {type: mongoose.Schema.Types.ObjectId, ref: 'ExternalCode'}
});
