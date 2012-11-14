define([
    'game/data/types'
], function(types) {
    return {
        /////////////////////////////////////////////////////////
        // Main Player Sprite
        /////////////////////////////////////////////////////////
        PLAYER: {
            textureSrc: 'assets/characters/link/sprite.png',
            size: [72, 92],
            offset: [0, 0],
            area: [8, 3],
            segments: [5, 8],
            zindex: 5,
            animations: {
                move_down: {
                    numFrames: 8,
                    duration: 500
                },
                move_up: {
                    offset: [0, 2],
                    numFrames: 8,
                    duration: 500
                },
                move_left: {
                    offset: [0, 1],
                    numFrames: 8,
                    duration: 500
                },
                move_right: {
                    inverseX: 'move_left'
                }
            }
        },
        /////////////////////////////////////////////////////////
        // NPC Sprites
        /////////////////////////////////////////////////////////
        NPC: {

        },
        /////////////////////////////////////////////////////////
        // Tile and Map Interaction Sprites
        /////////////////////////////////////////////////////////
        TILE: {
            GREEN_GRASS: {
                textureSrc: 'assets/entities/grass/grass.png',
                size: [57, 57],
                offset: [0, 0],
                area: [0, 0],
                segments: [1, 1],
                zindex: 2,
                animations: {
                    idle: {
                        numFrames: 1,
                        duration: 1000
                    }
                }
            },
            DESERT_GRASS: {
                textureSrc: 'assets/entities/grass/grass.png',
                size: [57, 57],
                offset: [0, 1],
                area: [0, 0],
                segments: [1, 1],
                zindex: 2,
                animations: {
                    idle: {
                        numFrames: 1,
                        duration: 1000
                    }
                }
            }
        }
    };
});