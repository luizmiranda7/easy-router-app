function RouteMap() {

    var initMap = function(engineResponse) {
        var self = this;

        jQuery.ajax({
            type: 'POST',
            data: JSON.stringify(engineResponse),
            contentType: 'application/json',
            url: '/view/routes/routeMap',
            success: function(data) {
                utils.openModal(jQuery(data)[0]);
                var directionsService = new google.maps.DirectionsService();

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 6
                });

                google.maps.event.addListenerOnce(map, 'idle', function() {
                    google.maps.event.trigger(map, 'resize');
                });

                engineResponse.routes.each(function(route) {
                    self.addRoute(route, map, directionsService);
                });
            }
        });
    };

    var addRoute = function(route, map, directionsService) {
        var self = this;

        var directionsDisplay = new google.maps.DirectionsRenderer({ 
            polylineOptions: {
             strokeColor: self.getRandomColor()
            } 
        });
        directionsDisplay.setMap(map);

        var start = self.getGoogleMapsLocation(route.start.location);
        directionsService.route({
            origin: start,
            destination: self.getGoogleMapsLocation(route.end.location),
            waypoints: self.getWaypoints(route.tourActivities.tourActivities),
            optimizeWaypoints: false,
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.getMap().setCenter(start);
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };

    var getWaypoints = function(tourActivities) {
        var self = this;
        return tourActivities.map(function(tourActivity) {
            return {
                location: self.getGoogleMapsLocation(tourActivity.shipment.deliveryLocation_),
                stopover: true
            };
        });
    };

    var getDeliverShipment = function(tourActivity){
        return null;
    };

    var getPickupShipment = function(tourActivity){
        return null;
    };

    var getGoogleMapsLocation = function(location) {
        var routePoint = routeManager.currentRoutePoints.filter(function(point) {
            var e1 = point.externalCode;
            var e2 = JSON.parse(location.id);
            return (e1.origin == e2.origin) && (e1.externalCode == e2.externalCode);
        }).first();

        return {
            lat: routePoint.latitude,
            lng: routePoint.longitude
        };
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return {
        getRandomColor: getRandomColor,
        initMap: initMap,
        addRoute: addRoute,
        getWaypoints: getWaypoints,
        getGoogleMapsLocation: getGoogleMapsLocation,
        getDeliverShipment: getDeliverShipment,
        getPickupShipment: getPickupShipment
    };
};

var routeMap = new RouteMap();