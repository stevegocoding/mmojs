/**
 * Created with JetBrains PhpStorm.
 * User: magkbdev
 * Date: 10/1/13
 * Time: 8:27 PM
 * To change this template use File | Settings | File Templates.
 */

define(["entity/entity_registry", "easeljs"], function(EntityRegistry) {

    var Entity = function(entityData) {
        this.initialize(entityData);
    };

    var p = Entity.prototype = new createjs.DisplayObject();

    Entity._nextID = 0;

    /* Private Properties */
    p.id = -1;
    p._name = "default_entity";
    p._typeName = "default_type";
    p._enityRegistry = null;
    p.drawable = true;

    /* Constructor */
    p.initialize = function(entityData) {
        // this.id = Entity._nextID++;

        this.id = entityData.getId();
        this._name = entityData.getName();
        this._typeName = entityData.getTypeName();
        this._entityRegistry = EntityRegistry.GetRegistryInstance();

        this._entityRegistry.registerEntitity(this._typeName, null);
    };

    /* Public Methods */
    p.attachComponent = function(name, component) {
        var compRegistry = {};
        compRegistry[name] = component;
        this._entityRegistry.addComponent(this._typeName, compRegistry);

        component.onAttached(this);
    };

    p.detachComponent = function(component) {

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
        var c = EntityRegistry.GetRegistryInstance().getComponent(this._typeName, componentName);
        return c;
    };

    return Entity;
});