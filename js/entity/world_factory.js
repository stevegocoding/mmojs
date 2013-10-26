/**
 * User: magkbdev
 * Date: 10/16/13
 * Time: 12:07 AM
 * To change this template use File | Settings | File Templates.
 */

define(['entity/api',
        "entity/entity_factory",
        "entity/entity_world",
        "sprites/sprites",
        "model/entity_data",
        "model/map_data",
        "render/camera",
        'components/navigation'],
    function(API, EntityFactory, EntityWorld, sprites, EntityData, MapData, Camera, Navigation) {

        /**
         * General Functions used by all renderable entities
         * */

        var updateEntityRenderPosition = function(entity) {
            if (entity.renderComponent !== null) {
                var s = EntityWorld.instance().scale;
                var x = entity.positionComponent.x * s,
                    y = entity.positionComponent.y * s;
                entity.renderComponent.setPosition(x, y);
            }
        };

        var WorldFactory = function(game) {
            this.initialize(game);
        };

        var p = WorldFactory.prototype;

        p.initialize = function(game) {
            this.game = game;

            API.RegisterAPI(Types.Entities.WARRIOR, "onPreRender",
                function(entity, params){
                    updateEntityRenderPosition(entity);
                });

            API.RegisterAPI(Types.Entities.WARRIOR, "onMoved",
                function(entity, params) {
                    if (entity === EntityWorld.instance()._playerEntity) {
                        var cam = EntityWorld.instance().camera;
                            cam.lookAt(params.x, params.y);
                    }
                });

            API.RegisterAPI(Types.Entities.WARRIOR, "onUpdateOrientation",
                function(entity, params) {
                    var or = entity.positionComponent.getOrientationName();
                    var state = "walk_" + or;
                    entity.renderComponent.setState(state);
                });
        };

        p.createCamera = function(world) {
            var cam = new Camera(world);
            cam.rescale();
            return cam;
        };

        p.createWorld = function() {

            var world = new EntityWorld(this.game);
            EntityWorld._instance = world;

            // Set camera
            var cam = this.createCamera(world);
            world.setCamera(cam);

            // Create Map
            var mapFile = "maps/world2.json";
            // var mapFile = "maps/1x1world.json";
            var mapData = new MapData(mapFile);
            mapData.ready(function() {

                var terrain = EntityFactory.createTerrain(mapData);
                world.setTerrain(terrain);

                var nav = new Navigation(mapData.width, mapData.height);
                world.setNavigator(nav);

                /* Initialize the grids */
                world.initPathingGrid();

            });


            // Creat a character
            var playerData = {
                "id": 1,
                "name": "Steve",
                "type": Types.Entities.WARRIOR,
                "default_layer": sprites["princess"]
            };
            var player = EntityFactory.createEntity(Types.Entities.WARRIOR, new EntityData(playerData));
            world.addEntity(player);
            world.setPlayerEntity(player);

            return world;
        };

        p.game = null;

        return WorldFactory;
});
