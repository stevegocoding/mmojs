/**
 * User: magkbdev
 * Date: 10/15/13
 * Time: 11:48 AM
 * To change this template use File | Settings | File Templates.
 */

define(["easeljs",
        "entity/entity",
        "entity/entity_registry",
        "components/simple_sprite_renderer",
        "components/map_renderer",
        "components/position",
        "entity/game_types"],
    function(createjs, Entity, EntityRegistry, SimpleSpriteRenderer, MapRenderer, PositionComponent) {

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

    EntityFactory.createTerrain = function(mapData) {

        mapData._id = 999;
        mapData._name = "map_entity";
        mapData._typename = "Map";

        var ent = new Entity(mapData);
        var renderer = new MapRenderer(mapData);
        ent.attachComponent("renderer", renderer);

        return ent;
    };

    EntityFactory.factories = [];

    EntityFactory.factories[Types.Entities.WARRIOR] = function(entityData) {
        var ent = new Entity(entityData);

        var renderer = new SimpleSpriteRenderer();
        renderer.setAnimation(entityData.getDefaultLayerData(), "walk_east");
        ent.attachComponent("renderer", renderer);

        var pos = new PositionComponent();
        pos.x = 0;
        pos.y = 0;
        pos.gridX = 0;
        pos.gridY = 0;
        ent.attachComponent("PositionComponent", pos);

        return ent;
    };


    return EntityFactory;
});