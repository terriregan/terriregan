define(['jquery'],

function ($) {
    'use strict';

    var navigation = (function () {

        var body,
            list,
            button,
            arrow,
            header,
            pageHeader;

        // public
        var init = function () {
            body = $('body');
            list = $('.site-nav--list');
            button = $('.site-nav--button');
            arrow = button.find('fa');
            header = $('.site-header');
            pageHeader = $('.site-page--header');

            bindUI();
            showPage();
        };

        // private
        var bindUI = function () {
            body.on('click', 'a', navHandler);
        };

        var navHandler = function(e) {
            e.preventDefault();
            var url = $(this).attr('href');
            if(url === '#nav') {
                 toggleMenu();
            } else {
                // do not reload the same page
                if(window.location.pathname !== url) {
                    if(Modernizr.csstransitions) {
                        hidePage(url);
                    } else {
                        window.location = url;
                    }
                }
            }
        };

        var showPage = function() {
            body.removeClass('hidden-body');
            header.css('top', 0);
            pageHeader.css('right', 0);
        };

        var hidePage = function(url) {
            header.css('top', '-90px');
            pageHeader.css('right', '90px');
            body.addClass('hidden-body').delay(600).queue(function() {
                 window.location = url;
             });
        };

        var toggleMenu = function()  {
            // turn off active state of mobile menu
            list.find('.active').toggleClass('active');
            button.find('i').toggleClass('fa-caret-up fa-caret-down');
            list.toggleClass('site-nav--display');
        };

        var hideMenu = function()  {
             list.removeClass('site-nav--display');
        };

        return {
            init: init
        };
    })();

    return navigation;
});