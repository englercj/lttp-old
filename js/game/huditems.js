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
        update: function() {
            if(!this.dirty) return;

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
        gf.HudItem.call(this, x, y, settings);
    };

    gf.inherits(EquiptedItem, gf.HudItem, {
        update: function() {
            if(!this.dirty) return;

            this.item.src = this.value;
            return this;
        },
        _createElement: function(x, y) {
            this._super(x, y);
            this.elm.className = this.elm.className + ' gf-hud-equipted';

            this.item = document.createElement('img');
            this.item.src = '#';
            this.elm.appendChild(this.item);
        }
    });

    var InventoryCounter = function(x, y, settings) {
        gf.HudItem.call(this, x, y, settings);

        this.elm.className = this.elm.className + ' gf-hud-inventory';
    };

    return {
        MagicMeter: MagicMeter,
        LifeMeter: LifeMeter,
        EquiptedItem: EquiptedItem,
        InventoryCounter: InventoryCounter
    };
});