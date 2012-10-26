define({
    /////////////////////////////////////////////////////////
    // Tile Types
    ///////////////////
    //Each tile (16x16 blocks) has a type that defines how it interacts
    //with the player this isn't collisions, but isntead when they
    //interact with it, what happens? (bomb explode, lift, sword chop, etc)
    //
    //there are a maximum of 256 values here, since this must be stored in a 
    //single byte of the PNG
    /////////////////////////////////////////////////////////
    TILE: {
        EMPTY: 0,
        CUTABLE: 1,         //sword can cut
        SMASHABLE: 2,       //hammer can smash
        TELEPORTING: 3,     //teleports to/from darkworld
        LIFTABLE: 4,        //easy lifting
        LIFTABLE_2: 5,      //only liftable with power 2+ (silver gloves)
        LIFTABLE_3: 6,      //only liftable with power 3+ (golden gloves)
        LIFTABLE_4: 7,      //reserved
        LIFTABLE_5: 8,      //reserved
        DESTRUCTABLE: 9,    //bomb can destroy
        DESTRUCTABLE_2: 10, //superbomb can destroy
        LIFTABLE_CUTABLE: 11,//can be lifted or cut
        MOVABLE: 12,        //can be pushed
        MOVABLE_2: 13,      //can be pushed with power 2+ (silver gloves)
        MOVABLE_3: 14       //can be pushed with power 3+ (golden gloves)
    },

    /////////////////////////////////////////////////////////
    // Subtile Types
    ///////////////////
    //collision works by dividing each "tile" (16x16 blocks) into 4 "subtiles" (8x8 blocks)
    //each of these subtiles are given a type that define if a player can pass by or not
    //
    //These values range from 0 - 3 since there is only 1 byte in the PNG to store 4 subtiles
    //so each is given 2 bits to represent its type
    /////////////////////////////////////////////////////////
    SUBTILE: {
        PASS: 0,
        SLIDE: 1,
        BLOCK: 2,
        JUMPDOWN: 3
    },

    /////////////////////////////////////////////////////////
    // Item Types
    ///////////////////
    //An item has many properties, these define how it interacts with other entities, more
    //specifically how it effects other entities.
    /////////////////////////////////////////////////////////
    ITEM: {
        NONE: 0,
        SPAWNING: 1,            //spawns an entity when used
        PROTECTING: 2,          //protects you in some maner
        HEALING: 3,             //heals health points
        REFRESHING: 4,          //heals magic points
        HEALING_REFRESHING: 5,  //heals magic points
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
    //A weapon has many properties, these define how it interacts with other entities, more
    //specifically how it effects other entities.
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
    }

    /////////////////////////////////////////////////////////
    // Entity Types
    ///////////////////
    //An entity has many properties, blah blah blah
    /////////////////////////////////////////////////////////
    ENTITY: {
        BORING: 0,
        PLAYER: 1,
        ENEMY: 2,
        FRIENDLY: 3,
        NEUTRAL: 4,
        ITEM: 5
    }
});