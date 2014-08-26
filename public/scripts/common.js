(function () {
	'use-strict';

	requirejs.config({
		baseUrl: '/scripts',
		paths: {
			'jquery' : [
				'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min',
				'vendor/jquery/dist/jquery.min'
			],
			'TimelineLite' : 'vendor/gsap/TimelineLite.min',
			'TweenLite' : 'vendor/gsap/TweenLite.min',
			'EasePack' : 'vendor/gsap/easing/EasePack.min',
			'CSSPlugin' : 'vendor/gsap/plugins/CSSPlugin.min',
			'gsap' : 'modules/gsap',
			'global' :  'modules/global',
			'form' : 'modules/form',
			'navigation' : 'modules/navigation',
			'hero' : 'modules/hero'
		},
		shim: {
			'TimelineLite' : {
			    exports: 'TimelineLite'
			}
     	}
	});

	require(['jquery', 'global', 'navigation'],
		function ($, global, navigation) {
			global.init();
			
			var startModuleName = $("script[data-main][data-start]").attr("data-start");
			if (startModuleName) {
				require([startModuleName], function (startModule) {
					// $(function () {
					// 	console.log('ready')
					// }
					$(function ()  {
						console.log('load')
					    var fn = $.isFunction(startModule) ? startModule : startModule.init;
					    if (fn) { fn(); }
					});
				});
			}

			$(function () {
				navigation.init();
			});
		}
	);
}());