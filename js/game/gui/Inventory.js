define([
    'game/data/constants',
    'game/data/items'
], function(C, items) {
    var Inventory = function() {
        gf.Gui.call(this);

        this.sounds = {
            open: gf.assetCache.effect_pause_close, //yup, named weird but this is the sound it makes when opening the inventory
        };

        for(var s in this.sounds) {
            this.sounds[s].volume = C.MUSIC_VOLUME;
            //this.parent.audio.attach(this.sounds[s]);
        }

        //add background
        this.addChild(new gf.Sprite(gf.assetCache.sprite_gui['inventory.png']));

        //create sprite pool
        this.sprpool = new gf.ObjectPool(gf.Sprite, this);

        this._setup();

        this.scale.x = this.scale.y = C.SCALE;
        this.position.y = -C.HEIGHT * C.SCALE;
        this.visible = false;
    };

    gf.inherits(Inventory, gf.Gui, {
        updateValues: function(link) {
            for(var i = 0; i < this.children.length; ++i) {
                var spr = this.children[i],
                    ico;

                if(!spr.name) continue;

                //set texture, set visible
                if(link.inventory[spr.name]) {
                    //some items have partners that come with them
                    if(spr.name === 'flippers') {
                        this.txtSwim.visible = true;
                    }
                    else if(spr.name === 'boot') {
                        this.txtRun.visible = true;
                    }
                    else if(spr.name === 'gloves') {
                        this.txtLiftNum.visible = true;
                        this.txtLiftNum.setTexture(
                            gf.assetCache.sprite_gui[
                                this.txtLiftNum.item.icon.replace('%d', link.inventory.gloves)
                            ]
                        );
                    }

                    //run icon function if there is one
                    if(spr.item.icon.call) {
                        ico = spr.item.icon(link);
                    } else {
                        ico = spr.item.icon.replace('%d', link.inventory[spr.name]);
                    }

                    //enable item and set texture
                    spr.visible = true;
                    spr.setTexture(gf.assetCache.sprite_gui[ico]);
                } else {
                    spr.visible = false;
                }
            }
        },
        findSprite: function(name) {
        },
        show: function() {
            if(this.moving) return;

            this.moving = true;
            this.visible = true;
            this.sounds.open.play();

            var self = this;
            TweenLite.to(this.parent.position, C.INVENTORY_DROP_TIME, {
                y: C.HEIGHT * C.SCALE,
                ease: Linear.easeNone,
                onComplete: function() {
                    self.moving = false;
                }
            });

        },
        hide: function() {
            if(this.moving) return;

            this.moving = true;

            var self = this;
            TweenLite.to(this.parent.position, DROP_TIME, {
                y: 0,
                ease: Linear.easeNone,
                onComplete: function() {
                    self.visible = false;
                    self.moving = false;
                }
            });
        },
        _setup: function() {
            //add item sprites
            for(var i = 0; i < items.length; ++i) {
                var item = items[i],
                    spr;

                if(item._icon)
                    spr = new gf.Sprite(gf.assetCache.sprite_gui[item._icon]);
                else
                    spr = new gf.Sprite(gf.assetCache.sprite_gui[item.icon.replace('%d', 1)]);

                spr.name = item.name;
                spr.item = item;
                spr.position.x = item.position[0];
                spr.position.y = item.position[1];

                if(spr.name === 'txtSwim' || spr.name === 'txtRun' || spr.name === 'txtLiftNum')
                    this[spr.name] = spr;

                this.addChild(spr);
            }
        }
    });

    return Inventory;
});