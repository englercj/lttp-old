define([
    'game/lib/bases/Sprite'
], function(Sprite) {
    var Player = Sprite.extend({
        init: function(options, texture, controls) {
            //set a couple properties
            options.texture = texture;
            this.controls = controls;

            this.moveSpeed = 250;

            //initialize the visible sprite
            this._super(options);

            //this.setAnimation('idle');
            this.setPosition(0, 0);

            this.bindEvents();
        },
        bindEvents: function() {
            var self = this;

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
        },
        update: function(delta) {
            //movement checks
            var speed = delta * this.moveSpeed;
            if(this.controls.moving.up) this._mesh.translateY(speed);
            if(this.controls.moving.down) this._mesh.translateY(-speed);

            if(this.controls.moving.left) this._mesh.translateX(-speed);
            if(this.controls.moving.right) this._mesh.translateX(speed);

            //animation updates
            this.animate(delta);
        }
    });

    return Player;
});