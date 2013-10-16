/**
 * User: magkbdev
 * Date: 10/16/13
 * Time: 12:07 AM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/entity_factory",
        "entity/entity_world",
        "model/entity_data",
        "sprites/sprites"], function(EntityFactory, EntityWorld, EntityData, sprites) {

    var WorldFactory = function() {

    };

    var p = WorldFactory.prototype;

    p.createWorld = function() {

        var world = new EntityWorld();

        var playerData = {
            "id": 1,
            "name": "Steve",
            "type": "Warrior",
            "default_layer": sprites["princess"]
        };
        var player = EntityFactory.createEntity(Types.Entities.WARRIOR, new EntityData(playerData));


        world.addEntity(player);

        return world;
    };

    return WorldFactory;
});
