var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var addressSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  number: String,
  kilometer: String,
  street: String,
  city: String,
  state: String,
  postalCode: String
});

var Address = mongoose.model('Address', addressSchema);

module.exports.Address = Address;