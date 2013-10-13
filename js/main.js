/**
 * Created with JetBrains PhpStorm.
 * User: magkbdev
 * Date: 10/2/13
 * Time: 12:27 PM
 * Bootstrap file will be responsible for configuring Require.js and loading initially important dependencies.
 */


require.config({
    paths: {
        jquery: 'lib/jquery-1.10.2.min',
        easeljs: 'lib/easeljs-0.7.0.min'
    }
});

require(['jquery', 'app', 'game'], function($, App, Game) {

    var app, game;

    var InitApp = function() {
        $(document).ready(function() {

            console.log("DOM is ready! We can initialize the app and game now!");

            InitGame();

            app = new App(game);

            app.startGame();
        })
    };

    var InitGame = function() {
        game = new Game();
    };

    InitApp();

});