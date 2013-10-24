/**
 * User: magkbdev
 * Date: 10/23/13
 * Time: 7:41 PM
 * To change this template use File | Settings | File Templates.
 */

define(function() {

    var Transition = function() {
        this.initialize();
    };

    var p = Transition.prototype;

    p.initialize = function() {

    };

    p.start = function(currentTime, updateFunction, stopFunction, startValue, endValue, duration) {
        this.startTime = currentTime;
        this.updateFunction = updateFunction;
        this.stopFunction = stopFunction;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.inProgress = true;
        this.count = 0;
    };

    p.step = function(currentTime) {
        if(this.inProgress) {
            if(this.count > 0) {
                this.count -= 1;
                log.debug(currentTime + ": jumped frame");
            }
            else {
                var elapsed = currentTime - this.startTime;

                if(elapsed > this.duration) {
                    elapsed = this.duration;
                }

                var diff = this.endValue - this.startValue;
                var i = this.startValue + ((diff / this.duration) * elapsed);

                i = Math.round(i);

                if(elapsed === this.duration || i === this.endValue) {
                    this.stop();
                    if(this.stopFunction) {
                        this.stopFunction();
                    }
                }
                else if(this.updateFunction) {
                    this.updateFunction(i);
                }
            }
        }
    };

    p.restart = function(currentTime, startValue, endValue) {
        this.start(currentTime, this.updateFunction, this.stopFunction, startValue, endValue, this.duration);
        this.step(currentTime);
    };

    p.stop = function() {
        this.inProgress = false;
    };

    p.startTime = 0.0;
    p.updateFunction = null;
    p.stopFunction = null;
    p.startValue = 0;
    p.endValue = 0;
    p.duration = 0;
    p.inProgress = false;
    p.count = 0;

    return Transition;
});
