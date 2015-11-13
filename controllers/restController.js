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

	app.put('/saveExternalEntity', function(req, res){
		var entityModel = mongoose.model(req.headers.entityname);
		findEntityByExternalCode(entityModel, req.body.externalCode)
		.then(function(entity){
			if(!entity){
				return entityModel.create(req.body);
			}
			return entity.save();
		})
		.then(function(entity){
			res.send(entity);
		})
		.catch(function(err){
			console.log(err);
		});
	});

};

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
