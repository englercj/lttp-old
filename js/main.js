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
    //initialize map and add to scene
    var map = new gf.Tilemap(gf.resources.lightworld_world.data);
    gf.renderer.addObject(map);

    //initialize link and add to scene
    var link = new gf.Sprite([0, 0], {
        scale: 2,
        zindex: 5,
        texture: gf.resources.link_sprite.data,
        size: [64, 64],
        offset: [0, 0],
        hitSize: [32, 32],
        hitOffset: [0, -10],
        type: gf.types.ENTITY.PLAYER
    });
    console.log(link);
    gf.renderer.addObject(link);

    //start render loop
    gf.renderer.render();
}

function onResourcesError() {
    console.log(arguments);
}