var TEXT_SCALE = 1.5;

define([
    'game/utility/storage',
    'game/data/constants',
    'game/states/State',
    'game/fonts/ReturnOfGanon',
], function(store, C, State, ReturnOfGanonFont) {
    var Select = function(game) {
        State.call(this, 'mainmenu', game);

        this.music = gf.assetCache.music_select;
        this.music.loop = true;
        this.music.volume = C.MUSIC_VOLUME;
        this.audio.attach(this.music);

        this.sounds = {
            select: gf.assetCache.effect_menu_select,
            cursor: gf.assetCache.effect_menu_select_cursor,
            erase: gf.assetCache.effect_menu_select_erase,
            error: gf.assetCache.effect_error,
            lowhp: gf.assetCache.effect_lowhp
        };

        for(var s in this.sounds) {
            this.sounds[s].volume = C.MUSIC_VOLUME;
            this.audio.attach(this.sounds[s]);
        }

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

        this.fontpool = new gf.ObjectPool(ReturnOfGanonFont, this.camera);

        this._setupSelect();
        this._setupRegister();

        this._lastHorzGpValue = 0;
        this._lastVertGpValue = 0;

        this.activate('select');
        this.selected = 0;

        this.ignore = true;
        this.pnameI = 0;
    };

    gf.inherits(Select, State, {
        start: function() {
            State.prototype.start.call(this);

            this.music.play();

            this.input.keyboard.on(gf.input.KEY.DOWN, this._boundMoveDown = this.onMove.bind(this, 'down'));
            this.input.keyboard.on(gf.input.KEY.UP, this._boundMoveUp = this.onMove.bind(this, 'up'));
            this.input.keyboard.on(gf.input.KEY.LEFT, this._boundMoveLeft = this.onMove.bind(this, 'left'));
            this.input.keyboard.on(gf.input.KEY.RIGHT, this._boundMoveRight = this.onMove.bind(this, 'right'));

            this.input.keyboard.on(gf.input.KEY.ENTER, this._boundSelect1 = this.onSelect.bind(this));
            this.input.keyboard.on(gf.input.KEY.SPACE, this._boundSelect2 = this.onSelect.bind(this));

            this.input.gamepad.buttons.on(gf.input.GP_BUTTON.PAD_TOP, this._boundGpMoveUp = this.onMove.bind(this, 'up'));
            this.input.gamepad.buttons.on(gf.input.GP_BUTTON.PAD_BOTTOM, this._boundGpMoveDown = this.onMove.bind(this, 'down'));
            this.input.gamepad.buttons.on(gf.input.GP_BUTTON.PAD_LEFT, this._boundGpMoveLeft = this.onMove.bind(this, 'left'));
            this.input.gamepad.buttons.on(gf.input.GP_BUTTON.PAD_RIGHT, this._boundGpMoveRight = this.onMove.bind(this, 'right'));

            this.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_1, this._boundGpSelect1 = this.onSelect.bind(this));
            this.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_2, this._boundGpSelect2 = this.onSelect.bind(this));
            this.input.gamepad.buttons.on(gf.input.GP_BUTTON.START, this._boundGpSelect3 = this.onSelect.bind(this));

            this.input.gamepad.sticks.on(gf.input.GP_AXIS.LEFT_ANALOGUE_HOR, this._boundGpMove1 = this.onGpMove.bind(this));
            this.input.gamepad.sticks.on(gf.input.GP_AXIS.LEFT_ANALOGUE_VERT, this._boundGpMove2 = this.onGpMove.bind(this));
            this.input.gamepad.sticks.threshold = 0.35;
        },
        stop: function() {
            State.prototype.stop.call(this);

            this.input.keyboard.off(gf.input.KEY.DOWN, this._boundMoveDown);
            this.input.keyboard.off(gf.input.KEY.UP, this._boundMoveUp);
            this.input.keyboard.off(gf.input.KEY.LEFT, this._boundMoveLeft);
            this.input.keyboard.off(gf.input.KEY.RIGHT, this._boundMoveRight);

            this.input.keyboard.off(gf.input.KEY.ENTER, this._boundSelect1);
            this.input.keyboard.off(gf.input.KEY.SPACE, this._boundSelect2);

            this.input.gamepad.buttons.off(gf.input.GP_BUTTON.PAD_TOP, this._boundGpMoveDown);
            this.input.gamepad.buttons.off(gf.input.GP_BUTTON.PAD_BOTTOM, this._boundGpMoveUp);
            this.input.gamepad.buttons.off(gf.input.GP_BUTTON.PAD_LEFT, this._boundGpMoveLeft);
            this.input.gamepad.buttons.off(gf.input.GP_BUTTON.PAD_RIGHT, this._boundGpMoveRight);

            this.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_1, this._boundGpSelect1);
            this.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_2, this._boundGpSelect2);
            this.input.gamepad.buttons.off(gf.input.GP_BUTTON.START, this._boundGpSelect3);

            this.input.gamepad.sticks.off(gf.input.GP_AXIS.LEFT_ANALOGUE_HOR, this._boundGpMove1);
            this.input.gamepad.sticks.off(gf.input.GP_AXIS.LEFT_ANALOGUE_VERT, this._boundGpMove2);
        },
        onMove: function(dir, status) {
            if(!status.down)
                return;

            if(this.active === 'select') {
                if(dir === 'down') {
                    this.selected++;
                    this.selected %= 5;
                } else if(dir === 'up') {
                    this.selected--;
                    if(this.selected === -1)
                        this.selected = 4;
                }

                switch(this.selected) {
                    case 0: //slot 1
                        this.sprites.fairy.position.y = 215;
                        break;
                    case 1: //slot 2
                        this.sprites.fairy.position.y = 310;
                        break;
                    case 2: //slot 3
                        this.sprites.fairy.position.y = 395;
                        break;
                    case 3: //copy
                        this.sprites.fairy.position.y = 530;
                        break;
                    case 4: //erase
                        this.sprites.fairy.position.y = 575;
                        break;
                }

                this.sounds.cursor.play();
            } else if(this.active === 'register') {
                //move line around, and move text around
                switch(dir) {
                    case 'down':
                        this.char.y++;
                        break;

                    case 'up':
                        this.char.y--;
                        break;

                    case 'left':
                        this.char.x--;
                        break;

                    case 'right':
                        this.char.x++;
                        break;
                }

                this.char.y = gf.math.clamp(this.char.y, 0, 3);
                this.char.x = gf.math.clamp(this.char.x, 0, 28);

                this.line.position.y = 403 + (this.char.y * (this.delta.y * TEXT_SCALE));
                this.characters.position.x = -((this.char.x - 6) * this.delta.x);
            } else if(this.active === 'erase') {

            } else if(this.active === 'copy') {
                
            }
        },
        onGpMove: function(e) {
            if(e.code === gf.input.GP_AXIS.LEFT_ANALOGUE_HOR) {
                if(e.value > 0) {
                    if(this._lastHorzGpValue > 0)
                        return;

                    this.onMove('right', { down: true });
                } else if(e.value < 0) {
                    if(this._lastHorzGpValue < 0)
                        return;

                    this.onMove('left', { down: true });
                }
                this._lastHorzGpValue = e.value;
            }
            else {
                if(e.value > 0) {
                    if(this._lastVertGpValue > 0)
                        return;

                    this.onMove('down', { down: true });
                } else if(e.value < 0) {
                    if(this._lastVertGpValue < 0)
                        return;

                    this.onMove('up', { down: true });
                }
                this._lastVertGpValue = e.value;
            }
        },
        onSelect: function(status) {
            if(!status.down)
                return;

            if(this.ignore) {
                this.ignore = false;
                return;
            }

            if(this.active === 'select') {
                if(this.selected <= 2) {
                    if(!this.saves[this.selected]) {
                        this.activate('register');
                    } else {
                        this.emit('select', this.saves[this.selected]);
                    }
                } else if(this.selected === 3) {
                    this.sounds.error.play();
                    return;
                } else if(this.selected === 4) {
                    this.sounds.error.play();
                    return;
                }

                this.sounds.select.play();
            } else if(this.active === 'register') {
                //add letter
                var n = this.pname.text,
                    c = this.chars[this.char.y][this.char.x];

                if(c.name === 'end') {
                    if(!n.trim()) {
                        return this.activate('select')
                    } else {
                        //save new file for name
                        store.save(this.selected, n.split('').filter(function(ch, i) { return (i % 2 === 0); }).join(''));
                        this.sounds.select.play();
                        return this.activate('select');
                    }
                } else if(c.name === 'left') {
                    this.pnameI = Math.max(0, this.pnameI - 1);
                    this.sprites.pointer.position.x = 90 + (this.pnameI * 2 * this.pname.monospace * TEXT_SCALE);
                    return;
                } else if(c.name === 'right') {
                    this.panameI = Math.min((c.text.length / 2), this.pnameI + 1);
                    this.sprites.pointer.position.x = 90 + (this.pnameI * 2 * this.pname.monospace * TEXT_SCALE);
                    return;
                }

                if(this.pname.text.length === 11) {
                    var i = this.pnameI;

                    for(var cnt = i; cnt > 0; --cnt)
                        i++;

                    n = n.substr(0, i) + c.text + n.substr(i+1);
                }
                else {
                    if(n.length)
                        n += ' ';

                    n += c.text;
                }
                this.pnameI = (this.pnameI + 1) % 6;

                this.pname.setText(n);

                this.sprites.pointer.position.x = 90 + (this.pnameI * 2 * this.pname.monospace * TEXT_SCALE);

                this.sounds.lowhp.play();
            } else if(this.active === 'erase') {

            } else if(this.active === 'copy') {
                
            }
        },
        activate: function(name) {
            this.select.visible = false;
            this.register.visible = false;
            //this.erase.visible = false;
            //this.copy.visible = false;
            this.line.visible = false;

            this[name].visible = true;

            if(name === 'register') {
                this.pname.setText('');
                this.pnameI = 0;
                this.sprites.pointer.position.x = 90;
                this.line.visible = true;
            }

            if(name === 'select') {
                var s = this.saves = store.loadAll();

                for(var i = 0; i < s.length; ++i) {
                    var n = i + 1,
                        sv = s[i];

                    this['slot' + n].setText(n + '.' + (sv ? sv.name : ''));
                    //TODO: set hearts
                    //TODO: link icon
                }
            }

            this.active = name;
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
                copy = this.fontpool.create(),
                erase = this.fontpool.create();

            text.scale.x = text.scale.y = TEXT_SCALE;

            title.setText('PLAYER  SELECT');
            title.position.x = 80;
            title.position.y = 75;
            text.addChild(title);

            this.slot1 = this.fontpool.create();
            this.slot1.setText('1.');
            this.slot1.position.x = 145;
            this.slot1.position.y = 170;
            text.addChild(this.slot1);

            this.slot2 = this.fontpool.create();
            this.slot2.setText('2.');
            this.slot2.position.x = 145;
            this.slot2.position.y = 230;
            text.addChild(this.slot2);
 
            this.slot3 = this.fontpool.create();
            this.slot3.setText('3.');
            this.slot3.position.x = 145;
            this.slot3.position.y = 290;
            text.addChild(this.slot3);

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

            this.sprites.pointer.position.x = 90;
            this.sprites.pointer.position.y = 265;
            this.register.addChild(this.sprites.pointer);

            var text = new gf.DisplayObjectContainer(),
                title = this.fontpool.create(),
                self = this,
                lines = [
                    'ABCDEFGHIJ  abcdefghij  01234',
                    'KLMNOPQRST  klmnopqrst  56789',
                    'UVWXYZDPC   uvwxyzDPC   EQPP ',
                    '     <> =+       <> =+  <> =+'
                ];

            text.scale.x = text.scale.y = TEXT_SCALE;

            title.setText('REGISTER  YOUR  NAME');
            title.position.x = 80;
            title.position.y = 107;
            text.addChild(title);

            this.pname = this.fontpool.create();
            this.pname.setText('');
            this.pname.monospace = 15;
            this.pname.lineWidth = 1;
            this.pname.position.x = 65;
            this.pname.position.y = 218;
            text.addChild(this.pname);

            //create all the characters
            this.characters = new gf.DisplayObjectContainer();
            this.chars = [];
            this.delta = new gf.Point(32, 35);
            this.char = new gf.Point(6, 0);

            var sx = 65,
                sy = 282,
                cx = sx,
                cy = sy;
            for(var y = 0; y < lines.length; ++y) {
                this.chars[y] = [];

                var line = lines[y].split('');
                for(var x = 0; x < line.length; ++x) {
                    var t = this.fontpool.create();

                    if(line[x] === '=') {
                        t.setText('END');
                        t.name = 'end';
                    } else if(line[x] === '+') {
                        t.setText(' ');
                        t.name = 'end';
                    } else if(line[x] === '<') {
                        t.setText('<');
                        t.name = 'left';
                    } else if(line[x] === '>') {
                        t.setText('>');
                        t.name = 'right';
                    } else {
                        t.setText(line[x]);
                    }
                    t.position.x = cx;
                    t.position.y = cy;

                    this.chars[y][x] = t;
                    this.characters.addChild(t);

                    cx += this.delta.x;
                }

                cy += this.delta.y;
                cx = sx;
            }

            text.addChild(this.characters);
            this.register.addChild(text);

            var line = this.line = new PIXI.Graphics();
            line.lineStyle(2, 0xffffff, 1);
            line.moveTo(0,0);
            line.lineTo(624, 0);
            line.position.x = 72;
            line.position.y = 403;
            line.visible = false;
            this.register.addChild(line);

            this.register.addChild(this.sprites.register);
            this.camera.addChild(this.register);
            this.register.visible = false;
        }
    });

    return Select;
});