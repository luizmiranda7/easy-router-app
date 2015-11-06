var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
	codigoExterno: String,
	origem: String
});