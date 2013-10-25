/**
 * User: magkbdev
 * Date: 10/25/13
 * Time: 12:57 PM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/entity_world", 'render/map_displayobject', "easeljs"], function(EntityWorld, MapDisplayObject) {

    var DynamicMapDisplayObject = function(mapData) {
        this.initialize(mapData);
    };

    var super_p = MapDisplayObject.prototype;
    var p = DynamicMapDisplayObject.prototype = Object.create(super_p);
    p.constructor = DynamicMapDisplayObject;

    p.initialize = function(mapData) {
        super_p.initialize.call(this, mapData);
    };

    p.draw = function(ctx, ignoreCache) {

        ctx.save();

        this.drawHighTiles(ctx);

        ctx.restore();

    };


    return DynamicMapDisplayObject;
});



