var _ = require('underscore');
var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var initMethods = function(app){

	app.put('/orders', function(req, res){
		findEntityByExternalCode('Body', req.body.externalCode)
		.then((order) => {
			if(order){
				return orderManager.updateOrder(order, req.body);
			}
			return orderManager.createOrder(req.body);
		})
	});

	app.get('/id', (req, res) => {
		var entityName = req.headers.entity;
		var id = req.headers.id;
		findEntityById(entityName, id)
		.then((entity) => {
			res.send(entity);
		})
		.catch((err) => {
			res.send(err);
		});
	});

	app.put('/updateExternalEntity', (req, res) => {
		var json = req.body;
		var entityName = req.headers.entity;
		var entityModel = mongoose.model(entityName);
		if(json.externalCode){
			findByExternalCode(entityName, json.externalCode)
			.then((entity) =>{
				if(!entity){
					entity = new entityModel(json);
				}
				entity = _.extend(json, entity);
				return entity.save();
			})
			.then((entity) => {
				res.send(entity);
			})
			.catch((err) => {
				res.send(err);
			});
		}
	});
};

var findByExternalCode = function(entityName, externalCode){
	var entityModel = mongoose.model(entityName);
	return entityModel.findOne({
		"externalCode.externalCode": externalCode.externalCode,
		"externalCode.origin": externalCode.origin
	})
	.exec();
};

var findEntityById = function(entityName, id){
	var entityModel = mongoose.model(entityName);
	return entityModel.findById(id)
	.exec();
}

module.exports = {
	initMethods
};