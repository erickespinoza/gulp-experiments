'use strict';

var APP = window.APP = window.APP || {};

APP.videoContainer = (function(){

    var bindEventsToUI = function() {
        
    };

    var init = function() {
        console.log('APP.videoContainer');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
