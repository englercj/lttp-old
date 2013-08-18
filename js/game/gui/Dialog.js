define([
    'game/data/constants',
    'game/fonts/ReturnOfGanon'
], function(C, ReturnOfGanonFont) {
    var Dialog = function() {
        gf.Gui.call(this);

        this.sounds = {
            open: gf.assetCache.effect_pause_close,
        };

        for(var s in this.sounds) {
            this.sounds[s].volume = C.MUSIC_VOLUME;
            lttp.play.audio.attach(this.sounds[s]);
        }

        this.scale.x = this.scale.y = C.SCALE;
        this.position.x = 102;
        this.position.y = 438;
        this.visible = false;

        this.text = '';
        this.range = [0, 1]; //start pos, length

        this.fastSpeed = 15;
        this.typeSpeed = 50;
        this.speed = this.typeSpeed;

        this.speedCooldown = 250;

        this.padding = 5;

        this._setup();
    };

    gf.inherits(Dialog, gf.Gui, {
        setText: function(text) {
            this.text = text;

            //insert a space with a newline every 30 characters
            var i = 30;
            while(this.text[i]) {
                var sp = this._getPreviousSpace(this.text, i);
                this.text = [this.text.slice(0, sp), '\n', this.text.slice(sp + 1)].join('');
                i += 30;
            }

            this.font.setText('');
        },
        _getPreviousSpace: function(str, i) {
            var found = false,
                sub = 0;

            do {
                if(str[i - sub] === ' ')
                    return i-sub;

                sub++;
            } while(i+sub < str.length || i-sub > 0);
        },
        show: function(cb) {
            this.visible = true;
            this.sounds.open.play();

            this.range[0] = 0;
            this.range[1] = 1;

            var self = this;
            this._type(function() {
                setTimeout(function() {
                    self.doneCb = cb;
                }, self.speedCooldown);
            });
        },
        hide: function() {
            this.visible = false;
        },
        onAdvance: function(status) {
            //done typing
            if(this.doneCb) {
                this.doneCb();
                this.doneCb = null;
            }
            //speed up typing
            else {
                this.speed = this.fastSpeed;

                var self = this;
                setTimeout(function() {
                    self.speed = self.typeSpeed;
                }, this.speedCooldown);
            }
        },
        _type: function(cb) {
            this.font.setText(
                this.text.substr(
                    this.range[0],
                    this.range[1]
                )
            );

            this.range[1]++;

            //TODO: Messages longer than 1 box should bump up the text

            if(this.range[1] > this.text.length) {
                if(cb) cb();
            } else {
                setTimeout(this._type.bind(this, cb), this.speed);
            }
        },
        _setup: function() {
            //add background
            this.addChild(new gf.Sprite(gf.assetCache.sprite_gui['dialog.png']))

            //add font
            this.font = new ReturnOfGanonFont();
            this.font.maxX = 
            this.font.scale.x = this.font.scale.y = 0.5;
            this.font.position.x = 8;
            this.font.position.y = 20;
            this.addChild(this.font);
        }
    });

    return Dialog;
});