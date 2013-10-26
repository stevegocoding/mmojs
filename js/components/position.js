/**
 * User: magkbdev
 * Date: 10/22/13
 * Time: 11:41 PM
 * To change this template use File | Settings | File Templates.
 */

define(['entity/component',
        'components/state',
        'entity/entity_world',
        'components/transition',
        'entity/api',
        'entity/game_types'],
    function(Component, State, EntityWorld, Transition, API) {

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

        p.setGridPosition = function(gridX, gridY) {
            this.gridX = gridX;
            this.gridY = gridY;
            this.x = this.gridX * 16;
            this.y = this.gridY * 16;
        };

        p.Component_onAttached = super_p.onAttached;
        p.onAttached = function(entity) {
            p.Component_onAttached(entity);
            if (entity.positionComponent === null)
                entity.positionComponent = this;
            else {
                console.log("Error in PositionComponet onAttached()!");
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
                this.advanceStep();
            }
        };

        p.updateOrientation = function() {
            var p = this.path;
            var i = this.step;

            var old = this.orientation;
            var n;
            if(p[i][0] < p[i-1][0]) {
                n = Types.Orientations.LEFT;
            }
            if(p[i][0] > p[i-1][0]) {
                n = Types.Orientations.RIGHT;
            }
            if(p[i][1] < p[i-1][1]) {
                n = Types.Orientations.UP;
            }
            if(p[i][1] > p[i-1][1]) {
                n = Types.Orientations.DOWN;
            }

            if (n !== old){
                this.orientation = n;
                this.onUpdateOrientation();
            }
        };

        p.updateTransition = function() {


        };

        p.advanceStep = function() {

            var stop = false;

            if (this.isMoving()) {

                //this.updateGridPosition();
                this.setGridPosition(this.path[this.step][0], this.path[this.step][1]);

                console.log("ADVANCE STEP: " + "x: " + this.gridX + " y: " + this.gridY);

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

            var self = this;
            var fps = EntityWorld.instance().fps;
            var tick = Math.round(16 / Math.round((this.moveSpeed / (1000 / 60))));
            var currentTime = EntityWorld.instance().currentTime();

            console.log("tick: " + tick);

            if (this.isMoving() && this.transition.inProgress === false) {
                if (this.orientation === Types.Orientations.LEFT) {
                    this.transition.start(currentTime,
                                        function(x) {
                                            self.x = x;
                                            self.onMoved();
                                        },
                                        function() {
                                            self.x = self.transition.endValue;
                                            self.onMoved();
                                            self.advanceStep();
                                        },
                                        this.x - tick,
                                        this.x - 16,
                                        this.moveSpeed);
                }
                else if (this.orientation === Types.Orientations.RIGHT) {
                    this.transition.start(currentTime,
                                        function(x) {
                                            self.x = x;
                                            self.onMoved();
                                        },
                                        function() {
                                            self.x = self.transition.endValue;
                                            self.onMoved();
                                            self.advanceStep();
                                        },
                                        this.x + tick,
                                        this.x + 16,
                                        this.moveSpeed);
                }
                else if (this.orientation === Types.Orientations.UP) {
                    this.transition.start(currentTime,
                                        function(y) {
                                            self.y = y;
                                            self.onMoved();
                                        },
                                        function() {
                                            self.y = self.transition.endValue;
                                            self.onMoved();
                                            self.advanceStep();
                                        },
                                        this.y - tick,
                                        this.y - 16,
                                        this.moveSpeed);
                }
                else if (this.orientation === Types.Orientations.DOWN) {
                    this.transition.start(currentTime,
                                        function(y) {
                                            self.y = y;
                                            self.onMoved();
                                        },
                                        function() {
                                            self.y = self.transition.endValue;
                                            self.onMoved();
                                            self.advanceStep();
                                        },
                                        this.y + tick,
                                        this.y + 16,
                                        this.moveSpeed);
                }
            }

            //self.onMoved();

            // console.log("position: " + this.x + " , " + this.y);
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

            if (this.transition.inProgress) {
                var currentTime = EntityWorld.instance().currentTime();
                this.transition.step(currentTime);
            }
        };

        p.updateGridPosition = function() {
            this.gridX = this.path[this.step][0];
            this.gridY = this.path[this.step][1];
            this.x = this.gridX * 16;
            this.y = this.gridY * 16;
        };

        p.getOrientationName = function() {
            if (this.orientation === Types.Orientations.UP) {
                return "north";
            }
            else if (this.orientation === Types.Orientations.DOWN) {
                return "south";
            }
            else if (this.orientation === Types.Orientations.LEFT) {
                return "west";
            }
            else if (this.orientation === Types.Orientations.RIGHT) {
                return "east";
            }

            return "south";
        };

        p.onMoved = function() {
            API.SendMessage(this._owner.type, this._owner.id, "onMoved", {x: this.x, y: this.y});
        };

        p.onUpdateOrientation = function() {
            API.SendMessage(this._owner.type, this._owner.id, "onUpdateOrientation", {orientation: this.orientation});

        };

        /* Position and Orientation */
        p.gridX = 0;
        p.gridY = 0;
        p.nextGridX = 0;
        p.nextGridY = 0;
        p.x = 0;
        p.y = 0;
        p.transition = null;

        p.orientation = Types.Orientations.RIGHT;
        p.moveSpeed = 120;

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
        p.movedFunc = null;

        return PositionComponent;
});
