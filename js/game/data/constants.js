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

    //cone within hit detector to check for interactions
    ATTACK_CONE: 0.5,
    USE_CONE: 0.4,

    //radius of hit detector
    ATTACK_SENSOR_RADIUS: 18,

    //distance to throw an item
    THROW_DISTANCE_X: 75,
    THROW_DISTANCE_Y: 50,

    //volume for sounds
    EFFECT_VOLUME: 0.15,
    MUSIC_VOLUME: 0.25,

    //how long to run into something before an action takes place (blocked/jump down)
    BLOCKED_PUSH_WAIT_TIME: 800,

    //time it takes for the inventory menu to drop down, in seconds
    INVENTORY_DROP_TIME: 0.5
});