var mongoose = require('mongoose');

module.exports.schema = new mongoose.Schema({
	externalCode: String,
	origin: String
});
