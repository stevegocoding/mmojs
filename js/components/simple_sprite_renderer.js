/**
 * User: magkbdev
 * Date: 10/17/13
 * Time: 12:16 AM
 * To change this template use File | Settings | File Templates.
 */

define(['entity/api', 'entity/component', 'easeljs'], function(API, Component) {
    var SimpleSpriteRenderer = function() {
        this.initialize();
    };

    var super_p = Component.prototype;
    var p = SimpleSpriteRenderer.prototype = Object.create(super_p);
    p.constructor = SimpleSpriteRenderer;

    p.initialize = function() {
        super_p.initialize.call(this);

        this._displayContainer = new createjs.Container();
    };

    p.Component_onAttached = super_p.onAttached;
    p.onAttached = function(entity) {
        p.Component_onAttached(entity);
        if (entity.renderComponent === null)
            entity.renderComponent = this;
        else {
            console.log("Error in SimpleSpriteRenderer onAttached()!");
        }
    };

    p.setAnimation = function(spritesheetData, defaultAnim) {
        this._spritesheet = new createjs.SpriteSheet(spritesheetData);
        this._sprite = new createjs.Sprite(this._spritesheet, defaultAnim);
        this._sprite.framerate = 20;

        // Add the sprite display object as a child of the container
        this._displayContainer.addChild(this._sprite);

        this._sprite.addEventListener("tick", this.onRender.bind(this));
    };

    p.setState = function(state) {
        this._sprite.gotoAndPlay(state);
    };

    p.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    p.getDisplayObject = function() {
        return this._displayContainer;
    };

    /**
     * This is a chance for the sprite to apply a transformation to offset the image to
     * align the anchor point with the tile center.
     * @param event
     */
    p.onRender = function(event) {
        API.SendMessage(this._owner.type, this._owner.id, "onPreRender");
        this._sprite.setTransform(this.x-16, this.y-40);
    };

    /* Private Properties */

    /**
     * Each sprite display object is wrapper by a container
     * this enables the sprite contain multiple display objects. (like text)
     */
    p._displayContainer = null;
    p._spritesheet = null;
    p._sprite = null;
    p.x = 0;
    p.y = 0;


    return SimpleSpriteRenderer;
});
