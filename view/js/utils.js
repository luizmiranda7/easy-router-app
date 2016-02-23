var utils;
if (!utils) utils = (function() {

	var openModal = function(modal){
		var globalContainer = document.getElementById('globalContainer');
        globalContainer.appendChild(modal);
        var modalOpener = document.getElementById('modalOpener');
        modalOpener.setAttribute('data-target', '#' + modal.id);
        modalOpener.click();

        jQuery("#" + modal.id).on('hidden.bs.modal', function () {
    		jQuery(this).remove();
        });
		
		jQuery('.selectpicker').selectpicker({
		  style: 'btn-info',
		  size: 4
		});

		jQuery('.datepicker').datetimepicker();

	}

	return {
		openModal: openModal
	};

})();

jQuery(document)
.on( 'click', '.dropdown-menu', function (e){
    e.stopPropagation();
});

