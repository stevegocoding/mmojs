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
        this._entities = {};
    };

    p.addEntity = function(entity) {
        if (this._entities[entity.id] === undefined) {
            this._entities[entity.id] = entity;

            if (entity.isDrawable())
            {
                var renderer = entity.getComponent("renderer");
                this.game.entityStage.addChild(renderer.getDisplayObject());
            }
        }
        else {
            console.log("The entity already existed! " + entity.id);
        }
    };

    p.setTerrain = function(terrain) {
        if (this._map === null) {
            this._map = terrain;
            this.game.entityStage.addChild(terrain);
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
        var m = this._map;

        this.camera.forEachVisiblePosition(function(x, y) {
            if(!m.isOutOfBounds(x, y)) {
                callback(m.gridPositionToTileIndex(x, y) - 1);
            }
        }, extra);
    };

    p.forEachVisibleTile = function(callback, extra) {
        var m =  this._map;

        if (m.isLoaded) {
            this.forEachVisibleTileIndex(function(tileIndex) {
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

    p.game = null;

    p.camera = null;

    p.scale = 1.0;

    return EntityWorld;
});
