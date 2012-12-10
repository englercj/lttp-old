define([
], function() {
    var items = {
        MagicMeter: gf.HudItem.extend({
            init: function(x, y, settings) {
                this._super(x, y, settings);

                this.maxHeight = parseInt(this.$val.css('max-height').replace('px', ''), 10);
            },
            update: function() {
                if(!this.dirty) return;

                this.$val.css({
                    height: this.maxHeight * this.value,
                    marginTop: this.maxHeight - (this.maxHeight * this.value) + 6
                });

                this.dirty = false;
                return this;
            },
            _createElement: function(x, y) {
                this._super(x, y);
                this.$elm.addClass('gf-hud-meter');

                this.$val = $('<div/>', {
                    'class': 'gf-hud-meter-value ' + this.name
                }).appendTo(this.$elm);
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

                this.$hearts.html(hearts);

                this.dirty = false;
                return this;
            },
            _createElement: function(x, y) {
                this._super(x, y);
                this.$elm.addClass('gf-hud-health');

                this.$elm.append('<span class="gf-hud-health dash"></span>LIFE<span class="gf-hud-health dash"></span>');
                this.$hearts = $('<div/>', { 'class' : 'gf-hud-heath hearts' }).appendTo(this.$elm);
            }
        }),
        EquiptedItem: gf.HudItem.extend({
            init: function(x, y, settings) {
                this._super(x, y, settings);
            },
            update: function() {
                if(!this.dirty) return;

                this.$item.attr('src', this.value);
                return this;
            },
            _createElement: function(x, y) {
                this._super(x, y);
                this.$elm.addClass('gf-hud-equipted');

                this.$item = $('<img/>', { src: '#' }).appendTo(this.$elm);
            }
        }),
        InventoryCounter: gf.HudItem.extend({
            init: function(x, y, settings) {
                this._super(x, y, settings);

                this.$elm.addClass('gf-hud-inventory');
            }
        })
    };

    return items;
});