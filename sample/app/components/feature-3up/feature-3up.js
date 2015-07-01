'use strict';

var APP = window.APP = window.APP || {};

APP.feature3up = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.feature3up');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
