/*
 * simpleFade - jQuery Plugin
 *
 * Copyright 2013 Simon Kusterer - simon@soped.com
 */

(function($) {

  $.fn.simpleFade = function (options) {
    var that = this;
    that.options = $.extend({}, $.fn.simpleFade.defaults, options);

    var _init = function($el) {
      var cur = 0,
          $items = $el.children(),
          len = $items.length,
          next;

      if (!len) {
        return;
      }

      // set first item to visible
      $items.not($items.get(0)).hide();

      var _iterate = function(direction) {
        direction = direction || that.options.direction;
        if (direction === 'backward') {
          next = (cur - 1) % len;
        } else {
          next = (cur + 1) % len;
        }

        var $cur = $($items.get(cur)),
            $next = $($items.get(next));

        $el.trigger('simpleFade.before', $cur, $next);

        $.when($cur.fadeOut(that.options.animationTime))
          .done(function() {
            $.when($next.fadeIn(that.options.animationTime))
              .done(function() {
                $el.trigger('simpleFade.after', $($items.get(cur)), $($items.get(next)));
              });
            cur = next;
          });
      };

      if (that.options.autoplay) {
        setInterval(_iterate, that.options.timer+(2*that.options.animationTime));
      }

      $el.on('simpleFade.next', function() {
        _iterate('forward');
      });

      $el.on('simpleFade.prev', function() {
        _iterate('backward');
      });

    };

    return this.each(function () {
      _init($(this));
    });

  };

  $.fn.simpleFade.defaults = {
    'autoplay': true,
    'timer': 5000,
    'animationTime': 500,
    'direction': 'forward'
  };

})(jQuery);