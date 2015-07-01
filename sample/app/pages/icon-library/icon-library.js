'use strict';

var APP = window.APP = window.APP || {};

APP.iconLibrary = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.iconLibrary');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
