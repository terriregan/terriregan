define(['jquery', 
        'gsap'],

function ($) {
    'use strict';

    var form = (function () {
        var frm;

        // public
        var init = function () {
           frm  = $('form');
           bindUI();
           turnLightOn();
        };

        var destroy = function () {

        };

        // private
        var bindUI = function () {
            frm.submit(function(e) {
                var isValid = true;
                $("input[aria-required='true']").each( function() {
                       var field = $(this),
                           err = "";
                       if ($.trim(field.val()).length === 0) {
                           err = 'Required. Please fill.';
                       } else {
                           if (this.type === 'email') {
                               if( !(/(.+)@(.+){2,}\.(.+){2,}/.test(field.val())) ) {
                                   err = "Email address seems invalid.";
                               }
                           }
                       }
                       if(err !== '') {
                            isValid = false;
                            addError(field, err);
                       } else {
                            // remove error in the event it had been previously added
                            removeError(field);
                       }
                }); 
                if(!isValid) {
                     e.preventDefault();
                }   
            })
        };

        var addError = function (el, err) {
            var div = el.parent().children('div');
            el.attr('aria-invalid', true);
            el.addClass('error');
            if(!div.length) {
                $("<div class='contact--error'>" + err + "</div>")
                .hide()
                .prependTo(el.parent())
                .fadeIn();       
            } else {
                if (div.text() !== err ) {
                    div.html(err);
                }
            }
        }

        var removeError = function (el) {
            el.attr('aria-invalid', false);
            el.removeClass('error');
            el.parent().children('div').remove();       
        }

        var turnLightOn = function() {
            var tl = new TimelineLite({repeat:0});
            tl.to($('#contact-lamp'), 0.5, {left:"90%", opacity: "1"});
            tl.to($('.contact--info'), 0.5, {bottom: "0",  opacity: "1"}, '-=0.5');
            tl.to($('#light'), 0.2, {opacity:"1"}, '-=0.2');
        }

        return {
            init: init
        };
    })();
  
    return form;
});