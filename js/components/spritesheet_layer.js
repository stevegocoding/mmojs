/**
 * User: magkbdev
 * Date: 10/14/13
 * Time: 4:38 PM
 * To change this template use File | Settings | File Templates.
 */

define(["easeljs"], function(createjs) {

    var SpriteSheetLayer = function(spritesheetData, idx) {
        this.initialize(spritesheetData, idx);
    };

    var p = SpriteSheetLayer.prototype;

    p.initialize = function(spritesheetData, idx) {
        this.spritesheet = new createjs.SpriteSheet(spritesheetData);
        this.sprite = new createjs.Sprite(this.spritesheet, "walk_south");
        this.orderIndex = idx;
    };

    /* Public Properties */
    p.orderIndex = -1;
    p.sprite = null;
    p.spritesheet = null;


    return SpriteSheetLayer;
});
