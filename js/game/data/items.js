define([
    'game/data/types'
], function(types) {
    return {
        /////////////////////////////////////////////////////////
        // Weapons!
        ///////////////////
        /////////////////////////////////////////////////////////
        FIGHTER_SWORD: {
            type: types.WEAPON.DAMAGING,
            damage: 1,
            range: 2,
            knockback: 5
        },
        MASTER_SWORD: {
            type: types.WEAPON.DAMAGING,
            damage: 2,
            range: 2,
            knockback: 5
        },
        TEMPERED_SWORD: {
            type: types.WEAPON.DAMAGING,
            damage: 4,
            range: 2,
            knockback: 5
        },
        GOLDEN_SWORD: {
            type: types.WEAPON.DAMAGING,
            damage: 8,
            range: 2,
            knockback: 5
        },
        SWORD_BEAM:{
            type: types.WEAPON.DAMAGING,
            damage: 1,
            range: 10,
            projectile: true,
            knockback: 5
        },
        BOOMERANG: {
            type: types.WEAPON.DAMAGING_PARALIZING,
            damage: 0.5,
            range: 10,
            projectile: true,
            roundtrip: true,
            speed: 350,
            knockback: 1
        },
        MAGICAL_BOOMERANG: {
            type: types.WEAPON.DAMAGING_PARALIZING,
            damage: 0.5,
            range: null,
            projectile: true,
            roundTrip: true,
            speed: 350,
            knockback: 1
        },
        HOOKSHOT: {
            type: types.WEAPON.PARALIZING,
            range: 10,
            projectile: true,
            roundTrip: true,
            speed: 350,
            knockback: 1
        },
        BOMB: {
            type: types.WEAPON.DAMAGING_DESTRUCTIVE,
            damage: 2,
            range: 3,
            speed: 350,
            timeout: 3,
            thrown: true,
            knockback: 5
        },
        SUPER_BOMB: {
            type: types.WEAPON.DAMAGING_DESTRUCTIVE_2,
            damage: 10,
            range: 4,
            speed: 350,
            timeout: 3,
            thrown: true,
            knockback: 5
        },
        HAMMER: {
            type: types.WEAPON.DAMAGING_SMASHING,
            damage: 4,
            range: 1,
            knockback: 5
        },
        BOW_ARROW: {
            type: types.WEAPON.DAMAGING,
            damage: 2,
            range: 10,
            projectile: true,
            speed: 400,
            knockback: 5
        },
        BOW_SILVER_ARROW: {
            type: types.WEAPON.DAMAGING,
            damage: 100,
            range: 10,
            projectile: true,
            speed: 400,
            bossImmune: true,
            knockback: 5
        },
        ROD_FIRE: {
            type: types.WEAPON.DAMAGING_BURNING,
            damage: 4,
            range: 10,
            projectile: true,
            speed: 400,
            cost: 2,
            knockback: 5
        },
        ROD_ICE: {
            type: types.WEAPON.DAMAGING_FREEZING,
            damage: 4,
            range: 10,
            projectile: true,
            speed: 400,
            cost: 2,
            knockback: 5
        },
        MEDALLION_BOMBOS: {
            type: types.WEAPON.DAMAGING,
            damage: 50,
            range: null,
            cost: 5,
            bossImmune: true
        },
        MEDALLION_ETHER: {
            type: types.WEAPON.DAMAGING_FREEZING,
            damage: 25,
            range: null,
            cost: 5,
            bossImmune: true
        },
        MEDALLION_QUAKE: {
            type: types.WEAPON.DAMAGING,
            damage: 25,
            range: null,
            cost: 5,
            bossImmune: true
        },
        STINGER: { //for bees
            type: types.WEAPON.DAMAGING,
            damage: 0.25,
            range: 0,
            knockback: 2
        },
        LIFTED_BUSH: {
            type: types.WEAPON.DAMAGING,
            damage: 1,
            range: 10,
            thrown: true,
            knockback: 5
        },
        LIFTED_MISC: { //like pots, rocks, etc
            type: types.WEAPON.DAMAGING,
            damage: 4,
            range: 10,
            thrown: true,
            knockback: 5
        },
        /////////////////////////////////////////////////////////
        // Usable Items
        ///////////////////
        //These items can be activated to do something, defined by their type
        /////////////////////////////////////////////////////////
        CANE_OF_SOMARIA: {
            type: types.ITEM.SPAWNING,
            entity: 'BLOCK_RED',
            lifespan: 5000,
            cost: 2
        },
        CANE_OF_BYRNA: {
            type: types.ITEM.PROTECTING,
            cost: 2,
            toggle: true
        },
        LANTERN: {
            type: types.ITEM.LIGHTING,
            cost: 1
        },
        MAGIC_CAPE: {
            type: types.ITEM.INVIS,
            cost: 2,
            toggle: true
        },
        MAGIC_POWDER: {
            type: types.ITEM.TRANSFORM,
            cost: 2
        },
        FLUTE: {
            type: types.ITEM.MUSICAL,
            cost: 2
        },
        BUG_CATCHING_NET: {
            type: types.ITEM.CATCHING
        },
        BOOK_OF_MUDORA: {
            type: types.ITEM.TRANSLATING
        },
        BOTTLE: {
            type: types.ITEM.CONTAINER
        },
        BOTTLE_RED: {
            type: types.ITEM.HEALING,
            heal: 100,
            replaceWith: 'BOTTLE' //after use, replace with this item
        },
        BOTTLE_GREEN: {
            type: types.ITEM.REFRESHING,
            refresh: 100,
            replaceWith: 'BOTTLE' //after use, replace with bottle
        },
        BOTTLE_BLUE: {
            type: types.ITEM.HEALING_REFRESHING,
            heal: 100,
            refresh: 100,
            replaceWith: 'BOTTLE' //after use, replace with bottle
        },
        MAGIC_MIRROR: {
            type: types.ITEM.TELEPORTING,

        },
        /////////////////////////////////////////////////////////
        // Modifier Items
        ///////////////////
        //Then items are not "usable" they just buff the player in some way
        /////////////////////////////////////////////////////////
        BOOTS: {
            type: types.ITEM.ENHANCING,
            buff: 'canSprint',
            value: true
        },
        POWER_GLOVES: {
            type: types.ITEM.ENHANCING,
            buff: 'liftPower',
            value: 2
        },
        TITANS_MITT: {
            type: types.ITEM.ENHANCING,
            buff: 'liftPower',
            value: 3
        },
        FLIPPERS: {
            type: types.ITEM.ENHANCING,
            buff: 'canSwim',
            value: true
        },
        MOON_PEARL: {
            type: types.ITEM.ENHANCING,
            buff: 'canRetainShape',
            value: true
        },
        SHIELD_FIGHTER: {
            type: types.ITEM.ENHANCING,
            buff: 'canBlock',
            value: true
        },
        SHIELD_FIRE: {
            type: types.ITEM.ENHANCING,
            buff: 'canBlockFire',
            value: true
        },
        SHIELD_MIRROR: {
            type: types.ITEM.ENHANCING,
            buff: 'canReflect',
            value: true
        },
        MAIL_GREEN: {
            type: types.ITEM.ENHANCING,
            buff: 'damageReduction',
            value: 1
        },
        MAIL_BLUE: {
            type: types.ITEM.ENHANCING,
            buff: 'damageReduction',
            value: 0.5
        },
        MAIL_RED: {
            type: types.ITEM.ENHANCING,
            buff: 'damageReduction',
            value: 0.25
        },
        /////////////////////////////////////////////////////////
        // Gatherable Items
        ///////////////////
        //Then items increase inventory for whatever they pickup
        /////////////////////////////////////////////////////////
        HEART_PIECE: {
            type: types.ITEM.GATHERABLE,
            item: 'heart_pieces',
            count: 1
        },
        MAGIC_JAR_SMALL: {
            type: types.ITEM.REFRESHING,
            refresh: 10
        },
        MAGIC_JAR_LARGE: {
            type: types.ITEM.REFRESHING,
            refresh: 25
        },
        RUPEE_GREEN: {
            type: types.ITEM.GATHERABLE,
            item: 'rupees',
            count: 1
        },
        RUPEE_BLUE: {
            type: types.ITEM.GATHERABLE,
            item: 'rupees',
            count: 5
        },
        RUPEE_RED: {
            type: types.ITEM.GATHERABLE,
            item: 'rupees',
            count: 20
        },
        BOMB_PIECE: { //bomb on the ground that you can gather, little different then placed bomb that is exploding
            type: types.ITEM.GATHERABLE,
            item: 'bombs',
            count: 1
        },
        ARROW: {
            type: types.ITEM.GATHERABLE,
            item: 'arrows',
            count: 1
        },
        /////////////////////////////////////////////////////////
        // Quest Items
        ///////////////////
        //The items don't "do" anything, just for funzies
        /////////////////////////////////////////////////////////
        PENDANT_OF_COURAGE: { //the green one
            type: types.ITEM.QUEST
        },
        PENDANT_OF_POWER: { //the blue one
            type: types.ITEM.QUEST
        },
        PENDANT_OF_WISDOM: { //the red one
            type: types.ITEM.QUEST
        },
        MAIDEN_CRYSTAL: {
            type: types.ITEM.QUEST,
            item: 'crystals',
            count: 1
        },
        /////////////////////////////////////////////////////////
        // Dungeon Items
        ///////////////////
        //Not sure how I want to handle these yet, so I will just put them here
        /////////////////////////////////////////////////////////
        DUNGEON_MAP: {
            type: types.ITEM.ENHANCING,
            buff: 'hasDungeonMap',
            value: true,
            dungeonOnly: true
        },
        COMPASS: {
            type: types.ITEM.ENHANCING,
            buff: 'hasDungeonCompass',
            value: true,
            dungeonOnly: true
        },
        BIG_KEY: {
            type: types.ITEM.ENHANCING,
            buff: 'hasDungeonBigKey',
            value: true,
            dungeonOnly: true
        },
        KEY: {
            type: types.ITEM.GATHERABLE,
            item: 'keys',
            count: 1
        },
        HEART_CONTAINER: {
            type: types.ITEM.GATHERABLE,
            item: 'hearts',
            count: 1
        }
    };
});