var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  firstName: String,
  surName: String,
  birthdate: Date,
  externalCode: {type: mongoose.Schema.Types.ObjectId, ref: 'ExternalCode'}
});