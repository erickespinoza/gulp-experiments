'use strict';

var APP = window.APP = window.APP || {};

APP.homepage = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.homepage');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
