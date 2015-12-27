var DIRECTION_LEG_UPDATER;
if (!DIRECTION_LEG_UPDATER) DIRECTION_LEG_UPDATER = (function() {


	var deleteOrder = function(button){
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
                console.log('deleted');
            }
        });
	}

	var update = function(button){
		var container = button.closest('.orderContainer');
		var externalCodes = [];

		$('input:checkbox:checked', container).each(function(index, checkbox){
			var order = checkbox.closest('.order');
			externalCodes.push({
				externalCode: order.getAttribute('externalCode'),
				origin: order.getAttribute('origin')
			});
		});

	    $.ajax({
			type: 'POST',
			data: JSON.stringify(externalCodes),
	        contentType: 'application/json',
            url: '/rest/directionLegUpdateRequest',						
            success: function(data) {
                data.requests.forEach(function(request){
					getDistanceMantrix(request.initialPoints, request.finalPoints);
				});
            }
        });
	}

	var getDistanceMantrix = function(initialRoutePoints, finalRoutePoints){
		var initialPoints = initialRoutePoints.map(function(item){
			return new google.maps.LatLng(item.latitude, item.longitude);
		});

		var finalPoints = finalRoutePoints.map(function(item){
			return new google.maps.LatLng(item.latitude, item.longitude);
		});

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		  {
		    origins: initialPoints,
		    destinations: finalPoints,
		    travelMode: google.maps.TravelMode.DRIVING,
		    transitOptions: {},
		    drivingOptions: {},
		    unitSystem: google.maps.UnitSystem.METRIC,
		    avoidHighways: false,
		    avoidTolls: false,
		  }, storageDistanceMatrix);

	};

	var storageDistanceMatrix = function callback(response, status) {
		console.log('a');
	};


	return {
		update : update,
		deleteOrder: deleteOrder
	};

})();