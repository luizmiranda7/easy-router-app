function AddressSelector() {

    var currentMap = null;
    var currentField = null;
    var autocomplete = null;

    var addressSelectorModal = function(position, button) {
        var self = this;
        
        self.position = position;
        self.currentField = button.up('.input-group');

        jQuery.ajax({
            type: 'POST',
            url: '/view/addressSelectorModal',
            data: JSON.stringify({
                title: position.name
            }),
            contentType: 'application/json',
            success: function(data) {
                utils.openModal(jQuery(data)[0]);
                self.initAutocomplete(position);
            }
        }); 
    };

    var initAutocomplete = function(position) {
        var self = this;
        self.currentMap = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: position.routePoint.latitude,
                lng: position.routePoint.longitude
            },
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        self.autocomplete = new google.maps.places.Autocomplete(input);
        self.autocomplete.bindTo('bounds', self.currentMap);
        self.currentMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: self.currentMap
        });
        marker.addListener('click', function() {
          infowindow.open(self.currentMap, marker);
        });

        self.autocomplete.addListener('place_changed', function() {
          infowindow.close();
          var place = self.autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            self.currentMap.fitBounds(place.geometry.viewport);
          } else {
            self.currentMap.setCenter(place.geometry.location);
            self.currentMap.setZoom(17);
          }

          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
          });
          marker.setVisible(true);

          var placeName = '';
          if(place.name){
            placeName = '<div><strong>' + place.name + '</strong><br>';
          }

          infowindow.setContent(placeName + place.formatted_address);
          infowindow.open(self.currentMap, marker);
        });

        google.maps.event.addListenerOnce(self.currentMap, 'idle', function() {
            google.maps.event.trigger(self.currentMap, 'resize');
            new google.maps.Geocoder().geocode({
              location:{
                  lat: position.routePoint.latitude,
                  lng: position.routePoint.longitude
              }
            }, function(results){
            if(results.length > 0){
              var address = results.first();
              self.autocomplete.set('place', address);
            }
          });
        });
    };

    var save = function(){
      if(this.currentMap){
          var center = this.currentMap.getCenter();

          var self = this;
          new google.maps.Geocoder().geocode({location:center}, function(results){
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
    };

    return {
        getAddressComponent: getAddressComponent,
        addressSelectorModal: addressSelectorModal,
        initAutocomplete: initAutocomplete,
        save: save,

        currentMap: currentMap
    };
};

var addressSelector = new AddressSelector();