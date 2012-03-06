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
			var i=1, cur=0, next=1, last=quotes.length-1;
			$(quotes).not(quotes[0]).hide();
			setInterval(function() {
				$(quotes[cur]).fadeOut(that.options.animationTime, function() {
					$(quotes[next]).fadeIn(that.options.animationTime);
					cur = next;
					next = (next === last)?0:next+1;
				});
			}, that.options.timer+(2*that.options.animationTime));
		};

		return this.each(function () {
			if ($(this).children().length > 1) {
				_startLooping($(this).children());
			}
		});
	};

	jQuery.fn.quoteFade.defaults = {
		'timer': 5000,
		'animationTime': 500
	};
})(jQuery);