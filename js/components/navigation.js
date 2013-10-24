/**
 * User: magkbdev
 * Date: 10/23/13
 * Time: 12:16 PM
 * To change this template use File | Settings | File Templates.
 */

define(['lib/astar'], function(AStar) {


    var Navigation = function(width, height) {

        this.initialize(width, height);

    };

    var p = Navigation.prototype;

    p.initialize = function(width, height) {

        this.width = width;
        this.height = height;
        this.grid = null;
        this.blankGrid = [];
        this.initBlankGrid();
        this.ignored = [];

    };

    p.initBlankGrid = function() {
        for (var i = 0; i < this.height; i+=1) {
            this.blankGrid[i] = [];
            for (var j = 0; j < this.width; j+=1) {
                this.blankGrid[i][j] = 0;
            }
        }
    };

    p.findPath = function(grid, start, end, findIncomplete) {
        var path;

        this.grid = grid;

        // Calculate the path using A*
        path = AStar(this.grid, start, end);

        if (path.length === 0 && findIncomplete === true) {
            path = this._findIncompletePath(start, end);
        }

        return path;
    };

    /**
     * Finds a path which leads the closest possible to an unreachable x, y position.
     *
     * Whenever A* returns an empty path, it means that the destination tile is unreachable.
     * We would like the entities to move the closest possible to it though, instead of
     * staying where they are without moving at all. That's why we have this function which
     * returns an incomplete path to the chosen destination.
     *
     * @private
     * @returns {Array} The incomplete path towards the end position
     */
    p._findIncompletePath = function(start, end) {
        var perfect, x, y,
            incomplete = [];

        perfect = AStar(this.blankGrid, start, end);

        for (var i = perfect.length-1; i > 0; i-=1) {
            x = perfect[i][0];
            y = perfect[i][1];

            if (this.grid[y][x] === 0) {
                incomplete = AStar(this.grid, start, [x, y]);
                break;
            }
        }
        return incomplete;
    };

    /*
    p._applyIgnoreList = function(ignored) {
        var self = this;
        var x, y, g;

        _.each(this.ignored, function(entity) {

        });
    };
    */

    p.grid = null;
    p.blankGrid = null;
    p.ignored = null;

    return Navigation;

});
