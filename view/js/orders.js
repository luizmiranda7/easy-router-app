var ORDERS;
if (!ORDERS) ORDERS = (function() {

	var REQUESTS = null;

	var remove = function(button){
		var order = button.closest('.order');
		
		var externalCode = {
			externalCode: order.getAttribute('externalCode'),
			origin: order.getAttribute('origin')
		};

		$.ajax({
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
		var order = button.closest('.order');
		var externalCode = {
			externalCode: order.getAttribute('externalCode'),
			origin: order.getAttribute('origin')
		};

		$.ajax({
			type: 'POST',
			data: JSON.stringify(externalCode),
	        contentType: 'application/json',
            url: '/view/orders/details',		
            success: function(data) {
                var orderContainer = document.getElementsByClassName('orderContainer')[0];
                orderContainer.appendChild($(data)[0]);
                var modalOpener = document.getElementsByClassName('modalOpener')[0];
                modalOpener.click();
            }
        });
	};

	return {
		remove: remove,
		details: details
	};

})();

