/**
 * User: magkbdev
 * Date: 10/24/13
 * Time: 11:32 AM
 * To change this template use File | Settings | File Templates.
 */


define(['entity/entity_world', 'easeljs'], function(EntityWorld) {

    var GameStage = function(bgDom, entityDom) {
        this.initialize(bgDom, entityDom);
    };

    var super_p = createjs.Stage.prototype;
    var p = GameStage.prototype = Object.create(super_p);
    p.constructor = GameStage;


    p.initialize = function(bgDom, entityDom) {
        this.id = createjs.UID.get();
        this._matrix = new createjs.Matrix2D();
        this._rectangle = new createjs.Rectangle();

        this.children = [];

        this.bgCanvas = (typeof bgDom == "string") ? document.getElementById(bgDom) : bgDom;
        this.entityCanvas = (typeof entityDom == "string") ? document.getElementById(entityDom) : entityDom;

        this._pointerData = {}; 
    };

    p.setMapData = function(mapData) {
        this.mapData = mapData;
    };

    p.Stage_updateContext = super_p.updateContext;
    p.updateContext = function(ctx) {
        this.Stage_updateContext(ctx);
        this.applyCameraTransform(ctx);
    };

    p.applyCameraTransform = function(ctx) {
        var s = EntityWorld.instance().scale,
            dx = EntityWorld.instance().camera.x,
            dy = EntityWorld.instance().camera.y;
        ctx.translate(-dx*s, -dy*s);
    };

    p.Stage_draw = super_p.draw;
    p.draw = function(ctx) {

        if (this.isBackground) {
            this.Stage_draw(ctx);
        }
        else {
            ctx.save();

            this.drawEntities(ctx);
            this.drawHighTiles(ctx);

            ctx.restore();
        }
    };

    p.drawEntities = function(ctx) {
        var entities = EntityWorld.instance()._entities;
        for (var id in entities) {
            entities[id].render(ctx);
        }
    };

    p.drawAniamtedTiles = function(ctx) {

    };

    p.drawStaticTiles = function(ctx) {

        var self = this;
        // var numTilesX = this.mapData.width / this.mapData.tilesize;

        var tilesetWidth = this.mapData.tilesets[0].width / this.mapData.tilesize;
        EntityWorld.instance().forEachVisibleTile(function(id, index) {
            if (!self.mapData.isHighTile(id)) {
                self.drawTile(ctx, id, self.mapData.tilesets[0], tilesetWidth, self.mapData.width, index);
            }
        }, 1);

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

    var getX = function(id, w) {
        if(id == 0) {
            return 0;
        }
        return (id % w == 0) ? w - 1 : (id % w) - 1;
    };

    p.drawTile = function(ctx, tileid, tileset, setW, gridW, cellid) {

        var s = EntityWorld.instance().scale;

        if (tileid !== -1) {    // -1 when tile is empty in Tiled. Don't attempt to draw it.

            this.drawScaledImage(ctx,
                tileset,
                getX(tileid+1, (setW/s)) * this.mapData.tilesize,
                Math.floor(tileid / (setW/s)) * this.mapData.tilesize,
                this.mapData.tilesize,
                this.mapData.tilesize,
                getX(cellid + 1, gridW) * this.mapData.tilesize,
                Math.floor(cellid / gridW) * this.mapData.tilesize);

        }
    };

    p.drawScaledImage = function(ctx, image, x, y, w, h, dx, dy) {

        var s = EntityWorld.instance().scale;

        ctx.drawImage(image,
            x * s,
            y * s,
            w * s,
            h * s,
            dx * s,
            dy * s,
            w * s,
            h * s);
    };

    p.drawTileHighlight = function(ctx, x, y, color) {
        var s = EntityWorld.instance().scale,
            ts = this.mapData.tilesize,
            tx = x * ts * s,
            ty = y * ts * s;

        ctx.save();
        ctx.lineWidth = 2 * s;
        ctx.strokeStyle = color;
        ctx.translate(tx+2, ty+2);
        ctx.strokeRect(0, 0, (this.mapData.tilesize * s) - 4, (this.mapData.tilesize * s) - 4);
        ctx.restore();
    };

    p.mapData = null;

    p.bgCanvas = null;
    p.entityCanvas = null;


    return GameStage;
});