'use strict';

var APP = window.APP = window.APP || {};

APP.pageBreadcrumb = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.pageBreadcrumb');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
