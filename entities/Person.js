var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var personSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  firstName: String,
  surName: String,
  birthdate: Date
});

var Person = mongoose.model('Person', personSchema);

module.exports.Person = Person;