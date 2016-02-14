var orders;
if (!orders) orders = (function() {

	var REQUESTS = null;

	var remove = function(button){
		var order = button.up('.order');
		
		var externalCode = {
			externalCode: order.getAttribute('externalCode'),
			origin: order.getAttribute('origin')
		};

		jQuery.ajax({
			type: 'POST',
			beforeSend: function (request)
            {
                request.setRequestHeader("del", true);
            },
			data: JSON.stringify(externalCode),
	        contentType: 'application/json',
            url: '/rest/orders',						
            success: function(data) {
                window.location.reload(false);
            }
        });
	};

	var details = function(button){
		var order = button.up('.order');
		var externalCode = {
			externalCode: order.getAttribute('externalCode'),
			origin: order.getAttribute('origin')
		};

		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(externalCode),
	        contentType: 'application/json',
            url: '/view/orders/details',		
            success: function(data) {
            	utils.openModal(jQuery(data)[0]);
            }
        });
	};

	var save = function(button){
		var self = this;
		var orderDetails = button.up(".orderDetails");
		jQuery.ajax({
			type: 'POST',
			data: JSON.stringify(self.buildOrder(orderDetails)),
	        contentType: 'application/json',
            url: '/view/orders/details',		
            success: function(data) {
            }
        });
	};

	var buildOrder = function(orderDetails){

	}

	return {
		remove: remove,
		details: details
	};

})();

