var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  distance: Number,
  duration: Number,
  tax: Number,
  status: {
    type: String,
    enum: ['EXECUTED', 'SCHEDULED', 'CANCELED']
  },
  //tourActivities: [TourActivity.schema],
  distributionCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'DistributionCenter'},
  vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
  driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'}
});