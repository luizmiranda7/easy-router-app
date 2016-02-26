function Orders() {

	var buildEntity = function(orderDetails){
		return {
			deliveryPoint: JSON.parse(jQuery(orderDetails.down('.deliveryPoint .selectpicker option:selected')).val()),
			distributionCenter: JSON.parse(jQuery(orderDetails.down('.distributionCenter .selectpicker option:selected')).val()),
			priority: orderDetails.down('.priority input').getValue(),
			weight: orderDetails.down('.weight input').getValue(),
			volume: orderDetails.down('.volume input').getValue(),
		    penalty: orderDetails.down('.penalty input').getValue(),
		    deadline: orderDetails.down('.deadline input').getValue(),
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

