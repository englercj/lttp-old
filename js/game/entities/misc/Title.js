define([
    'game/entities/Entity'
], function(Entity) {
    var Title = function() {
        Entity.call(this, gf.assetCache.sprite_intro, 0.2);

        this._addAnimations();

        this.sounds = {
            intro: gf.assetCache.music_title
        };
    };

    gf.inherits(Title, Entity, {
        _addAnimations: function() {
            var frames = [],
                i = 0;

            for(i = 32; i < 146; ++i) {
                frames.push(this.spritesheet[i + '.gif'].frames[0]);
            }
            this.addAnimation('intro', frames, 0.35);
        },
        gotoAndPlay: function(anim) {
            if(anim === 'intro') {
                this.sounds.intro.play();
            }

            Entity.prototype.gotoAndPlay.apply(this, arguments);
        },
    });

    return Title;
});