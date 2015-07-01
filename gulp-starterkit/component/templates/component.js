'use strict';

var APP = window.APP = window.APP || {};

APP.<%= _s.camelize(name) %> = (function () {

    var bindEventsToUI = function () {

    };

    var init = function (element) {
        console.log('APP.<%= _s.camelize(name) %>');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
