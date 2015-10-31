var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var personSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  surName: String,
  birthdate: Date
});

var Person = mongoose.model('Person', personSchema);
mongoose.disconnect();

module.exports.Person = Person;