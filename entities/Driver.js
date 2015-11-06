var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
  calendar: {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'},
  codigoExterno: {type: mongoose.Schema.Types.ObjectId, ref: 'CodigoExterno'}
});