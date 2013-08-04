define([
    'game/states/State',
    'game/fonts/ReturnOfGanon',
], function(State, ReturnOfGanonFont) {
    var Select = function(game) {
        State.call(this, 'mainmenu', game);

        this.music = gf.assetCache.music_select;
        this.music.loop = true;

        this.sprites = {
            select: new gf.Sprite(gf.assetCache.sprite_select['select.png']),
            register: new gf.Sprite(gf.assetCache.sprite_select['register.png']),
            pointer: new gf.Sprite(gf.assetCache.sprite_select['pointer.png']),
            fairy: new gf.AnimatedSprite({
                flap: {
                    frames: [
                        gf.assetCache.sprite_select['fairy1.png'],
                        gf.assetCache.sprite_select['fairy2.png']
                    ],
                    speed: 0.1,
                    loop: true
                }
            })
        };

        for(var sp in this.sprites) {
            this.sprites[sp].scale.x = this.sprites[sp].scale.y = 3;
        }

        this.gfx = new PIXI.Graphics();
        this.camera.addChild(this.gfx);

        this.fontpool = new gf.ObjectPool(ReturnOfGanonFont, this.camera);

        this._setupSelect();
        this._setupRegister();
    };

    gf.inherits(Select, State, {
        start: function() {
            State.prototype.start.call(this);

            this.music.play();
        },
        stop: function() {
            State.prototype.stop.call(this);

            //unbind
        },
        _setupSelect: function() {
            this.select = new gf.DisplayObjectContainer();

            this.select.addChild(this.sprites.select);

            this.sprites.fairy.position.x = 80;
            this.sprites.fairy.position.y = 215;
            this.sprites.fairy.gotoAndPlay('flap');
            this.select.addChild(this.sprites.fairy);

            var text = new gf.DisplayObjectContainer(),
                title = this.fontpool.create(),
                one = this.fontpool.create(),
                two = this.fontpool.create(),
                three = this.fontpool.create(),
                copy = this.fontpool.create(),
                erase = this.fontpool.create();

            text.scale.x = text.scale.y = 1.5;

            title.setText('PLAYER  SELECT');
            title.position.x = 80;
            title.position.y = 73;
            text.addChild(title);

            one.setText('1.');
            one.position.x = 145;
            one.position.y = 170;
            text.addChild(one);

            two.setText('2.');
            two.position.x = 145;
            two.position.y = 230;
            text.addChild(two);
 
            three.setText('3.');
            three.position.x = 145;
            three.position.y = 290;
            text.addChild(three);

            copy.setText('COPY  PLAYER');
            copy.position.x = 100;
            copy.position.y = 380;
            text.addChild(copy);

            erase.setText('ERASE PLAYER');
            erase.position.x = 100;
            erase.position.y = 410;
            text.addChild(erase);

            this.select.addChild(text);
            this.camera.addChild(this.select);
        },
        _setupRegister: function() {
            this.register = new gf.DisplayObjectContainer();
            this.register.addChild(this.sprites.register);
            this.register.addChild(this.sprites.pointer);

            this.camera.addChild(this.register);
            this.register.visible = false;
        }
    });

    return Select;
});