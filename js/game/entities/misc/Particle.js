define([
    'game/data/constants',
    'game/entities/Entity'
], function(C, Entity) {
    var Particle = function() {
        Entity.call(this, gf.assetCache['sprite_particles'], 0.2);
    };

    gf.inherits(Particle, Entity, {
        setup: function(item, phys) {
            
        },
        fire: function() {

        },
        _collide: function(obj, vec, colShape, myShape) {
            //collide with an exit
            if(obj.type === 'torch' && this.type === 'fire') {
                //flame the torch
                this.emit('exit', obj, vec);
            }
        }
    });

    return Particle;
});