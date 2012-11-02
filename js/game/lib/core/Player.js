define([
    'game/lib/core/Entity'
], function(Entity) {
    var Player = Entity.extend({
        init: function(resource, engine) {
            //initialize entity
            this._super(resource, engine);

            this.maxMagic = resource.data.maxMagic || 70;
            this.magic = resource.data.magic || 70;
            this.inventory = resource.data.inventory || {
                rupees: 0,
                bombs: 0,
                arrows: 0,
                heart_pieces: 0
            };
            this.equipted = null;

            //link the player moving to the controls
            this.moving = this.engine.controls.moving;

            //for keeping player centered
            this.centerThreshold = 5;
            this.offcenter = { x: false, y: false };
            this.lockMap = { x: false, y: false };

            //bind events
            this.bindEvents();
        },
        bindEvents: function() {
            this._super();

            var self = this;

            //set blocked animations
            self.engine.controls.on('move::*', function(dir) {
            });

            //TODO: when blocked, show pushing animation
        },
        moveEntity: function(x, y) {
            this._super(x, y);

            if(!this.blocked.x) this.engine.camera.translateX(x);
            if(!this.blocked.y) this.engine.camera.translateY(y);
        }
    });

    return Player;
});