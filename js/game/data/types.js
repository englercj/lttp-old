define({
    /////////////////////////////////////////////////////////
    // Subtile Types
    ///////////////////
    //collision works by dividing each "tile" (16x16 blocks) into 4 "subtiles" (8x8 blocks)
    //each of these subtiles are given a type that define how they behave in interactions
    //other with entities.
    /////////////////////////////////////////////////////////
    //nonblocking subtiles
    EMPTY: 1000,
    CUTABLE: 1001,

    //blocking subtiles
    BLOCKING: 4000,                 //blocks an entity
    BLOCKING_LIFTABLE: 4001,        //can be lifted normally
    BLOCKING_LIFTABLE_2: 4002,      //can be lifted only with lifting power 2+ (silver gloves)
    BLOCKING_LIFTABLE_3: 4003,      //can be lifted only with lifting power 3+ (golden gloves)
    BLOCKING_CUTABLE: 4004,         //can be cut by a sword
    BLOCKING_DESTRUCTABLE: 4005,    //destructable blocks can be destroyed by normal bombs
    BLOCKING_DESTRUCTABLE_2: 4006,  //destructable2 blocks can be destroyed by super bombs
    BLOCKING_LIFTABLE_CUTABLE: 4007,//can be lifted or cut
    BLOCKING_MOVABLE: 4008,         //can be pushed normally
    BLOCKING_MOVABLE_2: 4009,       //can be pushed with moving power 2+ (silver gloves)
    BLOCKING_MOVABLE_3: 4010,       //can be pushed with moving power 3+ (golden gloves)
    BLOCKING_JUMPDOWN: 4011,        //a cliff edge you can jump down

    /////////////////////////////////////////////////////////
    // Item Types
    ///////////////////
    //An item has many properties, these define how it interacts with other entities, more
    //specifically how it effects other entities.
    /////////////////////////////////////////////////////////
    //item types
    WEAPON: 7000,
    WEAPON_DAMAGING: 7001,          //does damage
    WEAPON_PARALIZING: 7002,        //paralizes an entity
    WEAPON_FREEZING: 7003,          //freezes an entity
    WEAPON_BURNING: 7004,           //burns an entity
    WEAPON_DAMAGING_PARALIZING: 7005, //damages and paralizes
    WEAPON_DAMAGING_FREEZING: 7006, //damages and freezes
    WEAPON_DAMAGING_BURNING: 7007,   //damages and burns

    /////////////////////////////////////////////////////////
    // Entity Types
    ///////////////////
    //An entity has many properties
    /////////////////////////////////////////////////////////
});