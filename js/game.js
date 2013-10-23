/**
 * User: magkbdev
 * Date: 10/12/13
 * Time: 7:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(["easeljs", "entity/world_factory"],
    function(createjs, WorldFactory) {

        var Game = function() {
            this.initialize();
        };

        var p = Game.prototype;

        /**
         * Initialize the sub-systems of the game
         */
        p.initialize = function() {
            this._entities = {};
        };

        p.setupStage = function(stageDOM, backgroundDOM) {
            this.canvasDom = stageDOM;
            this.bgCanvasDom = backgroundDOM;

            this.entityStage = new createjs.Stage(stageDOM);
            this.bgStage = new createjs.Stage(backgroundDOM);

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
        p.handleClick = function() {
            console.log("Game -- handleClick()");
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
