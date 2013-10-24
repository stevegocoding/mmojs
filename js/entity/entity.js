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

    Entity._nextID = 0;

    /* Private Properties */
    p.id = -1;
    p._name = "default_entity";
    p._typeName = "default_type";

    p.entityData = null;

    p._enityRegistry = null;
    p.drawable = true;

    /* World Position Data */
    p.positionComponent = null;
    p.renderComponent = null;

    /* Constructor */
    p.initialize = function(entityData) {
        // this.id = Entity._nextID++;

        this.id = entityData.getId();
        this._name = entityData.getName();
        this._typeName = entityData.getTypeName();

        this.entityData = entityData;
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
        this.processPosition();
    };

    p.processPosition = function() {
        if (this.positionComponent !== null) {
            this.positionComponent.process();

            if (this.renderComponent !== null) {
                var x = this.positionComponent.x * 2,
                    y = this.positionComponent.y * 2;
                this.renderComponent.getDisplayObject().setTransform(x,y);

                var or = this.positionComponent.getOrientationName();
                var state = "walk_" + or;
                this.renderComponent.setState(state);

            }
        }
    };

    p.getName = function() {
        return this._name;
    };

    p.getComponent = function(componentName) {
        var c = EntityRegistry.GetRegistryInstance().getComponent(this._typeName, componentName);
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