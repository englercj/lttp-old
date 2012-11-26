define([
    'game/data/types',
    'game/data/items',
    'game/data/sprites',
    'game/data/maps',
    'game/data/entities'
], function(types, items, sprites, maps, entities) {
    return {
        types: types,
        items: items,
        sprites: sprites,
        maps: maps,
        entities: entities
    };
});