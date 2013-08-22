define([
    'game/data/constants',
    'game/entities/Entity'
], function(C, Entity) {
    var Particle = function() {
        this.sensor = true;

        Entity.call(this, gf.assetCache['sprite_particles'], 0.1);

        this.anchor.x = 0;
        this.anchor.y = 0;

        this.on('complete', this.expire.bind(this));
    };

    gf.inherits(Particle, Entity, {
        run: function(item, phys) {
            var cfg = this.cfg = item.particle;

            this.visible = true;
            this.hitArea = cfg.hitArea || new Rectangle(0, 8, 8, 8);
            this.enablePhysics(phys);

            if(!this.animations[item.name]) {
                var frames = [];

                for(var i = 0; i < cfg.num; ++i) {
                    frames.push(this.spritesheet[cfg.path + (i+1) + cfg.ext].frames[0]);
                }

                this.addAnimation(item.name, frames, cfg.speed, cfg.loop);
            }

            //set type
            this.name = cfg.name;
            this.type = cfg.type;

            //play animation for this item
            this.gotoAndPlay(item.name);

            //set position
            var p = this.parent,
                space = cfg.spacing;

            switch(this.parent.lastDir) {
                case 'up':
                    this.setPosition(0, -space);
                    break;
                case 'down':
                    this.setPosition(0, space);
                    break;
                case 'left':
                    this.setPosition(-space, 0);
                    break;
                case 'right':
                    this.setPosition(space, 0);
                    break;
            }

            //if there is a velocity set it
            if(cfg.velocity) {
                this.velocity = cfg.velocity.clone();
                this.setVelocity(cfg.velocity);

                if(cfg.velocityTimer) {
                    var cb;
                    if(cfg.velocityReverse) {
                        cb = this.reverse;
                    } else {
                        cb = this.expire;
                    }

                    this.velto = setTimeout(cb.bind(this), cfg.velocityTimer)
                }
            }
        },
        expire: function() {
            clearTimeout(this.velto);
            this.stop();
            this.visible = false;
            this.disablePhysics();
        },
        reverse: function() {
            clearTimeout(this.velto);
            this.velocity.x = -this.velocity.x;
            this.velocity.y = -this.velocity.y;

            this.setVelocity(this.velocity);
        },
        _collide: function(obj, vec, colShape, myShape) {
            //fire particle
            if(this.name === 'lantern' || this.name === 'firerod') {
                //check the type of collider
                switch(obj.type) {
                    //lite the torch up
                    case 'torch':
                        obj.lite();
                        /* falls through */

                    //hit a wall, just DIE
                    case C.ENTITY.TILE:
                        this.expire();
                        break;
                }
            } else if(this.name === 'boomerang') {
                switch(obj.type) {
                    //reverse the velocity back to the player
                    case C.ENTITY.TILE:
                        this.reverse();
                        break;

                    //expire (player caught it)
                    case C.ENTITY.PLAYER:
                        this.expire();
                        break;
                }
            }
        }
    });

    return Particle;
});