var mongoose = require('mongoose');

module.exports.isValid = function(timeWindow) {
    if(timeWindow.start || timeWindow.end){
        return timeWindow.start.isBefore(timeWindow.end);
    }
    return false;
};

module.exports.schema = new mongoose.Schema({
    start: Date,
    end: Date
});