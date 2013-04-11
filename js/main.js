(function($, window, undefined) {
    require([
        'game/data/data',
        'game/entities',
        'game/huditems'
    ], function(data, entities, huditems) {
        //turn on some debugging properties
        /*gf.debug.showFps = true;            //show the FPS box
        gf.debug.showInfo = true;           //show detailed debug info
        gf.debug.showOutline = true;        //show the outline of an entity (size)
        gf.debug.showHitbox = true;         //show the outline of an entity hitbox
        gf.debug.accessTiledUniforms = true;//gf.debug.tiledUniforms with an array of shader uniforms used by the TiledMapLayer object
        gf.debug.showGamepadInfo = true;    //show the gamepad state
        */
        //gf.debug.showMapColliders = true;   //show the map colliders

        var $game, game;

        $(function() {
            $(window).on('resize', onWindowResize);

            $game = $('#game');

            game = new gf.Game('game', {
                gravity: 0,
                friction: [0, 0],
                width: $game.width(),
                height: $game.height()
            });
            gf.debug.showFpsCounter();

            window.game = game;

            game.loader.on('progress', function(e) {
            });

            game.loader.on('complete', function() {
                //initialize map and add to game
                game.loadWorld('world_lightworld');
                game.camera.follow(game.players[0], gf.Camera.FOLLOW.PLATFORMER);

                //bind some game related keys
                game.input.keyboard.bind(gf.input.KEY.I, 'toggle_inventory', onToggleInventory);
                game.input.keyboard.bind(gf.input.KEY.M, 'toggle_map', onToggleMap);
                game.input.keyboard.bind(gf.input.KEY.P, 'toggle_audio', onToggleAudio);

                //initialize HUD
                initHud();

                //start render loop
                game.render();
            });
            game.loader.load(data.resources);
        });

        function initHud() {
            var hud = new gf.Hud();
            hud.items = {};

            /*hud.addChild(hud.items['magic-meter'] = new huditems.MagicMeter([50, 50], { value: 100 }));
            hud.addChild(hud.items['equipted'] = new huditems.EquiptedItem([90, 50], { value: '' }));
            hud.addChild(hud.items['rupees'] = new huditems.InventoryCounter([215, 35], { value: 0, name: 'rupees' }));
            hud.addChild(hud.items['bombs'] = new huditems.InventoryCounter([300, 35], { value: 0, name: 'bombs' }));
            hud.addChild(hud.items['arrows'] = new huditems.InventoryCounter([375, 35], { value: 0, name: 'arrows' }));
            hud.addChild(hud.items['life'] = new huditems.LifeMeter([800, 35], { value: 20 }));
            */
        }

        function onToggleInventory() {}

        function onToggleMap() {}

        function onToggleAudio() {
            gf.audio.pauseAll();
        }

        function onWindowResize()
        {
            var w = $(window).width(),
                h = $(window).height();

            game.resize(w, h);
        }
    });
})(jQuery, window);