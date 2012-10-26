define([
    'game/lib/bases/Sprite'
], function(Sprite) {
    var Entity = Sprite.extend({
        init: function(options) {
            this.type = options.type;
            this.name = options.name;
            this.moveSpeed = options.moveSpeed || 200;
            this.health = options.health || 3;

            this.items = options.items || [];
            this.loot = options.loot || [];

            //initialize visual sprite
            this._super(options.sprite);

            //this.setAnimation('idle');
            this.setPosition(0, 0);
        },
        update: function(delta) {
            //collision/damage checks
        }
    });

    return Entity;
});