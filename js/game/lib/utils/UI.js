define([
    'game/lib/utils/util',
    'game/lib/bases/Emitter'
], function(util, Emitter) {
    var UI = Emitter.extend({
        init: function(elements) {
            this._$win = $(window);
            this._$doc = $(document);
            this._$hud = util.jquerify(elements.hud);
            this._$dialog = util.jquerify(elements.dialog);
            this._$cutscenes = util.jquerify(elements.cutscenes);
        },
        playCutscene: function(name) {
            
        },
        addCutscene: function(name, fn) {
            if(!this.cutscenes[name])
                return this.cutscenes[name] = fn;
            else
                return null;
        },
        playSound: function(file) {

        },
        showDialog: function(lines) {
            if(lines instanceof String)
                lines = lines.split('\n');

            this._$dialog.html(lines.join('<br/>')).show();
        },
        cutscenes: {
            opening: function() {

            }
        },
        HEARTS_PER_ROW: 10
    });

    return UI;
});