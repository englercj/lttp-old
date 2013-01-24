define([], function() {
    return [
        //Lightworld
        {
            name: 'world_lightworld',
            type: gf.types.RESOURCE.WORLD,
            src: '/assets/worlds/lightworld/lightworld.json'
        },
        {
            name: 'music_lightworld',
            type: gf.types.RESOURCE.MUSIC,
            src: '/assets/audio/music/overworld.lite.ogg'
        },
        //Darkworld
        {
            name: 'world_darkworld',
            type: gf.types.RESOURCE.WORLD,
            src: '/assets/worlds/darkworld/darkworld.json'
        },
        {
            name: 'music_darkworld',
            type: gf.types.RESOURCE.MUSIC,
            src: '/assets/audio/music/dark_world.lite.ogg'
        },
        //Misc
        {
            name: 'sprite_link',
            type: gf.types.RESOURCE.SPRITE,
            src: '/assets/entities/link/link.png'
        }
    ];
});