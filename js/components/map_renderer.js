/**
 * User: magkbdev
 * Date: 10/20/13
 * Time: 1:34 PM
 * To change this template use File | Settings | File Templates.
 */


define(["entity/component","render/map_displayobject", 'render/dynamic_map', "easeljs"],
    function(Component, MapDisplayObject, DynamicMapDisplayObject) {

        var MapRenderer = function(mapData) {
            this.initialize(mapData);
        };

        var super_p = Component.prototype;
        var p = MapRenderer.prototype = Object.create(super_p);
        p.constructor = MapRenderer;

        /** Consturctor */
        p.initialize = function(mapData) {
            super_p.initialize.call(this);
            this.mapData = mapData;
            this.mapDisplayObject = new MapDisplayObject(mapData);
            this.dynamicMap = new DynamicMapDisplayObject(mapData);
        };


        /** Public Methods */
        p.getDisplayObject = function() {
            return this.mapDisplayObject;
        };

        p.getDynamicMapDisplayObject = function() {
            return this.dynamicMap;
        };


        /** Properties */
        p.mapData = null;
        p.mapDisplayObject = null;
        p.dynamicMap = null;

        return MapRenderer;

});
