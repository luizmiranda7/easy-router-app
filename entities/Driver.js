var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var driverSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  personid: Schema.Types.ObjectId,
  calendarid: Schema.Types.ObjectId,
  person: {type: Schema.Types.ObjectId, ref: 'Person'},
  calendar: {type: Schema.Types.ObjectId, ref: 'Calendar'}
});

var Driver = mongoose.model('Driver', driverSchema);

module.exports.Driver = Driver;