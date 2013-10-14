define([
    'vendor/gf',
    'game/utility/saves/Save'
], function(gf, Save) {
    var ZoneSave = function(slot, zone, map) {
        Save.call(this, 'zone_' + slot + '_' + map + '_' + zone.name);

        //go through each object in the zone and save the 'loot' property
        var objs = this.data.objects = [];

        for(var i = 0, il = zone.objects.length; i < il; ++i) {
            objs.push({
                properties: {
                    loot: zone.objects[i].properties.loot
                }
            })
        }

        this.zone = zone;
    };

    gf.inherit(ZoneSave, Save, {
        save: function() {
            Save.prototype.save.call(this);
        },
        load: function() {
            //loop through each object (in both 'objects' and 'children') and set loaded values
            var objs = Save.prototype.load.call(this),
                zone = this.zone;

            if(objs) {
                for(var i = 0; i < objs.objects.length; ++i) {
                    var objZone = zone.objects[i],
                        objLoad = objs.objects[i],
                        objType = objZone.properties.type || objZone.properties.tileprops.type,
                        ci = zone.objects.length - 1 - i,
                        child = zone.children[ci];

                    if(objZone) {
                        objZone.properties.loot = objLoad.properties.loot;
                        child.properties.loot = objLoad.properties.loot;

                        if(!objZone.properties.loot && objType === 'chest') {
                            child.setTexture(lttp.game.cache.getTextures('sprite_worlditems')['dungeon/chest_open.png']);
                        }
                    } else {
                        console.warn('Mismatch on objects array length! Delete key: ' + this.key);
                    }
                }
            }

            return objs;
        } 
    });

    return ZoneSave;
});