var ROUTES;
if (!ROUTES) ROUTES = (function() {

	var REQUESTS = null;

	var remove = function(button){
		var route = button.closest('.route');
		
		var data = {
			externalCode: 
			origin: route.getAttribute('origin')
		};

		$.ajax({
			type: 'POST',
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
            url: '/view/orderDetails',		
            success: function(data) {
                var orderContainer = document.getElementsByClassName('orderContainer')[0];
                orderContainer.appendChild($(data)[0]);
                var modalOpener = document.getElementsByClassName('modalOpener')[0];
                modalOpener.click();
            }
        });
	};

	var computeRoute = function(button){
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
            	REQUESTS = data.requests;
                data.requests.forEach(function(request){
					getDistanceMatrix(request.initialPoints, request.finalPoints);
				});
				sessionStorage.setItem('orders', JSON.stringify(externalCodes));
            }
        });
	}

	var getDistanceMatrix = function(initialRoutePoints, finalRoutePoints){

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
		    unitSystem: google.maps.UnitSystem.METRIC,
		    avoidHighways: false,
		    avoidTolls: false,
		  }, new DistanceMatrixManager(initialRoutePoints, finalRoutePoints).storageDistanceMatrix);

	};

	function DistanceMatrixManager(initialRoutePoints, finalRoutePoints){
		this.initialRoutePoints = initialRoutePoints;
		this.finalRoutePoints = finalRoutePoints;


		var sendDistanceMatrix = function (){
			var directionLegs = [];

			REQUESTS.forEach(function(request){
				request.initialPoints.forEach(function(initialRoutePoint){
					request.finalPoints.forEach(function(finalRoutePoint){

						var key = {
							initialRoutePoint: initialRoutePoint,
							finalRoutePoint: finalRoutePoint
						}

						var info = sessionStorage.getItem(JSON.stringify(key));

						directionLegs.push(jQuery.extend(key, info));
					});
				});
			});

			var dataToSend = {
				directionLegs: directionLegs,
				orders: JSON.parse(sessionStorage.getItem('orders'))
			};

			$.ajax({
				type: 'POST',
				data: JSON.stringify(dataToSend),
		        contentType: 'application/json',
	            url: '/rest/computeOrders',						
	            success: function(data) {
	            	console.log('route computed!!')
	            	sessionStorage.clear();
	            }
	        });
		};

		/*
		 * We must save all elements from response until all requests are done.
		 */
		var storageDistanceMatrix = function (response, status) {
			var rowCounter = 0;
			for(var initialPoint in this.initialRoutePoints){
				var elementCounter = 0;
				for(var finalPoint in this.finalRoutePoints){
					var row = response.rows[rowCounter];
					var item = row.elements[elementCounter];

					var key = JSON.stringify({
						initialRoutePoint: initialPoint,
						finalRoutePoint: finalPoint
					});

					sessionStorage.setItem(key, JSON.stringify(item));

					elementCounter++;
				}
				rowCounter++;
			}

			sendDistanceMatrix();
			
		};

		return {
			initialRoutePoints: initialRoutePoints,
			finalRoutePoints: finalRoutePoints,
			sendDistanceMatrix: sendDistanceMatrix,
			storageDistanceMatrix: storageDistanceMatrix
		};

	};

	return {
		remove: remove,
		details: details,
		computeNewRoute: computeNewRoute
	};

})();

