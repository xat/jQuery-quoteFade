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
			var block=false, cur=0, next, last=quotes.length-1;
			$(quotes).not(quotes[0]).hide();

			var _goto = function(direction) {
				if (block) {
					return;
				}
				direction = direction || that.options.direction;
				if (direction === 'backward') {
					next = (cur === 0)?last:cur-1;
				} else {
					next = (cur === last)?0:cur+1;
				}
				block = true;

				if (that.options.onchangebefore) {
					that.options.onchangebefore.call(that, $(quotes[cur]), $(quotes[next]));
				}

				$(quotes[cur]).fadeOut(that.options.animationTime, function() {
					$(quotes[next]).fadeIn(that.options.animationTime, function() {
						if (that.options.onchangeafter) {
							that.options.onchangeafter.call(that, $(quotes[cur]), $(quotes[next]));
						}
						block = false;
					});
					cur = next;
				});
			};

			if (!that.options.trigger) {
				setInterval(_goto, that.options.timer+(2*that.options.animationTime));
			} else {
				that.options.trigger.call(that, _goto);
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
		'onchangebefore': null,
		'onchangeafter': null,
		'timer': 5000,
		'animationTime': 500,
		'direction': 'backward'
	};
})(jQuery);