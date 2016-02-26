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

        jQuery('.datepicker').datetimepicker({
                    locale: 'pt-BR'
                });
    };

    var openUpdateOrCreateModal = function(button, entityClassName, url){
        var externalCode = {};
        if(button.up(entityClassName)){
            externalCode = getExternalCode(button.up(entityClassName));
        }

        jQuery.ajax({
            type: 'POST',
            data: JSON.stringify(externalCode),
            contentType: 'application/json',
            url: url,       
            success: function(data) {
                utils.openModal(jQuery(data)[0]);
            }
        });
    };

    var remove = function(button, entityClassName, url){
        jQuery.ajax({
            type: 'POST',
            beforeSend: function (request)
            {
                request.setRequestHeader("del", true);
            },
            data: JSON.stringify(getExternalCode(button.up(entityClassName))),
            contentType: 'application/json',
            url: url,                        
            success: function(data) {
                window.location.reload(false);
            }
        });
    };

    var save = function(button, detailsId, url, buildFunction){
        var self = this;
        jQuery.ajax({
            type: 'POST',
            data: JSON.stringify(buildFunction(button.up('#' + detailsId))),
            contentType: 'application/json',
            url: url,        
            success: function(data) {
                window.location.reload(false);
            }
        });
    };

    var getExternalCode = function(entityTag){
        return{
            externalCode: entityTag.getAttribute('externalCode'),
            origin: entityTag.getAttribute('origin')
        };
    }


    return {
        openModal: openModal,
        openUpdateOrCreateModal: openUpdateOrCreateModal,
        getExternalCode: getExternalCode,
        remove: remove,
        save: save
    };

})();

jQuery(document).on('click', '.dropdown-menu', function(e) {
    e.stopPropagation();
});