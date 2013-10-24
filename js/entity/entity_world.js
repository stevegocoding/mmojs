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
        this.scale = 2;

        this.lastClickPos = {x: 0, y: 0};

        this.fps = createjs.Ticker.getFPS();
    };

    p.initPathingGrid = function() {
        this.pathingGrid = [];
        for(var i=0; i < this._mapData.height; i += 1) {
            this.pathingGrid[i] = [];
            for(var j=0; j < this._mapData.width; j += 1) {
                this.pathingGrid[i][j] = this._mapData.grid[i][j];
            }
        }
        log.info("Initialized the pathing grid with static colliding cells.");
    };

    p.setNavigator = function(nav) {
        this.navigator = nav;
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
        this.updateCursor();

        for (var entityId in this._entities) {
            this._entities[entityId].process();
        }
    };

    p.updateCursor = function() {
        var mouse = this.getMouseGridPos(),
            x = mouse.x,
            y = mouse.y;

        this.hoveringCollidingTile = this._mapData.isCollding(x, y);



        if (this.hoveringCollidingTile) {
            this.targetColor = "rgba(255, 50, 50, 0.5)";
        }
        else
            this.targetColor = "rgba(255, 255, 255, 0.5)"
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

    p.forEachVisibleTile = function(callback, extra) {
        var m =  this._mapData;

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


    p.handleClick = function(event) {
        var pos = this.stagePosToGridPos(event.stageX, event.stageY);

        if (pos.x === this.lastClickPos.x &&
            pos.y === this.lastClickPos.y) {

            return;
        }
        else {
            this.lastClickPos = pos;
            this.moveCharacter(this._entities[1], pos.x, pos.y);

            console.log("CLICK: " + "x: " + pos.x + " y: " + pos.y);
        }

    };

    p.stagePosToGridPos = function(stageX, stageY) {
        var cam = this.camera;
        var scale = this.scale;
        var ts = this._mapData.tilesize;
        var offsetX = stageX % (ts * scale);
        var offsetY = stageY % (ts * scale);
        var x = ((stageX - offsetX) / (ts * scale)) + cam.gridX;
        var y = ((stageY - offsetY) / (ts * scale)) + cam.gridY;

        return { x: x, y: y };
    };

    p.getMouseGridPos = function() {

        var mx = this.game.entityStage.mouseX;
        var my = this.game.entityStage.mouseY;

        return this.stagePosToGridPos(mx, my);
    };


    p.moveCharacter = function(character, x, y) {
        if (!this._mapData.isOutOfBounds(x, y)) {
            character.moveTo(x, y);
        }
    };

    /**
     * Finds a path to a grid position for the specified character.
     * The path will pass through any entity present in the ignore list.
     * @param character
     * @param x
     * @param y
     * @param ignoreList
     */
    p.findPath = function(character, x, y, ignoreList) {
        var self = this,
            grid = this.pathingGrid,
            path = [];

        if (this._mapData.isCollding(x, y)) {
            return path;
        }

        if (this.navigator && character) {
            var gridPos = character.getGridPos();
            var start = [gridPos.x, gridPos.y];
            var end = [x, y];
            path = this.navigator.findPath(grid, start, end, false);
        }
        else {
            log.error("Error while finding the path");
        }

        return path;
    };

    p.currentTime = function() {
        return createjs.Ticker.getTime();
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
    p.fps = 0;

    // Mouse and Controlling
    p.lastClickPos = null;
    p.hoveringCollidingTile = false;
    p.targetColor = "rgba(255, 50, 50, 0.5)";

    // Game logic
    p.navigator = null;
    p.entityGrid = null;
    p.pathingGrid = null;
    p.renderingGrid = null;


    return EntityWorld;
});
