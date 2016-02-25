function AddressSelector() {

    var currentMap = null;
    var currentField = null

    var addressSelectorModal = function(place, button) {
        var self = this;
        
        self.place = place;
        self.currentField = button.up('.input-group');

        jQuery.ajax({
            type: 'POST',
            url: '/view/addressSelectorModal',
            data: JSON.stringify({
                title: place.name,
                addressInputClass: addressInputClass
            }),
            contentType: 'application/json',
            success: function(data) {
                utils.openModal(jQuery(data)[0]);
                self.initAutocomplete(place);
            }
        }); 
    }

    var initAutocomplete = function(place) {
        var self = this;
        self.currentMap = new google.maps.Map(jQuery('#mapModal .mapDiv')[0], {
            center: {
                lat: place.routePoint.latitude,
                lng: place.routePoint.longitude
            },
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // Create the search box and link it to the UI element.
        var input = jQuery('#mapModal .pac-input')[0];
        var searchBox = new google.maps.places.SearchBox(input);
        self.currentMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        self.currentMap.addListener('bounds_changed', function() {
            searchBox.setBounds(self.currentMap.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: self.currentMap,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            self.currentMap.fitBounds(bounds);
        });
    };

    var save = function(){
      if(this.currentMap){
          var center = this.currentMap.getCenter();
          var geocoder = new google.maps.Geocoder();

          var self = this;
          geocoder.geocode({location:center}, function(results){
            if(results.length > 0){
              var address = results.first();
              
              self.currentField.down('.text').setValue(address.formatted_address);
              self.currentField.down('.routePoint').setValue(JSON.stringify({
                  latitude: address.geometry.location.lat(),
                  longitude: address.geometry.location.lng(),
                  number: getAddressComponent(address, 'street_number'),
                  kilometer: getAddressComponent(address, 'kilometer'),
                  street: getAddressComponent(address, 'route'),
                  city: getAddressComponent(address, 'administrative_area_level_2'),
                  state: getAddressComponent(address, 'administrative_area_level_1'),
                  postalCode: getAddressComponent(address, 'country'),
              }));

              self.currentMap = null;
              self.currentField = null;
            }
          });
      }
    };

    var getAddressComponent = function(address, type){
      if(address && address.address_components){
        return address.address_components.filter(function(component){
          return component.types.any(function(componentType){return type == componentType;});
        }).map(function(component){
          return component.long_name;
        });
      } 
      return null;
    }

    return {
        getAddressComponent: getAddressComponent,
        addressSelectorModal: addressSelectorModal,
        initAutocomplete: initAutocomplete,
        save: save,

        currentMap: currentMap
    };
}

var addressSelector = new AddressSelector();