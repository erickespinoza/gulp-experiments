'use strict';

var APP = window.APP = window.APP || {};

APP.productPatent = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.productPatent');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
