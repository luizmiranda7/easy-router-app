function Calendar(){

    var addTimeWindowForm = function(event){
        var timeWindowForm = event.element().up('.calendar').down('.panel-body');
        timeWindowForm.down('.timeWindowCause').clear();
        timeWindowForm.down('.timeWindowStartDate').clear();
        timeWindowForm.down('.timeWindowEndDate').clear();
        timeWindowForm.show();
    };

    var addTimeWindow = function(event){
        var timeWindowForm = event.element().up('.calendar').down('.panel-body');
        timeWindowForm.hide();

        var value = {
            start: timeWindowForm.down('.timeWindowStartDate').value,
            end: timeWindowForm.down('.timeWindowEndDate').value,
            cause: timeWindowForm.down('.timeWindowCause').value
        }

        var text = value.cause  + ' - ' + value.start + ' - ' + value.end;

        jQuery('<li/>', {
            class: 'list-group-item',
            value: JSON.stringify(value)
        })
        .append(text)
        .append(jQuery('<span/>',{
            class: 'glyphicon glyphicon-trash pull-right',
            onclick: 'calendar.removeTimeWindow(event)',
            value: JSON.stringify(value)
        }))
        .appendTo('#collapseCalendar');

    };

    var buildEntity = function(calendarElement){
        var calendar = { timeWindows: [] };

        var timeWindows = jQuery(calendarElement.getElementsByClassName('list-group-item'));
        timeWindows.map(function(index){
            var timeWindow = jQuery(timeWindows[index]);
            calendar.timeWindows.push(JSON.parse(timeWindow.attr('value')));
        });
        return calendar;
    };

    var removeTimeWindow = function(event){
        event.element().remove();
    };

    var closeTimeWindowForm = function(event){
        var timeWindowForm = event.element().up('.calendar').down('.panel-body');
        timeWindowForm.hide();
    };

    return {
        addTimeWindowForm: addTimeWindowForm,
        addTimeWindow: addTimeWindow,
        closeTimeWindowForm: closeTimeWindowForm,
        removeTimeWindow: removeTimeWindow,
        buildEntity: buildEntity
    };
};

var calendar = new Calendar();