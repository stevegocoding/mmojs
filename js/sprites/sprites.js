/**
 * User: magkbdev
 * Date: 10/15/13
 * Time: 12:59 PM
 * To change this template use File | Settings | File Templates.
 */

define(["text!sprites/princess.json"], function() {

    var sprites = {};

    _.each(arguments, function(spriteJson) {
        var sprite = JSON.parse(spriteJson);

        sprites[sprite.id] = sprite;
    });

    return sprites;
});