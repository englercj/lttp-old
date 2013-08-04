define([
    'game/states/State'
], function(State, TitleSprite) {
    var MainMenu = function(game) {
        State.call(this, 'mainmenu', game);
        //this.intro = new TitleSprite();
        //this.intro.scale.x = this.intro.scale.y = 3;
        //this.camera.addChild(this.intro);
    };

    gf.inherits(MainMenu, State, {
        start: function() {
            State.prototype.start.call(this);

            //this.intro.gotoAndPlay('intro');

            //var self = this;
            //this.intro.once('complete', function() {
            //});
        }
    });

    return MainMenu;
});