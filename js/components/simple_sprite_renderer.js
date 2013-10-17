/**
 * User: magkbdev
 * Date: 10/17/13
 * Time: 12:16 AM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/component", "easeljs"], function(Component) {
    var SimpleSpriteRenderer = function() {
        this.initialize();
    };

    var p = SimpleSpriteRenderer.prototype = new Component();

    p.Component_initialize = p.initialize;
    p.initialize = function() {
        this.Component_initialize();
    };

    p.setAnimation = function(spritesheetData, defaultAnim) {
        this._spritesheet = new createjs.SpriteSheet(spritesheetData);
        this._sprite = new createjs.Sprite(this._spritesheet, defaultAnim);
    };

    p.getDisplayObject = function() {
        return this._sprite;
    };

    /* Private Properties */
    p._spritesheet = null;
    p._sprite = null;


    return SimpleSpriteRenderer;
}); 
