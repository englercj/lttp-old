(function($, window, undefined) {
    require([
        'game/data/data',
        'game/entities',
        'game/huditems'
    ], function(data, entities, huditems) {
        //turn on some debugging properties
        gf.debug.showFps = true;            //show the FPS box
        gf.debug.showInfo = true;           //show detailed debug info
        gf.debug.showOutline = true;        //show the outline of an entity (size)
        gf.debug.showHitbox = true;         //show the outline of an entity hitbox
        gf.debug.accessTiledUniforms = true;//gf.debug.tiledUniforms with an array of shader uniforms used by the TiledMapLayer object
        gf.debug.showGamepadInfo = true;    //show the gamepad state
        //gf.debug.showMapColliders = true;   //show the map colliders

        $(function() {
            //initialize the renderer
            gf.game.init('game', {
                gravity: 0,
                friction: [0, 0]
            });

            gf.loader.load(data.resources, function(err, resources) {
                //initialize map and add to game
                gf.game.loadWorld('world_lightworld');

                //bind some game related keys
                gf.controls.bindKey(gf.types.KEY.I, 'toggle_inventory', onToggleInventory.bind(this));
                gf.controls.bindKey(gf.types.KEY.M, 'toggle_map', onToggleMap.bind(this));
                gf.controls.bindKey(gf.types.KEY.P, 'toggle_audio', onToggleAudio.bind(this));

                //initialize HUD
                initHud();

                //start render loop
                gf.game.render();
            });
        });

        function initHud() {
            gf.HUD.init();

            gf.HUD.addItem('magic-meter', new huditems.MagicMeter(50, 50, { value: 100 }));
            gf.HUD.addItem('equipted', new huditems.EquiptedItem(90, 50, { value: '' }));
            gf.HUD.addItem('rupees', new huditems.InventoryCounter(215, 35, { value: 0, name: 'rupees' }));
            gf.HUD.addItem('bombs', new huditems.InventoryCounter(300, 35, { value: 0, name: 'bombs' }));
            gf.HUD.addItem('arrows', new huditems.InventoryCounter(375, 35, { value: 0, name: 'arrows' }));
            gf.HUD.addItem('life', new huditems.LifeMeter(800, 35, { value: 20 }));
        }

        function onToggleInventory() {}

        function onToggleMap() {}

        function onToggleAudio() {
            gf.audio.pauseAll();
        }
    });
})(jQuery, window);