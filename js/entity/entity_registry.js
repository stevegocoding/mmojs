/**
 * User: magkbdev
 * Date: 10/11/13
 * Time: 12:07 PM
 * To change this template use File | Settings | File Templates.
 */

define(function() {

    /* Global Entity Registry Singleton Instance */
    var _instance = null;

    var EntityRegistry = function() {
        this.initialize();
    };

    var p = EntityRegistry.prototype;

    p.initialize = function() {

    };


    /* Public Methods */

    /**
     * Register an entity with the components it contains
     * @param entityTypeName
     * @param components : should be in the format {component_type_name : component}
     */
    p.registerEntitity = function(entityTypeName, components) {

        if (this._entityRegistry.hasOwnProperty(entityTypeName)) {
            // Should throw an exception here!

        }
        else {
            if (components !== null) {
                var compsRegistry = {};
                for (var c in components) {
                    if (components.hasOwnProperty(c))
                        compsRegistry[c] = components[c];
                }

                this._entityRegistry[entityTypeName] = compsRegistry;
            }
            else {
                this._entityRegistry[entityTypeName] = {};
            }
        }
    };


    p.addComponent = function(entityTypeName, comp) {
        var compsRegistry = this.getEntityRegistry(entityTypeName);

        if (compsRegistry != null) {
            var reg = {};
            for (var c in comp) {
                if (comp.hasOwnProperty(c))
                    reg[c] = comp[c];
            }
            compsRegistry[c] = comp[c];
        }
    };

    p.removeComponent = function(entityTypeName, c) {

    };


    /**
     * Retrieve the registry information of a given entity type.
     * The returned object is in this format {component_type_name : component}
     * @param entityTypeName
     */
    p.getEntityRegistry = function(entityTypeName) {
        var compsRegistry = null;
        if (this._entityRegistry.hasOwnProperty(entityTypeName)) {
            compsRegistry = this._entityRegistry[entityTypeName];
            return compsRegistry;
        }
        else {
            // @TODO: Should throw an exception!

        }
        return compsRegistry;
    };


    /**
     * Retrieve the component of an entity.
     * @param entityName
     * @param componentTypeName
     */
    p.getComponent = function(entityName, componentTypeName) {
        if (entityName in this._entityRegistry) {
            var compsRegistry = this._entityRegistry[entityName];
            if (componentTypeName in compsRegistry) {
                return compsRegistry[componentTypeName];
            }
            else {
                // @TODO: Should throw an exception.
                console.log("The given component is not in registry! - Entity.getComponent()" );
            }
        }
        else {
            // @TODO: Should throw an exception.
            console.log("The given entity is not in registry! - Entity.getComponent()" );
        }

        return null;
    };

    EntityRegistry.GetRegistryInstance = function() {
        if (_instance == null)
            _instance = new EntityRegistry();

        return _instance;
    };

    /* Private Properties */

    // { entity_type_name : {component_type_name : component} }
    p._entityRegistry = {};


    return EntityRegistry;
});
