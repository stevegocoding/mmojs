/**
 * User: magkbdev
 * Date: 10/16/13
 * Time: 12:07 AM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/entity_factory",
        "entity/entity_world",
        "sprites/sprites",
        "model/entity_data",
        "model/map_data",
        "render/camera",
        'components/navigation'],
    function(EntityFactory, EntityWorld, sprites, EntityData, MapData, Camera, Navigation) {

    var WorldFactory = function(game) {
        this.initialize(game);
    };

    var p = WorldFactory.prototype;

    p.initialize = function(game) {
        this.game = game;


    };

    p.createCamera = function() {
        var cam = new Camera();
        cam.rescale();
        return cam;
    };

    p.createWorld = function() {

        var world = new EntityWorld(this.game);
        EntityWorld._instance = world;

        // Set camera
        var cam = this.createCamera();
        world.setCamera(cam);

        // Create Map
        var mapFile = "maps/world.json";
        // var mapFile = "maps/1x1world.json";
        var mapData = new MapData(mapFile);
        mapData.ready(function() {
            log.info("Map loaded!");
        });

        var terrain = EntityFactory.createTerrain(mapData);
        world.setTerrain(terrain);

        var nav = new Navigation(mapData.width, mapData.height);
        world.setNavigator(nav);

        /* Initialize the grids */
        world.initPathingGrid();



        // Creat a character
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

    p.game = null;

    return WorldFactory;
});
