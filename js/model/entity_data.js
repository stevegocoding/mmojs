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

        this.id = data["id"];
        this.name = data["name"];
        this.type = data["type"];
        
        this._defaultSpritesheetLayerData = data["default_layer"];
        var imagesPath = "assets/images/"+ this._defaultSpritesheetLayerData.id + ".png";
        this._defaultSpritesheetLayerData["images"] = [imagesPath];
    };

    p.getDefaultLayerData = function() {
        return this._defaultSpritesheetLayerData;
    };

    /* Private Properties */
    p._defaultSpritesheetLayerData = null;
    p.id = -1;
    p.name = "default_name";
    p.type = -1;

    return EntityData;
});
