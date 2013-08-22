define([
    'game/data/constants',
    'game/entities/Entity'
], function(C, Entity) {
    var Torch = function() {
        Entity.call(this, gf.assetCache['sprite_torch'], 0.2);

        this.addAnimation('torch', [
            this.spritesheet['torch0.png'].frames[0]
        ]);

        this.addAnimation('torch_lit', [
            this.spritesheet['torch1.png'].frames[0],
            this.spritesheet['torch2.png'].frames[0],
            this.spritesheet['torch3.png'].frames[0]
        ], 0.09, true);

        this.addAnimation('wall_torch', [
            this.spritesheet['wall_torch1.png'].frames[0],
            this.spritesheet['wall_torch2.png'].frames[0],
            this.spritesheet['wall_torch3.png'].frames[0]
        ], 0.09, true);

        this.light = 0.25;
    };

    gf.inherits(Torch, Entity, {
        lite: function() {
            if(this.type !== 'torch') return;

            this.gotoAndPlay('torch_lit');
            setTimeout(this.extinguish.bind(this), 5000);

            //light up dat world
            lttp.play.world.findLayer('darkness').alpha -= this.light;
        },
        extinguish: function() {
            if(this.type !== 'torch') return;

            this.gotoAndStop('torch');

            //darken dat world
            lttp.play.world.findLayer('darkness').alpha += this.light;
        }
    });

    return Torch;
});