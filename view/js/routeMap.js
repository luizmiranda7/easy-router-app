function RouteMap() {

	var colors = [];

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

                engineResponse.routes.each(function(route) {
                    self.addRoute(route, directionsService, directionsDisplay);
                });

                google.maps.event.addListenerOnce(map, 'idle', function() {
                    google.maps.event.trigger(map, 'resize');
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
                //var route = response.routes[0];
                //var summaryPanel = document.getElementById('directions-panel');
                //summaryPanel.innerHTML = '';
                //// For each route, display summary information.
                //for (var i = 0; i < route.legs.length; i++) {
                //    var routeSegment = i + 1;
                //    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                //        '</b><br>';
                //    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                //    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                //    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                //}
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
        var routePoint = null;
        routeManager.currentRoutePoints.each(function(point) {
            var e1 = point.externalCode;
            var e2 = JSON.parse(location.id);
            if ((e1.origin == e2.origin) && (e1.externalCode == e2.externalCode)) {
                routePoint = point;
            }
        });

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