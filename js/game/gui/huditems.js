define([
    'game/data/constants',
    'game/fonts/ReturnOfGanon',
    'game/fonts/Hud'
], function(C, ReturnOfGanonFont, HudFont) {
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
        this.textures = gf.assetCache.sprite_gui;

        HudItem.call(this, pos, 'magic', value);

        //add the background
        this.sprites.create(this.textures['hud/magic_meter.png']);
        //add the value
        this.sprValue = this.sprites.create(this.textures['hud/magic_meter_value.png']);

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
        this.textures = gf.assetCache.sprite_gui;

        HudItem.call(this, pos, 'life', value);

        this.max = 3;

        this.dash1 = this.sprites.create(this.textures['hud/life-dash.png']);
        this.dash1.position.x = this.dash1X = 35;
        this.dash1.position.y = this.dashY = 0;

        this.life = this.sprites.create(gf.assetCache.sprite_life);
        this.life.position.x = this.lifeX = 65;
        this.life.position.y = this.lifeY = -7;

        this.dash2 = this.sprites.create(this.textures['hud/life-dash.png']);
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

            this.dash1 = this.sprites.create(this.textures['hud/life-dash.png']);
            this.dash1.setTexture(this.textures['hud/life-dash.png']);
            this.dash1.position.x = this.dash1X;
            this.dash1.position.y = this.dashY;
            this.dash1.visible = true;

            this.dash2 = this.sprites.create(this.textures['hud/life-dash.png']);
            this.dash2.setTexture(this.textures['hud/life-dash.png']);
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
                    tx = this.textures['hud/heart-half.png'];
                    off = 2;
                } else {
                    tx = this.textures['hud/heart-full.png'];
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

            for(done; done < this.max; ++done) {
                var tx = this.textures['hud/heart-empty.png'],
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

            this.dirty = false;
            return this;
        }
    });

    var EquiptedItem = function(pos, value) {
        this.textures = gf.assetCache.sprite_gui;

        HudItem.call(this, pos, 'equipted', value);

        //add the frame
        this.sprites.create(this.textures['hud/item-frame.png']);
        this.sprites.create(this.textures['items/lantern.png']);

        this.children[1].visible = false;
        this.children[1].position.x = this.children[1].position.y = 6;
        this.children[1].scale.x = this.children[1].scale.y = 2;
    };

    gf.inherits(EquiptedItem, HudItem, {
        set: function(val) {
            HudItem.prototype.set.call(this, val);

            var tx = this.textures['items/' + val + '.png'];

            //add the sprite
            this.children[1].setTexture(tx);
            this.children[1].visible = true;

            return this;
        }
    });

    var InventoryCounter = function(pos, name, value) {
        this.textures = gf.assetCache.sprite_gui;

        HudItem.call(this, pos, name, value);

        //add the icon
        this.icon = this.sprites.create(this.textures['hud/indicator-' + this.name + '.png']);

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

    return {
        MagicMeter: MagicMeter,
        LifeMeter: LifeMeter,
        EquiptedItem: EquiptedItem,
        InventoryCounter: InventoryCounter
    };
});