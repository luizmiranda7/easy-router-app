var mongoose = require('mongoose');

module.exports.driverSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  personid: mongoose.Schema.Types.ObjectId,
  calendarid: mongoose.Schema.Types.ObjectId,
  person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'}
});