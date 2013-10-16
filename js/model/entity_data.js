/**
 * User: magkbdev
 * Date: 10/15/13
 * Time: 9:15 PM
 * To change this template use File | Settings | File Templates.
 */

define( function() {

    var EntityData = function(data) {
        this.initialize(data);
    };

    var p = EntityData.prototype;

    /**
     *
     * @param data
     */
    p.initialize = function(data) {
        if (!data.hasOwnProperty("default_layer")) {
            // @TODO: throw an exception
        }

        this._id = data["id"];
        this._name = data["name"];
        this._typeName = data["type"];
        this._defaultSpritesheetLayerData = data["default_layer"];
        var imagesPath = "assets/images/"+ this._defaultSpritesheetLayerData.id + ".png";
        this._defaultSpritesheetLayerData["images"] = [imagesPath];
    };

    p.getDefaultLayerData = function() {
        return this._defaultSpritesheetLayerData;
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

    /* Private Properties */
    p._defaultSpritesheetLayerData = null;

    p._id = -1;

    p._name = "default_name";

    p._typeName = "default_type";


    return EntityData;
});
