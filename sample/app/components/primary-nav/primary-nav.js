'use strict';

var APP = window.APP = window.APP || {};

APP.primaryNav = (function(){

    var $dropdowns = $('.primary-nav .dropdown-menu-desktop, .primary-nav .dropdown-menu');

    var bindEventsToUI = function() {

        menuActiver();
        dropdonwDesktopActiver();
        domActiver();

    };

    var init = function() {
        console.log('APP.primaryNav');
        bindEventsToUI();
    };

    var menuActiver = function () {
        $('.primary-nav .menu-logo').on('click', clickMenu);
    };

    var dropdonwDesktopActiver = function() {
        $('.primary-nav .activer').on('click', clickDropdownDesktop);
    };

    var domActiver = function(){
        $('html').on('click',clickOutsiteDropdownDesktop);
        $('html').on('keyup',function(e) {
            if (e.keyCode === 27) {
                $('.primary-nav li.dropdown').removeClass('open');
                clickOutsiteDropdownDesktop(e); 
            }
        });
    };

    var clickMenu = function(event) {
        event.preventDefault();
        var $this = $(this),
        isAndroid = /android/i.test(navigator.userAgent.toLowerCase()),
        $menu = $('.nav-menu-wrapper');
        if(isAndroid){
            if($this.hasClass('active-android')){
                $this.removeClass('active-android');
                $menu.slideUp();
            }else {
                $this.addClass('active-android');
                $menu.slideDown();
            }    
        }else {
            if($this.hasClass('active')){
                $this.removeClass('active');
                $menu.slideUp();
            }else {
                $this.addClass('active');
                $menu.slideDown();
            }
        }

    };

    var clickDropdownDesktop = function(event) {
        var $dropdowns = $('.primary-nav .dropdown-menu-desktop, .primary-nav .dropdown-menu');
        event.preventDefault();
        event.stopPropagation();
        var $this = $(this),
        ref = $(this).data('activer'),
        $dropdownContainer = $('.primary-nav .utilities-container');

        if($this.parent().hasClass('open')){
            $('.primary-nav .utilities-container').find("#"+ref).slideUp(200);
            $this.parent().removeClass('open');
            $this.parent().find('.dropdown-menu').slideUp(200);
        }else{
            if($dropdowns){
                $dropdowns.slideUp(0);
            }
            $('.primary-nav li.dropdown').each(function(){
                if($(this).hasClass('open')){
                    $(this).removeClass('open');
                }
            });
            $this.parent().find('.dropdown-menu').slideDown(400);
            $('.primary-nav .utilities-container').find("#"+ref).slideDown(400);    
            $this.parent().addClass('open'); 
            $this.parent().find('.dropdown-menu').slideDown(400);  
        }   
    };

    var clickOutsiteDropdownDesktop = function(event){
        var $dropdowns = $('.primary-nav .dropdown-menu-desktop, .primary-nav .dropdown-menu');
        $dropdowns.slideUp(200);
    };

    var isMobileTablet = function(){
        var isMobile = false,
        windowWidth = $(window).width();
        if (windowWidth < 1025) {
            isMobile = true;
        }
        return isMobile;
    };

    var respondToWidthChange = function() {
        var $menu = $('.nav-menu-wrapper'),
        $activer = $('.primary-nav .menu-logo');
        enquire.register('screen and (min-width: 1025px)', {
            match :function(){
                $activer.removeClass('active');
                $menu.slideUp(0 );   
            }
        });
    };

    // Search submission handler
    var submitSearch = function(event) {
        var form = $(this);
        var inputText = form.children('[type="text"]');
        var submit = form.children('[type="submit"]');
        // Remove focus from submit button
        submit.blur();
        // Show/hide Search text input
        if (inputText.css('opacity') === '0' || inputText.css('visibility') === 'hidden') {
            inputText.css('visibility', 'visible').animate({ 'width': '200px', 'opacity': 1 }, 'fast', function () {
                inputText.val('').focus();
            });
            event.preventDefault();
        } else {
            // Trim whitespace, check for empty query
            if (inputText.val().replace(/^\s+|\s+$/gm,'') === '') {
                inputText.animate({ 'width' : 0, 'opacity': 0 }, 'fast', function () {
                    inputText.css('visibility', 'hidden').val('');
                });
                event.preventDefault();
            }
        }
    };

    var submitSearchMobile = function(event) {
        var form = $(this);
        var inputText = form.children('[type="text"]');
        if (inputText.val().replace(/^\s+|\s+$/gm,'') === '') {
            inputText.val('').focus();
            event.preventDefault();
        }
    };

    // Search submission events
    $('.searchForm.desktop').on('submit', submitSearch);
    $('.searchForm.mobile').on('submit', submitSearchMobile);
    $('.searchForm').on('click', '.searchIcon', function(event) {
        var form = $(this).parent('form');
        form.trigger('submit');
        event.preventDefault();
    });
    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
