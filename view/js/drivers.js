function Drivers() {

	var buildEntity = function(driverDetails){
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
		buildEntity: buildEntity
	};

};

var drivers = new Drivers();
