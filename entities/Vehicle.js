var mongoose = require('mongoose');
var ExternalCode = require('./ExternalCode');

module.exports.schema = new mongoose.Schema({
	costPerTime: Number,
	costPerDistance: Number,
    totalWeight: Number,
    totalVolume: Number,
    axes: Number,
    type: String,
    currentDistributionCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DistributionCenter'
    },
    externalCode: ExternalCode.schema
});