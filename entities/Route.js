var mongoose = require('mongoose');
var TourActivity = require('./TourActivity');

module.exports.schema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  distance: Number,
  duration: Number,
  tax: Number,
  tourActivities: [TourActivity.schema],
  distributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'},
  vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
  driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
  status: {
    type: String,
    enum: ['PENDING', 'EXECUTED', 'SCHEDULED', 'CANCELED']
  }
});