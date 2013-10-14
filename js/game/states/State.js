define([
    'vendor/gf'
], function(gf) {
    var State = function(game, name) {
        gf.State.call(this, game, name);

        this.physics.gravity.set(0, 0);

        game.state.add(this);
    };

    gf.inherit(State, gf.State, {
        start: function() {
            this.game.state.enable(this);

            return this;
        },
        stop: function() {
            if(this.music)
                this.music.stop();
        },
        destroy: function() {
            this.game.state.remove(this);

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