function RouteManager() {

    var chain = [];

    var directionLegs = [];
    var orders = [];
    var drivers = [];
    var vehicles = [];
    var routes = [];
    var currentRoutePoints = [];

    var lastInitialPoint = null;
    var lastFinalPoint = null;

    var remove = function(button) {
        var route = button.up('.route');

        var data = {
            externalCode: route.getAttribute('externalCode'),
            origin: route.getAttribute('origin')
        };

        jQuery.ajax({
            type: 'POST',
            data: JSON.stringify(externalCode),
            contentType: 'application/json',
            url: '/rest/orders',
            success: function(data) {
                window.location.reload(false);
            }
        });
    };

    var details = function(button) {
        var order = button.closest('.order');
        var externalCode = {
            externalCode: order.getAttribute('externalCode'),
            origin: order.getAttribute('origin')
        };

        jQuery.ajax({
            type: 'POST',
            data: JSON.stringify(externalCode),
            contentType: 'application/json',
            url: '/view/orderDetails',
            success: function(data) {
                var orderContainer = document.getElementsByClassName('orderContainer')[0];
                orderContainer.appendChild(jQuery(data)[0]);
                var modalOpener = document.getElementsByClassName('modalOpener')[0];
                modalOpener.click();
            }
        });
    };

    var compute = function() {

        this.chain = [
            this.getOrders,
            this.getVehicles,
            this.getDrivers,
            this.getDirectionLegs,
            this.computeRoutes
        ];
        this.next();

    };

    var getOrders = function() {
        var self = this;
        var container = jQuery('.orders')[0];
        var externalCodes = [];

        jQuery('input:checkbox:checked', container).each(function(index, checkbox) {
            var order = checkbox.up('.order');
            externalCodes.push({
                externalCode: order.getAttribute('externalCode'),
                origin: order.getAttribute('origin')
            });
        });
        jQuery.ajax({
            type: 'POST',
            data: JSON.stringify(externalCodes),
            contentType: 'application/json',
            url: '/rest/getOrders',
            success: function(data) {
                self.orders = data;
                self.next();
            }
        });
    }

    var getVehicles = function() {
        var self = this;
        jQuery.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: '/rest/getAvailableVehicles',
            success: function(data) {
                self.vehicles = data;
                self.next();
            }
        });
    }

    var getDrivers = function() {
        var self = this;
        jQuery.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: '/rest/getAvailableDrivers',
            success: function(data) {
                self.drivers = data;
                self.next();
            }
        });
    };

    var getDirectionLegs = function() {

        //Geramos a matriz para busca de directionLegs
        var routePoints = this.orders.map(function(order) {
            return order.deliveryPoint.routePoint;
        });
        this.orders.forEach(function(order) {
            routePoints.push(order.distributionCenter.routePoint);
        });
        routePoints = routePoints.filter(function(item, pos, selfAux) {
            return selfAux.indexOf(item).externalCode == pos.externalCode;
        });

        var self = this;
        self.currentRoutePoints = self.currentRoutePoints.concat(routePoints);
        self.lastInitialPoint = routePoints.last();
        self.lastFinalPoint = routePoints.last();

        // Com a matriz gerada e particionada, mandamos calcular as legs por blocos
        var requests = self.getDirectionLegUpdateRequests(routePoints);
        requests.forEach(function(request) {
            self.getDistanceMatrix(request.initialPoints, request.finalPoints);
        });

    };

    /*
     * Given a list of routePoints, define a DirectionLEgUpdateRequestDTO
     */
    var getDirectionLegUpdateRequests = function(routePoints) {
        var requests = [];
        var vectors = getDirectionLegVectors(routePoints);
        vectors.forEach(function(vector) {
            requests.push({
                initialPoints: vector,
                finalPoints: vector
            });
            if (vectors.length > 1) {
                vectors.forEach(function(vectorInner) {
                    requests.push({
                        initialPoints: vector,
                        finalPoints: vectorInner
                    });
                });
            }
        });
        return requests;
    };

    // Split a list of routePoints into a list of chunks (10) elements
    var getDirectionLegVectors = function(routePoints) {
        var listMatrix = [];

        while (routePoints.length > 0) {
            var chunk = routePoints.splice(0, 10);
            listMatrix.push(chunk);
        }
        return listMatrix;
    };

    var getDistanceMatrix = function(initialRoutePoints, finalRoutePoints) {
        var self = this;

        var initialPoints = initialRoutePoints.map(function(item) {
            return new google.maps.LatLng(item.latitude, item.longitude);
        });

        var finalPoints = finalRoutePoints.map(function(item) {
            return new google.maps.LatLng(item.latitude, item.longitude);
        });

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: initialPoints,
            destinations: finalPoints,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
        }, function(response, status) {

            storageDistanceMatrix(response, status, self, initialRoutePoints, finalRoutePoints);

        });
    };

    var computeRoutes = function() {
        var self = this;
        if (self.orders && self.drivers && self.vehicles && self.directionLegs && self.currentRoutePoints) {
            jQuery.ajax({
                type: 'POST',
                data: JSON.stringify({
                    orders: self.parseOrders(self.orders),
                    drivers: self.drivers,
                    vehicles: self.vehicles,
                    directionLegs: self.parseDirectionLegs(self.directionLegs)
                }),
                contentType: 'application/json',
                url: '/rest/solve',
                success: function(data) {
                    routeMap.initMap(JSON.parse(data));
                }
            });
        }
    };


    var parseOrders = function(orders) {
        var self = this;
        return orders.map(function(order) {
            order.deliveryPoint.routePointExternalCode = order.deliveryPoint.routePoint.externalCode;
            order.distributionCenter.routePointExternalCode = order.distributionCenter.routePoint.externalCode;
            delete order.deliveryPoint['routePoint'];
            delete order.distributionCenter['routePoint'];
            return order;
        });
    };

    var parseDirectionLegs = function(directionLegs) {
        var self = this;
        return directionLegs.map(function(directionLeg) {
            var parsed = jQuery.extend({}, directionLeg);
            parsed.initialPoint = parsed.initialPoint.externalCode;
            parsed.finalPoint = parsed.finalPoint.externalCode;
            parsed.distance = parsed.distance.value;
            parsed.duration = parsed.duration.value;
            return parsed;
        });
    };

    var next = function() {
        if (this.chain.length > 0) {
            var method = this.chain.first();
            this.chain.splice(this.chain.indexOf(method), 1);
            method.apply(this);

        }
    };

    return {
        next: next,

        getOrders: getOrders,
        getDrivers: getDrivers,
        getVehicles: getVehicles,
        getDirectionLegs: getDirectionLegs,
        getDistanceMatrix: getDistanceMatrix,
        getDirectionLegVectors: getDirectionLegVectors,
        getDirectionLegUpdateRequests: getDirectionLegUpdateRequests,
        computeRoutes: computeRoutes,

        parseOrders: parseOrders,
        parseDirectionLegs: parseDirectionLegs,

        directionLegs: directionLegs,
        lastInitialPoint: lastInitialPoint,
        lastFinalPoint: lastFinalPoint,
        currentRoutePoints: currentRoutePoints,

        remove: remove,
        details: details,
        compute: compute
    };

};

var routeManager = new RouteManager();


/*
 * We must save all elements from response until all requests are done.
 */
var storageDistanceMatrix = function(response, status, self, initialRoutePoints, finalRoutePoints, lastInitialPoint, lastFinalPoint) {
    var done = false;
    var rowCounter = 0;
    initialRoutePoints.each(function(initialPoint) {
        var elementCounter = 0;
        finalRoutePoints.each(function(finalPoint) {

            var directionLeg = {
                initialPoint: initialPoint,
                finalPoint: finalPoint
            };

            var info = response.rows[rowCounter].elements[elementCounter];
            self.directionLegs.push(jQuery.extend(directionLeg, info));
            done = (initialPoint === self.lastInitialPoint) && (finalPoint === self.lastFinalPoint);
            elementCounter++;
        });
        rowCounter++;
    });

    // If the last leg is calculated then, start the routing
    if (done) {
        self.next();
    }
};