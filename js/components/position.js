/**
 * User: magkbdev
 * Date: 10/22/13
 * Time: 11:41 PM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/component", "components/state", 'entity/entity_world', 'component/transite'],
    function(Component, State, EntityWorld, Transition) {

        var PositionComponent = function() {
            this.initialize();
        };

        var super_p = Component.prototype;
        var p = PositionComponent.prototype = Object.create(super_p);
        p.constructor = PositionComponent;

        p.initialize = function() {
            super_p.initialize.call(this);

            this.path = null;
            this.step = 0;

            this.transition = new Transition();

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

        p.Component_onAttached = super_p.onAttached;
        p.onAttached = function(entity) {
            p.Component_onAttached(entity);
            if (entity.positionComponent === null)
                entity.positionComponent = this;
            else {
                log.error("Error in PositionComponet onAttached()!");
            }
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
                this.step = 0;
                this.state.setState("moveTo", data);
            }
        };

        p.updateOrientation = function() {
            var p = this.path;
            var i = this.step;

            if(p[i][0] < p[i-1][0]) {
                this.orientation = Types.Orientations.LEFT;
                if (this.orientnUpdateFunc) this.orientnUpdateFunc(this.orientation);
            }
            if(p[i][0] > p[i-1][0]) {
                this.orientation = Types.Orientations.RIGHT;
                if (this.orientnUpdateFunc) this.orientnUpdateFunc(this.orientation);
            }
            if(p[i][1] < p[i-1][1]) {
                this.orientation = Types.Orientations.UP;
                if (this.orientnUpdateFunc) this.orientnUpdateFunc(this.orientation);
            }
            if(p[i][1] > p[i-1][1]) {
                this.orientation = Types.Orientations.DOWN;
                if (this.orientnUpdateFunc) this.orientnUpdateFunc(this.orientation);
            }
        };

        p.updateTransition = function() {


        };

        p.advanceStep = function() {

            var stop = false;

            if (this.isMoving()) {

                this.updateGridPosition();

                console.log("x: " + this.gridX + " y: " + this.gridY);

                if (this.hasNextStep()) {
                    this.nextGridX = this.path[this.step+1][0];
                    this.nextGridY = this.path[this.step+1][1];
                }
                // Handle path changes
                if (this.hasChangedPath()) {

                }
                else if (this.hasNextStep()) {
                    this.step += 1;
                    this.updateOrientation();
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

        /* MoveTo State */
        p.moveToEnter = function(curState) {
        };

        p.moveToProcess = function(curState) {

            var fps = EntityWorld.instance().fps;
            var tick = Math.round(16 / Math.round((this.moveSpeed / (1000 / fps))));
            var currentTime = EntityWorld.instance().currentTime();

            if (this.isMoving() && this.transition.inProgress === false) {
                if (this.orientation === Types.orientation.LEFT) {
                    this.transition.start(currentTime,
                                        function(x) {
                                            this.x = x;
                                        },
                                        function() {
                                            this.x = this.transition.endValue;
                                            this.advanceStep();
                                        },
                                        this.x - tick,
                                        this.x - 16,
                                        this.moveSpeed);
                }
                else if (this.orientation === Types.orientation.RIGHT) {
                    this.transition.start(currentTime,
                                        function(x) {
                                            this.x = x;
                                        },
                                        function() {
                                            this.x = this.transition.endValue;
                                            this.advanceStep();
                                        },
                                        this.x + tick,
                                        this.x + 16,
                                        this.moveSpeed);
                }
                else if (this.orientation === Types.orientation.UP) {
                    this.transition.start(currentTime,
                                        function(y) {
                                            this.y = y;
                                        },
                                        function() {
                                            this.y = this.transition.endValue;
                                            this.advanceStep();
                                        },
                                        this.y - tick,
                                        this.y - 16,
                                        this.moveSpeed);
                }
                else if (this.orientation === Types.orientation.DOWN) {
                    this.transition.start(currentTime,
                                        function(y) {
                                            this.y = y;
                                        },
                                        function() {
                                            this.y = this.transition.endValue;
                                            this.advanceStep();
                                        },
                                        this.y + tick,
                                        this.y + 16,
                                        this.moveSpeed);
                }
            }


            this.transition.step(currentTime);
        };

        p.moveToExit = function(curState) {
            this.transition.stop();
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

        p.process = function() {
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
        p.transition = null;

        p.orientation = 0;
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
        p.orientnUpdateFunc = null;

        return PositionComponent;
});
