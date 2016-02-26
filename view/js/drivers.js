var drivers;
if (!drivers) drivers = (function() {

	var REQUESTS = null;

	var remove = function(button){
		jQuery.ajax({
			type: 'POST',
			beforeSend: function (request)
            {
                request.setRequestHeader("del", true);
            },
			data: JSON.stringify(getExternalCode(button.up('.driver'))),
	        contentType: 'application/json',
            url: '/rest/drivers',						
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var save = function(button){
		var self = this;
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(self.buildDriver(button.up("#driverDetails"))),
	        contentType: 'application/json',
            url: '/rest/drivers',		
            success: function(data) {
                window.location.reload(false);
            }
        });
	};



	var buildDriver = function(driverDetails){
		return {
			earliestStart: driverDetails.down('.earliestStart input').getValue(),
			latestEnd: driverDetails.down('.latestEnd input').getValue(),
			person : {
				firstName: driverDetails.down('.firstName input').getValue(),
				surName: driverDetails.down('.surName input').getValue(),
				birthdate: driverDetails.down('.birthdate input').getValue()
			},
			externalCode: {
				externalCode: driverDetails.down('.externalCode').getValue(),
				origin: driverDetails.down('.origin').getValue()
			}
		};
	};

	return {
		remove: remove,
		save: save,
		buildDriver: buildDriver
	};

})();

