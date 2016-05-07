function Drivers() {

	var buildEntity = function(driverDetails){
		return {
			person : {
				firstName: driverDetails.down('.firstName').getValue(),
				surName: driverDetails.down('.surName').getValue(),
				birthdate: driverDetails.down('.birthdate').getValue()
			},
			calendar: calendar.buildEntity(driverDetails.down('.calendar')),
			earliestStart: driverDetails.down('.earliestStart').getValue(),
			latestEnd: driverDetails.down('.latestEnd').getValue(),
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
