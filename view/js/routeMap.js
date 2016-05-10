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

                self.getRoutes().each(function(index, route) {
                    self.addRoute(route, map, directionsService);
                });
            }
        });
    };
    
    var getRoutes = function(){
        var routeDetails = jQuery(document.getElementById('mapModal').down('.routeDetails'));
        return routeDetails.find('.route').map(function(index, routeElement){
            return JSON.parse(routeElement.getAttribute('route'));
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
                var routeElement = document.getElementById(route.id);
                var routeJson = JSON.parse(routeElement.getAttribute('route'));
                
                routeJson.duration = response.routes.first().legs.reduce(function(totalDuration, leg){
                    return totalDuration + leg.duration.value;
                }, 0);
                routeJson.distance = response.routes.first().legs.reduce(function(totalDistance, leg){
                    return totalDistance + leg.distance.value;
                }, 0);
                
                routeElement.setAttribute('route', JSON.stringify(routeJson));
                   
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
        getRoutes: getRoutes
    };
};

var routeMap = new RouteMap();