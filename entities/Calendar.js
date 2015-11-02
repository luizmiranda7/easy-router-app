var mongoose = require('mongoose');

module.exports.calendarSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  intervals: [{initialDate: Date, finalDate: Date}]
});