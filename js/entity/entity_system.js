/**
 * User: magkbdev
 * Date: 10/11/13
 * Time: 1:05 PM
 * To change this template use File | Settings | File Templates.
 */


define(function() {

    var EntitySystem = function() {
        this.initialize();
    };

    var p = EntitySystem.prototype;

    /* Private Properties */
    p._activeEntities = null;

    /* Constructor */
    p.initialize = function() {
        this._activeEntities = [];
    };

    /* Public Methods */
    p.addActiveEntity = function(entity) {
        this._activeEntities.push(entity);
    }

    p.remvoeActiveEntityAt = function(entity, index) {
        this._activeEntities.splice(index, 0, entity);
    }

    p.process = function() {}


    return EntitySystem;
});