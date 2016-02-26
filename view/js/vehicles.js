function Vehicles(){


	var buildVehicle = function(vehicleDetails){
		return {
			maxVelocity: vehicleDetails.down('.maxVelocity input').getValue(),
			costPerTime: vehicleDetails.down('.costPerTime input').getValue(),
			costPerDistance: vehicleDetails.down('.costPerDistance input').getValue(),
		    totalWeight: vehicleDetails.down('.totalWeight input').getValue(),
		    totalVolume: vehicleDetails.down('.totalVolume input').getValue(),
		    axes: vehicleDetails.down('.axes input').getValue(),
			endTime: vehicleDetails.down('.endTime input').getValue(),
			earliestStart: vehicleDetails.down('.earliestStart input').getValue(),
			latestEnd: vehicleDetails.down('.latestEnd input').getValue(),
		    type: vehicleDetails.down('.type input').getValue(),
			externalCode: {
				externalCode: vehicleDetails.down('.externalCode').getValue(),
				origin: vehicleDetails.down('.origin').getValue()
			}
		};
	};

	return {
		remove: remove,
		save: save,
		buildVehicle: buildVehicle
	};

};

var vehicles = new Vehicles();

