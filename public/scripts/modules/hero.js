define([
    'jquery',
    'gsap'
],

function ($, plugins) {
    'use strict';

    var hero = (function () {
        var headLeft,
            headRight,
            headCenter,
            shirt,
            skirt,
            shoeLeft,
            shoeRight,
            loader,
            walker;

        // public
        var init = function () {
            loader = $('#hero--loader');
            walker = $('#hero--avatar-walker');

            // cache svg dom refs
            headLeft = $('#head-left');
            headRight = $('#head-right');
            headCenter = $('#head-center');
            shirt = $('#shirt');
            skirt = $('#skirt');
            shoeLeft = $('#shoe-left');
            shoeRight = $('#shoe-right');

            bindUI();
            runIntroAnimation();
        };

        var destroy = function () {

        };

        // private
        var bindUI = function () {
            // $(window).on('resize', resizeHandler); 
        };

        var resizeHandler = function() {
        };

        var runIntroAnimation = function () {
            if(Modernizr.svg) {
                start();
            }
        };

        var start = function() {
            var center = ($('#hero--avatar-wrapper').width() - walker.width()) / 2,
                frameWidth = walker.width(),
                secondLastFrame = -((frameWidth * 11) - (frameWidth * 3)) + 'px',
                lastFrame = -((frameWidth * 11) - frameWidth) + 'px',
                frames = 8,
                steppedEase = new SteppedEase(0),
                i,
                tl;

            tl = new TimelineLite({repeat:0, onComplete:onWalkComplete});
            tl.to(loader, 0.5, {opacity: 0, delay: 2});

            // tween avatar walk cycle png sprite
            for(i = 0; i < frames; i++) {
               tl.to(walker, 0.1, {backgroundPosition: '-' + (frameWidth*i) + 'px', ease:steppedEase});
            }
            // tween sprite to empty last frame
            tl.to(walker, 0.2, {backgroundPosition: secondLastFrame, ease:steppedEase});
            tl.to(walker, 0.2, {backgroundPosition: lastFrame, ease:steppedEase});

            // fade in svg version of avatar for use in interactions
            tl.to($('#hero--avatar-svg-wrapper'), 0.2, {opacity: 1, ease:steppedEase}, '-=0.2');

            // animmate to page center
            tl.to(walker, 0.8, {left: center}, '-=1');
            tl.fromTo(walker, 0.8, {opacity: 0}, {opacity: 1}, '-=0.8'); // fromTo for opacity for IE8

            // welcome
            tl.fromTo('.hero--header', 0.5, {opacity:0, scaleX: 2, ease: Back.easeOut}, {opacity:1,  scaleX: 1, ease: Back.easeOut});

            // I'm a frontend developer
            tl.fromTo('.hero--tagline', 0.5, {opacity:0, scaleY: 0.8, ease: Back.easeOut}, {opacity:1,  scaleY: 1, ease: Back.easeOut});

            // animate head right
            tl.to(headCenter, 0, {display: 'none'});
            tl.to(headRight, 0, {display: 'block'});

            // design
            tl.fromTo($('#hero--pusher-header'), 0.3, {opacity:0, rotation:-90, ease: Back.easeOut}, {opacity:1,  rotation: 0, ease: Back.easeOut});

            // fade squares in
            for( i = 1; i < 36; i++) {
                tl.to($('#square' + i), 0.05, {opacity: 1});
            }

            // code
            tl.to('#hero--code-wrapper', 0, {visibility: 'visible'});
            tl.fromTo($('#hero--slinger-header'), 0.3, {opacity:0, rotation:-90, ease: Back.easeOut}, {opacity:1,  rotation: 0, ease: Back.easeOut});

            // animate head left
            tl.to(headRight, 0, {display: 'none'}, '-=0.3');
            tl.to(headLeft, 0, {display: 'block'}, '-=0.3');

            // fade code in
            for( i = 1; i < 9; i++) {
                tl.to($('#code' + i), 0.15, {opacity: 1});
            }

            // animate head center
            tl.to(headLeft, 0, {display: 'none', delay: 0.5});
            tl.to(headCenter, 0, {display: 'block'});
        };

        var display = function() {
            $('.hero--header').css('display', 'block');
            $('.hero--tagline').css('display', 'block');
        };

        var onWalkComplete = function () {
            // turn off for screen readers
            walker.css('display', 'none');
            loader.css('display', 'none');

            //$('#hero--pusher-wrapper').on('mouseover', turnHead, 'left');
            //$('#hero--pusher-wrapper').on('mouseout', turnHead);
        };

        var turnHead = function(e) {
            if(e.currentTarget.id == 'hero--pusher-wrapper') {
                console.log('pixel')
            }
            if(e.type == 'mouseover') {
                headCenter.css('display', 'none')
                headRight.css('display', 'block');
            } else {
                headCenter.css('display', 'block')
                headRight.css('display', 'none');
            }
        };

        return {
            init: init
        };
    })();

   return hero;
});

