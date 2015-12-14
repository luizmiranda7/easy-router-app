var _ = require('underscore');
var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var orderManager = require('../managers/orderManager');


var initMethods = function(app){

	app.put('/orders', function(req, res){
		return orderManager.createOrUpdate(req.body);
	});

};

module.exports = {
	initMethods
};