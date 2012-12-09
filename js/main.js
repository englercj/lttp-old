(function($, window, undefined) {
    require([
        'resources',
        'entities',
        'huditems'
    ], function(resourceList, entities, huditems) {
        //turn on some debugging properties
        gf.debug.showFps = true;            //show the FPS box
        gf.debug.showInfo = true;           //show detailed debug info
        gf.debug.showOutline = true;        //show the outline of an entity (size)
        gf.debug.showHitbox = true;         //show the outline of an entity hitbox
        gf.debug.accessTiledUniforms = true;//gf.debug.tiledUniforms with an array of shader uniforms used by the TiledMapLayer object
        //gf.debug.showMapColliders = true;   //show the map colliders

        $(function() {
            //initialize the renderer
            gf.game.init('game', {
                gravity: 0,
                friction: [0, 0]
            });

            //load resources
            gf.event.subscribe(gf.types.EVENT.LOADER_COMPLETE, function() {
                //initialize map and add to game
                gf.game.loadWorld('darkworld_world');
                //play some MUSIKA
                //gf.audio.play('darkworld_music', { loop: true });

                //bind the keymap
                gf.controls.bindKey(gf.types.KEY.W, 'move_up');
                gf.controls.bindKey(gf.types.KEY.A, 'move_left');
                gf.controls.bindKey(gf.types.KEY.S, 'move_down');
                gf.controls.bindKey(gf.types.KEY.D, 'move_right');

                //initialize player
                initLink();

                //initialize HUD
                initHud();

                //start render loop
                gf.game.render();
            });

            gf.event.subscribe(gf.types.EVENT.LOADER_ERROR, function(err, resource) { console.log(err, resource); });
            gf.loader.load(resourceList);
        });

        function initHud() {
            gf.HUD.init();

            gf.HUD.addItem('magic-meter', new huditems.MagicMeter(0, 0, { value: 100 }));
            gf.HUD.addItem('rupees', new huditems.InventoryCounter(130, 0, { value: 0, name: 'rupees' }));
            gf.HUD.addItem('bombs', new huditems.InventoryCounter(260, 0, { value: 0, name: 'bombs' }));
            gf.HUD.addItem('arrows', new huditems.InventoryCounter(390, 0, { value: 0, name: 'arrows' }));
            gf.HUD.addItem('life', new huditems.LifeMeter(500, 0, { value: 3 }));
        }

        function initLink() {
            //initialize the player and add to game
            var link = window.link = gf.entityPool.create('link', {
                scale: 2,
                texture: gf.resources.link_sprite.data,
                position: [0, 0],
                size: [64, 64],
                hitSize: [12, 18],
                hitOffset: [0, -8]
            });
            link.addAnimation('move_right', {
                frames: [0, 1, 2, 3, 4, 5, 6, 7],
                duration: 500,
                loop: true
            });
            link.addAnimation('move_left', {
                frames: [12, 13, 14, 15, 16, 17, 18, 19],
                duration: 500,
                loop: true
            });
            link.addAnimation('move_down', {
                frames: [24, 25, 26, 27, 28, 29, 30, 31],
                duration: 500,
                loop: true
            });
            link.addAnimation('move_up', {
                frames: [36, 37, 38, 39, 40, 41, 42, 43],
                duration: 500,
                loop: true
            });
            link.addAnimation('move_right_idle', [0]);
            link.addAnimation('move_left_idle', [12]);
            link.addAnimation('move_down_idle', [24]);
            link.addAnimation('move_up_idle', [36]);
            link.setActiveAnimation('move_down_idle');
            gf.game.addObject(link);
        }
    });
})(jQuery, window);