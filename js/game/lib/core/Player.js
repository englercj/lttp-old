define([
    'game/lib/bases/Sprite'
], function(Sprite) {
    var Player = Sprite.extend({
        init: function(options, texture, controls, map, viewport) {
            //set a couple properties
            options.texture = texture;
            this.controls = controls;
            this.map = map;
            this.viewport = viewport;

            //set some variables
            this.type = options.type;
            this.name = options.name;

            this.moveSpeed = 250;
            this.centerThreshold = 5;
            this.offcenter = { x: false, y: false };

            //initialize the visible sprite
            this._super(options.sprite);

            //this.setAnimation('idle');
            this.setPosition(0, 0);

            this.bindEvents();

            //move to the location specified
            this.map.pan(options.location[0], options.location[1]);

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
            //do actual sprite movement accross the world
            //if we hit max/min of map box
            var speed = delta * this.moveSpeed,
                x = 0,
                y = 0;

            if(this.map.atMax('y') || this.map.atMin('y')) {
                if(this.controls.moving.up) y += speed;
                if(this.controls.moving.down) y -= speed;
            }

            if(this.map.atMax('x') || this.map.atMin('x')) {
                if(this.controls.moving.left) x -= speed;
                if(this.controls.moving.right) x += speed;
            }

            if(x || y)
                this.movePlayer(x, y);

            //animation updates
            this.animate(delta);
        },
        movePlayer: function(x, y) {
            var w2 = this.viewport.width / 2,
                h2 = this.viewport.height / 2,
                maxX = w2 - (this.size.x / 2), //half width - half texture width
                maxY = h2 - (this.size.y / 2),
                newX = this._mesh.position.x + x,
                newY = this._mesh.position.y + y;

            //constrain X
            if(x && newX < maxX && newX > -maxX) {
                this._mesh.translateX(x);
                this._checkMapLock('x');
            }

            //constrain Y
            if(y && newY < maxY && newY > -maxY) {
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
                this.controls.lockMap[axis] = true;
            }
            //check if he is close to axis center and if so, put him at 0 and unlock map
            else if(this._mesh.position[axis] > -this.centerThreshold && this._mesh.position[axis] < this.centerThreshold) {
                this._mesh.position[axis] = 0;
                this.controls.lockMap[axis] = false;
                this.offcenter[axis] = false;
            }
        },

    });

    return Player;
});