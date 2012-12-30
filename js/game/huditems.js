define([
], function() {
    var items = {
        MagicMeter: gf.HudItem.extend({
            init: function(x, y, settings) {
                this._super(x, y, settings);

                this.maxHeight = gf.utils.getStyle(gf.game._cont, 'max-height');
            },
            update: function() {
                if(!this.dirty) return;

                this.val.height = this.maxHeight * this.value;
                this.val.style['margin-top'] = this.maxHeight - (this.maxHeight * this.value) + 6;

                this.dirty = false;
                return this;
            },
            _createElement: function(x, y) {
                this._super(x, y);
                this.elm.className = this.elm.className + ' gf-hud-meter';

                this.val = document.createElement('div');
                this.val.className = 'gf-hud-meter-value ' + this.name;
                this.elm.appendChild(this.val);
            }
        }),
        LifeMeter: gf.HudItem.extend({
            init: function(x, y, settings) {
                this._super(x, y, settings);
            },
            update: function() {
                if(!this.dirty) return;

                var hearts = '', done = 0;
                for(var hp = this.value; hp > 0; --hp) {
                    done++;
                    hearts += '<span class="gf-hud-health heart';

                    if(hp < 1) { //partial
                        hearts += ' half';
                    }

                    hearts += '"></span>';
                }

                if(done < this.default) {
                    for(done; done < this.default; ++done) {
                        hearts += '<span class="gf-hud-health heart empty"></span>';
                    }
                }

                this.hearts.innerHtml = hearts;

                this.dirty = false;
                return this;
            },
            _createElement: function(x, y) {
                this._super(x, y);
                this.elm.className = this.elm.className + ' gf-hud-health';

                this.elm.innerHtml = '<span class="gf-hud-health dash"></span>LIFE<span class="gf-hud-health dash"></span>';
                this.hearts = document.createElement('div');
                this.hearts.className = 'gf-hud-heath hearts';
                this.elm.appendChild(this.hearts);
            }
        }),
        EquiptedItem: gf.HudItem.extend({
            init: function(x, y, settings) {
                this._super(x, y, settings);
            },
            update: function() {
                if(!this.dirty) return;

                this.item.src = this.value;
                return this;
            },
            _createElement: function(x, y) {
                this._super(x, y);
                this.elm.className = this.elm.className + ' gf-hud-equipted';

                this.item = document.createElement('img');
                this.item.src = '#';
                this.elm.appendChild(this.item);
            }
        }),
        InventoryCounter: gf.HudItem.extend({
            init: function(x, y, settings) {
                this._super(x, y, settings);

                this.elm.className = this.elm.className + ' gf-hud-inventory';
            }
        })
    };

    return items;
});