/**
 * User: magkbdev
 * Date: 10/21/13
 * Time: 10:46 AM
 * To change this template use File | Settings | File Templates.
 */


define(function() {

    var Camera = function(world) {
        this.initialize(world);
    };

    var p = Camera.prototype;

    p.initialize = function(world) {

        this.world = world;
        this.x = 0;
        this.y = 0;
        this.gridX = 0;
        this.gridY = 0;
        this.offset = 0.5;

        this.rescale();
    };

    p.rescale = function() {

        var factor = this.world.mobile? 1 : 2;

        this.gridW = 15 * factor;
        this.gridH = 7 * factor;
    };

    p.setPosition = function(x, y) {
        this.x = x;
        this.y = y;

        this.gridX = Math.floor(x / 16);
        this.gridY = Math.floor(y / 16);
    };

    p.setGridPosition = function(x, y) {
        this.gridX = x;
        this.gridY = y;

        this.x = this.gridX * 16;
        this.y = this.gridY * 16;
    };

    p.forEachVisiblePosition = function(callback, extra) {
        var extra = extra || 0;
        for(var y=this.gridY-extra, maxY=this.gridY+this.gridH+(extra*2); y < maxY; y += 1) {
            for(var x=this.gridX-extra, maxX=this.gridX+this.gridW+(extra*2); x < maxX; x += 1) {
                callback(x, y);
            }
        }
    };

    p.x = 0;
    p.y = 0;
    p.gridX = 0;
    p.gridY = 0;
    p.offset = 0.5;

    p.gridW = 0;
    p.gridH = 0;

    p.world = null;

    return Camera;
});
