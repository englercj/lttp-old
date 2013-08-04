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
        COLLECTABLE: 'collectable'
    },

    /////////////////////////////////////////////////////////
    // Item Types
    ///////////////////
    //An item has many properties, these define how it interacts with other entities, more
    // specifically how it effects entities that use it.
    /////////////////////////////////////////////////////////
    ITEM: {
        NONE: 0,
        SPAWNING: 1,            //spawns an entity when used
        PROTECTING: 2,          //protects you in some maner
        HEALING: 3,             //heals health points
        REFRESHING: 4,          //heals magic points
        HEALING_REFRESHING: 5,  //heals magic points and health points
        LIGHTING: 6,            //casts visual light, and can light torches
        INVIS: 7,               //makes link invisible
        TRANSFORM: 8,           //transforms things it is casted on
        MUSICAL: 9,             //plays music (and calls that damn bird)
        CATCHING: 10,           //catches flyers (like fairies, bees, etc)
        TRANSLATING: 11,        //translates broken texts
        CONTAINER: 12,          //contains items caught by an ITEM_CATCHING item
        TELEPORTING: 13,        //teleports the player from
        DIGGING: 14,            //the shovel
        ENHANCING: 15,          //an item that enhances the the play, but doesn't get activated (boots, gloves, flippers)
        GATHERABLE: 16,         //an item that can be gathered (hearts, jars, rupees)
        QUEST: 17,              //quest items (pendants, crystal maidens)
    },

    /////////////////////////////////////////////////////////
    // Weapon Types
    ///////////////////
    //A weapon has many properties, these define how it interacts with other entities.
    /////////////////////////////////////////////////////////
    WEAPON: {
        NONE: 0,
        DAMAGING: 1,          //does damage
        PARALIZING: 2,        //paralizes an entity
        FREEZING: 3,          //freezes an entity
        BURNING: 4,           //burns an entity
        DESTRUCTIVE: 5,       //can destroy BLOCKING_DESTRUCTABLE
        DESTRUCTIVE_2: 6,     //can destroy BLOCKING_DESTRUCTABLE_2
        SMASHING: 7,          //can smash BLOCKING_SMASHABLE
        DAMAGING_PARALIZING: 10,    //damages and paralizes
        DAMAGING_FREEZING: 11,      //damages and freezes
        DAMAGING_BURNING: 12,       //damages and burns
        DAMAGING_DESTRUCTIVE: 13,   //can destroy BLOCKING_DESTRUCTABLE and deal damage
        DAMAGING_DESTRUCTIVE_2: 14, //can destroy BLOCKING_DESTRUCTABLE_2, and deal damage
        DAMAGING_SMASHING: 15       //can smash BLOCKING_SMASHABLE and deal damage
    },

    ATTACK_CONE: 0.5,
    USE_CONE: 0.4,
    ATTACK_SENSOR_RADIUS: 18,

    THROW_DISTANCE_X: 75,
    THROW_DISTANCE_Y: 50,

    EFFECT_VOLUME: 0.05,
    MUSIC_VOLUME: 0.25,

    BLOCKED_PUSH_WAIT_TIME: 800
});