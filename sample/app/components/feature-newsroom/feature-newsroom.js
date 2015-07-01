'use strict';

var APP = window.APP = window.APP || {};

APP.featureNewsroom = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.featureNewsroom');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
