/**
 * User: magkbdev
 * Date: 10/12/13
 * Time: 8:15 PM
 * To change this template use File | Settings | File Templates.
 */


    Function.prototype.bind = function (bind) {
        var self = this;
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return self.apply(bind || null, args);
        };
    };

    var isInt = function(n) {
        return (n % 1) === 0;
    };

    var TRANSITIONEND = 'transitionend webkitTransitionEnd oTransitionEnd';

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
