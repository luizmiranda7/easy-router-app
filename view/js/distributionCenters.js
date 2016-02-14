var distributionCenters;
if (!distributionCenters) distributionCenters = (function() {


	var openSelection = function(div){
		$.ajax({
			type: 'GET',
			beforeSend: function (request)
            {
                request.setRequestHeader("del", true);
            },
			data: JSON.stringify(externalCode),
	        contentType: 'application/json',
            url: '/rest/distributionCenters',						
            success: function(data) {
                var orderContainer = document.getElementsByClassName('orderContainer')[0];
                orderContainer.appendChild($(data)[0]);
                var modalOpener = document.getElementsByClassName('modalOpener')[0];
                modalOpener.click();
            }
        });
	}

	var remove = function(button){
		var order = button.up('.order');
		
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
		var order = button.up('.order');
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

	var save = function(button){
		var self = this;
		var orderDetails = button.up(".orderDetails");
		$.ajax({
			type: 'POST',
			data: JSON.stringify(self.buildOrder(orderDetails)),
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

	var buildOrder = function(orderDetails){
		
	}

	return {
		remove: remove,
		details: details
	};

})();

