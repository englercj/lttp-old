define([
    'game/data/types',
    'game/entities/Entity'
], function(types, Entity) {
    var Smash = function() {
        Entity.call(this, gf.assetCache['sprite_smash'], 0.2);

        this._addAnimations();
        this.on('complete', this._done.bind(this));
    };

    gf.inherits(Smash, Entity, {
        _addAnimations: function() {
            this._addSlices('rock', 0, 0, 0, 7);
            this._addSlices('grass', 0, 8, 1, 5);
            this._addSlices('grass_pink', 1, 6, 2, 3);
            this._addSlices('rock_green', 2, 4, 3, 1);
            this._addSlices('grass_white', 3, 2, 3, 9);
            this._addSlices('grass_brown', 4, 0, 4, 7);
            this._addSlices('grass_dark', 4, 8, 5, 6);
        },
        _addSlices: function(dir, sx, sy, tx, ty) {
            var frames = [];
            while(sx !== tx || sy !== ty) {
                frames.push(this.spritesheet['slice_' + sx + '_' + sy + '.png'].frames[0]);

                sy++

                if(sy > 9) {
                    sx++;
                    sy = 0;
                }
            }

            this.addAnimation(dir, frames);
        },
        _done: function() {
            this.visible = false;
        }
    });

    return Smash;
});