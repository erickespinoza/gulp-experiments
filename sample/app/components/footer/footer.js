'use strict';

var APP = window.APP = window.APP || {};

APP.footer = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.footer');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
