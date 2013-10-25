/**
 * User: magkbdev
 * Date: 10/24/13
 * Time: 11:32 AM
 * To change this template use File | Settings | File Templates.
 */


define(['entity/entity_world', 'easeljs'], function(EntityWorld) {

    var GameStage = function(dom) {
        this.initialize(dom);
    };

    var super_p = createjs.Stage.prototype,
        p = GameStage.prototype = Object.create(super_p);


    p.initialize = function(dom) {
        super_p.initialize.call(this, dom);
    };

    p.Stage_updateContext = super_p.updateContext;
    p.updateContext = function(ctx) {
        this.Stage_updateContext(ctx);
        this.applyCameraTransform(ctx);
    };

    p.applyCameraTransform = function(ctx) {
        var s = EntityWorld.instance().scale,
            dx = EntityWorld.instance().camera.x,
            dy = EntityWorld.instance().camera.y;
        ctx.translate(-dx*s, -dy*s);
    };

    return GameStage;
});