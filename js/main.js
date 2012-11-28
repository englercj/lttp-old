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
                src: '/assets/characters/link/zelda.png'
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

            //load resources
            gf.event.subscribe(gf.types.EVENT.LOADER_COMPLETE, function() {
                //initialize map and add to game
                var map = new gf.TiledMap(gf.resources.lightworld_world.data);
                gf.game.addObject(map);

                //bind the keymap
                gf.controls.bindKey(gf.types.KEY.W, 'moveup');
                gf.controls.bindKey(gf.types.KEY.A, 'moveleft');
                gf.controls.bindKey(gf.types.KEY.S, 'movedown');
                gf.controls.bindKey(gf.types.KEY.D, 'moveright');

                //initialize the player and add to game
                var link = new entities.Link([0, 0], {
                    scale: 1,
                    zIndex: 10,
                    texture: gf.resources.link_sprite.data,
                    size: [64, 64],
                    offset: [0, 0],
                    hitSize: [16, 24],
                    hitOffset: [0, -5],
                    name: 'Link',
                    type: gf.types.ENTITY.PLAYER
                });
                gf.game.addObject(link);

                //start render loop
                gf.game.render();
            });

            gf.event.subscribe(gf.types.EVENT.LOADER_ERROR, function() { console.log.call(console, arguments); });
            gf.loader.load(resources);
        });
    });
})(jQuery, window);