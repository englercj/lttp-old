require([
    //Modules:
    'game/lib/utils/util',
    'game/lib/utils/AssetLoader',
    'game/lib/core/Engine',
    //Scripts that modify global:
    'game/vendor/three/three',
    'game/vendor/three/Stats',
    'game/vendor/three/Detector',
], function(util, AssetLoader, Engine) {
    $(function() {
        //Detect if webgl is supported, and if not exit
        if (!Detector.webgl) {
            $('#game').append(Detector.getWebGLErrorMessage());
            return;
        }

        //Load assets
        var resources;
        $('#btnDownload').on('click', function(e) {
            e.preventDefault();
            
            $(this).attr('disabled', true);
            
            var loader = new AssetLoader();

            loader.loadResources(
                [
                    { name: 'maps.lightworld.tilemap', type: 'texture', src: 'assets/maps/lightworld/tilemap.png' },
                    { name: 'maps.lightworld.tileset', type: 'texture', src: 'assets/maps/lightworld/tileset.png' },
                    { name: 'maps.lightworld.meta', type: 'json', src: 'assets/maps/lightworld/meta.json' },
                    { name: 'entities.link.texture', type: 'texture', src: 'assets/characters/link/sprite.png' },
                    { name: 'entities.link.data', type: 'json', src: 'assets/characters/link/character.json' }
                ],
                function(rsrcs) {
                    resources = rsrcs;
                    
                    $('#btnDownload').hide();
                    $('#btnStart').show();
                }
            );
        });

        //Initialize engine when startup button is clicked
        var engine;
        $('#btnStart').on('click', function(e) {
            e.preventDefault();
            
            if(!engine) {
                engine = new Engine({
                    container: '#game',
                    hud: '#hud',
                    dialog: '#dialog',
                    cutscenes: '#cutscenes'
                }, resources);
                engine.start();
                
                //$('#btnStart').text('Show Game');
            } else {
                //engine.viewport.requestFullScreen();
            }
        });
    });
});