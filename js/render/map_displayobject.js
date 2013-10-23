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
        this.scale = 2;
    };


    /**
     * Overriden map drawing method
     * @param ctx
     * @param ignoreCache
     */
    p.draw = function(ctx, ignoreCache) {

        ctx.save();

        this.drawMap(ctx);

        this.drawHighTiles(ctx);

        ctx.restore();

    };

    p.drawMap = function(ctx) {

        var self = this;
        // var numTilesX = this.mapData.width / this.mapData.tilesize;

        var tilesetWidth = this.mapData.tilesets[0].width / this.mapData.tilesize;
        EntityWorld.instance().forEachVisibleTile(function(id, index) {
            if (!self.mapData.isHighTile(id)) {
                self.drawTile(ctx, id, self.mapData.tilesets[0], tilesetWidth, self.mapData.width, index);
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

        var s = this.scale;

        if (tileid !== -1) {    // -1 when tile is empty in Tiled. Don't attempt to draw it.

            this.drawScaledImage(ctx,
                                tileset,
                                getX(tileid+1, (setW/1)) * this.mapData.tilesize,
                                Math.floor(tileid / (setW/1)) * this.mapData.tilesize,
                                this.mapData.tilesize,
                                this.mapData.tilesize,
                                getX(cellid + 1, gridW) * this.mapData.tilesize,
                                Math.floor(cellid / gridW) * this.mapData.tilesize);

        }
    };

    var drawed = true;
    p.drawScaledImage = function(ctx, image, x, y, w, h, dx, dy) {
        var s = this.scale;


        ctx.drawImage(image,
                        x * 1,
                        y * 1,
                        w * 1,
                        h * 1,
                        dx * this.scale + 20,
                        dy * this.scale + 20,
                        w * this.scale,
                        h * this.scale);


        // ctx.drawImage(image, 0, 0);
    };

    p.drawHighTiles = function(ctx) {
        var self = this;
        var m = this.mapData;
        var tilesetWidth = this.mapData.tilesets[0].width / this.mapData.tilesize;

        EntityWorld.instance().forEachVisibleTile(function (id, index) {
            if(m.isHighTile(id)) {
                self.drawTile(ctx, id, self.mapData.tilesets[0], tilesetWidth, self.mapData.width, index);
            }
        }, 1);
    };

    p.mapData = null;

    p.scale = 2;


    return MapDisplayObject;

});