var MUSIC_VOLUME = 0.25;

require([
    'game/data/data',
    'game/huditems',
    'game/entities/Link'
], function(data, huditems, Link) {
    var $game, game, hud;

    window.lttp = {
        firstZone: true
    };

    $(function() {
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
            lttp.loadWorld('world_linkshouse');

            //bind some game related keys
            game.input.keyboard.on(gf.input.KEY.B, onToggleSaveMenu);
            game.input.keyboard.on(gf.input.KEY.M, onToggleMap);
            game.input.keyboard.on(gf.input.KEY.I, onToggleInventory);
            game.input.keyboard.on(gf.input.KEY.P, onToggleAudio);

            game.input.gamepad.buttons.on(gf.input.GP_BUTTON.SELECT, onToggleSaveMenu);
            game.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_3, onToggleMap);
            game.input.gamepad.buttons.on(gf.input.GP_BUTTON.START, onToggleInventory);
            game.input.gamepad.buttons.on(gf.input.GP_BUTTON.RIGHT_SHOULDER, onToggleAudio);

            game.input.keyboard.once(gf.input.KEY.TILDE, onToggleDebug);

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
        gui.scale.x = gui.scale.y = 1.5;
        gui.items = {};

        //Add magic meter
        gui.addChild(gui.items.magicMeter = new huditems.MagicMeter([40, 36], { value: 1 }));

        //Add equipted item
        gui.addChild(gui.items.equipted = new huditems.EquiptedItem([75, 42], { value: '' }));

        //Add inventory counters
        gui.addChild(gui.items.rupees = new huditems.InventoryCounter([135, 30], { value: 0, name: 'rupees', font: hudfnt.clone() }));
        gui.addChild(gui.items.bombs = new huditems.InventoryCounter([195, 30], { value: 0, name: 'bombs', font: hudfnt.clone() }));
        gui.addChild(gui.items.arrows = new huditems.InventoryCounter([245, 30], { value: 0, name: 'arrows', font: hudfnt.clone() }));

        //Add life hearts
        gui.addChild(gui.items.life = new huditems.LifeMeter([320, 35], { value: 3, font: retofganon.clone() }));

        return gui;
    }

    function onToggleSaveMenu() {}

    function onToggleMap() {}

    function onToggleInventory() {}

    function onToggleAudio() {}

    function onToggleDebug() {
        gf.debug.show(game);
    }

    //setup the necessary layers
    lttp.loadWorld = function(exit, vec) {
        if(typeof exit === 'string')
            exit = { name: exit };

        //remove the player so he isn't destroyed by the world
        if(lttp.link) {
            console.log('load world', exit);
            game.world.removeChild(lttp.link);
            lttp.oldWorld = game.world;
            game.world.destroy();
        }
        else {
            lttp.link = createLink();
        }
        lttp.firstZone = true;

        game.physics.nextTick(function() {
            lttp.game.physics.skip(2);
            //load the new world into the game
            game.loadWorld(exit.name);
            game.addChild(lttp.link);

            if(lttp.music)
                lttp.music.stop();

            //start music
            if(game.world.properties.music) {
                lttp.music = gf.assetCache[game.world.properties.music];
                lttp.music.volume = MUSIC_VOLUME;
                lttp.music.loop = true;

                if(!lttp.music)
                    console.warn('Music not loaded! "' + game.world.properties.music + '"');
                else
                    lttp.music.play();
            }

            //spawn exits & zones
            game.world.findLayer('exits').spawn();
            game.world.findLayer('zones').spawn();

            //set link position
            lttp.link.setPosition(
                exit.properties ? exit.properties.loc[0] : 128,//2231, //in front of links house
                exit.properties ? exit.properties.loc[1] : 128//2849
            );
            game.camera.follow(lttp.link, gf.Camera.FOLLOW.LOCKON);
            //lttp.link.reindex();
        });
    };

    lttp.loadZone = function(zone, vec) {
        if(zone === lttp.activeZone)
            return;

        console.log(zone.name);
        //transfer the zone stuff
        lttp.activeZone = zone;
        lttp.oldLayer = lttp.activeLayer;
        lttp.activeLayer = game.world.findLayer(zone.name);
        lttp.activeLayer.spawn();

        game.camera.unfollow();
        game.camera.unconstrain();
        if(!lttp.firstZone) {
            var p = vec.x ? 'x' : 'y',
                last = 0;

            $({v:0}).animate({v:game.camera.size[p]+10}, {
                duration: 500,
                easing: 'swing',
                step: function(now, tween) {
                    var n = now - last;

                    game.camera.pan(
                        n * vec.x,
                        n * vec.y
                    );

                    last = now;
                },
                done: loadZoneDone
            });
        } else {
            loadZoneDone();
        }
    };

    function loadZoneDone() {
        if(lttp.oldLayer)
            lttp.oldLayer.despawn();

        var zone = lttp.activeZone;

        lttp.firstZone = false;

        //set camera bounds
        if(!zone.bounds) {
            zone.bounds = zone.hitArea.clone();

            //all except polygon
            if(zone.bounds.x !== undefined) {
                zone.bounds.x += zone.position.x;
                zone.bounds.y += zone.position.y;
            }
            //polygon
            else {
                for(var i = 0; i < zone.bounds.points.length; ++i) {
                    var p = zone.bounds.points[i];

                    p.x += zone.position.x;
                    p.y += zone.position.y;
                }
            }
        }
        game.camera.constrain(zone.bounds.clone());
        game.camera.follow(lttp.link, gf.Camera.FOLLOW.LOCKON);
    }

    function createLink(saveData) {
        if(lttp.link)
            return lttp.link;

        var l = new Link(gf.assetCache['sprite_link']);

        l.mass = 1;
        l.inertia = Infinity;
        l.friction = 0;
        l.hitArea = new gf.Polygon([
            7,8, //x,y relative to links top-left
            9,8,
            16,14,
            16,16,
            9,22,
            7,22,
            0,16,
            0,14
        ]);

        l.anchor.x = 0;
        l.anchor.y = 1;

        l.enablePhysics(game.physics);
        l.addAttackSensor(game.physics);

        return l;
    }
});