var mongoose = require('mongoose');

module.exports.addressSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  number: String,
  kilometer: String,
  street: String,
  city: String,
  state: String,
  postalCode: String
});
