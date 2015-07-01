'use strict';

var tracking = (function(){

	//Replace this json to match your tracking settings
	var jsonURL = "./assets/json/tracking.json";

	var init = function (){

		if (typeof jQuery === 'undefined'){
			throw new Error('tracking.js library requires jQuery');
		}
		else if (typeof _ === 'undefined'){
			throw new Error('tracking.js library requires lodash');
		}
		else {
			run(arguments);
		}
	};

	var run = function(args){
		if(args[0].global && 
			args[0].global!== undefined){
			setupGlobalLinks();
		}

		if(args[0].trackme && 
			args[0].trackme!== undefined){
			bindWTData();
		}
	};

	//This function reads all the globals childnodes in the json file, then call bindWTLinks 
	var setupGlobalLinks = function(){

		var jqxhr = $.getJSON( jsonURL )
			.done(function(data) {
				//Filter Only Globals
				var linkObjects = _.filter(data, function(n, key){
				  return key.toLowerCase().trim() === '[global]';
				});

				_(linkObjects[0]).forEach(function(n, key){
					bindWTLinks(n, key);
				}).value();
				
			})
			.fail(function() {
				throw new Error( "json invalid or inaccessible" );
			});

	};

	var bindWTLinks = function(node, key){
		$(key).on('click', function(mEvent){
			mEvent.preventDefault();
			var target = $(this);
			var newArguments = _.clone(node.WT);

			if(target.attr('title') !== undefined){
				newArguments= replaceArgument(newArguments, target.attr('title').trim(), '[text]');
			}
			else if(target.text() !== undefined){
				newArguments= replaceArgument(newArguments, target.text().trim(), '[text]');
			}

			var finalFArguments = [mEvent, target, node.stopPropagation];
			fireWT(newArguments, locationHref, finalFArguments);
			
		});
	};

	//Main: continue the links default location event
	var locationHref = function(finalFArguments){
		if(finalFArguments[2]=== undefined){
			finalFArguments[2] = false;
		}
		if(finalFArguments[0].currentTarget.localName === 'a'){
			if(finalFArguments[1].attr('href').trim()!=='#' || 
				finalFArguments[1].attr('href').length === 0){
				if(finalFArguments[2] === false){
					window.location.href = finalFArguments[1].attr('href');
				}
			}
		}
	};
	
	//Main: Replace Argument in the json files like [text]
	var replaceArgument = function(wtArgs, newVal, currentVal){
		var newArgs = wtArgs;

		_.forEach(newArgs, function(n, key) {
			//TODO: next line must be deleted.
			newVal = newVal.trim().replace(/&/g, 'and').replace(/\s/g, '_');
			newArgs[key] = n.replace(currentVal, newVal);
		});

		return newArgs;
	};

	var bindWTData = function(){
		$('a').on('click', function(mEvent){
			var target = $(this);
			var trackme = target.data('track-me');
			var allClasses = [];
			if(trackme!==undefined && trackme.trim()==='new'){
				mEvent.preventDefault();
				createCustomTracking(target, mEvent);
			}else if(trackme!==undefined && trackme.trim()!==''){
				mEvent.preventDefault();
				allClasses = target.data('track-me').split(' ');
				var indexFound = _.filter(allClasses, function(chr) {
				    return chr.search('track-')>=0;
				});
				fireWTById(indexFound, target, mEvent);
			}
			
		}); 
	};

	var fireWTById = function(arrayId, target, mEvent){
		
		var jqxhr = $.getJSON( jsonURL )
			.done(function(data) {
				//Filter Only custom
				var linkObjects = _.filter(data, function(n, key){
				  return key.toLowerCase().trim() === '[custom]';
				});
				
				_(linkObjects[0]).forEach(function(node){
					/*jshint -W083 */
					for(var x = 0; x <= arrayId.length; x++){
						if(arrayId[x] === node.id){
							var newArguments = _.clone(node.WT);

							if(target.attr('title') !== undefined){
								newArguments= replaceArgument(newArguments, target.attr('title').trim(), '[text]');
							}
							else if(target.text() !== undefined){
								newArguments= replaceArgument(newArguments, target.text().trim(), '[text]');
							}
							var finalFArguments = [mEvent, target, node.stopPropagation];
							fireWT(newArguments, locationHref, finalFArguments);
						}
					}
				}).value();
				
			})
			.fail(function() {
				throw new Error( "invalid json or inaccessible" );
			});

	};

	var globalFireWTById = function(trackId, mText) {
		var jqxhr = $.getJSON( jsonURL )
			.done(function(data) {
				//Filter Only custom
				var linkObjects = _.filter(data, function(n, key){
				  return key.toLowerCase().trim() === '[custom]';
				});
				
				_(linkObjects[0]).forEach(function(node){
					
					if(trackId === node.id){
						var newArguments = _.clone(node.WT);

						if(mText !== undefined){
							newArguments= replaceArgument(newArguments, mText, '[text]');
						}

						fireWT(newArguments);
					}
					
				}).value();
				
			})
			.fail(function() {
				throw new Error( "invalid json or inaccessible" );
			});
	};

	var createCustomTracking = function(target, mEvent){
		var WT = {
			"WT.dl": ((target.data('track-eventId')!==undefined) ?  target.data('track-eventId') : ""),
			"WT.ti": ((target.data('track-ti')!==undefined) ?  target.data('track-ti') : ""),
			"WT.event": ((target.data('track-event')!==undefined) ?  target.data('track-event') : ""),
			"WT.cg_n": ((target.data('track-cgn')!==undefined) ?  target.data('track-cgn') : ""),
			"WT.cg_s": ((target.data('track-cgs')!==undefined) ?  target.data('track-cgs') : ""),
			"WT.mc_ev": ((target.data('track-searchTerm')!==undefined) ?  target.data('track-searchTerm') : "")
		};

		var finalFArguments = [mEvent, target, target.data('track-stopPropagation')];
		fireWT(WT, locationHref, finalFArguments);
	};

	//Main: fireWT() fires the webtrends library
	//Others: callback funtion can be passed
	var fireWT = function(wtArgs, finalF, finalFArguments){
		//This global function calls the webtrends library
		Webtrends.multiTrack({
        	args: wtArgs,
        	callback: function () {
                setTimeout(function(){
                	if(finalF!==undefined){
                		finalF(finalFArguments);
                	}
                }, 500);
        	}
 		});
	};

	return {
		init: init,
		fire: globalFireWTById
	};

}());

tracking.init(
	{
		global: true,
		trackme: true
	}
);
