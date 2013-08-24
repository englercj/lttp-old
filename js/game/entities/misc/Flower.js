define([
    'game/data/constants',
    'game/entities/Entity'
], function(C, Entity) {
    var Flower = function() {
        Entity.call(this, gf.assetCache.sprite_misc, 0.2);

        this.addAnimation('flower_1', [
            this.spritesheet['flower/flower_1_3.png'].frames[0],
            this.spritesheet['flower/flower_1_1.png'].frames[0],
            this.spritesheet['flower/flower_1_2.png'].frames[0]
        ], 0.095, true);

        this.addAnimation('flower_2', [
            this.spritesheet['flower/flower_2_3.png'].frames[0],
            this.spritesheet['flower/flower_2_1.png'].frames[0],
            this.spritesheet['flower/flower_2_2.png'].frames[0]
        ], 0.095, true);
    };

    gf.inherits(Flower, Entity, {
    });

    return Flower;
});