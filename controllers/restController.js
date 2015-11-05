var e = require('../entities');

var initMethods = function(app){

	app.put('/addAddress', function (req, res) {
		e.Address.create(req.body, function(err, savedAddress){
			if (err) return err;
			res.send(savedAddress);
		});
	});

	app.get('/getAddress/:postalCode', function (req, res) {
		var address = e.Address.findOne({ 'postalCode': req.params.postalCode }).exec(function (err, address) {
			if (err) return err;
			res.send(address);
		});
	});

	app.put('/createDriver', function (req, res) {
		e.Person.create(req.body.person, function(err, person){
			if (err) return err;
			e.Calendar.create(req.body.calendar, function(err, calendar){
				if (err) return err;
				e.Driver.create({'person': person, 'calendar': calendar}, function(err, driver){
					if (err) return err;
					res.send(driver)
				});
			});
		});
	});
};

module.exports = {
	initMethods
}