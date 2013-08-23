require([
    'game/data/resources',
    'game/states/Title',
    'game/states/Select',
    'game/states/Play',
    'game/entities/misc/Torch',
    'game/entities/misc/Flower'
], function(resources, TitleState, SelectState, PlayState, Torch, Flower) {
    var $game, game, muted;

    window.lttp = {
        firstZone: true
    };

    $(function() {
        $game = $('#game');

        lttp.game = game = new gf.Game('game', {
            gravity: 0,
            friction: [0, 0],
            width: $game.width(),
            height: $game.height(),
            transparent: true
        });

        game.spritepool.add('torch', Torch);
        game.spritepool.add('flower', Flower);

        game.loader.on('progress', function(e) {
        });

        game.loader.on('complete', function() {
            //load starting states
            lttp.intro = new TitleState(game);
            lttp.intro.start();

            //load select state
            lttp.select = new SelectState(game);
            lttp.select.on('select', loadGame);

            //load the play state
            lttp.play = new PlayState(game);

            game.input.keyboard.on(gf.input.KEY.ENTER, gotoSelect);
            game.input.keyboard.on(gf.input.KEY.SPACE, gotoSelect);
            game.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_1, gotoSelect);
            game.input.gamepad.buttons.on(gf.input.GP_BUTTON.START, gotoSelect);

            game.input.keyboard.once(gf.input.KEY.TILDE, onDebug);
            game.input.keyboard.on(gf.input.KEY.P, onToggleAudio);
            game.input.gamepad.buttons.on(gf.input.GP_BUTTON.RIGHT_SHOULDER, onToggleAudio);

            //start render loop
            game.render();
        });

        game.loader.load(resources);
    });

    function gotoSelect() {
        lttp.intro.stop();

        game.input.keyboard.off(gf.input.KEY.ENTER, gotoSelect);
        game.input.keyboard.off(gf.input.KEY.SPACE, gotoSelect);
        game.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_1, gotoSelect);
        game.input.gamepad.buttons.off(gf.input.GP_BUTTON.START, gotoSelect);

        lttp.select.start();
    }

    function loadGame(save) {
        lttp.select.stop();

        lttp.play.start(save);
    }

    function onDebug() {
        gf.debug.show(game);
    }

    function onToggleAudio(status) {
        if(status.down) return;

        if(muted) {
            lttp.intro.audio.unmute();
            lttp.select.audio.unmute();
            lttp.play.audio.unmute();
            muted = false;
        } else {
            lttp.intro.audio.mute();
            lttp.select.audio.mute();
            lttp.play.audio.mute();
            muted = true;
        }
    }
});