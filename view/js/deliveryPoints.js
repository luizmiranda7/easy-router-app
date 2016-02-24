var deliveryPoints;
if (!deliveryPoints) deliveryPoints = (function() {

	var remove = function(button){
		jQuery.ajax({
			type: 'POST',
			beforeSend: function (request)
            {
                request.setRequestHeader("del", true);
            },
			data: JSON.stringify(getExternalCode(button.up('.deliveryPoint'))),
	        contentType: 'application/json',
            url: '/rest/deliveryPoints',						
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var openUpdateModal = function(button){
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(getExternalCode(button.up('.deliveryPoint'))),
	        contentType: 'application/json',
            url: '/view/deliveryPoints/details',		
            success: function(data) {
            	utils.openModal(jQuery(data)[0]);
            }
        });
	};

	var save = function(button){
		var self = this;
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(self.buildDeliveryPoint(button.up("#deliveryPointDetails"))),
	        contentType: 'application/json',
            url: '/rest/deliveryPoints',		
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var getExternalCode = function(deliveryPoint){
		return{
			externalCode: deliveryPoint.getAttribute('externalCode'),
			origin: deliveryPoint.getAttribute('origin')
		};
	};

	var buildDeliveryPoint = function(deliveryPointDetails){
		return {
			name: deliveryPointDetails.down('.name input').getValue(),
			deliveryDuration: deliveryPointDetails.down('.deliveryDuration input').getValue(),
			externalCode: {
				externalCode: deliveryPointDetails.down('.externalCode').getValue(),
				origin: deliveryPointDetails.down('.origin').getValue()
			}
		};
	};

	return {
		remove: remove,
		openUpdateModal: openUpdateModal,
		save: save,
		buildDeliveryPoint: buildDeliveryPoint
	};

})();

