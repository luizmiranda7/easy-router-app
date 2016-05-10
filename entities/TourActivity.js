var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    type: {
        type: String,
        enum: ['PICKUP', 'DELIVER']
    }
});