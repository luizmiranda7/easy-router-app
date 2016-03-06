var S = require('string');
var uuid = require('node-uuid');
var mainConfig = require('../configurations/mainConfig');

var generateExternalCode = function(){
	return {
		externalCode: uuid.v4(),
		origin: mainConfig.localOrigin
	};
}

var isValid = function(externalCode){
	if(externalCode){
		return !S(externalCode.externalCode).isEmpty() //
			&& !S(externalCode.origin).isEmpty();
	}
	return false;
}

module.exports = {
	generateExternalCode,
	isValid
};