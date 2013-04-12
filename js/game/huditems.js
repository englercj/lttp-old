define([
], function() {
    var MagicMeter = function(pos, settings) {
        settings.font = new gf.TextureFont(
            'sprite_font',
            {
                ext: '.png',
                size: 32,
                map: {
                    '@': 'at',
                    ')': 'close_paren',
                    ':': 'colon',
                    ',': 'comma',
                    '-': 'dash',
                    '=': 'equal',
                    '!': 'exclamation',
                    '>': 'gt',
                    '<': 'lt',
                    '#': 'heart',
                    '(': 'open_paren',
                    '%': 'percent',
                    '.': 'period',
                    '+': 'plus',
                    '?': 'questionmark',
                    '"': 'quote',
                    ' ': 'space',
                    ';': 'semicolon',
                    '\'': 'single_quote',
                    '/': 'slash',
                    '*': 'star',
                    '&': 'arrow_left'
                }
            }
        );
        gf.HudItem.call(this, pos, settings);
    };

    gf.inherits(MagicMeter, gf.HudItem, {
    });

    var LifeMeter = function(x, y, settings) {
       gf.HudItem.call(this, x, y, settings);
    };

    gf.inherits(LifeMeter, gf.HudItem, {
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
    });

    var EquiptedItem = function(x, y, settings) {
        gf.HudItem.call(this, x, y, settings);
    };

    gf.inherits(EquiptedItem, gf.HudItem, {
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
    });

    var InventoryCounter = function(x, y, settings) {
        gf.HudItem.call(this, x, y, settings);

        this.elm.className = this.elm.className + ' gf-hud-inventory';
    };

    return {
        MagicMeter: MagicMeter,
        LifeMeter: LifeMeter,
        EquiptedItem: EquiptedItem,
        InventoryCounter: InventoryCounter
    };
});