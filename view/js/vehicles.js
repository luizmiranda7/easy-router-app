var vehicles;
if (!vehicles) vehicles = (function() {

	var REQUESTS = null;

	var remove = function(button){
		jQuery.ajax({
			type: 'POST',
			beforeSend: function (request)
            {
                request.setRequestHeader("del", true);
            },
			data: JSON.stringify(getExternalCode(button.up('.vehicle'))),
	        contentType: 'application/json',
            url: '/rest/vehicles',						
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var openUpdateModal = function(button){
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(getExternalCode(button.up('.vehicle'))),
	        contentType: 'application/json',
            url: '/view/vehicles/details',		
            success: function(data) {
            	utils.openModal(jQuery(data)[0]);
            }
        });
	};

	var save = function(button){
		var self = this;
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(self.buildVehicle(button.up("#vehicleDetails"))),
	        contentType: 'application/json',
            url: '/rest/vehicles',		
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var getExternalCode = function(vehicle){
		return{
			externalCode: vehicle.getAttribute('externalCode'),
			origin: vehicle.getAttribute('origin')
		};
	}

	var buildVehicle = function(vehicleDetails){
		return {
			costPerTime: vehicleDetails.down('.costPerTime input').getValue(),
			costPerDistance: vehicleDetails.down('.costPerDistance input').getValue(),
		    totalWeight: vehicleDetails.down('.totalWeight input').getValue(),
		    totalVolume: vehicleDetails.down('.totalVolume input').getValue(),
		    axes: vehicleDetails.down('.axes input').getValue(),
		    type: vehicleDetails.down('.type input').getValue(),
			externalCode: {
				externalCode: vehicleDetails.down('.externalCode').getValue(),
				origin: vehicleDetails.down('.origin').getValue()
			}
		};
	};

	return {
		remove: remove,
		openUpdateModal: openUpdateModal,
		save: save,
		buildVehicle: buildVehicle
	};

})();

