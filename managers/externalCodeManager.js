var uuid = require('node-uuid');
var mainConfig = require('../configurations/mainConfig');

var generateExternalCode = function(){
	return {
		externalCode: uuid.v4(),
		origin: mainConfig.localOrigin
	};
}

module.exports = {
	generateExternalCode
};