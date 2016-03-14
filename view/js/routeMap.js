function RouteMap() {

    var initMap = function(engineResponse) {
        var self = this;

        jQuery.ajax({
            type: 'GET',
            url: '/view/routeMap',
            success: function(data) {
                utils.openModal(jQuery(data)[0]);
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 6
                });
                directionsDisplay.setMap(map);

                google.maps.event.addListenerOnce(map, 'idle', function() {
                    google.maps.event.trigger(map, 'resize');
                });

                engineResponse.routes.each(function(route) {
                    self.addRoute(route, directionsService, directionsDisplay);
                });
            }
        });
    };

    var addRoute = function(route, directionsService, directionsDisplay) {
        var self = this;

        var start = self.getGoogleMapsLocation(route.start.location);
        directionsService.route({
            origin: start,
            destination: self.getGoogleMapsLocation(route.end.location),
            waypoints: self.getWaypoints(route.tourActivities.jobs),
            optimizeWaypoints: false,
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.getMap().setCenter(start);
                directionsDisplay.setDirections(response);
                
                var directionLegPanel = // TODO creates a new panel in html
                
                // For each route leg, display summary information.
                for (var i = 0; i < route.legs.length; i++) {
									var routeLeg = self.getRouteLeg(route, i);
                    summaryPanel.innerHTML += '<b>Route Segment: ' + routeLeg +
                        '</b><br>';
                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                }
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };

    var getWaypoints = function(jobs) {
        var self = this;
        return jobs.map(function(job) {
            return {
                location: self.getGoogleMapsLocation(job.deliveryLocation_),
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

    return {
        initMap: initMap,
        addRoute: addRoute,
        getWaypoints: getWaypoints,
        getGoogleMapsLocation: getGoogleMapsLocation
    };
};

var routeMap = new RouteMap();