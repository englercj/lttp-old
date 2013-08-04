define([
], function() {
    var map = {
        ':': 'colon',
        ',': 'comma',
        '-': 'dash',
        '!': 'exclamation',
        '.': 'period',
        '?': 'question',
        ';': 'semicolon'
    };
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(c) {
        map[c] = '_' + c;
    });

    map.y = {
        yoffset: 4,
        name: '_y'
    };

    var ReturnOfGanon = function() {
        gf.TextureFont.call(this, 'font_retofganon', { ext: '.png', map: map });
        this.lineWidth = 1.5;
        this.spaceSize = 11.25;
    };

    gf.inherits(ReturnOfGanon, gf.TextureFont);

    return ReturnOfGanon;
});