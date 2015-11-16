var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var initMethods = function(app){

	app.put('/orders', function(req, res){
		findEntityByExternalCode('Body', req.body.externalCode)
		.then(function(order){
			if(order){
				return orderManager.updateOrder(order, req.body);
			}
			return orderManager.createOrder(req.body);
		})
	});

module.exports = {
	initMethods
}
