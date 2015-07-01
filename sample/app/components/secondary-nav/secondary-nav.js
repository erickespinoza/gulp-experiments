'use strict';

var APP = window.APP = window.APP || {};

APP.secondaryNav = (function(){

    var bindEventsToUI = function() {

        $('.secondary-nav__trigger').on('click', function(e) {
            e.preventDefault();

            $(this).toggleClass('secondary-nav__trigger--active');
            $('.secondary-nav__section').slideToggle('slow');

            return false;
        });

    };

    var init = function() {
        respondToScreenWidth();
        bindEventsToUI();
    };

    var respondToScreenWidth = function(){
        
        enquire.register('screen and (min-width: 992px)', {
            match :function() {
                $('.secondary-nav__section').slideDown();
                $('.secondary-nav__trigger').hide();
            }
        });

        enquire.register('screen and (max-width: 991px)', {
            match :function() {
                $('.secondary-nav__section').slideUp();
                $('.secondary-nav__trigger').show();
            }
        });
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
