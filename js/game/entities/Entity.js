define([
], function() {
    var Entity = function(spritesheet, speed, startanim) {
        //is this sprite able to move?
        this.locked = false;

        //maximum health of this entity
        this.maxHealth = 3;

        //current health of this entity
        this.health = 3;

        //moveSpeed the ent moves at
        this.moveSpeed = 75;

        this.spritesheet = spritesheet;

        gf.AnimatedSprite.call(this, spritesheet, speed, startanim);

        this.on('collision', this._collide.bind(this));
        this.on('separate', this._separate.bind(this));
    };

    gf.inherits(Entity, gf.AnimatedSprite, {
        damage: function(num) {
            this.health -= num;

            if(this.health < 0)
                this.health = 0;

            if(!this.health)
                this.emit('die');
        },
        heal: function(num) {
            this.health += num;

            if(this.health > this.maxHealth)
                this.health = this.maxHealth;
        },
        _addDirectionalFrames: function(type, num, speed, loop) {
            if(type.indexOf('%s') === -1)
                type += '_%s';

            this._addFrames([
                type.replace(/%s/g, 'left'),
                type.replace(/%s/g, 'right'),
                type.replace(/%s/g, 'down'),
                type.replace(/%s/g, 'up')
            ], num, speed, loop);
        },
        _addFrames: function(types, num, speed, loop) {
            if(!(types instanceof Array))
                types = [types];

            for(var t = 0, tl = types.length; t < tl; ++t) {
                var frames = [],
                    type = types[t],
                    name = type.replace(/.+\/|\.png|_%./g, '');

                if(type.indexOf('%d') === -1)
                    type += '_%d';

                for(var f = 1; f <= num; ++f) {
                    frames.push(this.spritesheet[type.replace(/%d/g, f) + '.png'].frames[0]);
                }
                this.addAnimation(name, frames, speed, loop);
            }
        },
        _collide: function(obj, vec, colShape, myShape) {},
        _separate: function(obj, vec, colShape, myShape) {}
    });

    return Entity;
});