define([
    'game/data/types',
    'game/data/sprites',
    'game/data/items'
], function(types, sprites, items) {
    return {
        /////////////////////////////////////////////////////////
        // The Lightworld map (the light overworld)
        /////////////////////////////////////////////////////////
        LIGHTWORLD: {
            tileScale: 3.55,
            tileSize: 16.0,
            mapSize: [256, 256],
            zone: 'Hyrule Field',
            layers: [
                {
                    name: 'world',
                    tilemapSrc: 'assets/maps/lightworld/tilemap.png',
                    tilesetSrc: 'assets/maps/lightworld/tileset.png'
                }
            ],
            zones: [
                {
                    name: 'Lost Woods',
                    vertices: [
                        [0, 0],
                        [0, 64],
                        [64, 64],
                        [64, 0]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Outer Woodlands',
                    vertices: [
                        [0, 97],
                        [95, 97],
                        [95, 0],
                        [64, 0],
                        [64, 64],
                        [0, 64]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Kakariko Village',
                    vertices: [
                        [0, 97],
                        [0, 162],
                        [95, 162],
                        [95, 126],
                        [64, 126],
                        [64, 97]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Kakariko Village Outskirts',
                    vertices: [
                        [0, 162],
                        [0, 192],
                        [64, 192],
                        [64, 162]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Desert Of Mystery',
                    vertices: [
                        [0, 192],
                        [0, 255],
                        [64, 255],
                        [64, 192]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Hyrule Field',
                    vertices: [
                        [95, 64],
                        [95, 97],
                        [64, 97],
                        [64, 126],
                        [95, 126],
                        [95, 182],
                        [110, 182],
                        [110, 189],
                        [159, 189],
                        [159, 64]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Great Swamp',
                    vertices: [
                        [64, 255],
                        [159, 255],
                        [159, 189],
                        [110, 189],
                        [110, 182],
                        [95, 182],
                        [95, 162],
                        [64, 162]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Lake Hylia',
                    vertices: [
                        [159, 255],
                        [255, 255],
                        [255, 191],
                        [223, 191],
                        [223, 159],
                        [159, 159]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Eastern Palace',
                    vertices: [
                        [255, 95],
                        [191, 95],
                        [191, 159],
                        [223, 159],
                        [223, 191],
                        [255, 191]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Eastern Field',
                    vertices: [
                        [159, 159],
                        [191, 159],
                        [191, 95],
                        [255, 95],
                        [255, 31],
                        [223, 31],
                        [223, 64],
                        [159, 64]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Death Mountain',
                    vertices: [
                        [95, 0],
                        [95, 64],
                        [223, 64],
                        [223, 19],
                        [159, 19],
                        [159, 0]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                },
                {
                    name: 'Death Mountain (East)',
                    vertices: [
                        [159, 0],
                        [159, 19],
                        [223, 19],
                        [223, 31],
                        [255, 31],
                        [255, 0]
                    ],
                    vertexUnits: types.UNIT.PIXELS,
                    exits: []
                }
            ]
        }
    };
});