define({
    /////////////////////////////////////////////////////////
    // Entity Types
    ///////////////////
    //Extend the base types defined by GrapeFruit with a few more, but still maintain
    // compatability with the GF ones.
    /////////////////////////////////////////////////////////
    ENTITY: {
        PLAYER: 'player',
        ENEMY: 'enemy',
        FRIENDLY: 'friendly',
        NEUTRAL: 'neutral',
        TILE: 'tile',
        COLLECTABLE: 'collectable'
    },

    //deminsions of the screen
    WIDTH: 256,
    HEIGHT: 224,
    SCALE: 3,
    TEXT_SCALE: 1.5,

    //cone within hit detector to check for interactions
    ATTACK_CONE: 0.5,
    USE_CONE: 0.4,

    //radius of hit detector
    ATTACK_SENSOR_RADIUS: 18,

    //distance to throw an item
    THROW_DISTANCE_X: 75,
    THROW_DISTANCE_Y: 50,

    //volume for sounds
    EFFECT_VOLUME: 0.80,
    MUSIC_VOLUME: 0.20,

    //how long to run into something before an action takes place (blocked/jump down)
    BLOCKED_WAIT_TIME: 500,

    //time it takes to execute a jump animation (in seconds)
    JUMP_TIME: 0.5,
    JUMP_DISTANCE: 50,

    //time it takes for the inventory menu to drop down, in seconds
    INVENTORY_DROP_TIME: 0.5
});