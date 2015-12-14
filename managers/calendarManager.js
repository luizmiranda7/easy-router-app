var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var createOrUpdate = function(json){
  return e.findByExternalCode('Calendar', json.externalCode)
  .then(function(calendar){
    if (calendar) {
      return update(calendar, json);
    }
    return update(new e.Calendar({}), json);
  });
}

var update = function(calendar, json){

	if(json.intervals){
		calendar.intervals = json.intervals;
	}

	if(json.externalCode){
		calendar.externalCode = json.externalCode;
	}

	calendar.save();
	return calendar;
}

module.exports = {
	createOrUpdate
}