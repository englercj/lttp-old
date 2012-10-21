define([
], function() {
    var Controls = function (gl, renderer, canvas) {
        this.moveSpeed = 0.16;
        this.moving = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        this.renderer = renderer;
        this.canvas = canvas;

        this.bindEvents(canvas);
    };

    Controls.prototype.bindEvents = function(canvas) {
        var self = this;

        //key movement
        document.addEventListener('keydown', function(ev) {
            var key = ev.keyCode || ev.which;

            switch(key)  {
                //W - UP
                case 87:
                case 38:
                    //self.moveStart('up');
                    self.moving.up = true;
                    break;

                //A - LEFT
                case 65:
                case 37:
                    //self.moveStart('left');
                    self.moving.left = true;
                    break;

                //S - DOWN
                case 83:
                case 40:
                    //self.moveStart('down');
                    self.moving.down = true;
                    break;

                //D - RIGHT
                case 68:
                case 39:
                    //self.moveStart('right');
                    self.moving.right = true;
                    break;
            }
        }, false);

        document.addEventListener('keyup', function(ev) {
            var key = ev.keyCode || ev.which;

            switch(key)  {
                //W - UP
                case 87:
                case 38:
                    //self.moveEnd('up');
                    self.moving.up = false;
                    break;

                //A - LEFT
                case 65:
                case 37:
                    //self.moveEnd('left');
                    self.moving.left = false;
                    break;

                //S - DOWN
                case 83:
                case 40:
                    //self.moveEnd('down');
                    self.moving.down = false;
                    break;

                //D - RIGHT
                case 68:
                case 39:
                    //self.moveEnd('right');
                    self.moving.right = false;
                    break;
            }
        }, false);
    };

    Controls.prototype.update = function(gl, timing) {
        //update moving
        var x = 0, y = 0, speed = timing.frameTime * this.moveSpeed;

        if(this.moving.up) y += speed;
        if(this.moving.down) y -= speed;

        if(this.moving.left) x += speed;
        if(this.moving.right) x -= speed;

        this.renderer.pan(x, y);
    };

    return Controls;
});