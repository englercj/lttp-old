define([
    'game/data/constants',
    'game/entities/Entity'
], function(C, Entity) {
    var WorldItem = function() {
        this.sensor = true;
        this.loot = true;

        this.sounds = {
            item: gf.assetCache.effect_item,
            rupees1: gf.assetCache.effect_rupee1,
            rupees2: gf.assetCache.effect_rupee2
        };

        this.textureKeys = {
            heart: 'hearts/heart.png',
            bombs: 'inventory/bombs_%d.png',
            arrows: 'inventory/arrows_%d.png',
            rupees: 'rupees_%d'
        };

        for(var s in this.sounds) {
            this.sounds[s].volume = C.EFFECT_VOLUME;
            lttp.play.audio.attach(this.sounds[s]);
        }

        Entity.call(this, [gf.assetCache.sprite_worlditems['hearts/heart.png']]);

        var self = this;
        [1,5,20].forEach(function(v) {
            self.addAnimation('rupees_' + v, [
                gf.assetCache.sprite_worlditems['inventory/rupees_' + v + '_1.png'],
                gf.assetCache.sprite_worlditems['inventory/rupees_' + v + '_2.png'],
                gf.assetCache.sprite_worlditems['inventory/rupees_' + v + '_3.png'],
            ], 0.1, true);
        });
    };

    gf.inherits(WorldItem, Entity, {
        setup: function(item, psys) {
            var loot = item.properties.loot,
                type = loot.split('_')[0],
                value = parseInt(loot.split('_')[1], 10),
                tx = this.textureKeys[type] || 'items/' + type + '.png';

            if(value)
                tx = tx.replace('%d', value);

            this.type = type;
            this.value = value;

            if(type === 'rupees') {
                this.gotoAndPlay(tx);
            } else {
                this.stop();
                this.setTexture(gf.assetCache.sprite_worlditems[tx]);
            }

            this.anchor.x = 0.5;
            this.anchor.y = 0.5;

            this.position.x = item.position.x + (item.width / 2);
            this.position.y = item.position.y - (item.height / 2);

            this.visible = true;

            if(psys)
                this.enablePhysics(psys);
        },
        pickup: function() {
            this.visible = false;
            this.disablePhysics();

            if(this.type === 'rupees') {
                this.sounds.rupees1.play();
                var self = this;
                setTimeout(function() {
                    self.sounds.rupees2.play();
                }, 100)
            } else {
                this.sounds.item.play();
            }
        }
    });

    return WorldItem;
});