define([
    'game/data/types',
    'game/data/sprites',
    'game/data/items'
], function(types, sprites, items) {
    //The "ents" array has a property "indices" that contains a human-readable
    //name for each index Mostly they are for readability in the code and so
    //you don't have to remember the number behind
    var ents = [];
    ents.indices = {};

    //adds it twice, as an array elm and as a property
    function addEnt(name, ent) {
        ents.push(ent);
        ents[name] = ent;
    }

    /////////////////////////////////////////////////////////
    // 0 - Main Player Entity
    /////////////////////////////////////////////////////////
    addEnt('PLAYER', {
        type: types.ENTITY.PLAYER,
        subtype: null,
        name: 'Link',
        moveSpeed: 250,
        health: 3,
        location: [0, 0],
        weapon: items.FIGHTER_SWORD,
        maxHealth: 3,
        magic: 50,
        maxMagic: 100,
        canMove: true,
        inventory: {
            rupees: 0,
            bombs: 0,
            arrows: 0,
            heart_pieces: 0
        },
        sprite: sprites.PLAYER
    });

    /////////////////////////////////////////////////////////
    // 1 - Green Grass Entity
    /////////////////////////////////////////////////////////
    addEnt('GREEN_GRASS', {
        type: types.ENTITY.TILE,
        subtype: types.TILE.LIFTABLE_CUTABLE,
        name: 'Green Grass',
        health: 0.1,
        sprite: sprites.TILE.GREEN_GRASS
    });

    /////////////////////////////////////////////////////////
    // 2 - Desert Grass Entity
    /////////////////////////////////////////////////////////
    addEnt('DESERT_GRASS', {
        type: types.ENTITY.TILE,
        subtype: types.TILE.LIFTABLE_CUTABLE,
        name: 'Desert Grass',
        health: 0.1,
        sprite: sprites.TILE.DESERT_GRASS
    });

    return ents;
});