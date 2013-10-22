/**
 * User: magkbdev
 * Date: 10/18/13
 * Time: 12:43 AM
 * To change this template use File | Settings | File Templates.
 */


var _ = require("../js/lib/underscore-min");


var map,
    collidingTiles = {};


module.exports = function processMap(tiledJson, options) {

    var self = this;
    var layerIndex = 0;
    var tileIndex = 0;
    var tilesetFilePath = "";

    map = {
        width: 0,
        height: 0,
        collisions: [],
        doors: [],
        checkpoints: []
    };

    var mode = options.mode;

    if (mode === "client") {
        map.data = [];
        map.high = [];
        map.animated = [];
        map.blocking = [];
        map.plateau = [];
        map.musicAreas = [];
    }

    map.width = tiledJson.width;
    map.height = tiledJson.height;
    map.tilesize = tiledJson.tilewidth;

    // Tile properties (collision, z-index, animation length...)
    var tileProperties;
    var handleProperty = function(property, id) {
        if (property.name === "c") {
            collidingTiles[id] = true;
        }

        if (mode === "client") {
            if (property.name === "v") {
                map.high.push(id);
            }
            if (property.name === "length") {

            }
            if (property.name === "delay") {

            }
        }
    };


    // Process tileset
    if (tiledJson.tilesets instanceof Array) {

        _.each(tiledJson.tilesets, function (tileset) {
            if (tileset.name === "tilesheet") {
                tileProperties = tileset.tileproperties;
                for (var tileId in tileProperties) {
                    var property = tileProperties[tileId];
                    for (var p in property) {
                        var o = {};
                        o.name = p;
                        handleProperty(o, parseInt(tileId)+1);
                    }
                }
            }
        });
    }


    // Process objects group


    // Process layers
    if (tiledJson.layers instanceof Array) {
        console.log("layers: " + tiledJson.layers.length);
        for (var i = tiledJson.layers.length-1; i >= 0; --i) {
            processLayer(tiledJson.layers[i]);
        }
    }
    else {
        processLayer(tiledJson.layers);
    }

    if(mode === "client") {
        // Set all undefined tiles to 0
        for(var i=0, max=map.data.length; i < max; i+=1) {
            if(!map.data[i]) {
                map.data[i] = 0;
            }
        }
    }

    return map;
};


var processLayer = function(layer) {

    var tiles = layer.data;
    if (layer.visible !== 0 && layer.name !== "entities") {

        for (var i = 0; i < tiles.length; ++i) {
            var gid = tiles[i];
            if (gid > 0) {
                if (map.data[i] === undefined) {
                    map.data[i] = gid;
                }
                else if (map.data[i] instanceof Array) {
                    map.data[i].unshift(gid);
                }
                else {
                    map.data[i] = [gid, map.data[i]];
                }
            }

            if (gid in collidingTiles) {
                map.collisions.push(i);
            }
        }
    }
}