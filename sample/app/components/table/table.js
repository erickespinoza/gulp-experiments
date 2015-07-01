'use strict';

var APP = window.APP = window.APP || {};

APP.table = (function(){

    var bindEventsToUI = function() {
        createCellHeadings();
        respondToScreenWidth();
    };

    var init = function() {
        bindEventsToUI();
    };

    var createCellHeadings = function() {

        $('table').each(function() {
            var table = $(this);

            table.find('th').each(function(idx) { 
                var th = $(this);

                table.find('tbody tr td:nth-child(' + (idx + 1) + ')').each(function() {
                    $(this).prepend('<span class="cell-heading">' + th.text() + '</span>');
                });

            });
        });

    };

    var respondToScreenWidth = function() {
        
        enquire.register('screen and (min-width: 768px)', {
            match: function(){
                $('.cell-heading').hide();
            }
        });

        enquire.register('screen and (max-width: 767px)', {
            match: function(){
                $('.cell-heading').css('display','block');
            }
        });
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
