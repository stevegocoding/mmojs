/**
 * User: magkbdev
 * Date: 10/14/13
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */

define(["easeljs"], function(createjs) {

    var MultiLayerSprite = function() {
        this.initialize();
    };

    var p = MultiLayerSprite.prototype = new createjs.DisplayObject();

    p.DisplayObject_initialize = p.initialize;
    p.initialize = function() {
        this.DisplayObject_initialize();
        this._spritesheetLayers = [];
    };

    p.addSpritesheetLayer = function(layer) {
        this._spritesheetLayers.push(layer);
    };


    p.DisplayObject_draw = p.draw;
    p.draw = function(ctx, ignoreCache) {

        if (this.DisplayObject_draw(ctx, ignoreCache))
            return true;

        if (this._needSort)
            this._sortSpriteSheetLayers();

        for (var i = 0; i < this._spritesheetLayers.length; ++i) {
            this._spritesheetLayers[i].sprite.draw(ctx, ignoreCache);
        }
    };

    p._sortSpriteSheetLayers = function() {
        this._spritesheetLayers.sort(compareSpriteSheetLayer);
        this._needSort = false;
    };

    function compareSpriteSheetLayer(a, b) {
        if (a.orderIndex < b.orderIndex)
            return -1;
        else
            return 1;
    }

    /* Private Properties */
    p._spritesheetLayers = null;

    p._needSort = false;



    return MultiLayerSprite;
});
