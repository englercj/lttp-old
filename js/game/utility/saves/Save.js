define([
    'vendor/gf',
    'game/utility/storage'
], function(gf, store) {
    var Save = function(key) {
        this.key = key;
        this.data = {};
    };

    gf.inherit(Save, Object, {
        save: function() {
            store.save(this.key, this.data);
        },
        load: function() {
            return this.data = store.load(this.key);
        },
        remove: function() {
            store.remove(this.key);
        }
    });

    return Save;
});