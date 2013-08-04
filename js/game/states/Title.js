define([
    'game/data/constants',
    'game/states/State'
], function(C, State) {
    var Title = function(game) {
        State.call(this, 'title', game);

        this.sounds = {
            intro: gf.assetCache.music_title,
            sword: gf.assetCache.effect_sword1,
            ding: gf.assetCache.effect_menu_select
        };

        for(var s in this.sounds) {
            this.sounds[s].volume = C.MUSIC_VOLUME;
        }

        this.sprites = {
            intro: new gf.AnimatedSprite(gf.assetCache.sprite_intro),

            background: new gf.Sprite(gf.assetCache.sprite_intro['background.png'].frames[0]),
            title: new gf.Sprite(gf.assetCache.sprite_intro['logo.png'].frames[0]),
            sword: new gf.Sprite(gf.assetCache.sprite_intro['sword.png'].frames[0]),
            zpart: new gf.Sprite(gf.assetCache.sprite_intro['zpart.png'].frames[0]),
            shine: new gf.Sprite(gf.assetCache.sprite_particles['swordshine/shine.png']),
            sparkle: new gf.AnimatedSprite([
                gf.assetCache.sprite_particles['sparkle/0.png'],
                gf.assetCache.sprite_particles['sparkle/1.png'],
                gf.assetCache.sprite_particles['sparkle/2.png'],
                gf.assetCache.sprite_particles['sparkle/3.png'],
                gf.assetCache.sprite_particles['sparkle/4.png'],
                gf.assetCache.sprite_particles['sparkle/5.png']
            ], 0.25)
        };

        this.camera.addChild(this.sprites.background);
        this.camera.addChild(this.sprites.intro);
        this.camera.addChild(this.sprites.title);
        this.camera.addChild(this.sprites.sparkle);
        this.camera.addChild(this.sprites.sword);
        this.camera.addChild(this.sprites.shine);
        this.camera.addChild(this.sprites.zpart);

        this.sprites.sparkle.visible = false;
        this.sprites.sparkle.anchor.x = this.sprites.sparkle.anchor.y = 0.5;

        this.sprites.shine.visible = false;

        this._setupIntroSprite();
        this._setupTitleSprites();

        this.scale.x = this.scale.y = 3;
        this.doPlay = true;
    };

    gf.inherits(Title, State, {
        start: function() {
            State.prototype.start.call(this);

            this.sprites.intro.gotoAndPlay('intro');

            var self = this;

            setTimeout(function() {
                if(self.doPlay)
                    self.music = self.sounds.intro.play();
            }, 3100);

            this.sprites.intro.once('complete', function() {
                setTimeout(function() {
                    self.sparkle();
                }, 500);
                //Fade in the title
                TweenLite.to(self.sprites.title, 2.5, {
                    alpha: 1,
                    ease: Linear.easeNone,
                    onComplete: function() {
                        self.sprites.zpart.visible = true;

                        //play sword sounds
                        self.sounds.sword.play(function() {
                            self.sounds.ding.play();
                        });

                        //drop the sword
                        TweenLite.to(self.sprites.sword.position, 0.2, {
                            y: 38,
                            ease: Linear.easeNone,
                            onComplete: function() {
                                //blink screen
                                self._doBlink(8, function() {
                                    //Fade out the intro
                                    TweenLite.to(self.sprites.intro, 1, {
                                        alpha: 0,
                                        ease: Linear.easeNone,
                                        onComplete: function() {
                                            self.shine();
                                            self.sprites.intro.gotoAndStop(0);
                                            self.sprites.intro.visible = false;
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            });
        },
        stop: function() {
            this.doPlay = false;

            this.sprites.sparkle.stop();
            this.sprites.sparkle.visible = false;

            State.prototype.stop.call(this);
        },
        shine: function() {
            var spr = this.sprites.shine;

            spr.position.x = 68;
            spr.position.y = 85;
            spr.visible = true;

            TweenLite.to(spr.position, 0.25, {
                y: 150,
                ease: Linear.easeNone,
                onComplete: function() {
                    spr.visible = false;
                }
            });
        },
        sparkle: function(p) {
            if(!this.doPlay){
                this.sprites.sparkle.stop();
                this.sprites.sparkle.visible = false;
                return;
            }

            p = (p || 0) % 4;

            var sp = this.sprites.sparkle,
                self = this;

            sp.visible = true;

            switch(p) {
                case 0: //Z sparkle
                    sp.position.x = 55;
                    sp.position.y = 93;
                    break;

                case 1: //A sparkle
                    sp.position.x = 197;
                    sp.position.y = 128;
                    break;

                case 2: //D sparkle
                    sp.position.x = 154;
                    sp.position.y = 88;
                    break;

                case 3: //E sparkle
                    sp.position.x = 113;
                    sp.position.y = 128;
                    break;
            }

            sp.gotoAndPlay('_default');
            sp.once('complete', function() {
                sp.visible = false;

                setTimeout(function() {
                    self.sparkle(++p);
                }, 500);
            });
        },
        _doBlink: function(num, cb) {
            if(num === 0)
                return cb();

            num--;

            var self = this,
                len = 25,
                alpha = 0.9;

            self.camera.flash(0xff0000, len, alpha, function() {
                self.camera.flash(0x0000ff, len, alpha, function() {
                    self._doBlink(num, cb);
                });
            });
        },
        _setupIntroSprite: function() {
            var frames = [],
                i = 0;

            for(i = 3; i < 278; ++i) {
                var s = i.toString();
                while(s.length < 5) { s = '0' + s; }

                frames.push(gf.assetCache.sprite_intro['Zelda - A Link to the Past_' + s + '.png'].frames[0]);
            }
            this.sprites.intro.addAnimation('intro', frames, 0.5);
        },
        _setupTitleSprites: function() {
            this.sprites.title.position.x = 49;
            this.sprites.title.position.y = 60;
            this.sprites.title.alpha = 0;

            this.sprites.sword.position.x = 56;
            this.sprites.sword.position.y = -130; //anim to: 38

            this.sprites.zpart.position.x = 53;
            this.sprites.zpart.position.y = 86;
            this.sprites.zpart.visible = false;
        }
    });

    return Title;
});