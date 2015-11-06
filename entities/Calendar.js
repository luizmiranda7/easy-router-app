var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
  intervals: [{initialDate: Date, finalDate: Date}],
  codigoExterno: {type: mongoose.Schema.Types.ObjectId, ref: 'CodigoExterno'}
});