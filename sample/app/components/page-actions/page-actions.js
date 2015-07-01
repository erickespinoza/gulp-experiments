'use strict';

var APP = window.APP = window.APP || {};

APP.pageActions = (function(){

    var bindEventsToUI = function() {
        var printBtn = $('.page-actions__item--print > a');
            printBtn.on('click', function (event) { 
                window.print(); 
                event.preventDefault();
            });
    };

    var init = function() {
        console.log('APP.pageActions');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
