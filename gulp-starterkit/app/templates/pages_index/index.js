'use strict';

var APP = window.APP = window.APP || {};

APP.home = (function(){

    var bindEventsToUI = function() {
        // ...
    };

    var init = function() {
        console.log('APP.index');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
