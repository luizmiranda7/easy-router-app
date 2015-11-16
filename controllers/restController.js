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

var findEntityByExternalCode = function(entityName, externalCode){
	return e.ExternalCode.find({externalCode: externalCode.externalCode, origin: externalCode.origin})
	.exec()
	.then(function(attachedExternalCode){
		if(attachedExternalCode.length > 0){
			return entityModel.find({externalCode: attachedExternalCode._id});
		}
		return Promise.resolve(null);
	})
	.catch(function(err){
		console.log(err);
	});
}

module.exports = {
	initMethods
}
