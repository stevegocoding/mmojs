/**
 * User: magkbdev
 * Date: 10/24/13
 * Time: 11:32 AM
 * To change this template use File | Settings | File Templates.
 */


define(['easeljs'], function() {

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

        p.Stage_updateContext(ctx);


        var dx = 7;
        var dy = 10;
        ctx.translate(-16 * dx * 2, -16 * dy * 2);

    };

    return GameStage;
});