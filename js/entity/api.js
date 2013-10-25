/**
 * User: magkbdev
 * Date: 10/24/13
 * Time: 4:39 PM
 * To change this template use File | Settings | File Templates.
 */


define(['entity/entity_world', 'entity/game_types'], function(EntityWorld){


    var API = function() {
    };

    API.RegisterAPI = function(type, message, func) {

        if (API.apiMap[type] === undefined)
            API.apiMap[type] = {};

        API.apiMap[type][message] = func;
    };

    API.SendMessage = function(type, id, message, params) {

        var func = API.apiMap[type][message];
        if (func !== undefined) {

            var ent = EntityWorld.instance()._entities[id];
            if (ent !== null)
                func(ent, params);
        }
    };

    API.apiMap = {};

    ////////////////////////////////////////////////////////////////////////////////////////////

    return API;
});