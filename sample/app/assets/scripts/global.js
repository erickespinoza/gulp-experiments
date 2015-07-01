'use strict';

var APP = window.APP = window.APP || {};

APP.global = (function(){

    var initGlobalComponents = function() {
        // Fallback for IE8 (PNG instead of SVG)
        var SVGeezy = window.svgeezy = window.svgeezy || {};
        SVGeezy.init(false, 'png');
    };

    var initPageComponents = function() {
        APP.core.controller.init();
    };
    
        
    var bindEventsToUI = function() {

        $('.js-print-trigger').on('click', function(e) {
            window.print();
            e.preventDefault();
        });

        $('.back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 700);
        });

        $('.jump-to-links a').on('click', function (event) {
            var windowshade = window.windowshade;
            if (!!window.history && !!window.history.replaceState) {
                var href = $(this).attr('href');
                window.history.replaceState(null, window.document.title, href);
                windowshade.openWsByUrl(0);
                event.preventDefault();
            }
        });
    };

    var init = function() {

        /**
        * initialize global components
        */
        initGlobalComponents();

        /**
        * initialize components for the current page
        */
        initPageComponents();
        
        bindEventsToUI();

    };



    /**
    * interfaces to public functions
    */
    return {
        init: init
    };

}());

$( document ).ready( APP.global.init );
