/**
 * User: magkbdev
 * Date: 10/14/13
 * Time: 7:20 PM
 * To change this template use File | Settings | File Templates.
 */

define(["easeljs"], function() {

    var EntityWorld = function(game) {
        this.initialize(game);
    };

    var p = EntityWorld.prototype;

    p.initialize = function(game) {
        this.game = game;

        this.rescale(this.getScaleFactor());

        this._entities = {};
        this._tilesize = 16;
    };

    p.setCamera = function(cam) {
        this.camera = cam;

        this.game.canvasDom.width = this.camera.gridW * this._tilesize * this.scale ;
        this.game.canvasDom.height = this.camera.gridH * this._tilesize * this.scale;

        this.game.bgCanvasDom.width = this.game.canvasDom.width;
        this.game.bgCanvasDom.height = this.game.canvasDom.height;

        this.game.entityStage.width = this.camera.gridW;
        this.game.entityStage.height = this.camera.gridH;

        this.game.bgStage.width = this.game.entityStage.width;
        this.game.bgStage.height = this.game.entityStage.height;
    };

    p.addEntity = function(entity) {
        if (this._entities[entity.id] === undefined) {
            this._entities[entity.id] = entity;

            if (entity.drawable)
            {
                var renderer = entity.getComponent("renderer");
                this.game.entityStage.addChild(renderer.getDisplayObject());
            }
        }
        else {
            console.log("The entity already existed! " + entity.id);
        }
    };

    p.setTerrain = function(mapEntity) {
        if (this._map === null) {
            this._map = mapEntity;
            this._mapData = mapEntity.entityData;

            var renderer = mapEntity.getComponent("renderer");
            this.game.bgStage.addChild(renderer.getDisplayObject());
        }
        else
            throw Error("The terrain has already been set!");
    };

    p.removeEntity = function(entity) {

    };

    p.update = function() {
        for (var entityId in this._entities) {
            this._entities[entityId].process();
        }
    };


    p.setCameraView = function(ctx) {
        ctx.translate(-this.camera.x * this.scale, -this.camera.y * this.scale);
    };

    p.forEachVisibleTileIndex = function(callback, extra) {
        var m = this._mapData;

        this.camera.forEachVisiblePosition(function(x, y) {
            if(!m.isOutOfBounds(x, y)) {
                callback(m.gridPositionToTileIndex(x, y) - 1);
            }
        }, extra);
    };

    var debug = true;
    p.forEachVisibleTile = function(callback, extra) {
        var m =  this._mapData;

        if (m.isLoaded) {
            this.forEachVisibleTileIndex(function(tileIndex) {

                if (debug)
                    console.log(tileIndex);

                if(_.isArray(m.data[tileIndex])) {
                    _.each(m.data[tileIndex], function(id) {
                        callback(id-1, tileIndex);
                    });
                }
                else {
                    if(_.isNaN(m.data[tileIndex]-1)) {
                        //throw Error("Tile number for index:"+tileIndex+" is NaN");
                    } else {
                        callback(m.data[tileIndex]-1, tileIndex);
                    }
                }
            }, extra);
        }

        debug = false;
    };

    p.rescale = function(factor) {
        this.scale = this.getScaleFactor();
    };

    p.getScaleFactor = function() {
        var w = window.innerWidth,
            h = window.innerHeight,
            scale;

        this.mobile = false;

        if(w <= 1000) {
            scale = 2;
            this.mobile = true;
        }
        else if(w <= 1500 || h <= 870) {
            scale = 2;
        }
        else {
            scale = 3;
        }

        return scale;
    };

    EntityWorld._instance = null;
    EntityWorld.instance = function() {
        return EntityWorld._instance;
    };


    /**
     * Overriden draw method from
     * @param ctx
     * @param ignoreCache
     */
    /*
    p.draw = function(ctx, ignoreCache) {
    };
    */


    // entiies map
    p._entities = null;
    p._map = null;
    p._mapData = null;
    p._tilesize = 0;

    p.game = null;

    // Rendering parameters
    p.camera = null;
    p.scale = 1.0;
    p.mobile = false;


    return EntityWorld;
});
