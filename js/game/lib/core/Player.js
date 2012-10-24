define([
    'game/lib/bases/Sprite'
], function(Sprite) {
    var Player = Sprite.extend({
        init: function(options, texture, controls) {
            //set a couple properties
            options.texture = texture;
            this.controls = controls;
            this.moving = false;

            //initialize the visible sprite
            this._super(options);

            //this.setAnimation('idle');
            this.setPosition(0, 0);

            this.bindEvents();
        },
        bindEvents: function() {
            var self = this;

            self.controls.on('move', function(dir, moving) {
                if(self.moving == moving) return; //repeat, ignore

                self.moving = moving;

                if(moving)
                    self.setAnimation('move' + dir);
                else
                    self.setAnimation();
            });
        }
    });

    return Player;
});