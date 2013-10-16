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

        p.setupStage = function(stageDOM) {
            this._stage = new createjs.Stage(stageDOM);
            this._stage.addEventListener("click", this.handleClick);
            createjs.Ticker.addEventListener("tick", this.tickHandler.bind(this));
        };

        p.setupWorld = function() {
            this._worldFactory = new WorldFactory();
            this._world = this._worldFactory.createWorld();

            if (this._stage === null)
            {
                // @TODO: should throw an exception
            }
            this._stage.addChild(this._world);
        };

        p.run = function() {

            console.log("Starting the game!");

            this.started = true;
            this.isStopped = false;

            this.start();
        };

        p.start = function() {
            console.log("Game loop started.");
        };

        p.stop = function() {
            this.isStopped = true;
            this.started = false;
            console.log("Game loop stopped.");
        };

        p.tickHandler = function(event) {
            if(this.started) {

                // update the world
                this._world.update();

                // draw this frame, advance to next frame
                this._stage.update(event);

                console.log("tick tick tick!");
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
        p.isStopped = false;

        /* Private Properties */

        // easeljs stage
        p._stage = null;
        p._world = null;
        p._worldFactory = null;

        return Game;
    }
);
