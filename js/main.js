(function($, window, undefined) {
    require([
        'game/data/data',
        'game/entities',
        'game/huditems'
    ], function(data, entities, huditems) {
        var $game, game, hud;

        $(function() {
            $(window).on('resize', onWindowResize);

            $game = $('#game');

            window.GAME = game = new gf.Game('game', {
                gravity: 0,
                friction: [0, 0],
                width: $game.width(),
                height: $game.height()
            });

            game.loader.on('progress', function(e) {
            });

            game.loader.on('complete', function() {
                game.entitypool.add('enemy', entities.Enemy);
                game.entitypool.add('link', entities.Link);

                //initialize world and track link with camera
                game.loadWorld('world_lightworld');
                game.camera.follow(game.players[0]);

                //bind some game related keys
                game.input.keyboard.bind(gf.input.KEY.I, 'toggle_inventory', onToggleInventory);
                game.input.keyboard.bind(gf.input.KEY.M, 'toggle_map', onToggleMap);
                game.input.keyboard.bind(gf.input.KEY.P, 'toggle_audio', onToggleAudio);

                //initialize HUD objects
                game.addChild(initHud());

                //start render loop
                game.render();
            });

            game.loader.load(data.resources);
        });

        function initHud() {
            var mp = {};
            'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(c) {
                mp[c] = '_' + c;
            });
            mp[':'] = 'colon';
            mp[','] = 'comma';
            mp['-'] = 'dash';
            mp['!'] = 'exclamation';
            mp['.'] = 'period';
            mp['?'] = 'question';
            mp[';'] = 'semicolon';

            var retofganon = new gf.TextureFont('font_retofganon', { ext: '.png', map: mp }),
                hudfnt = new gf.TextureFont('font_hud', { ext: '.png' });

            window.HUD = hud = new gf.Hud();
            hud.items = {};

            //Add magic meter
            hud.addChild(hud.items.magicMeter = new huditems.MagicMeter([50, 15], { value: 1 }));

            //Add life hearts
            hud.addChild(
                hud.items.life = new huditems.LifeMeter(
                    //160 is 10 hearts + 15 pad
                    [game.camera.size.x - (175), 15],
                    { value: 10, font: retofganon.clone() }
                )
            );

            //Add inventory counters
            hud.addChild(hud.items.rupees = new huditems.InventoryCounter([215, 15], { value: 0, name: 'rupees', font: hudfnt.clone() }));
            hud.addChild(hud.items.bombs = new huditems.InventoryCounter([300, 15], { value: 0, name: 'bombs', font: hudfnt.clone() }));
            hud.addChild(hud.items.arrows = new huditems.InventoryCounter([365, 15], { value: 0, name: 'arrows', font: hudfnt.clone() }));

            //Add equipted item
            hud.addChild(hud.items.equipted = new huditems.EquiptedItem([90, 15], { value: '' }));

            return hud;
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

            if(hud) {
                hud.items.life.position.x = game.camera.size.x - (175); //160 is 10 hearts + 15 pad
                hud.items.life.position.y = 15;
            }

            game.resize(w, h);
        }
    });
})(jQuery, window);