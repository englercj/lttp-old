define([
], function() {
    var MagicMeter = function(pos, settings) {
        gf.HudItem.call(this, pos, settings);
    };

    gf.inherits(MagicMeter, gf.HudItem, {
    });

    var LifeMeter = function(pos, settings) {
        this.textures = gf.assetCache.sprite_ui;

        gf.HudItem.call(this, pos, settings);
    };

    gf.inherits(LifeMeter, gf.HudItem, {
        set: function(val) {
            //this.font.setText(val);
            this.value = val;

            this.sprites.freeAll();
            for(var i = 0, il = this.children.length; i < il; ++i)
                this.children[i].visible = false;

            var x = 0,
                y = 0,
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

    var EquiptedItem = function(x, y, settings) {
        this.textures = gf.assetCache.sprite_ui;

        gf.HudItem.call(this, x, y, settings);

        //add the frame
        this.addChild(this.sprites.create(this.textures['item-frame.png']));
    };

    gf.inherits(EquiptedItem, gf.HudItem, {
        set: function(val) {
            //this.font.setText(val);
            this.value = val;

            //add the sprite
            if(!this.children[1]) {
                this.addChild(this.sprites.create(this.value + '.png'));
            }
            //set the sprite of the image shown
            else {
                this.children[1].setTexture(this.value + '.png');
            }
            return this;
        }
    });

    var InventoryCounter = function(x, y, settings) {
        this.textures = gf.assetCache.sprite_ui;

        gf.HudItem.call(this, x, y, settings);

        //add the icon
        this.addChild(this.sprites.create(this.textures['indicator-' + this.name + '.png']));

        this.font.position.y = 20;
    };

    gf.inherits(InventoryCounter, gf.HudItem);

    return {
        MagicMeter: MagicMeter,
        LifeMeter: LifeMeter,
        EquiptedItem: EquiptedItem,
        InventoryCounter: InventoryCounter
    };
});