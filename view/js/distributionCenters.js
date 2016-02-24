var distributionCenters;
if (!distributionCenters) distributionCenters = (function() {

	var remove = function(button){
		jQuery.ajax({
			type: 'POST',
			beforeSend: function (request)
            {
                request.setRequestHeader("del", true);
            },
			data: JSON.stringify(getExternalCode(button.up('.distributionCenter'))),
	        contentType: 'application/json',
            url: '/rest/distributionCenters',						
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var openUpdateModal = function(button){
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(getExternalCode(button.up('.distributionCenter'))),
	        contentType: 'application/json',
            url: '/view/distributionCenters/details',		
            success: function(data) {
            	utils.openModal(jQuery(data)[0]);
            }
        });
	};

	var save = function(button){
		var self = this;
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(self.buildDistributionCenter(button.up("#distributionCenterDetails"))),
	        contentType: 'application/json',
            url: '/rest/distributionCenters',		
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var getExternalCode = function(distributionCenter){
		return{
			externalCode: distributionCenter.getAttribute('externalCode'),
			origin: distributionCenter.getAttribute('origin')
		};
	};

	var buildDistributionCenter = function(distributionCenterDetails){
		return {
			name: distributionCenterDetails.down('.name input').getValue(),
			deliveryDuration: distributionCenterDetails.down('.deliveryDuration input').getValue(),
			externalCode: {
				externalCode: distributionCenterDetails.down('.externalCode').getValue(),
				origin: distributionCenterDetails.down('.origin').getValue()
			}
		};
	};

	return {
		remove: remove,
		openUpdateModal: openUpdateModal,
		save: save,
		buildDistributionCenter: buildDistributionCenter
	};

})();

