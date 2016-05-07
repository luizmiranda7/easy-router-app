var e = require('../entities');
var externalCodeManager = require('./externalCodeManager');

var update = function(driver, json) {

    if(json.person){
        if(!driver.person){
            driver.person = {
                externalCode: externalCodeManager.generateExternalCode()
            };
        }

        if (json.person.firstName) {
            driver.person.firstName = json.person.firstName;
        }

        if (json.person.surName) {
            driver.person.surName = json.person.surName;
        }

        if (json.person.birthdate) {
            driver.person.birthdate = new Date(json.person.birthdate);
        }

        if(externalCodeManager.isValid(json.person.externalCode)) {
            driver.person.externalCode = json.person.externalCode;
        }
    }

    if(json.earliestStart){ 
        driver.earliestStart = json.earliestStart;
    }

    if(json.latestEnd){
        driver.latestEnd = json.latestEnd;
    }

    if(externalCodeManager.isValid(json.externalCode)) {
        driver.externalCode = json.externalCode;
    }

    if (json.calendar) {
        driver.calendar = json.calendar;
    }

    return driver.save();
};

var getAvailableDrivers = function(){
    var now = new Date();
    return e.Driver.find({
        'calendar.intervals.finalDate' : { $lt: now }
    }).exec();
};

module.exports = {
    update: update,
    getAvailableDrivers: getAvailableDrivers
};