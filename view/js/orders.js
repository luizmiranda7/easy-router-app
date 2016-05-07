function Orders() {

	var buildEntity = function(orderDetails){
		return {
			deliveryPoint: JSON.parse(jQuery(orderDetails.down('.deliveryPoint .selectpicker option:selected')).val()),
			distributionCenter: JSON.parse(jQuery(orderDetails.down('.distributionCenter .selectpicker option:selected')).val()),
			priorityLevel: orderDetails.down('.priorityLevel').getValue(),
			weight: orderDetails.down('.weight').getValue(),
			volume: orderDetails.down('.volume').getValue(),
		    penalty: orderDetails.down('.penalty').getValue(),
			deliverTimeWindow: {
				start: orderDetails.down('.deliverTimeWindow .start').getValue(),
				end: orderDetails.down('.deliverTimeWindow .end').getValue()
			},
			pickupTimeWindow: {
				start: orderDetails.down('.pickupTimeWindow .start').getValue(),
				end: orderDetails.down('.pickupTimeWindow .end').getValue()
			},
		    status: jQuery('input[name=status]:checked', '#orderDetails .status').val(),
			externalCode: {
				externalCode: orderDetails.down('.externalCode').getValue(),
				origin: orderDetails.down('.origin').getValue()
			}
		};
	};

	return {
		buildEntity: buildEntity
	};

};

var orders = new Orders();

