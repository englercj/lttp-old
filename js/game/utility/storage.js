define([
], function() {
    var store = {
        save: function(slot, name, world, pos) {
            //save last exit
            //save inventory
            //save current/max health
            //save current/max magic
            var link = lttp.play.link || {},
                obj = {
                    world: world || 'world_linkshouse',
                    position: pos || [128, 128],
                    inventory: link.inventory || {},
                    health: link.health || 3,
                    maxHealth: link.maxHealth || 3,
                    magic: link.magic || 10,
                    maxMagic: link.maxMagic || 10,
                    name: name,
                    slot: slot
                };

            localStorage.setItem('save_' + slot, JSON.stringify(obj));
        },
        load: function(slot) {
            var val = localStorage.getItem('save_' + slot);

            try {
                val = JSON.parse(val);
            } catch(e) {}

            return val;
        },
        loadAll: function() {
            return [
                store.load(0),
                store.load(1),
                store.load(2),
            ];
        }
    };

    return store;
})