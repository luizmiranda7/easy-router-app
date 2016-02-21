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
		
		jQuery('.datepicker').datepicker();
	}

	return {
		openModal: openModal
	};

})();

