var drivers;
if (!drivers) drivers = (function() {

	var REQUESTS = null;

	var remove = function(button){
		jQuery.ajax({
			type: 'POST',
			beforeSend: function (request)
            {
                request.setRequestHeader("del", true);
            },
			data: JSON.stringify(getExternalCode(button.up('.driver'))),
	        contentType: 'application/json',
            url: '/rest/drivers/remove',						
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var openUpdateModal = function(button){
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(getExternalCode(button.up('.driver'))),
	        contentType: 'application/json',
            url: '/view/drivers/details',		
            success: function(data) {
            	utils.openModal(jQuery(data)[0]);
            }
        });
	};

	var save = function(button){
		var self = this;
		var driverDetails = button.up(".driverDetails");
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(self.buildDriver(driverDetails)),
	        contentType: 'application/json',
            url: '/view/drivers/details',		
            success: function(data) {
                var driverContainer = document.getElementsByClassName('driverContainer')[0];
                driverContainer.appendChild($(data)[0]);
                var modalOpener = document.getElementsByClassName('modalOpener')[0];
                modalOpener.click();
            }
        });
	};

	var getExternalCode = function(driver){
		return{
			externalCode: driver.getAttribute('externalCode'),
			origin: driver.getAttribute('origin')
		};
	}

	return {
		remove: remove,
		openUpdateModal: openUpdateModal,
		save: save
	};

})();

