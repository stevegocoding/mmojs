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

    var p = Entity.prototype;

    /* Private Properties */
    p.id = -1;
    p.type = -1;
    p.name = "default";
    p.entityData = null;

    p._enityRegistry = null;
    p.drawable = true;

    /* Default Components  */
    p.positionComponent = null;
    p.renderComponent = null;

    /* Constructor */
    p.initialize = function(entityData) {
        this.entityData = entityData;

        this.id = entityData.id;
        this.type = entityData.type;
        this.name = entityData.name;

        this._entityRegistry = EntityRegistry.GetRegistryInstance();
        this._entityRegistry.registerEntitity(this.entityData.type, null);
    };

    /* Public Methods */
    p.attachComponent = function(name, component) {
        var compRegistry = {};
        compRegistry[name] = component;
        this._entityRegistry.addComponent(this.entityData.type, compRegistry);

        component.onAttached(this);
    };

    p.detachComponent = function(component) {

    };

    p.process = function() {
        this.processPosition();
    };

    p.processPosition = function() {
        if (this.positionComponent !== null) {
            this.positionComponent.process();
        }
    };

    p.getName = function() {
        return this._name;
    };

    p.getComponent = function(componentName) {
        var c = EntityRegistry.GetRegistryInstance().getComponent(this.entityData.type, componentName);
        return c;
    };

    p.moveTo = function(x, y) {
        var posComp = this.getComponent("PositionComponent");
        if (posComp !== null) {
            posComp.moveTo(x, y);
        }
    };

    p.getGridPos = function() {
        var posComp = this.getComponent("PositionComponent");
        var pos;
        if (posComp !== null)
            pos = {x: posComp.gridX, y: posComp.gridY};

        return pos;
    };

    return Entity;
});