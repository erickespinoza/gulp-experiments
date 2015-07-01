'use strict';

var APP = window.APP = window.APP || {};

APP.interstitial = (function(){

     var enableInterstitial = function () {

        // Interstitial modal/links
        var $interstitialModal = $('#interstitialModal');
        var $confirmBtn = $interstitialModal.find('.btn-primary');
        var $externalLinks = $('a[href*="//"]:not([href*="baxalta.com"])');

        // Bind external links to modal popup
        $externalLinks.on('click', function (event) {
            var externalHREF = $(this).attr('href');
            if (externalHREF !== '') {
                // Bind Confirm button to HREF value
                var $confirm = $interstitialModal.find('.btn-primary');
                $confirm.attr('data-href', externalHREF);
                // Show modal
                $interstitialModal.modal();
            }
            event.preventDefault();
        });

        // Confirm button redirects to HREF value
        $confirmBtn.on('click', function (event) {
            var confirmHREF = $(this).attr('data-href');
            window.location.href = confirmHREF;
            event.preventDefault();
        });
    };

    var bindEventsToUI = function() {
        enableInterstitial();
    };

    var init = function() {
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());