// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function()
{

    // Highlight empty fields
    $(".validate").focusout(function()
    {
        if (!$.trim(this.value).length)
        {
            $(this).addClass('warning');
        }
        else
        {
            $(this).removeClass('warning');
        }
    });


    // validate submitted from
    $("button#submit").click(function(e)
    {
        e.preventDefault();
        var name = $.trim($("#name").val())
        var telephone = $.trim($("#telephone").val());
        var postcode = $.trim($("#postcode").val());
        var email = $.trim($("#email").val());
        var message = $.trim($("#message").val());

        // validate form fields filled in
        if (name.length > 0 && telephone.length > 0 && postcode.length > 0 && email.length > 0 && message.length > 0)
        {
            ENQUIRYFORM.submitForm(name,telephone,postcode,email,message);
        }
        else
        {
            // Highlight empty fields
            $("form").find(".validate").each(function(e){
                if(!$.trim(this.value).length) {
                    $(this).addClass('warning');
                }
            });
        }
    });

});

// namespaced functions
var ENQUIRYFORM = {};

ENQUIRYFORM.formSubmissionRunning = false;

// Post form details
ENQUIRYFORM.submitForm = function(name,telephone,postcode,email,message) {

    // stops request queueing while ajax call is being made
    if (ENQUIRYFORM.formSubmissionRunning == true){
        return false;
    }

    $.ajax({
        url: '/test',
        dataType: 'json',
        type: "post",
        data: {name:name,telephone:telephone,postcode:postcode,email:email,message:message},
        beforeSend: function(){
            ENQUIRYFORM.formSubmissionRunning = true;
        },
        success: function(result){

        },
        error: function(){},
        complete: function(){
            ENQUIRYFORM.formSubmissionRunning = false;
        }
    });

}