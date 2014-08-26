define(function () {
    'use strict';

    var global = (function () {

        // public
        var init = function () {
            initConsole();
        };

        var destroy = function () {

        };

        // private
        var bindUI = function () {

        };

        // Avoid 'console' errors in browsers that lack a console.
        var initConsole = function() {
            var method;
            var noop = function () {};
            var methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeStamp', 'trace', 'warn'
            ];
            var length = methods.length;
            var console = (window.console = window.console || {});

            while (length--) {
                method = methods[length];

                // Only stub undefined methods.
                if (!console[method]) {
                    console[method] = noop;
                }
            }
        };

        return {
            init: init
        };
    })();

    return global;
});