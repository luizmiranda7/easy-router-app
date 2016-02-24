var utils;
if (!utils) utils = (function() {

    var openModal = function(modal) {
        var globalContainer = document.getElementById('globalContainer');
        globalContainer.appendChild(modal);
        var modalOpener = document.getElementById('modalOpener');
        modalOpener.setAttribute('data-target', '#' + modal.id);
        modalOpener.click();

        jQuery("#" + modal.id).on('hidden.bs.modal', function() {
            jQuery(this).remove();
        });

        jQuery('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 4
        });

        jQuery('.datepicker').datetimepicker();

    }

    var openSinglePointMapModal = function(place) {

    	jQuery.ajax({
			type: 'POST',
            url: '/view/emptyModal',
			data: JSON.stringify({
				title: place.name,
				modalId: 'mapModal'
			}),
	        contentType: 'application/json',						
            success: function(data) {
                utils.openModal(jQuery(data)[0]);
                var point = {
		            lat: place.routePoint.latitude,
		            lng: place.routePoint.longitude
		        };

		        var map = new google.maps.Map(document.getElementById('mapModal').down('.modal-body'), {
		            zoom: 7,
		            center: point
		        });

		        var marker = new google.maps.Marker({
		            position: point,
		            map: map,
		            title: place.name
		        });
            }
        });
    }

    return {
        openModal: openModal,
        openSinglePointMapModal: openSinglePointMapModal
    };

})();

jQuery(document)
    .on('click', '.dropdown-menu', function(e) {
        e.stopPropagation();
    });