define([
    'game/utility/storage'
], function(store) {
    var Save = function(key) {
        this.key = key;
        this.data = {};
    };

    gf.inherits(Save, Object, {
        save: function() {
            store.save(this.key, this.data);
        },
        load: function() {
            return this.data = store.load(this.key);
        } 
    });

    return Save;
});