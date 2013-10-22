/**
 * Created with JetBrains PhpStorm.
 * User: magkbdev
 * Date: 10/2/13
 * Time: 12:27 PM
 * Bootstrap file will be responsible for configuring Require.js and loading initially important dependencies.
 */

require(['jquery', 'app', 'game'], function($, App, Game) {

    var app, game;

    var InitApp = function() {
        $(document).ready(function() {

            console.log("DOM is ready! We can initialize the app and game now!");

            game = new Game();

            var canvasDom = $('#entities').get(0);
            var bgCanvasDom = $('#background').get(0);
            game.setupStage(canvasDom, bgCanvasDom);
            game.setupWorld();

            app = new App(game);

            app.startGame();
        })
    };

    InitApp();

});