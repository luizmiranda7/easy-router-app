var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
    start: Date,
    end: Date,
    cause: {
        type: String,
        enum: ['PERSONAL', 'WORKING', 'MAINTENANCE']
    }
});
