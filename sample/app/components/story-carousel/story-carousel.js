'use strict';

var APP = window.APP = window.APP || {};

APP.storyCarousel = (function(){

    var bindEventsToUI = function() {
        initCarousel();
        // hoverImages();
       
    };



    var fixCarousel = function(event){  
        enquire.register('screen and (max-width: 767px)', {
            match :function(){
                // var stageWidth=$(event.currentTarget).find('.owl-stage').width();
                // var pages=event.page.count;
                // if($(event.currentTarget).parent().hasClass('story-carousel--no-text')){
                //     $(event.currentTarget).find('.owl-item').not('cloned').width((stageWidth/pages)/2);   
                // }else{
                //     $(event.currentTarget).find('.owl-item').not('cloned').width(stageWidth/pages);       
                // }
            } 
        });
    };

    var hoverImages=function(){
        $('.story-carousel__slider .item').each(function(){
            var grayImage=$(this).find(".story-carousel__slider__img--gray").get(0);
            var colorImage=$(this).find(".story-carousel__slider__img--color").get(0);
            if(colorImage){
                $(this).on('mouseover', function(event){
                    $(grayImage).addClass('hidden');
                    $(colorImage).removeClass('hidden');
                   
                });
                $(this).on('mouseout', function(event){
                    $(colorImage).stop().addClass('hidden');
                    $(grayImage).stop().removeClass('hidden');
                });
                
            }
            
        });
    };

    var initCarousel=function(){
        var carousel=$('.story-carousel__slider');
        carousel.on('initialized.owl.carousel resized.owl.carousel', function(event) {
            fixCarousel(event);
        });
        carousel.owlCarousel({
            items : 1,
            slideBy:'page',
            stagePadding: 60,
            loop: true,
            margin: 20,
            dots: false,
            nav:true,
            navText: ["",""],
            responsive:{
                520 : {
                    items: 2
                },
                768 : {
                    stagePadding: 0,
                    items: 3,
                    dots: true
                },
                992 : {
                    stagePadding: 0,
                    items: 4,
                    dots: true
                }
            }

        }); 
       


    };

    var init = function() {
        console.log('APP.storyCarousel');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
