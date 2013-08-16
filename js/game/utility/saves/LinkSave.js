define([
    'game/utility/saves/Save'
], function(Save) {
    var LinkSave = function(slot, name, world, pos) {
        Save.call(this, 'link_' + slot);

        var link = lttp.play && lttp.play.link;
        link = link || {};

        debugger;
        this.data.name = name;
        this.data.slot = slot;
        this.data.world = world || 'world_linkshouse';
        this.data.position = pos || [128,128];
        this.data.inventory = link.inventory || {};
        this.data.health = link.health || 3;
        this.data.maxHealth = link.maxHealth || 3;
        this.data.magic = link.magic !== undefined ? link.magic : 10;
        this.data.maxMagic = link.maxMagic || 10;
        this.data.equipted = link.equipted || null;
    };

    gf.inherits(LinkSave, Object, {
        save: function() {
            Save.prototype.save.call(this);
        },
        load: function() {
            return Save.prototype.load.call(this);
        } 
    });

    return LinkSave;
});