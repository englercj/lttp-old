define([], function() {
    return [
        {
            name: 'darkworld_music',
            type: gf.types.RESOURCE.AUDIO,
            src: '/assets/audio/music/dark_world.lite.ogg'
        },
        {
            name: 'lightworld_world',
            type: gf.types.RESOURCE.WORLD,
            src: '/assets/worlds/lightworld/lightworld.json'
        },
        {
            name: 'darkworld_world',
            type: gf.types.RESOURCE.WORLD,
            src: '/assets/worlds/darkworld/darkworld.json'
        },
        {
            name: 'link_sprite',
            type: gf.types.RESOURCE.TEXTURE,
            src: '/assets/entities/link/link.png'
        }
    ];
});