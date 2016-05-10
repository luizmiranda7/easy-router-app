function Vehicles(){

	var buildEntity = function(vehicleDetails){
		return {
			calendar: calendars.buildEntity(vehicleDetails),
			distributionCenter: JSON.parse(jQuery(vehicleDetails.down('.distributionCenter .selectpicker option:selected')).val()),
			maxVelocity: vehicleDetails.down('.maxVelocity input').getValue(),
			costPerTime: vehicleDetails.down('.costPerTime').getValue(),
			costPerDistance: vehicleDetails.down('.costPerDistance').getValue(),
			totalWeight: vehicleDetails.down('.totalWeight').getValue(),
			totalVolume: vehicleDetails.down('.totalVolume').getValue(),
			axes: vehicleDetails.down('.axes').getValue(),
			endTime: vehicleDetails.down('.endTime input').getValue(),
			earliestStart: vehicleDetails.down('.earliestStart').getValue(),
			latestEnd: vehicleDetails.down('.latestEnd').getValue(),
			type: vehicleDetails.down('.type').getValue(),
			externalCode: {
				externalCode: vehicleDetails.down('.externalCode').getValue(),
				origin: vehicleDetails.down('.origin').getValue()
			}
		};
	};

	return {
		buildEntity: buildEntity
	};

};

var vehicles = new Vehicles();
