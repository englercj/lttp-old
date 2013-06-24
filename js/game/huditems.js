define([
], function() {
    var MagicMeter = function(pos, settings) {
        this.textures = gf.assetCache.sprite_hud;

        gf.HudItem.call(this, pos, settings);

        //add the background
        this.sprites.create(this.textures['magic_meter.png']);
        //add the value
        this.sprValue = this.sprites.create(this.textures['magic_meter_value.png']);

        this.maxHeight = this.sprValue.height;
        this.sprValue.position.x = 6;
        this.set(settings.value);
    };

    gf.inherits(MagicMeter, gf.HudItem, {
        set: function(val) {
            this.value = val;

            this.sprValue.height = this.maxHeight * this.value;
            this.sprValue.position.y = (this.maxHeight - this.sprValue.height) + 8;
        }
    });

    var LifeMeter = function(pos, settings) {
        this.textures = gf.assetCache.sprite_hud;

        gf.HudItem.call(this, pos, settings);

        this.dash1 = this.sprites.create(this.textures['life-dash.png']);
        this.dash1.position.x = this.dash1X = 35;
        this.dash1.position.y = this.dashY = 0;

        this.life = this.sprites.create(gf.assetCache.sprite_life);
        this.life.position.x = this.lifeX = 65;
        this.life.position.y = this.lifeY = -7;

        this.dash2 = this.sprites.create(this.textures['life-dash.png']);
        this.dash2.position.x = this.dash2X = 100;
        this.dash1.position.y = this.dashY = 0;

        this.set(settings.value);
    };

    gf.inherits(LifeMeter, gf.HudItem, {
        set: function(val) {
            this.value = val;

            for(var i = 0, il = this.children.length; i < il; ++i) {
                var child = this.children[i];

                if(child instanceof PIXI.Sprite) {
                    child.visible = false;
                    this.sprites.free(child);
                }
            }

            this.font.visible = true;

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

            for(var hp = this.value; hp > 0; --hp) {
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

    var EquiptedItem = function(pos, settings) {
        this.textures = gf.assetCache.sprite_hud;

        gf.HudItem.call(this, pos, settings);

        //add the frame
        this.sprites.create(this.textures['item-frame.png']);
    };

    gf.inherits(EquiptedItem, gf.HudItem, {
        set: function(val) {
            this.value = val;

            //add the sprite
            if(!this.children[1]) {
                this.sprites.create(this.value + '.png');
            }
            //set the sprite of the image shown
            else {
                this.children[1].setTexture(this.value + '.png');
            }
            return this;
        }
    });

    var InventoryCounter = function(pos, settings) {
        this.textures = gf.assetCache.sprite_hud;

        gf.HudItem.call(this, pos, settings);

        //add the icon
        this.icon = this.sprites.create(this.textures['indicator-' + this.name + '.png']);

        if(this.name === 'rupees')
            this.icon.position.x += 13;
        else if(this.name === 'bombs')
            this.icon.position.x += 5;

        this.font.position.y = 20;
        this.set(settings.value);
    };

    gf.inherits(InventoryCounter, gf.HudItem, {
        set: function(val) {
            var l = this.name === 'rupees' ? 3 : 2;
            val = val.toString();
            while(val.length < l) {
                val = '0' + val;
            }

            gf.HudItem.prototype.set.call(this, val)
        }
    });

    return {
        MagicMeter: MagicMeter,
        LifeMeter: LifeMeter,
        EquiptedItem: EquiptedItem,
        InventoryCounter: InventoryCounter
    };
});