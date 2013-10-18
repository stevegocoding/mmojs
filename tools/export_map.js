/**
 * User: magkbdev
 * Date: 10/18/13
 * Time: 11:26 AM
 * To change this template use File | Settings | File Templates.
 */

var util = require('util'),
    path = require("path"),
    fs = require("fs"),
    processMap = require('./process_map')

var source = process.argv[2],
    destination = process.argv[3],
    mode = process.argv[4];

if(!source || !destination) {
    util.puts("Usage : ./exportmap.js map_file json_file [mode]");
    util.puts("Optional parameter : mode. Values: \"server\" (default) or \"client\".");
    process.exit(0);
}

function main() {
    getTiledJSONmap(source, function(json) {
        var options = { mode: mode || "server" },
            map = processMap(json, options);

        var jsonMap = JSON.stringify(map); // Save the processed map object as JSON data

        if(mode === "client") {
            // map in a .json file for ajax loading
            fs.writeFile(destination+".json", jsonMap, function(err, file) {
                console.log("Finished processing map file: "+ destination + ".json was saved.");
            });

            // map in a .js file for web worker loading
            jsonMap = "var mapData = "+JSON.stringify(map);
            fs.writeFile(destination+".js", jsonMap, function(err, file) {
                console.log("Finished processing map file: "+ destination + ".js was saved.");
            });
        } else {
            fs.writeFile(destination, jsonMap, function(err, file) {
                console.log("Finished processing map file: "+ destination + " was saved.");
            });
        }
    });
}

// Loads the temporary JSON Tiled map converted by tmx2json.py
function getTiledJSONmap(filename, callback) {
    var self = this;

    path.exists(filename, function(exists) {
        if(!exists) {
            console.error(filename + " doesn't exist.")
            return;
        }

        fs.readFile(source, function(err, file) {
            callback(JSON.parse(file.toString()));
        });
    });
}

main();