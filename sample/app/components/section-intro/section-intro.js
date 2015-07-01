'use strict';

var APP = window.APP = window.APP || {};

APP.sectionIntro = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.sectionIntro');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
