/**
 * swipeSlide
 * http://ons.me/500.html
 * 瑗块棬
 * 3.2.1(150331)
 */
!
function(a, b) {
    "use strict";
    function h(a, b, c) {
        b.css({
            "-webkit-transition": "all " + c + "s " + a.opts.transitionType,
            transition: "all " + c + "s " + a.opts.transitionType
        })
    }
    function i(a, b, c) {
        var d = a.opts.axisX ? c + "px,0,0": "0," + c + "px,0";
        b.css({
            "-webkit-transform": "translate3d(" + d + ")",
            transform: "translate3d(" + d + ")"
        })
    }
    function j(a, c) {
        var d = a.opts.ul.children(),
        e = d.eq(c).find("[data-src]");
        e && e.each(function() {
            var c = b(this);
            c.is("img") ? (c.attr("src", c.data("src")), c.removeAttr("data-src")) : (c.css({
                "background-image": "url(" + c.data("src") + ")"
            }), c.removeAttr("data-src"))
        })
    }
    function k(a) {
        e.touch && !a.touches && (a.touches = a.originalEvent.touches)
    }
    function l(a, b) {
        b.isScrolling = void 0,
        b._startX = e.touch ? a.touches[0].pageX: a.pageX || a.clientX,
        b._startY = e.touch ? a.touches[0].pageY: a.pageY || a.clientY
    }
    function m(a, b) {
        b._moveDistance = b._moveDistanceIE = 0,
        b.opts.autoSwipe && p(b),
        b.allowSlideClick = !1,
        b._curX = e.touch ? a.touches[0].pageX: a.pageX || a.clientX,
        b._curY = e.touch ? a.touches[0].pageY: a.pageY || a.clientY,
        b._moveX = b._curX - b._startX,
        b._moveY = b._curY - b._startY,
        "undefined" == typeof b.isScrolling && (b.isScrolling = b.opts.axisX ? !!(Math.abs(b._moveX) >= Math.abs(b._moveY)) : !!(Math.abs(b._moveY) >= Math.abs(b._moveX))),
        b.isScrolling && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, h(b, b.opts.ul, 0), b._moveDistance = b._moveDistanceIE = b.opts.axisX ? b._moveX: b._moveY),
        b.opts.continuousScroll || (0 == b._index && b._moveDistance > 0 || b._index + 1 >= b._liLength && b._moveDistance < 0) && (b._moveDistance = 0),
        i(b, b.opts.ul, -(b._slideDistance * b._index - b._moveDistance))
    }
    function n(a) {
        a.isScrolling || o(a),
        (c.ie10 || c.ie11) && (Math.abs(a._moveDistanceIE) < 5 && (a.allowSlideClick = !0), setTimeout(function() {
            a.allowSlideClick = !0
        },
        100)),
        Math.abs(a._moveDistance) <= a._distance ? q(a, "", ".3") : a._moveDistance > a._distance ? q(a, "prev", ".3") : q(a, "next", ".3")
    }
    function o(a) {
        a.opts.autoSwipe && (p(a), a.autoSlide = setInterval(function() {
            q(a, "next", ".3")
        },
        a.opts.speed))
    }
    function p(a) {
        clearInterval(a.autoSlide)
    }
    function q(a, b, c) {
        "number" == typeof b ? (a._index = b, a.opts.lazyLoad && (a.opts.continuousScroll ? (j(a, a._index), j(a, a._index + 1), j(a, a._index + 2)) : (j(a, a._index - 1), j(a, a._index), j(a, a._index + 1)))) : "next" == b ? (a._index++, a.opts.lazyLoad && (a.opts.continuousScroll ? j(a, a._index + 2) : j(a, a._index + 1))) : "prev" == b && (a._index--, a.opts.lazyLoad && (a._index < 0 ? j(a, a._liLength - 1) : a.opts.continuousScroll ? j(a, a._index) : j(a, a._index - 1))),
        a.opts.continuousScroll ? a._index >= a._liLength ? (r(a, c), a._index = 0, setTimeout(function() {
            r(a, 0),
            a.opts.callback(a._index, a._liLength)
        },
        300)) : a._index < 0 ? (r(a, c), a._index = a._liLength - 1, setTimeout(function() {
            r(a, 0),
            a.opts.callback(a._index, a._liLength)
        },
        300)) : r(a, c) : (a._index >= a._liLength ? a._index = 0 : a._index < 0 && (a._index = a._liLength - 1), r(a, c)),
        a.opts.callback(a._index, a._liLength)
    }
    function r(a, b) {
        h(a, a.opts.ul, b),
        i(a, a.opts.ul, -a._index * a._slideDistance)
    }
    var f, g, c = {
        ie10: a.navigator.msPointerEnabled,
        ie11: a.navigator.pointerEnabled
    },
    d = ["touchstart", "touchmove", "touchend"],
    e = {
        touch: a.Modernizr && Modernizr.touch === !0 ||
        function() {
            return !! ("ontouchstart" in a || a.DocumentTouch && document instanceof DocumentTouch)
        } ()
    };
    c.ie10 && (d = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
    c.ie11 && (d = ["pointerdown", "pointermove", "pointerup"]),
    f = {
        touchStart: d[0],
        touchMove: d[1],
        touchEnd: d[2]
    },
    b.fn.swipeSlide = function(a) {
        return new g(this, a)
    },
    g = function(a, c) {
        var d = this;
        d.$el = b(a),
        d._index = 0,
        d._distance = 50,
        d.allowSlideClick = !0,
        d.init(c)
    },
    g.prototype.init = function(d) {
        function p() {
            var c, a = e.opts.ul.children();
            e._slideDistance = e.opts.axisX ? e.opts.li.width() : e.opts.li.height(),
            h(e, e.opts.ul, 0),
            i(e, e.opts.ul, -e._slideDistance * e._index),
            h(e, a, 0),
            c = e.opts.continuousScroll ? -1 : 0,
            a.each(function(a) {
                i(e, b(this), e._slideDistance * (a + c))
            })
        }
        var g, e = this;
        return e.opts = b.extend({},
        {
            ul: e.$el.children("ul"),
            li: e.$el.children().children("li"),
            continuousScroll: !1,
            autoSwipe: !0,
            speed: 4e3,
            axisX: !0,
            transitionType: "ease",
            lazyLoad: !1,
            callback: function() {}
        },
        d),
        e._liLength = e.opts.li.length,
        e.isScrolling,
        e._liLength <= 1 ? !1 : (e.opts.lazyLoad && (j(e, "0"), j(e, "1"), e.opts.continuousScroll && j(e, e._liLength - 1)), e.opts.continuousScroll && e.opts.ul.prepend(e.opts.li.last().clone()).append(e.opts.li.first().clone()), p(), (c.ie10 || c.ie11) && (g = "", g = e.opts.axisX ? "pan-y": "none", e.$el.css({
            "-ms-touch-action": g,
            "touch-action": g
        }), e.$el.on("click",
        function() {
            return e.allowSlideClick
        })), o(e), e.opts.callback(e._index, e._liLength), e.$el.on(f.touchStart,
        function(a) {
            k(a),
            l(a, e)
        }), e.$el.on(f.touchMove,
        function(a) {
            k(a),
            m(a, e)
        }), e.$el.on(f.touchEnd,
        function() {
            n(e)
        }), e.opts.ul.on("webkitTransitionEnd MSTransitionEnd transitionend",
        function() {
            o(e)
        }), b(a).on("onorientationchange" in a ? "orientationchange": "resize",
        function() {
            clearTimeout(e.timer),
            e.timer = setTimeout(p, 150)
        }), void 0)
    },
    g.prototype.goTo = function(a) {
        var b = this;
        q(b, a, ".3")
    }
} (window, window.Zepto || window.jQuery);