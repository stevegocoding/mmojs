/**
 * User: magkbdev
 * Date: 10/22/13
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define(function() {

    var State = function(id) {
        this.initialize(id)
    };

    var p = State.prototype;

    p.initialize = function(id) {

        if (typeof id == 'undefined')
            id = "default";

        this.id = id;
        this.data = {};
        this.tick = 0;
        this.children = {};

        this.current = null;
        this.last = null;

        this.enterFunc = null;
        this.processFunc = null;
        this.exitFunc = null;
    };

    p.assign = function(params) {
        this.id = params.id;
        this.data = data;
        this.enterFunc = params.enterFunc;
        this.processFunc = params.processFunc;
        this.exitFunc = params.exitFunc;
    };

    p.addState = function(state) {
        this.children[state.id] = state;
    };

    p.setState = function(id, data) {
        if (typeof id == 'string' || id instanceof String) {
            var newState = this.children[id];
            if (newState === null) {
                throw new Error("The state " + id + " doesn't existed!");
            }

            if (data === null)
                data = {};
            newState.data = data;

            // exit the current state first
            if (this.current !== null) {
                if (this.current.exitFunc !== null) {
                    this.current.exitFunc(this.current);
                }
            }

            this.last = this.current;
            this.current = newState;

            this.current.tick = 0;
            if (this.current.enterFunc !== null) {
                this.current.enterFunc(this.current);
            }

            return this.current;
        }
    };

    p.process = function() {
        if (this.current !== null) {
            this.current.processFunc(this.current);
            this.current.tick += 1;
        }
    };

    p.exit = function() {
        if (this.current !== null && this.current.exitFunc !== null) {
            this.current.exitFunc(this.current);
        }
    };


    p.id = "";
    p.data = null;
    p.tick = 0;
    p.children = null;
    p.current = null;

    p.enterFunc = null;
    p.processFunc = null;
    p.exitFunc = null;

    return State;
});
