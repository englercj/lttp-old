define([
], function() {
    var State = function(name, game) {
        gf.GameState.call(this, name);

        game.addState(this);
    };

    gf.inherits(State, gf.GameState, {
        start: function() {
            this.game.enableState(this);

            return this;
        },
        stop: function() {
            if(this.music)
                this.music.stop();
        },
        destroy: function() {
            this.game.removeState(this);

            if(this.music)
                this.music.stop();

            if(this.camera)
                this.camera.destroy();

            if(this.world)
                this.world.destroy();
        }
    });

    return State;
});