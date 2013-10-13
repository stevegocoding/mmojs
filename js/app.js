/**
 * User: magkbdev
 * Date: 10/2/13
 * Time: 12:40 PM
 * To change this template use File | Settings | File Templates.
 */

define(function() {

    var App = function(game) {
        this.initialize(game);
    };

    var p = App.prototype;

    p.initialize = function(game) {
        this.game = game;
    };


    p.tryStaringGame = function() {

    };

    p.startGame = function() {

        this.game.run();
    };


    /* Public Properties */
    p.game = null;

    return App;
});