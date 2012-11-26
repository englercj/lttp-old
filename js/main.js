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

        gf.debug.showFps = true;
        gf.debug.showOutline = true;
        gf.debug.showHitbox = true;

        $(function() {
            //initialize the renderer
            gf.game.init('game');

            //load resources
            gf.loader.load(resources, {
                error: onResourcesError,
                complete: onResourcesLoaded
            });
        });

        function onResourcesLoaded(resources) {
            //initialize map and add to scene
            var map = new gf.Tilemap(gf.resources.lightworld_world.data);
            gf.game.addObject(map);

            //bind the keymap
            gf.controls.bindKey(gf.types.KEY.W, 'moveup');
            gf.controls.bindKey(gf.types.KEY.A, 'moveleft');
            gf.controls.bindKey(gf.types.KEY.S, 'movedown');
            gf.controls.bindKey(gf.types.KEY.D, 'moveright');

            var link = new entities.Link([0, 0], {
                scale: 1,
                zindex: 5,
                texture: gf.resources.link_sprite.data,
                size: [64, 64],
                offset: [0, 0],
                hitSize: [16, 24],
                hitOffset: [0, -5],
                maxVelocity: [5, 5],
                name: 'Link',
                type: gf.types.ENTITY.PLAYER
            });
            gf.game.addObject(link);

            //start render loop
            gf.game.render();
        }

        function onResourcesError() {
            console.log(arguments);
        }
    });
})(jQuery, window);