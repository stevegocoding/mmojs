/**
 * User: magkbdev
 * Date: 10/17/13
 * Time: 12:00 PM
 * To change this template use File | Settings | File Templates.
 */

define(["jquery"], function($) {

    var MapData = function(filePath) {
        this.initialize(filePath);
    };

    var p = MapData.prototype;

    p.initialize = function(filePath) {

        var useWebWorker = false;

        this._loadMap(filePath, useWebWorker);
        this._initTilesets();
    };

    p._loadMap = function(filePath, useWebWorker) {
        var self = this;
        if (useWebWorker) {

        }
        else {      // Use Ajax to load the map

            $.get(filePath, function(data) {
                self._initMap(data);
                self._generateCollisionGrid();
                self.mapLoaded = true;
                self._checkReady();
            }, 'json');
        }
    };

    p._initTilesets = function() {

        var tileset1;
        this.tilesetCount = 1;
        tileset1 = this._loadTileset('assets/images/tilesheet.png');

        this.tilesets = [tileset1];
    };

    p._checkReady = function() {
        if (this.tilesetsLoaded && this.mapLoaded) {
            this.isLoaded = true;
            if (this.ready_func) {
                this.ready_func();
            }
        }
    };

    p._initMap = function(mapJson) {

        this.data = mapJson.data;
        this.width = mapJson.width;
        this.height = mapJson.height;
        this.tilesize = mapJson.tilesize;
        this.collisions = mapJson.collisions;
        this.high = mapJson.high;
        this.blocking =  mapJson.blocking || [];
        this.plateau = mapJson.plateau || [];
        this.musicAreas = mapJson.musicAreas || [];

        this.doors = [];
        this.checkpoints = [];
    };

    p._generateCollisionGrid = function() {
        var self = this;

        this.grid = [];
        for (var j, i = 0; i < this.height; ++i) {
            this.grid[i] = [];
            for (j = 0; j < this.width; ++j) {
                this.grid[i][j] = 0;
            }
        }

        _.each(this.collisions, function(tileIndex) {
            var pos = self.tileIndexToGridPosition(tileIndex+1);
            self.grid[pos.y][pos.x] = 1;
        });

        _.each(this.blocking, function(tileIndex) {
            var pos = self.tileIndexToGridPosition(tileIndex+1);
            if (self.grid[pos.y] !== undefined ) {
                self.grid[pos.y][pos.x] = 1;
            }
        });

        log.info("Collision grid genereated.");
    };

    p._loadTileset = function(filePath) {
        var self = this;
        var tileset = new Image();
        tileset.src = filePath;

        log.info("Loading tileset: " + filePath);

        tileset.onload = function() {
            if (tileset.width % self.tilesize > 0) {
                throw Error("Tileset size should be a multiple of "+ self.tilesize);
            }
            log.info("Map tileset loaded");

            self.tilesetCount -= 1;
            if (self.tilesetCount == 0) {
                log.debug("All map tilesets loaded. ");

                self.tilesetsLoaded = true;
                self._checkReady();
            }
        };

        return tileset;
    };

    p.ready = function(f) {
        this.ready_func = f;
    };

    p.tileIndexToGridPosition = function(tileNum) {
        var x = 0,
            y = 0;

        var getX = function(num, w) {
            if (num == 0) {
                return 0;
            }
            return (num % w == 0) ? w - 1 : (num % w) - 1;
        };

        tileNum -= 1;
        x = getX(tileNum + 1, this.width);
        y = Math.floor(tileNum / this.width);

        return {x: x, y: y};
    };

    p.gridPositionToTileIndex = function(x, y) {
        return (y * this.width) + x + 1;
    };

    p.isCollding = function(x, y) {
        if (this.isOutOfBounds(x, y) || !this.grid) {
            return false;
        }
        return (this.grid[y][x] === 1);
    };

    p.isOutOfBounds = function(x, y) {
        return isInt(x) && isInt(y) && (x < 0 || x >= this.width || y < 0 || y >= this.height);
    };

    p.isHighTile = function(id) {
        var ret = _.indexOf(this.high, id+1) >= 0;

        return ret;
    };


    p.getId = function() {
        return this._id;
    };

    p.getName = function() {
        return this._name;
    };

    p.getTypeName = function() {
        return this._typeName;
    };


    p.tilesets = [];
    p.data = [];
    p.width = 0;
    p.height = 0;
    p.tilesize = null;
    p.musicAreas = [];
    p.collisions = [];
    p.high = [];
    p.doors = [];
    p.checkpoints = [];
    p.mapLoaded = false;
    p.grid = null;

    p.isLoaded = false;
    p.tilesetsLoaded = false;
    p.mapLoaded = false;
    p.tilesetCount = 1;

    p._id = 999;
    p._name = "map";
    p._typeName = "Map";


    return MapData;
});