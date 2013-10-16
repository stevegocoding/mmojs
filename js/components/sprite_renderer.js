/**
 * User: magkbdev
 * Date: 10/14/13
 * Time: 1:28 PM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/component", "components/multilayer_sprite", "components/spritesheet_layer"],
    function(Component, MultiLayerSprite, SpriteSheetLayer) {

    var SpriteRenderer = function() {
        this.initialize();
    };

    var p = SpriteRenderer.prototype = new Component();

    p.Component_initialize = p.initialize;
    p.initialize = function() {
        this.Component_initialize();

        this._sprite = new MultiLayerSprite();
    };

    p.createLayer = function(spritesheetData) {
        var layer = new SpriteSheetLayer(spritesheetData);
        this._sprite.addSpritesheetLayer(layer);
    };


    p.getDisplayObject = function() {
        return this._sprite;
    };

    /* Private Properties */
    p._sprite = null;


    return SpriteRenderer;
});
