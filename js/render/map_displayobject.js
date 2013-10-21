/**
 * User: magkbdev
 * Date: 10/20/13
 * Time: 1:54 PM
 * To change this template use File | Settings | File Templates.
 */


define(["entity/entity_world", "easeljs"], function(EntityWorld) {

    var MapDisplayObject = function(mapData) {
        this.initialize(mapData);
    };

    var super_p = createjs.DisplayObject.prototype;
    var p = MapDisplayObject.prototype = Object.create(super_p);
    p.constructor = MapDisplayObject;

    p.initialize = function(mapData) {
        super_p.initialize.call(this);

        this.mapData = mapData;
        this.scale = 1;
    };


    /**
     * Overriden map drawing method
     * @param ctx
     * @param ignoreCache
     */
    p.draw = function(ctx, ignoreCache) {

        ctx.save();

        ctx.restore();

    };

    p.drawMap = function(ctx) {

        var self = this;
        var numTilesX = this.mapData.width / this.mapData.tilesize;

        EntityWorld.instance().forEachVisibleTile(function(id, index) {
            if (!self.mapData.isHighTile(id)) {
                self.drawTile(ctx, id, self.tilesets[0], numTilesX, self.mapData.width, index);
            }
        }, 1);
    };

    var getX = function(id, w) {
        if(id == 0) {
            return 0;
        }
        return (id % w == 0) ? w - 1 : (id % w) - 1;
    };

    p.drawTile = function(ctx, tileid, tileset, setW, gridW, cellid) {

        if (tileid !== -1) {    // -1 when tile is empty in Tiled. Don't attempt to draw it.

            this.drawScaledImage(ctx,
                                tileset,
                                getX(tileid+1, (setW/s)) * this.mapData.tilesize,
                                Math.floor(tileid / (setW / s)) * this.mapData.tilesize,
                                this.tilesize,
                                this.tilesize,
                                getX(cellid + 1, gridW) * this.mapData.tilesize,
                                Math.floor(cellid / gridW) * this.mapData.tilesize);

        }
    };

    p.drawScaledImage = function(ctx, image, x, y, w, h, dx, dy) {
        var s = this.scale;

        ctx.drawImage(image,
                        x * s,
                        y * s,
                        w * s,
                        h * s,
                        dx * this.scale,
                        dy * this.scale,
                        w * this.scale,
                        h * this.scale);

    };

    p.mapData = null;

    p.scale = 1;

});
