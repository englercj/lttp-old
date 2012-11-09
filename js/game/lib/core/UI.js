define([
    'game/lib/utils/util',
    'game/lib/bases/Emitter'
], function(util, Emitter) {
    var UI = Emitter.extend({
        init: function(elements, engine) {
            this._$win = $(window);
            this._$doc = $(document);
            this._$hud = util.jquerify(elements.hud);
            this._$paused = util.jquerify(elements.paused);
            this._$dialog = util.jquerify(elements.dialog);
            this._$cutscenes = util.jquerify(elements.cutscenes);

            this._$meter = this._$hud.find('.meter');
            this._$metervalue = this._$hud.find('.meter-value');
            this._$item = this._$hud.find('.item');
            this._$rupees = this._$hud.find('.rupees');
            this._$bombs = this._$hud.find('.bombs');
            this._$arrows = this._$hud.find('.arrows');
            this._$life = this._$hud.find('.life');
            this._$hearts = this._$hud.find('.life > .hearts');

            this._meterValMaxHeight = parseInt(this._$metervalue.css('max-height').replace('px', ''), 10);

            this.engine = engine;
            this.cutscenes = {};

            this.bindEvents();
        },
        bindEvents: function() {
            var self = this;

            $('#btnUnpause').on('click', function(e) {
                e.preventDefault();
                self.engine.start();
            });
        },
        setControls: function(ctrls) {
            this.controls = ctrls;

            this.controls.on('inventory', $.proxy(this.toggleInventory, this));
            this.controls.on('map', $.proxy(this.toggleMap, this));
            this.controls.on('menu', $.proxy(this.toggleMenu, this));
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
        toggleInventory: function() {

        },
        toggleMap: function() {

        },
        toggleMenu: function() {

        },
        showDialog: function(lines) {
            if(lines instanceof String)
                lines = lines.split('\n');

            this._$dialog.html(lines.join('<br/>')).show();
        },
        hideDialog: function() { this._$dialog.hide(); },
        showHUD: function() { this._$hud.show(); },
        hideHUD: function() { this._$hud.hide(); },
        showPaused: function() { this._$paused.show(); },
        hidePaused: function() { this._$paused.hide(); },
        update: function(delta) {
            var pctMagic = this.engine.player.magic / this.engine.player.maxMagic,
                inventory = this.engine.player.inventory,
                maxHp = this.engine.player.maxHealth,
                hp = this.engine.player.health;

            this._$metervalue.css({
                height: this._meterValMaxHeight * pctMagic,
                marginTop: this._meterValMaxHeight - (this._meterValMaxHeight * pctMagic) + 6
            });
            //this._$item.css('background-image', 'assets/items/' + );
            this._$rupees.text(inventory.rupees);
            this._$bombs.text(inventory.bombs);
            this._$arrows.text(inventory.arrows);

            var hearts = '', done = 0;
            for(hp; hp > 0; --hp) {
                done++;
                hearts += '<span class="heart';

                if(hp < 1) { //partial
                    hearts += ' half';
                }

                hearts += '"></span>';
            }

            if(done < maxHp) {
                for(done; done < maxHp; ++done) {
                    hearts += '<span class="heart empty"></span>';
                }
            }
            this._$hearts.html(hearts);
        },
        cutscenes: {
            opening: function() {

            }
        },
        HEARTS_PER_ROW: 10
    });

    return UI;
});