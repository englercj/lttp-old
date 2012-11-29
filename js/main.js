(function($, window, undefined) {
    require([
        'entities'
    ], function(entities) {
        var resources = [
            {
                name: 'lightworld_world',
                type: 'world',
                src: '/assets/worlds/lightworld/lightworld.json'
            },
            {
                name: 'link_sprite',
                type: 'texture',
                src: '/assets/entities/link/link.png'
            }
        ];

        //turn on some debugging properties
        gf.debug.showFps = true;            //show the FPS box
        gf.debug.showOutline = true;        //show the outline of an entity (size)
        gf.debug.showHitbox = true;         //show the outline of an entity hitbox
        gf.debug.accessTiledUniforms = true;//gf.debug.tiledUniforms with an array of shader uniforms used by the TiledMapLayer object

        $(function() {
            //initialize the renderer
            gf.game.init('game');

            gf.game.friction = new THREE.Vector2(0, 0);
            gf.game.gravity = 0;

            //load resources
            gf.event.subscribe(gf.types.EVENT.LOADER_COMPLETE, function() {
                //initialize map and add to game
                var map = new gf.TiledMap(gf.resources.lightworld_world.data);
                gf.game.addObject(map);

                //bind the keymap
                gf.controls.bindKey(gf.types.KEY.W, 'move_up');
                gf.controls.bindKey(gf.types.KEY.A, 'move_left');
                gf.controls.bindKey(gf.types.KEY.S, 'move_down');
                gf.controls.bindKey(gf.types.KEY.D, 'move_right');

                //initialize the player and add to game
                var link = window.link = new entities.Link([0, 0], {
                    scale: 1,
                    zIndex: 10,
                    texture: gf.resources.link_sprite.data,
                    size: [64, 64],
                    hitSize: [16, 24],
                    hitOffset: [0, -5],
                    name: 'Link',
                    type: gf.types.ENTITY.PLAYER
                });
                link.addAnimation('move_right', {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7],
                    duration: 500,
                    loop: true,
                    hitSize: [32, 48],
                    hitOffset: [10, 1]
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

                //start render loop
                gf.game.render();
            });

            gf.event.subscribe(gf.types.EVENT.LOADER_ERROR, function() { console.log.call(console, arguments); });
            gf.loader.load(resources);
        });
    });
})(jQuery, window);