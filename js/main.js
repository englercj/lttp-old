require([
    'game/data/resources',
    'game/states/Title',
    'game/states/Select',
    'game/states/Play'
], function(resources, TitleState, SelectState, PlayState) {
    var $game, game;

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

        game.loader.on('progress', function(e) {
        });

        game.loader.on('complete', function() {
            //load starting states
            lttp.intro = new TitleState(game);
            lttp.intro.input.keyboard.on(gf.input.KEY.ENTER, gotoSelect);
            lttp.intro.input.keyboard.on(gf.input.KEY.SPACE, gotoSelect);
            lttp.intro.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_1, gotoSelect);
            lttp.intro.input.gamepad.buttons.on(gf.input.GP_BUTTON.START, gotoSelect);
            lttp.intro.start();

            //load select state
            lttp.select = new SelectState(game);
            lttp.select.on('select', loadGame);

            //load the play state
            lttp.play = new PlayState(game);

            game.input.keyboard.once(gf.input.KEY.TILDE, onDebug);

            //start render loop
            game.render();
        });

        game.loader.load(resources);
    });

    function gotoSelect() {
        lttp.intro.stop();
        lttp.intro.input.keyboard.off(gf.input.KEY.ENTER, gotoSelect);
        lttp.intro.input.keyboard.off(gf.input.KEY.SPACE, gotoSelect);
        lttp.intro.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_1, gotoSelect);
        lttp.intro.input.gamepad.buttons.off(gf.input.GP_BUTTON.START, gotoSelect);

        lttp.select.start();
    }

    function loadGame(save) {
        lttp.select.stop();

        lttp.play.start(save);
    }

    function onDebug() {
        gf.debug.show(game);
    }
});