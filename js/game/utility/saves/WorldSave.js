define([
    'game/utility/saves/Save'
], function(Save) {
    var WorldSave = function(key) {
        Save.call(this, key);
    };

    gf.inherits(WorldSave, Object, {
        save: function() {
            Save.prototype.save.call(this);
        },
        load: function() {
            return Save.prototype.load.call(this);
        } 
    });

    return WorldSave;
});