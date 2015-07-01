'use strict';

var APP = window.APP = window.APP || {};

APP.tabControls = (function(){

    var $tabControlsList = $('.tab-controls__list');

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.tabControls');
        bindEventsToUI();
        respondToScreenWidth();
    };

    var initCarousel = function(id) {

        $('#'+id).owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            slideBy: "2",
            navText : ["",""],
            items: 1,
            navContainerClass: 'tab-controls__list__nav',
            controlsClass: 'tab-controls__list__controls',
            dotClass: 'tab-controls__list__controls__dot',
            dotsClass: 'tab-controls__list__controls__dots',
            smartSpeed: 800,
            responsive:{
                640 : {
                    stagePadding: 120
                }
            }
        });

    };

    var destroyCarousel = function(id) {
        $('#'+id)
            .trigger('destroy.owl.carousel')
            .removeClass('owl-carousel owl-loaded')
            .find('.owl-stage-outer')
            .children()
            .unwrap();
    };

    var goToActive = function(id) {
        var $tabControlsList = $('.tab-controls__list');
        $tabControlsList.each(function(){
            var itemsList;

            itemsList = $('#'+id)
                .find('.owl-stage')
                .children()
                .not('.cloned');

            itemsList.each(function(index, item){
              
                if($(item).children().hasClass('is-active')){
                    $('#'+id)
                        .trigger('to.owl.carousel', index);
                }
            });
            
        });
    };

    var respondToScreenWidth = function() {
        var $tabControlsList = $('.tab-controls__list');
        enquire.register('screen and (min-width: 992px)', {
            match :function(){
                $tabControlsList.each(function(){
                    var id = $(this).children().first().attr('id');
                     destroyCarousel(id);
                });
            }
        });

        enquire.register('screen and (max-width: 991px)', {
             match :function(){
                
                $tabControlsList.each(function(){

                    var id = $(this).children().first().attr('id');
                    initCarousel(id);
                    goToActive(id);
                    
                });
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
