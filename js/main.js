require([
    'game/data/resources',
    'game/states/Title',
    'game/states/MainMenu',
    'game/states/Play'
], function(resources, TitleState, MainMenuState, PlayState) {
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
            lttp.intro.input.keyboard.on(gf.input.KEY.SPACE, gotoSelect);
            lttp.intro.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_1, gotoSelect);
            lttp.intro.input.gamepad.buttons.on(gf.input.GP_BUTTON.START, gotoSelect);
            lttp.intro.start();

            //load mainmenu state
            //lttp.mainmenu = new MainMenuState(game);
            //lttp.mainmenu.on('select', loadGame);

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
        lttp.intro.input.keyboard.off(gf.input.KEY.SPACE, gotoSelect);
        lttp.intro.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_1, gotoSelect);
        lttp.intro.input.gamepad.buttons.off(gf.input.GP_BUTTON.START, gotoSelect);

        //lttp.mainmenu.start();
        loadGame();
    }

    function loadGame() {
        //lttp.mainmenu.stop();
        //TODO: load game from storage
        lttp.play.start('world_linkshouse');
    }

    function onDebug() {
        gf.debug.show(game);
    }
});