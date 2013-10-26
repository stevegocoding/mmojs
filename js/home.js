/**
 * User: magkbdev
 * Date: 10/13/13
 * Time: 1:10 AM
 * To change this template use File | Settings | File Templates.
 */

require.config({
    baseUrl: "/mmojs/js/",
    paths: {
        "text" : "lib/text",
        jquery: 'lib/jquery-1.10.2.min',
        easeljs: 'lib/easeljs-0.7.0.min',
        underscore: 'lib/underscore-min'
    },
    shim: {
        easeljs: {
            exports: 'createjs'
        }
    }
});

define(["underscore", "utils"], function() {

    require(["main"], function() {
        console.log("main.js has been loaded!");
    });

});
