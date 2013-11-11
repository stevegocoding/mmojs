/**
 * User: magkbdev
 * Date: 11/10/13
 * Time: 2:27 PM
 * To change this template use File | Settings | File Templates.
 */

define(['entity/component', 'easeljs'], function(Component) {

    var TextRenderer = function() {

    };

    var super_p = Component.prototype;
    var p = TextRenderer.prototype = Object.create(super_p);
    p.constructor = TextRenderer;

    p.initialize = function() {
        super_p.initialize.call(this);
        this._text = new createjs.Text();
    };

    p.setFont = function(font) {
        this._text.font = font;
    };

    p.setText = function(text) {
        this._text.text = text;
    };

    p.setColor = function(color) {
        this._text.color = color;
    };

    p.getDisplayObject = function() {
        return this._text;
    }; 

    p._text = null;


});
