var TEXT_SCALE = 1.5;

define([
    'vendor/gf',
    'game/data/constants',
    'game/states/State',
    'game/fonts/ReturnOfGanon',
    'game/utility/saves/LinkSave'
], function(gf, C, State, ReturnOfGanonFont, LinkSave) {
    var Select = function(game) {
        State.call(this, game, 'mainmenu');

        this.music = this.audio.add('music_select');
        this.music.loop = true;
        this.music.volume = C.MUSIC_VOLUME;
        this.audio.attach(this.music);

        var audioSettings = { volume: C.MUSIC_VOLUME };
        this.sounds = {
            select: this.audio.add('effect_menu_select', audioSettings),
            cursor: this.audio.add('effect_menu_select_cursor', audioSettings),
            erase: this.audio.add('effect_menu_select_erase', audioSettings),
            error: this.audio.add('effect_error', audioSettings),
            lowhp: this.audio.add('effect_lowhp', audioSettings)
        };

        var txSelect = game.cache.getTextures('sprite_select');

        this.sprites = {
            select: new gf.Sprite(txSelect['select.png']),
            register: new gf.Sprite(txSelect['register.png']),
            pointer: new gf.Sprite(txSelect['pointer.png']),
            fairy: new gf.Sprite({
                flap: {
                    frames: [
                        txSelect['fairy1.png'],
                        txSelect['fairy2.png']
                    ],
                    speed: 0.1,
                    loop: true
                }
            })
        };

        for(var sp in this.sprites) {
            this.sprites[sp].scale.x = this.sprites[sp].scale.y = 3;
        }

        this.fontpool = new gf.ObjectPool(ReturnOfGanonFont);

        this._setupSelect();
        this._setupRegister();

        this._lastHorzGpValue = 0;
        this._lastVertGpValue = 0;

        this.activate('select');
        this.selected = 0;

        this.pnameI = 0;
    };

    gf.inherit(Select, State, {
        start: function() {
            State.prototype.start.call(this);

            this.music.play();

            this.game.input.keyboard.on(gf.Keyboard.KEY.DOWN, this._boundMoveDown = this.onMove.bind(this, 'down'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.UP, this._boundMoveUp = this.onMove.bind(this, 'up'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.LEFT, this._boundMoveLeft = this.onMove.bind(this, 'left'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.RIGHT, this._boundMoveRight = this.onMove.bind(this, 'right'));

            this.game.input.keyboard.on(gf.Keyboard.KEY.S, this._boundMoveDownS = this.onMove.bind(this, 'down'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.W, this._boundMoveUpW = this.onMove.bind(this, 'up'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.A, this._boundMoveLeftA = this.onMove.bind(this, 'left'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.D, this._boundMoveRightD = this.onMove.bind(this, 'right'));

            this.game.input.keyboard.on(gf.Keyboard.KEY.ENTER, this._boundSelect1 = this.onSelect.bind(this));
            this.game.input.keyboard.on(gf.Keyboard.KEY.SPACE, this._boundSelect2 = this.onSelect.bind(this));

            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_TOP, this._boundGpMoveUp = this.onMove.bind(this, 'up'));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_BOTTOM, this._boundGpMoveDown = this.onMove.bind(this, 'down'));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_LEFT, this._boundGpMoveLeft = this.onMove.bind(this, 'left'));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_RIGHT, this._boundGpMoveRight = this.onMove.bind(this, 'right'));

            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_1, this._boundGpSelect1 = this.onSelect.bind(this));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_2, this._boundGpSelect2 = this.onSelect.bind(this));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.START, this._boundGpSelect3 = this.onSelect.bind(this));

            this.game.input.gamepad.sticks.on(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_HOR, this._boundGpMove1 = this.onGpMove.bind(this));
            this.game.input.gamepad.sticks.on(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_VERT, this._boundGpMove2 = this.onGpMove.bind(this));
            this.game.input.gamepad.sticks.threshold = 0.35;
        },
        stop: function() {
            State.prototype.stop.call(this);

            this.game.input.keyboard.off(gf.Keyboard.KEY.DOWN, this._boundMoveDown);
            this.game.input.keyboard.off(gf.Keyboard.KEY.UP, this._boundMoveUp);
            this.game.input.keyboard.off(gf.Keyboard.KEY.LEFT, this._boundMoveLeft);
            this.game.input.keyboard.off(gf.Keyboard.KEY.RIGHT, this._boundMoveRight);

            this.game.input.keyboard.off(gf.Keyboard.KEY.S, this._boundMoveDownS);
            this.game.input.keyboard.off(gf.Keyboard.KEY.W, this._boundMoveUpW);
            this.game.input.keyboard.off(gf.Keyboard.KEY.A, this._boundMoveLeftA);
            this.game.input.keyboard.off(gf.Keyboard.KEY.D, this._boundMoveRightD);

            this.game.input.keyboard.off(gf.Keyboard.KEY.ENTER, this._boundSelect1);
            this.game.input.keyboard.off(gf.Keyboard.KEY.SPACE, this._boundSelect2);

            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.PAD_TOP, this._boundGpMoveDown);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.PAD_BOTTOM, this._boundGpMoveUp);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.PAD_LEFT, this._boundGpMoveLeft);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.PAD_RIGHT, this._boundGpMoveRight);

            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.FACE_1, this._boundGpSelect1);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.FACE_2, this._boundGpSelect2);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.START, this._boundGpSelect3);

            this.game.input.gamepad.sticks.off(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_HOR, this._boundGpMove1);
            this.game.input.gamepad.sticks.off(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_VERT, this._boundGpMove2);
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

                this.line.position.y = 392 + (this.char.y * (this.delta.y * TEXT_SCALE));
                this.characters.position.x = -((this.char.x - 6) * this.delta.x);
            } else if(this.active === 'erase') {

            } else if(this.active === 'copy') {
                
            }
        },
        onGpMove: function(e) {
            if(e.code === gf.GamepadSticks.AXIS.LEFT_ANALOGUE_HOR) {
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

            if(this.active === 'select') {
                if(this.selected <= 2) {
                    if(!this.saves[this.selected].data) {
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
                        var ls = new LinkSave(this.selected, n.split('').filter(function(ch, i) { return (i % 2 === 0); }).join(''));
                        ls.save();
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

                this.pname.text = n;

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
                this.pname.text = '';
                this.pnameI = 0;
                this.sprites.pointer.position.x = 90;
                this.line.visible = true;
            }

            if(name === 'select') {
                var s = this.saves = [
                    new LinkSave(0),
                    new LinkSave(1),
                    new LinkSave(2)
                ];

                for(var i = 0; i < s.length; ++i) {
                    var n = i + 1,
                        sv = s[i];

                    sv.load();

                    this['slot' + n].text = n + '.' + (sv.data ? sv.data.name : '');
                    //TODO: set hearts
                    //TODO: link icon
                }
            }

            this.active = name;
        },
        _setupSelect: function() {
            this.select = new gf.Container();

            this.select.addChild(this.sprites.select);

            this.sprites.fairy.position.x = 80;
            this.sprites.fairy.position.y = 215;
            this.sprites.fairy.goto(0, 'flap').play();
            this.select.addChild(this.sprites.fairy);

            var text = new gf.Container(),
                title = this.fontpool.create(),
                copy = this.fontpool.create(),
                erase = this.fontpool.create();

            text.scale.x = text.scale.y = TEXT_SCALE;

            title.text = 'PLAYER  SELECT';
            title.position.x = 80;
            title.position.y = 50;
            text.addChild(title);

            this.slot1 = this.fontpool.create();
            this.slot1.text = '1.';
            this.slot1.position.x = 145;
            this.slot1.position.y = 145;
            text.addChild(this.slot1);

            this.slot2 = this.fontpool.create();
            this.slot2.text = '2.';
            this.slot2.position.x = 145;
            this.slot2.position.y = 205;
            text.addChild(this.slot2);
 
            this.slot3 = this.fontpool.create();
            this.slot3.text = '3.';
            this.slot3.position.x = 145;
            this.slot3.position.y = 265;
            text.addChild(this.slot3);

            copy.text = 'COPY  PLAYER';
            copy.position.x = 100;
            copy.position.y = 355;
            text.addChild(copy);

            erase.text = 'ERASE PLAYER';
            erase.position.x = 100;
            erase.position.y = 385;
            text.addChild(erase);

            this.select.addChild(text);
            this.camera.add.obj(this.select);
        },
        _setupRegister: function() {
            this.register = new gf.Container();

            this.sprites.pointer.position.x = 90;
            this.sprites.pointer.position.y = 265;
            this.register.addChild(this.sprites.pointer);

            var text = new gf.Container(),
                title = this.fontpool.create(),
                self = this,
                lines = [
                    'ABCDEFGHIJ  abcdefghij  01234',
                    'KLMNOPQRST  klmnopqrst  56789',
                    'UVWXYZDPC   uvwxyzDPC   EQPP ',
                    '     <> =+       <> =+  <> =+'
                ];

            text.scale.x = text.scale.y = TEXT_SCALE;

            title.text = 'REGISTER  YOUR  NAME';
            title.position.x = 80;
            title.position.y = 80;
            text.addChild(title);

            this.pname = this.fontpool.create();
            this.pname.text = '';
            this.pname.monospace = 15;
            this.pname.position.x = 62;
            this.pname.position.y = 192;
            text.addChild(this.pname);

            //create all the characters
            this.characters = new gf.Container();
            this.chars = [];
            this.delta = new gf.Vector(32, 35);
            this.char = new gf.Vector(6, 0);

            var sx = 65,
                sy = 250,
                cx = sx,
                cy = sy;
            for(var y = 0; y < lines.length; ++y) {
                this.chars[y] = [];

                var line = lines[y].split('');
                for(var x = 0; x < line.length; ++x) {
                    var t = this.fontpool.create();

                    if(line[x] === '=') {
                        t.text = 'END';
                        t.name = 'end';
                    } else if(line[x] === '+') {
                        t.text = ' ';
                        t.name = 'end';
                    } else if(line[x] === '<') {
                        t.text = '<';
                        t.name = 'left';
                    } else if(line[x] === '>') {
                        t.text = '>';
                        t.name = 'right';
                    } else {
                        t.text = line[x];
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

            var line = this.line = new gf.Graphics();
            line.lineStyle(2, 0xffffff, 1);
            line.moveTo(0,0);
            line.lineTo(624, 0);
            line.position.x = 72;
            line.position.y = 392;
            line.visible = false;
            this.register.addChild(line);

            this.register.addChild(this.sprites.register);
            this.camera.addChild(this.register);
            this.register.visible = false;
        }
    });

    return Select;
});