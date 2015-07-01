'use strict';

var APP = window.APP = window.APP || {};

APP.feature4up = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.feature4up');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
