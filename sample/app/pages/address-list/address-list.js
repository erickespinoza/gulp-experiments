'use strict';

var APP = window.APP = window.APP || {};

APP.addressList = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.addressList');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
