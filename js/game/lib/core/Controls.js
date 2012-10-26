define([
    'game/lib/bases/Emitter'
], function(Emitter) {
    var Controls = Emitter.extend({
        init: function(viewport, camera, map) {
            //setup the emitter
            this._super({ wildcard: true, delimiter: '::', maxListeners: 10 });

            this.viewport = viewport;
            this.camera = camera;
            this.map = map;

            this.lockCamera = { x: false, y: false };
            this.lockMap = { x: false, y: false };

            this.moveSpeed = 250;

            this.moving = {
                up: false, down: false,
                left: false, right: false
            };
            this.isMoving = false;

            this.keys = {
                moveup:     [87, 38], //W, and UP-ARROW
                movedown:   [83, 40], //S, and DOWN-ARROW
                moveleft:   [65, 37], //A, and LEFT-ARROW
                moveright:  [68, 39], //D, and RIGHT-ARROW
                attack:     [86, 32], //V, and SPACEBAR
                use:        [69, 97], //E, and NUMPAD-1
                inventory:  [73, 98], //I, and NUMPAD-2
                map:        [77, 99], //M, and NUMPAD-3
                menu:       [75, 100], //K, and NUMPAD-4
                pause:      [19, 35], //PAUSE-BREAK, and END
            };

            this.bindEvents();
        },
        bindEvents: function() {
            this.viewport._$doc.on({
                keydown: $.proxy(this.onKeyDown, this),
                keyup: $.proxy(this.onKeyUp, this)
            });
        },
        onKeyDown: function(e) {
            var key = e.which;

            //iterate through all keys mappings
            for(var k in this.keys) {
                //if this key is in this map
                if(this.keys[k].indexOf(key) !== -1) {
                    e.preventDefault();
                    //move event
                    if(k.indexOf('move') === 0) {
                        var dir = k.replace('move', '');

                        //we already got this event (repeated key from holding it down)
                        if(this.moving[dir]) return;

                        this.moving[dir] = true;
                        this.isMoving = true;
                        this.emit('move::start', dir, true);
                    } else {
                        this.emit(k);
                    }
                }
            }
        },
        onKeyUp: function(e) {
            e.preventDefault();
            var key = e.which;

            for(var k in this.keys) {
                //if this key is in this map
                if(this.keys[k].indexOf(key) !== -1) {
                    e.preventDefault();
                    //move event
                    if(k.indexOf('move') === 0) {
                        var dir = k.replace('move', '');
                        this.moving[dir] = false;
                        this.isMoving = (this.moving.up || this.moving.down || this.moving.left || this.moving.right);
                        this.emit('move::end', dir, false);
                    }
                }
            }
        },
        update: function(delta) {
            var speed = delta * this.moveSpeed,
                x = 0,
                y = 0;

            if(!this.lockCamera.y) {
                if(this.moving.up) this.camera.translateY(speed);
                if(this.moving.down) this.camera.translateY(-speed);
            }

            if(!this.lockCamera.x) {
                if(this.moving.left) this.camera.translateX(-speed);
                if(this.moving.right) this.camera.translateX(speed);
            }

            if(!this.lockMap.y) {
                if(this.moving.up) y -= speed;
                if(this.moving.down) y += speed;
            }

            if(!this.lockMap.x) {
                if(this.moving.left) x += speed;
                if(this.moving.right) x -= speed;
            }

            if((!this.lockMap.x || !this.lockMap.y) && (x || y))
                this.map.pan(x, y);
        }
    });

    return Controls;
});