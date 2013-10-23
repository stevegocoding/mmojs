/**
 * User: magkbdev
 * Date: 10/22/13
 * Time: 11:41 PM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/component", "components/state", 'entity/entity_world'],
    function(Component, State, EntityWorld) {

        var PositionComponent = function() {

        };

        var super_p = Component.prototype;
        var p = PositionComponent.prototype = Object.create(super_p);
        p.constructor = PositionComponent;

        p.initialize = function() {
            super_p.initialize.call(this);

            this.path = null;
            this.step = 0;

            this.state = new State();
            this.state.addState((new State()).assign({id: "moveTo",
                                                    enterFunc: this.moveToEnter.bind(this),
                                                    processFunc: this.moveToProcess.bind(this),
                                                    exitFunc: this.moveToExit.bind(this)}));

            this.state.addState((new State()).assign({id: "idle",
                                                    enterFunc: this.idleEnter.bind(this),
                                                    processFunc: this.idleProcess.bind(this),
                                                    exitFunc: this.idleExit.bind(this)}));

        };

        p.idle = function() {
            this.state.setState("idle");
        };

        p.moveTo = function(gridX, gridY) {
            if (this.isMoving())
                console.log("The entity is moving!");

            var data = {dest: {x: gridX, y: gridY}};
            var ignored = [this._owner];
            var path = EntityWorld.instance().findPath(this._owner, gridX, gridY, ignored);
            if (path.length > 1) {
                this.path = path;
            }

            this.state.setState("moveTo", data);
        };

        /* MoveTo State */
        p.moveToEnter = function(curState) {
        };

        p.moveToProcess = function(curState) {

            var stop = false;

            if (this.isMoving()) {

                this.updateGridPosition();

                console.log("x: " + this.gridX + " y: " + this.gridY);

                if (this.hasNextStep()) {
                    this.nextGridX = this.path[this.step+1][0];
                    this.nextGridY = this.path[this.step+1][1];
                }
                if (this.hasChangedPath()) {

                }
                else if (this.hasNextStep()) {
                    this.step += 1;
                    if (this.stepAdvancedFunc)
                        this.stepAdvancedFunc();
                }
                else {
                    stop = true;
                }

                if (stop) { // Path is complete or has been interrupted
                    this.path = null;
                    this.idle();
                }
            }

        };

        p.moveToExit = function(curState) {

        };

        /* Idle Staet */
        p.idleEnter = function(curState) {

        };
        p.idleProcess = function(curState) {

        };
        p.idleExit = function(curState) {

        };

        p.isMoving = function() {
            return this.path !== null;
        };

        p.hasChangedPath = function() {
            return !(this.newDest === null);
        };

        p.hasNextStep = function() {
            return (this.path.length - 1 > this.step);
        };

        p.update = function() {
            this.state.process();
        };

        p.updateGridPosition = function() {
            this.gridX = this.path[this.step][0];
            this.gridY = this.path[this.step][1];
            this.x = this.gridX * 16;
            this.y = this.gridY * 16;
        };

        /* Position and Orientation */
        p.gridX = 0;
        p.gridY = 0;
        p.nextGridX = 0;
        p.nextGridY = 0;
        p.x = 0;
        p.y = 0;

        p.orientation = "";
        p.moveSpeed = 1;

        // Path finding
        p.path = null;
        p.step = 0;
        p.newDest = null;
        p.state = null;

        // Callbacks
        p.preStepFunc = null;
        p.stepFunc = null;
        p.stepAdvancedFunc = null;

        return PositionComponent;
});
