require([
    'game/data/data',
    'game/entities',
    'game/huditems'
], function(data, entities, huditems) {
    var $game, game, hud;

    window.lttp = {};

    $(function() {
        $(window).on('resize', onWindowResize);

        $game = $('#game');

        lttp.game = game = new gf.Game('game', {
            gravity: 0,
            friction: [0, 0],
            width: $game.width(),
            height: $game.height()
        });

        game.loader.on('progress', function(e) {
        });

        game.loader.on('complete', function() {
            game.spritepool.add('enemy', entities.Enemy);
            game.spritepool.add('link', entities.Link);

            //initialize world and track link with camera
            game.loadWorld('world_lightworld');

            game.camera.follow(lttp.link = game.world.findLayer('player').children[0]);

            //bind some game related keys
            game.input.keyboard.on(gf.input.KEY.I, onToggleInventory);
            game.input.keyboard.on(gf.input.KEY.M, onToggleMap);
            game.input.keyboard.on(gf.input.KEY.P, onToggleAudio);

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

        lttp.gui = gui = new gf.Gui();
        gui.items = {};

        //Add magic meter
        gui.addChild(gui.items.magicMeter = new huditems.MagicMeter([50, 15], { value: 1 }));

        //Add life hearts
        gui.addChild(
            gui.items.life = new huditems.LifeMeter(
                //160 is 10 hearts + 15 pad
                [game.camera.size.x - (175), 15],
                { value: 10, font: retofganon.clone() }
            )
        );

        //Add inventory counters
        gui.addChild(gui.items.rupees = new huditems.InventoryCounter([215, 15], { value: 0, name: 'rupees', font: hudfnt.clone() }));
        gui.addChild(gui.items.bombs = new huditems.InventoryCounter([300, 15], { value: 0, name: 'bombs', font: hudfnt.clone() }));
        gui.addChild(gui.items.arrows = new huditems.InventoryCounter([365, 15], { value: 0, name: 'arrows', font: hudfnt.clone() }));

        //Add equipted item
        gui.addChild(gui.items.equipted = new huditems.EquiptedItem([90, 15], { value: '' }));

        return gui;
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