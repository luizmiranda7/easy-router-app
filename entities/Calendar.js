var mongoose = require('mongoose');
var TimeWindow = require('./TimeWindow');

module.exports.schema = new mongoose.Schema({
    timeWindows: [{
    timeWindow: TimeWindow.schema,
    cause: {
        type: String,
        enum: ['PERSONAL', 'WORKING']
    },
  }]
});