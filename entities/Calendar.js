var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easyrouter');

var calendarSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  intervals: [{initialDate: Date, finalDate: Date}]
});

var Calendar = mongoose.model('Calendar', calendarSchema);

module.exports.Calendar = Calendar;
