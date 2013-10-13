/**
 * Created with JetBrains PhpStorm.
 * User: magkbdev
 * Date: 10/1/13
 * Time: 8:27 PM
 * To change this template use File | Settings | File Templates.
 */

define(function() {

    var Component = function() {
        this.initialize();
    };

    var p = Component.prototype;

    // Constructor
    p.initialize = function() {
    };

    /* Public Methods */
    p.onAttached = function(entity) {
        if (this._owner === null)
            this._owner = entity;
        else
        {
            // @TODO: Should throw an exception.
        }
    };

    p.onDettached = function(entity) {

    }


    /* Private Properties */
    p._owner = null;


    return Component;
});