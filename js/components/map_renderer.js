/**
 * User: magkbdev
 * Date: 10/20/13
 * Time: 1:34 PM
 * To change this template use File | Settings | File Templates.
 */


define(["entity/component","render/map_displayobject","easeljs"],
    function(Component, MapDisplayObject) {

    var MapRenderer = function(mapData) {
        this.initialize(mapData);
    };

    var super_p = Component.prototype;
    var p = MapRenderer.prototype = Object.create(super_p);
    p.constructor = MapRenderer;

    /** Consturctor */
    p.initialize = function(mapData) {
        super_p.initialize.call(this);
        p.mapData = mapData;
        p.mapDisplayObjecta = new MapDisplayObject(mapData);
    };


    /** Public Methods */
    p.getDisplayObject = function() {
        return this.mapDisplayObject;
    };


    /** Properties */
    p.mapData = null;
    p.mapDisplayObject = null;
});
