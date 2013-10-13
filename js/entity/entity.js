/**
 * Created with JetBrains PhpStorm.
 * User: magkbdev
 * Date: 10/1/13
 * Time: 8:27 PM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/entity_registry"], function(EntityRegistry) {

    var Entity = function(name) {
        this.initialize(name);
    };

    var p = Entity.prototype;

    Entity._nextID = 0;

    /* Private Properties */
    p.id = -1;
    p._name = "default_entity";
    p._enityRegistry = null;

    /* Constructor */
    p.initialize = function(name) {
        this.id = Entity._nextID++;
        this._name = name;
        this._entityRegistry = EntityRegistry.GetRegistryInstance();
    };

    /* Public Methods */
    p.attachComponent = function(component) {
        var compRegistry = {};
        compRegistry[EntityRegistry.componentTypeNameKey] = component.constructor.toString();
        compRegistry[EntityRegistry.componentInstanceKey] = component;

        component.onAttached(this);

        EntityRegistry.GetRegistryInstance().addComponent(this.constructor.toString(), compRegistry);
    };

    p.process = function() {
        console.log("Entity Process!");
    };

    p.render = function() {
        console.log("Entity Render!");
    };

    p.getName = function() {
        return this._name;
    };

    p.getComponent = function(componentName) {
        var c = EntityRegistry.GetRegistryInstance().getComponent(componentName);
        return c;
    };

    return Entity;
});