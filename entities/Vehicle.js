  var mongoose = require('mongoose');
  var ExternalCode = require('./ExternalCode');
  var Calendar = require('./Calendar');

  module.exports.schema = new mongoose.Schema({
    calendar: Calendar.schema,
    maxVelocity: Number,
    costPerTime: Number,
    costPerDistance: Number,
    totalWeight: Number,
    totalVolume: Number,
    axes: Number,
    endTime: Date,
    earliestStart: Date,
    latestEnd: Date,
    type: String,
    currentDistributionCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DistributionCenter'
    },
    externalCode: ExternalCode.schema
  });
