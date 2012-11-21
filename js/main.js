/*require.config({
    waitSeconds: 2000
});

require([
    'global/class',
    'global/game-shim'
], function() {
    var $game = $('#game'),
    $win = $(window);
    
    $('.progressbar').progressbar();
    $('button, .button').button();

    require(['game/main']);
});*/


var resources = [
    {
        name: 'lightworld_world',
        type: 'world',
        src: '/assets/worlds/lightworld/lightworld.json'
    }
];

gf.debug.showFps = true;

$(function() {
    //initialize the renderer
    gf.renderer.init('game');

    //initialize the controls
    gf.controls.init();

    //load resources
    gf.loader.load(resources, {
        error: onResourcesError,
        complete: onResourcesLoaded
    });
});

function onResourcesLoaded(resources) {
    var map = new gf.Tilemap(gf.resources.lightworld_world.data);
    gf.renderer.addObject(map);

    gf.renderer.render();
}

function onResourcesError() {
    console.log(arguments);
}