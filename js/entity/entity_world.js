/**
 * User: magkbdev
 * Date: 10/14/13
 * Time: 7:20 PM
 * To change this template use File | Settings | File Templates.
 */

define(["easeljs"], function(createjs) {

    var EntityWorld = function() {
        this.initialize();
    };

    var p = EntityWorld.prototype = new createjs.Container();

    p.initialize = function() {
        this._entities = {};
    };

    p.addEntity = function(entity) {
        if (this._entities[entity.id] === undefined) {
            this._entities[entity.id] = entity;

            if (entity.isDrawable())
            {
                var renderer = entity.getComponent("renderer");
                this.addChild(renderer.getDisplayObject());
            }
        }
        else {
            console.log("The entity already existed! " + entity.id);
        }
    };

    p.removeEntity = function(entity) {

    };

    p.update = function() {
        for (var entityId in this._entities) {
            this._entities[entityId].process();
        }
    };


    // entiies map
    p._entities = null;


    return EntityWorld;
});
