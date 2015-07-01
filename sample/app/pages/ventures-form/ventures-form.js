'use strict';

var APP = window.APP = window.APP || {};

APP.venturesForm = (function(){

    var bindEventsToUI = function() {
        $('#submit').on('click', submitForm);
        $('.alert').hide();
        $('.fake_checkbox').on('click', checkElement);
        $('#acceptance').prop('checked', false);
        $('.file').on('click', openFilePrompt);
        $('input[type="file"]').on('change', fileChangeListener);
    };

    var init = function() {
        console.log('APP.venturesForm');
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
        if(!$('#acceptance').prop( "checked" )){
            isValid = false;
        }
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
            if(!$('#acceptance').prop( "checked" )){
               $('.fake_checkbox').addClass('is-error'); 
            }
            if( !emailValid ){
                $errorMsg.append('<li>'+$('#email').data('error-validation')+'</li>');
                $('#email').addClass('is-error');
                $('label[for="'+$('#email').attr('id')+'"]').addClass('is-error');
            }
            $('.alert').show();
            $("html, body").animate({ scrollTop: $('.alert').offset().top}, 500);
        }       

        return isValid;
    };

    var submitForm = function(event) {
        $('.alert').hide();
        $('.alert ul li').remove();
        $('.required').removeClass('is-error');
        $('label').removeClass('is-error');
        $('.fake_checkbox').removeClass('is-error');
        if(isFormValid()){
            $(this).closest('form').submit();
            return true;
        }
        return false;
    };

    var checkElement = function(event) { //change value of the checkbox
        if($(this).hasClass('checked')){
            $(this).removeClass('checked');
            $('#acceptance').prop('checked', false); 
        }else {
            $(this).addClass('checked');
            $('#acceptance').prop('checked', true);
        }
    };

    var openFilePrompt = function(event) { //trigger the properly input file click with the fake_file element
        $('#'+$(this).closest('.fake_file').data('id')).trigger('click');
    };

    var fileChangeListener = function(event) { //when the input file change, add the properly filename on the span after fake_file, finding the element with the id of the file input.
        $('.form-group').find('.fake_file[data-id="'+$(this).attr('id')+'"] span').text($(this).val());
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
