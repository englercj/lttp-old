define([
    'game/lib/bases/Emitter'
], function(Emitter) {
    var Controls = Emitter.extend({
        init: function(viewport, camera, events) {
            //setup the emitter
            this._super({ wildcard: true, delimiter: '::', maxListeners: 10 });

            this.viewport = viewport;
            this.camera = camera;

            this.lockCamera = false;

            this.moveSpeed = 250;

            this.moving = {
                up: false, down: false,
                left: false, right: false
            }

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
            /*this.viewport.on({
                resize: $.proxy(this.onResize, this),
                mousedown: $.proxy(this.onMouseDown, this),
                mouseup: $.proxy(this.onMouseUp, this),
                mousemove: $.proxy(this.onMouseMove, this)
            });*/

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

                        this.moving[dir] = true;
                        this.emit('move', dir, true);
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
                        this.emit('move', dir, false);
                    }
                }
            }
        },
        update: function(delta) {
            if(this.lockCamera) return;
            
            var speed = delta * this.moveSpeed;

            if(this.moving.up) this.camera.translateY(speed);
            if(this.moving.down) this.camera.translateY(-speed);

            if(this.moving.left) this.camera.translateX(-speed);
            if(this.moving.right) this.camera.translateX(speed);
        }
    });

    return Controls;
});