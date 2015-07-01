'use strict';

var extraMargin = $('.utilities-container').height();

if(extraMargin === 0){
	extraMargin = $('.menu-mobile-activer').height();
}

else if(extraMargin === null){
	extraMargin = 0;
}

var windowshade = (function(){

	var init = function (extraMargin){
		if (typeof jQuery === 'undefined'){
			throw new Error('Windowshade\'s library requires jQuery');
		}
		else if(typeof enquire === 'undefined'){
			throw new Error('Windowshade\'s library requires enquire');
		}

		else {
			run(extraMargin);
		}
	};

	var run = function(extraMargin){
		initWs();
		openWsByUrl(extraMargin);
		respondToScreenWidth();
		keyPressWs();
	};

	var initWs = function(){

		$('.ws-trigger').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();

			var __self = $(this);
			var __parent = __self.parent();
			var body = __self.siblings().first();

			__parent.toggleClass('is-active');

			if(__parent.data('group')!==undefined){
				var windowshadeList = $('.windowshade');
				closeWsGroup(__parent.data('group'), __parent.attr('id'));

			}

			body.slideToggle();

		});

	};

	var closeWsGroup = function(group, id){
		var windowshadeList = $('.windowshade');
		
		for(var x = 0; x < windowshadeList.length; x++){
			if($(windowshadeList[x]).data('group')===group && 
				$(windowshadeList[x]).attr('id') !== id){
				closeWs($(windowshadeList[x]));
			}
		}
	};

	var closeWs = function(ws){
		var __this = ws;
		__this.removeClass('is-active');
		var body = __this.find('.windowshade__body');
		body.slideUp();
	};

	var openWs = function(ws){
		var __this = ws;
		__this.addClass('is-active');
		var body = __this.find('.windowshade__body');
		body.slideDown();
	};

	var validateState = function(small, large){
		var windowshadeList = $('.windowshade');
		if(small){
			for(var x = 0; x < windowshadeList.length; x++){
				if(!$(windowshadeList[x]).hasClass('active-sm') &&
					!$(windowshadeList[x]).hasClass('active-url')){
					closeWs($(windowshadeList[x]));
				}
				else{
					openWs($(windowshadeList[x]));
				}
			}
		}
		else if(large){
			for(var y = 0; y < windowshadeList.length; y++){
				if(!$(windowshadeList[y]).hasClass('active-lg')&&
					!$(windowshadeList[y]).hasClass('active-url')){
					closeWs($(windowshadeList[y]));
				}
				else{
					openWs($(windowshadeList[y]));
				}
			}
		}
	};

	var respondToScreenWidth = function(){
        
        enquire.register('screen and (min-width: 992px)', {
            match :function(){
                validateState(false, true);
            }
        });

        enquire.register('screen and (max-width: 991px)', {
             match :function(){
                validateState(true, false);
            }
        });
    };

    var openWsByUrl = function(extraMargin){

	    var regexS = '[\\?&]ws=([^&#]*)';
	    var regex = new RegExp( regexS );
	    var results = regex.exec( window.location.href );
	    if( results !== null ){
	        var wsID = '#'+decodeURIComponent(results[1].replace(/\+/g, ' '));
			var pWs = $(wsID);
			pWs.addClass('active-url');
			//openWs(pWs);
			scrollToWs(pWs, extraMargin);
			
		}

	};

	var scrollToWs = function(id, extraMargin){

		setTimeout(function(){
	      	$('html, body')
				.animate({
			        scrollTop: id.offset().top - extraMargin - 10
			    }, 700);
		}, 500);
	};

	//ADA function to open windowshades when spacebar is pressed
	var keyPressWs = function(){
		$('.ws-trigger').on('keypress', function(e){
			if(e.keyCode === 32){
				e.preventDefault();
				e.stopPropagation();

				var __self = $(this).parent();
				if( __self.hasClass('is-active')){
					closeWs(__self);
				}
				else {
					openWs(__self);
					if(__self!==undefined){
						var windowshadeList = $('.windowshade');
						closeWsGroup(__self.data('group'), __self.attr('id'));
					}
				}
			}
		});
	};

	return {
		init: init,
		openWsByUrl: openWsByUrl
	};
}());

windowshade.init(extraMargin);