var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
    start: Date,
    end: Date
});

module.exports.isValid = function(timeWindow){
    return true;
}