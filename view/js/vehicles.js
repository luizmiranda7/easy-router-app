function Vehicles(){

	var buildEntity = function(vehicleDetails){
		return {
			maxVelocity: vehicleDetails.down('.maxVelocity input').getValue(),
			costPerTime: vehicleDetails.down('.costPerTime input').getValue(),
			costPerDistance: vehicleDetails.down('.costPerDistance input').getValue(),
		    totalWeight: vehicleDetails.down('.totalWeight input').getValue(),
		    totalVolume: vehicleDetails.down('.totalVolume input').getValue(),
		    axes: vehicleDetails.down('.axes input').getValue(),
			endTime: new Date(vehicleDetails.down('.endTime input').getValue()),
			earliestStart: new Date(vehicleDetails.down('.earliestStart input').getValue()),
			latestEnd: new Date(vehicleDetails.down('.latestEnd input').getValue()),
		    type: vehicleDetails.down('.type input').getValue(),
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

