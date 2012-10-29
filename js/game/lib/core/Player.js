define([
    'game/lib/core/Entity'
], function(Entity) {
    var Player = Entity.extend({
        init: function(options, texture, engine) {
            //initialize entity
            this._super(options, texture, engine);

            //for keeping player centered
            this.centerThreshold = 5;
            this.offcenter = { x: false, y: false };
            this.lockMap = { x: false, y: false };

            //bind events
            this.bindEvents();

            //move to the location specified
            this.setPosition(0, 0);
            this.engine.map.pan(options.location[0], options.location[1]);

            window.play = this;
        },
        bindEvents: function() {
            var self = this;

            //set moving animations
            self.controls.on('move::*', function(dir, startMoving) {
                if(!self.controls.isMoving)
                    self.setAnimation();
                else if(self.controls.moving.up)
                    self.setAnimation('moveup');
                else if(self.controls.moving.down)
                    self.setAnimation('movedown');
                else if(self.controls.moving.left)
                    self.setAnimation('moveleft');
                else if(self.controls.moving.right)
                    self.setAnimation('moveright');
            });

            //TODO: need to also check for trying to move, but can't and do those pushing animations
        },
        update: function(delta) {
            //calculate movement accross the world, if we are not at (or going into)
            //the map min/max for that axis then move the map. If we do hit a min/max
            //then move the map
            var speed = delta * this.moveSpeed,
                x = 0,
                y = 0,
                mx = 0,
                my = 0;

            if(this.engine.controls.moving.up) y += speed;
            if(this.engine.controls.moving.down) y -= speed;

            if(!this.engine.map.atMax('y', -y) && !this.engine.map.atMin('y', -y) && !this.lockMap.y) {
                if(this.engine.controls.moving.up) my -= speed;
                if(this.engine.controls.moving.down) my += speed;

                y = 0;
            }
            
            if(this.engine.controls.moving.left) x -= speed;
            if(this.engine.controls.moving.right) x += speed;

            if(!this.engine.map.atMax('x', -x) && !this.engine.map.atMin('x', -x) && !this.lockMap.x) {
                if(this.engine.controls.moving.left) mx += speed;
                if(this.engine.controls.moving.right) mx -= speed;

                x = 0;
            }

            this._doMapCollisionCheck(x, y);

            if(x || y) this.moveEntity(x, y);

            //if we are moving the map, then block them if need be
            if(mx || my) {
                if(this.blocked.x) mx = 0;
                if(this.blocked.y) my = 0;
            }

            if(mx || my) this.engine.map.pan(mx, my);

            //animation updates
            this.animate(delta);
        },
        moveEntity: function(x, y) {
            //override entity movement, since this entity is bound to the screen
            //we need to do extra checks. It looks very similar but has some extra
            //stuff in there
            var w2 = this.engine.viewport.width / 2,
                h2 = this.engine.viewport.height / 2,
                maxX = w2 - (this.size.x / 2), //half width - half texture width
                maxY = h2 - (this.size.y / 2),
                newX = this._mesh.position.x + x,
                newY = this._mesh.position.y + y;

            //constrain X
            if(!this.blocked.x && newX < maxX && newX > -maxX) {
                this._mesh.translateX(x);
                this._checkMapLock('x');
            }

            //constrain Y
            if(!this.blocked.y && newY < maxY && newY > -maxY) {
                this._mesh.translateY(y);
                this._checkMapLock('y');
            }

        },
        checkMapLock: function() {
            this._checkMapLock('x');
            this._checkMapLock('y');
        },
        _checkMapLock: function(axis) {
            //when the player offcenters himself the map background
            //movement for that axis needs to lock, until he recenters
            //on the map

            if(!this.offcenter[axis] && this._mesh.position[axis] !== 0) {
                this.offcenter[axis] = true;
                this.lockMap[axis] = true;
            }
            //check if he is close to axis center and if so, put him at 0 and unlock map
            else if(this._mesh.position[axis] > -this.centerThreshold && this._mesh.position[axis] < this.centerThreshold) {
                this._mesh.position[axis] = 0;
                this.lockMap[axis] = false;
                this.offcenter[axis] = false;
            }
        }
    });

    return Player;
});