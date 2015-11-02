var mongoose = require('mongoose');

module.exports.personSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  surName: String,
  birthdate: Date
});