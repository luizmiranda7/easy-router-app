var mongoose = require('mongoose');
var TimeWindow = require('./TimeWindow');

module.exports.schema = new mongoose.Schema({
    timeWindows: [
      TimeWindow.schema
    ]
});
