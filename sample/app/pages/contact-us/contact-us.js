'use strict';

var APP = window.APP = window.APP || {};

APP.contactUs = (function(){

    var bindEventsToUI = function() {
        $('#submit').on('click', submitForm);
        $('.alert').hide();
    };

    var init = function() {
        console.log('APP.contactUs');
        bindEventsToUI();
    };

    var isFormValid = function(){
        var isValid = true,
        emailValid = true,
        $inputsRequired = $('.required');
        //validate all inputs, selects and textareas
        $inputsRequired.each(function(){
            if( $(this).val() === '' ) {
                isValid = false;
            }
        });
        if($('#email').val() !== ''){
            var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if(!(regex.test($('#email').val()))){
                isValid = false;
                emailValid = false;
            }
        }

        if(!isValid){
            var $errorMsg = $('.alert ul');
            $inputsRequired.each(function(){
                if( $(this).val() === '' ){
                    $errorMsg.append('<li>'+$(this).data('error')+'</li>'); //take the text from the data-error attribute
                    $(this).addClass('is-error'); //add is-error class to input
                    $('label[for="'+$(this).attr('id')+'"]').addClass('is-error'); //add is-error class to label find by ipunt id
                }
            });
            if( !emailValid ){
                $errorMsg.append('<li>'+$('#email').data('error-validation')+'</li>');
                $('#email').addClass('is-error');
                $('label[for="'+$('#email').attr('id')+'"]').addClass('is-error');
            }
            $('.alert').show();
            $("html, body").animate({ scrollTop: $('.alert').offset().top - 135 }, 500); //135 is the width of the sticky primary nav (125px) + 10px of margin  
        }       

        return isValid;
    };

    var submitForm = function(event) {
        $('.alert').hide();
        $('.alert ul li').remove();
        $('.required').removeClass('is-error');
        $('label').removeClass('is-error');
        if(isFormValid()){
            $(this).closest('form').submit();
            return true;
        }
        return false;
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
