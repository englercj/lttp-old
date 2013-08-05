define([
    'game/fonts/ReturnOfGanon',
    'game/fonts/Hud'
], function(ReturnOfGanonFont, HudFont) {
    var HudItem = function(pos, name, value) {
        this.name = name;
        this.value = 0;

        gf.DisplayObjectContainer.call(this);
        this.setPosition(pos[0], pos[1]);

        this.sprites = new gf.ObjectPool(gf.Sprite, this);
    };

    gf.inherits(HudItem, gf.DisplayObjectContainer, {
        set: function(val) {
            this.value = val;

            return this;
        }
    });

    var MagicMeter = function(pos, value) {
        this.textures = gf.assetCache.sprite_hud;

        HudItem.call(this, pos, 'magic', value);

        //add the background
        this.sprites.create(this.textures['magic_meter.png']);
        //add the value
        this.sprValue = this.sprites.create(this.textures['magic_meter_value.png']);

        this.maxHeight = this.sprValue.height;
        this.sprValue.position.x = 6;
        this.set(value);
    };

    gf.inherits(MagicMeter, HudItem, {
        set: function(val) {
            HudItem.prototype.set.call(this, val);

            this.sprValue.height = this.maxHeight * val;
            this.sprValue.position.y = (this.maxHeight - this.sprValue.height) + 8;

            return this;
        }
    });

    var LifeMeter = function(pos, value) {
        this.textures = gf.assetCache.sprite_hud;

        HudItem.call(this, pos, 'life', value);

        this.dash1 = this.sprites.create(this.textures['life-dash.png']);
        this.dash1.position.x = this.dash1X = 35;
        this.dash1.position.y = this.dashY = 0;

        this.life = this.sprites.create(gf.assetCache.sprite_life);
        this.life.position.x = this.lifeX = 65;
        this.life.position.y = this.lifeY = -7;

        this.dash2 = this.sprites.create(this.textures['life-dash.png']);
        this.dash2.position.x = this.dash2X = 100;
        this.dash1.position.y = this.dashY = 0;
        this.set(value);
    };

    gf.inherits(LifeMeter, HudItem, {
        set: function(val) {
            HudItem.prototype.set.call(this, val);

            for(var i = 0, il = this.children.length; i < il; ++i) {
                var child = this.children[i];

                if(child instanceof PIXI.Sprite) {
                    child.visible = false;
                    this.sprites.free(child);
                }
            }

            this.dash1 = this.sprites.create(this.textures['life-dash.png']);
            this.dash1.setTexture(this.textures['life-dash.png']);
            this.dash1.position.x = this.dash1X;
            this.dash1.position.y = this.dashY;
            this.dash1.visible = true;

            this.dash2 = this.sprites.create(this.textures['life-dash.png']);
            this.dash2.setTexture(this.textures['life-dash.png']);
            this.dash2.position.x = this.dash2X;
            this.dash2.position.y = this.dashY;
            this.dash2.visible = true;

            this.life = this.sprites.create(gf.assetCache.sprite_life);
            this.life.setTexture(gf.assetCache.sprite_life);
            this.life.position.x = this.lifeX;
            this.life.position.y = this.lifeY;
            this.life.visible = true;

            var x = 0,
                y = 20,
                size = 16,
                perRow = 10,
                done = 0;

            for(var hp = val; hp > 0; --hp) {
                done++;

                var off = 0,
                    spr,
                    tx;
                if(hp < 1) { //partial
                    tx = this.textures['heart-half.png'];
                    off = 2;
                } else {
                    tx = this.textures['heart-full.png'];
                }

                spr = this.sprites.create(tx);
                spr.setTexture(tx);
                spr.position.x = x;
                spr.position.y = y + off;
                spr.visible = true;

                if((x / size) >= (perRow - 1)) {
                    x = 0;
                    y += size;
                } else {
                    x += size;
                }
            }

            if(done < this.default) {
                for(done; done < this.default; ++done) {
                    var tx = this.textures['heart-empty.png'],
                        spr = this.sprites.create(tx);

                    spr.setTexture(tx);
                    spr.position.x = x;
                    spr.position.y = y;
                    spr.visible = true;

                    if((x / size) >= perRow) {
                        x = 0;
                        y += size;
                    } else {
                        x += size;
                    }
                }
            }

            this.dirty = false;
            return this;
        }
    });

    var EquiptedItem = function(pos, value) {
        this.textures = gf.assetCache.sprite_hud;

        HudItem.call(this, pos, 'equipted', value);

        //add the frame
        this.sprites.create(this.textures['item-frame.png']);
        //this.set(value);
    };

    gf.inherits(EquiptedItem, HudItem, {
        set: function(val) {
            HudItem.prototype.set.call(this, val);

            //add the sprite
            if(!this.children[1]) {
                this.sprites.create(val + '.png');
            }
            //set the sprite of the image shown
            else {
                this.children[1].setTexture(val + '.png');
            }

            return this;
        }
    });

    var InventoryCounter = function(pos, name, value) {
        this.textures = gf.assetCache.sprite_hud;

        HudItem.call(this, pos, name, value);

        //add the icon
        this.icon = this.sprites.create(this.textures['indicator-' + this.name + '.png']);

        if(name === 'rupees')
            this.icon.position.x += 13;
        else if(name === 'bombs')
            this.icon.position.x += 5;

        this.font = new HudFont();
        this.addChild(this.font);
        this.font.position.y = 30;
        this.set(value);
    };

    gf.inherits(InventoryCounter, HudItem, {
        set: function(val) {
            var l = this.name === 'rupees' ? 3 : 2;
            val = val.toString();
            while(val.length < l) {
                val = '0' + val;
            }

            HudItem.prototype.set.call(this, val);

            if(this.font)
                this.font.setText(val);

            return this;
        }
    });

    function initHud(gui) {
        gui.scale.x = gui.scale.y = 1.5;
        gui.items = {};

        //Add magic meter
        gui.addChild(gui.items.magicMeter = new MagicMeter([40, 36], 1));

        //Add equipted item
        gui.addChild(gui.items.equipted = new EquiptedItem([75, 42], ''));

        //Add inventory counters
        gui.addChild(gui.items.rupees = new InventoryCounter([135, 30], 'rupees', 0));
        gui.addChild(gui.items.bombs = new InventoryCounter([195, 30], 'bombs', 0));
        gui.addChild(gui.items.arrows = new InventoryCounter([245, 30], 'arrows', 0));

        //Add life hearts
        gui.addChild(gui.items.life = new LifeMeter([320, 35], 3));

        return gui;
    }

    return {
        initHud: initHud,
        MagicMeter: MagicMeter,
        LifeMeter: LifeMeter,
        EquiptedItem: EquiptedItem,
        InventoryCounter: InventoryCounter
    };
});