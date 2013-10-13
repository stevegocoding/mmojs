/**
 * User: magkbdev
 * Date: 10/12/13
 * Time: 7:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/component", "entity/entity_registry", "entity/entity", "entity/entity_system"],
    function(Comonent, EntityRegistry, Entity, EntitySystem) {

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

        p.run = function() {

            console.log("Starting the game!");

            this.started = true;
            this.isStopped = false;

            this.start();
        };

        p.start = function() {
            this.tick();
            console.log("Game loop started.");
        };

        p.stop = function() {
            this.isStopped = true;
            this.started = false;
            console.log("Game loop stopped.");
        };

        p.tick = function() {
            if(this.started) {
                this.update();
                this.render();
            }

            if(!this.isStopped) {
                requestAnimFrame(this.tick.bind(this));
            }

            console.log("tick tick tick!");
        };

        p.update = function() {
            for (var entityId in this._entities) {
                this._entities[entityId].process();
            }
        };

        p.render = function() {
            for (var entityId in this._entities) {
                this._entities[entityId].render();
            }
        };

        p.addEntity = function(entity) {
            if (this._entities[entity.id] === undefined) {
                this._entities[entity.id] = entity;
            }
            else {
                console.log("The entity already existed! " + entity.id);
            }
        };

        p.removeEntity = function(entity) {

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
        p._entities = null;


        return Game;
    }
);
