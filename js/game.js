/**
 * User: magkbdev
 * Date: 10/12/13
 * Time: 7:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(["easeljs", "entity/world_factory", "render/stage"],
    function(createjs, WorldFactory, GameStage) {

        var Game = function() {
            this.initialize();
        };

        var p = Game.prototype;

        /**
         * Initialize the sub-systems of the game
         */
        p.initialize = function() {
            this._entities = {};
            this.mousePt = {x: 0, y: 0};
        };

        p.setupStage = function(stageDOM, backgroundDOM) {
            this.canvasDom = stageDOM;
            this.bgCanvasDom = backgroundDOM;

            this.entityStage = new GameStage(stageDOM);
            this.bgStage = new GameStage(backgroundDOM);

            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", this.tickHandler.bind(this));
        };

        p.setupWorld = function() {
            this._worldFactory = new WorldFactory(this);
            this._world = this._worldFactory.createWorld();

            if (this.entityStage === null)
            {
                // @TODO: should throw an exception
            }
        };

        p.run = function() {

            console.log("Starting the game!");

            this.started = true;
            this.stopped = false;

            this.start();
        };

        p.start = function() {
            console.log("Game loop started.");
            this.entityStage.addEventListener("stagemousedown", this.clickHandler.bind(this));
        };

        p.stop = function() {
            this.stopped = true;
            this.started = false;
            console.log("Game loop stopped.");
        };

        p.tickHandler = function(event) {
            if(this.started) {

                // update the world
                this._world.update();

                // draw the terrain
                this.bgStage.update(event);

                // draw this frame, advance to next frame
                this.entityStage.update(event);
            }

        };

        /**
         * Processes game logic when the user triggers a click/touch event during the game.
         */
        p.clickHandler = function(event) {

            this._world.handleClick(event);

        };


        /* Public Properties */
        p.started = false;
        p.stopped = false;

        /* Private Properties */
        p.bgCanvasDom = null;
        p.canvasDom = null;

        // easeljs stage
        p.entityStage = null;
        p.bgStage = null;

        p._world = null;
        p._worldFactory = null;
        p._map = null;

        return Game;
    }
);
