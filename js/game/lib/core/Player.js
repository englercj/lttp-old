define([
    'game/lib/core/Entity'
], function(Entity) {
    var Player = Entity.extend({
        init: function(resource, engine) {
            //initialize entity
            this._super(resource, engine);

            this.maxMagic = resource.data.maxMagic || 70;
            this.magic = resource.data.magic || 70;
            this.inventory = resource.data.inventory || {
                rupees: 0,
                bombs: 0,
                arrows: 0,
                heart_pieces: 0
            };
            this.equipted = null;

            //link the player moving to the controls
            this.moving = this.engine.controls.moving;

            //for keeping player centered
            this.centerThreshold = 5;
            this.offcenter = { x: false, y: false };
            this.lockMap = { x: false, y: false };

            //bind events
            this.bindEvents();

            //move to the location specified
            //this.setPosition(resource.data.location[0], resource.data.location[1]);
            //this.engine.map.pan(options.location[0], options.location[1]);
        },
        bindEvents: function() {
            var self = this;

            //set moving animations
            self.engine.controls.on('move::*', function(dir, startMoving) {
                if(!self.engine.controls.isMoving)
                    self.setAnimation();
                else if(self.moving.up)
                    self.setAnimation('moveup');
                else if(self.moving.down)
                    self.setAnimation('movedown');
                else if(self.moving.left)
                    self.setAnimation('moveleft');
                else if(self.moving.right)
                    self.setAnimation('moveright');
            });

            //TODO: when blocked, show pushing animation
        },
        moveEntity: function(x, y) {
            this._super(x, y);

            if(!this.blocked.x) this.engine.camera.translateX(x);
            if(!this.blocked.y) this.engine.camera.translateY(y);
        },
        //used to move a player over time
        /*movePlayer: function(sx, sy) {
            var x = 0,
                y = 0,
                mx = 0,
                my = 0;

            if(this.engine.controls.moving.up) y += sy;
            if(this.engine.controls.moving.down) y -= sy;

            if(!this.engine.map.atMax('y', -y) && !this.engine.map.atMin('y', -y) && !this.lockMap.y) {
                if(this.engine.controls.moving.up) my -= sy;
                if(this.engine.controls.moving.down) my += sy;

                y = 0;
            }

            if(this.engine.controls.moving.left) x -= sx;
            if(this.engine.controls.moving.right) x += sx;

            if(!this.engine.map.atMax('x', -x) && !this.engine.map.atMin('x', -x) && !this.lockMap.x) {
                if(this.engine.controls.moving.left) mx += sx;
                if(this.engine.controls.moving.right) mx -= sx;

                x = 0;
            }

            if(x || y) this.moveEntity(x, y);

            if(mx || my) this.engine.map.pan(mx, my);
        },*/
    });

    return Player;
});