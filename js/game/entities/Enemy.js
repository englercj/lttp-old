define([
    'game/data/types',
    'game/entities/Entity'
], function(types, Entity) {
    var Enemy = function(spritesheet) {
        Entity.call(this, spritesheet);

        //enemy type
        this.type = types.ENTITY.ENEMY;
        this.attacking = true;
    };

    gf.inherits(Enemy, Entity, {

    });

    return Enemy;
});
