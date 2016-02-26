function DeliveryPoints() {

	var buildEntity = function(deliveryPointDetails){
		return {
			name: deliveryPointDetails.down('.name input').getValue(),
			deliveryDuration: deliveryPointDetails.down('.deliveryDuration input').getValue(),
			routePoint: JSON.parse(deliveryPointDetails.down('.address .routePoint').getValue()),
			externalCode: {
				externalCode: deliveryPointDetails.down('.externalCode').getValue(),
				origin: deliveryPointDetails.down('.origin').getValue()
			}
		};
	};

	return {
		buildEntity: buildEntity
	};

};

var deliveryPoints = new DeliveryPoints();

