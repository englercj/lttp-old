define([
], function() {
    var Entity = function(spritesheet, speed, startanim) {
        //is this sprite able to move?
        this.locked = false;

        //maximum health of this entity
        this.maxHealth = 3;

        //current health of this entity
        this.health = 3;

        //loot of the entity that is dropped when it dies
        this.loot = [];

        //moveSpeed the ent moves at
        this.moveSpeed = 75;

        this.spritesheet = spritesheet;

        gf.AnimatedSprite.call(this, spritesheet, speed, startanim);

        this.on('collision', this._collide.bind(this));
        this.on('separate', this._separate.bind(this));
    };

    gf.inherits(Entity, gf.AnimatedSprite, {
        _addDirectionalFrames: function(type, num, speed, loop) {
            this._addFrames([
                type + '_left',
                type + '_right',
                type + '_down',
                type + '_up'
            ], num, speed, loop);
        },
        _addFrames: function(types, num, speed, loop) {
            if(!(types instanceof Array))
                types = [types];

            for(var t = 0, tl = types.length; t < tl; ++t) {
                var frames = [],
                    type = types[t];

                for(var f = 1; f <= num; ++f) {
                    frames.push(this.spritesheet[type + '/' + type + '_' + f + '.png'].frames[0]);
                }
                this.addAnimation(type, frames, speed, loop);
            }
        },
        _collide: function(obj, vec, colShape, myShape) {},
        _separate: function(obj, vec, colShape, myShape) {}
    });

    return Entity;
});