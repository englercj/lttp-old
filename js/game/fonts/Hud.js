define([
], function() {
    var Hud = function() {
        gf.TextureFont.call(this, 'font_hud', { ext: '.png' });
    };

    gf.inherits(Hud, gf.TextureFont);

    return Hud;
});