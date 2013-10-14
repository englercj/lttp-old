define([
    'vendor/gf',
    'game/utility/saves/Save'
], function(gf, Save) {
    var LinkSave = function(slot, name) {
        Save.call(this, 'link_' + slot);

        var link = lttp.play && lttp.play.link;
        link = link || {};

        this.data.name = name;
        this.data.slot = slot;
    };

    gf.inherit(LinkSave, Save, {
        save: function(link, map, pos) {
            link = link || {};

            this.data.inventory = link.inventory || {};
            this.data.health = link.health || 3;
            this.data.maxHealth = link.maxHealth || 3;
            this.data.magic = link.magic !== undefined ? link.magic : 0;
            this.data.maxMagic = link.maxMagic || 10;
            this.data.equipted = link.equipted || null;

            this.data.map = map || 'world_linkshouse';
            this.data.position = pos || [128,128];

            Save.prototype.save.call(this);
        },
        load: function() {
            return Save.prototype.load.call(this);
        } 
    });

    return LinkSave;
});