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
                else if(self.engine.controls.moving.up)
                    self.setAnimation('moveup');
                else if(self.engine.controls.moving.down)
                    self.setAnimation('movedown');
                else if(self.engine.controls.moving.left)
                    self.setAnimation('moveleft');
                else if(self.engine.controls.moving.right)
                    self.setAnimation('moveright');
            });

            //TODO: need to also check for trying to move, but can't and do those pushing animations
        },
        update: function(delta) {
            //animation updates
            this.animate(delta);

            if(this.freeze) return;

            //calculate movement accross the world, if we are not at (or going into)
            //the map min/max for that axis then move the map. If we do hit a min/max
            //then move the map
            var speed = delta * this.moveSpeed,
                x = 0,
                y = 0,
                mx = 0,
                my = 0;

            //clamp speed to fix issues with collision calculations when framerate gets low
            if(speed > 0) speed = Math.min(speed, 10);
            else if(speed < 0) speed = Math.max(speed, -10);

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

            this._doMapCollisionCheck(x || mx, y || my);

            //if blocked, then set to 0
            if(this.blocked.x) x = mx = 0;
            if(this.blocked.y) y = my = 0;

            if(x || y) this.moveEntity(x, y);

            if(mx || my) this.engine.map.pan(mx, my);
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
        //used to move a player over time
        movePlayer: function(sx, sy) {
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