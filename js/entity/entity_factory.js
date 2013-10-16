/**
 * User: magkbdev
 * Date: 10/15/13
 * Time: 11:48 AM
 * To change this template use File | Settings | File Templates.
 */

define(["easeljs",
        "entity/entity",
        "entity/entity_registry",
        "components/sprite_renderer",
        "entity/game_types"], function(createjs, Entity, EntityRegistry, SpriteRenderer) {

    var EntityFactory = function() {

    };

    EntityFactory.createEntity = function(type, entityData) {
        if (type in EntityFactory.factories)
            return EntityFactory.factories[type](entityData);
        else
        {
            console.log("ERROR");
        }
    };

    EntityFactory.factories = [];

    EntityFactory.factories[Types.Entities.WARRIOR] = function(entityData) {
        var ent = new Entity(entityData);

        var renderer = new SpriteRenderer();
        renderer.createLayer(entityData.getDefaultLayerData());
        ent.attachComponent("renderer", renderer);

        return ent;
    };


    return EntityFactory;
});