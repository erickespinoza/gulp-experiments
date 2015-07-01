'use strict';

var APP = window.APP = window.APP || {};

APP.masthead = (function(){

    var $masthead = $('#mastheadCarousel');

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.masthead');
        bindEventsToUI();
        initCarousel();
    };

    var initCarousel = function() {
        $masthead.owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 10000,
            autoplaySpeed: 1000,
            fluidSpeed: 1000,
            smartSpeed: 1000,
            responsiveClass: true,
            margin: 0,
            nav: false,
            navText : ["",""],
            items: 1
        });
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
