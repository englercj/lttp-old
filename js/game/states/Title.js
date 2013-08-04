define([
    'game/data/constants',
    'game/states/State',
    'game/entities/misc/Title'
], function(C, State, TitleSprite) {
    var Title = function(game) {
        State.call(this, 'title', game);

        this.sounds = {
            intro: gf.assetCache.music_title
        };
        this.sprites = {
            intro: new TitleSprite()
        };

        for(var s in this.sounds) {
            this.sounds[s].volume = C.MUSIC_VOLUME;
        }

        this.sprites.intro.scale.x = this.sprites.intro.scale.y = 3;
        this.camera.addChild(this.sprites.intro);
    };

    gf.inherits(Title, State, {
        start: function() {
            State.prototype.start.call(this);

            this.sprites.intro.gotoAndPlay('intro');

            this.music = this.sounds.intro.play();

            var self = this;
            this.sprites.intro.once('complete', function() {
            });
        }
    });

    return Title;
});