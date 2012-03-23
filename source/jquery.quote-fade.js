/*
 * quoteFade - jQuery Plugin
 *
 * Copyright 2012 Simon Kusterer - simon@soped.com
 */

(function($) {
	jQuery.fn.quoteFade = function (options) {
		var that = this;
		that.options = $.extend({}, jQuery.fn.quoteFade.defaults, options);

		var _startLooping = function(quotes) {
			var block=false, cur=0, next=1, last=quotes.length-1;
			$(quotes).not(quotes[0]).hide();

			var _gotoNext = function() {
				if (block) {
					return;
				}
				block = true;
				$(quotes[cur]).fadeOut(that.options.animationTime, function() {
					$(quotes[next]).fadeIn(that.options.animationTime, function() {
						block = false;
					});
					cur = next;
					next = (next === last)?0:next+1;
				});
			};

			if (!that.options.trigger) {
				setInterval(_gotoNext, that.options.timer+(2*that.options.animationTime));
			} else {
				that.options.trigger.call(that, _gotoNext);
			}
		};

		return this.each(function () {
			if ($(this).children().length > 1) {
				_startLooping($(this).children());
			}
		});
	};

	jQuery.fn.quoteFade.defaults = {
		'trigger': null, // custom function you can use to trigger a cycle
		'timer': 5000,
		'animationTime': 500

	};
})(jQuery);