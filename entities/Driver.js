var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var driverSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  personid: mongoose.Schema.Types.ObjectId,
  calendarid: mongoose.Schema.Types.ObjectId,
  person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'}
});

var Driver = mongoose.model('Driver', driverSchema);
mongoose.disconnect();

module.exports.Driver = Driver;