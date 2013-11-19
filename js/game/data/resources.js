define(['vendor/gf'], function(gf) {
    return {
        /**
         * Items required for the preloader to display
         */
        preload: function(game) {
            game.load.atlas('sprite_rog_font',      'assets/sprites/fonts/retofganon.png',      'assets/sprites/fonts/retofganon.json',     null, gf.ATLAS_FORMAT.JSON_HASH);
        },
        /**
         * Items required for the startup and intro screens
         */
        startup: function(game) {
            // Images
            game.load.image('image_life',           'assets/ui/life.png',                       null, gf.ATLAS_FORMAT.JSON_HASH);

            // Misc Sprites Atlases
            game.load.atlas('sprite_intro',         'assets/sprites/misc/intro.png',            'assets/sprites/misc/intro.json',           null, gf.ATLAS_FORMAT.JSON_HASH);
            game.load.atlas('sprite_select',        'assets/sprites/misc/selectscreen.png',     'assets/sprites/misc/selectscreen.json',    null, gf.ATLAS_FORMAT.JSON_HASH);
            game.load.atlas('sprite_particles',     'assets/sprites/misc/particles.png',        'assets/sprites/misc/particles.json',       null, gf.ATLAS_FORMAT.JSON_HASH);

            // Music
            game.load.audio('music_title', [
                    'assets/audio/music/title.lite.ogg'
                ]
            );
            game.load.audio('music_select', [
                    'assets/audio/music/select_screen.lite.ogg'
                ]
            );
        },
        /**
         * Common items to preload before the game starts,
         * since they are used in many different worlds and areas
         */
        common: function(game) {
            // Misc Sprite Atlases
            game.load.atlas('sprite_link',          'assets/sprites/entities/link.png',         'assets/sprites/entities/link.json',        null, gf.ATLAS_FORMAT.JSON_HASH);
            game.load.atlas('sprite_misc',          'assets/sprites/entities/misc.png',         'assets/sprites/entities/misc.json',        null, gf.ATLAS_FORMAT.JSON_HASH);
            game.load.atlas('sprite_enemies',       'assets/sprites/entities/enemies.png',      'assets/sprites/entities/enemies.json',     null, gf.ATLAS_FORMAT.JSON_HASH);
            game.load.atlas('sprite_smash',         'assets/sprites/misc/smash.png',            'assets/sprites/misc/smash.json',           null, gf.ATLAS_FORMAT.JSON_HASH);
            game.load.atlas('sprite_worlditems',    'assets/sprites/misc/overworlditems.png',   'assets/sprites/misc/overworlditems.json',  null, gf.ATLAS_FORMAT.JSON_HASH);

            // HUD Sprite Atlases
            game.load.atlas('sprite_gui',           'assets/sprites/ui/gui.png',                'assets/sprites/ui/gui.json',               null, gf.ATLAS_FORMAT.JSON_HASH);
            game.load.atlas('sprite_hud_font',      'assets/sprites/fonts/hud.png',             'assets/sprites/fonts/hud.json',            null, gf.ATLAS_FORMAT.JSON_HASH);

            // Sound Effects
            game.load.audio('effect_grass_cut', [
                    'assets/audio/effects/LTTP_Grass_Cut.lite.ogg'
                ]
            );
            game.load.audio('effect_lift', [
                    'assets/audio/effects/LTTP_Link_Pickup.lite.ogg'
                ]
            );
            game.load.audio('effect_throw', [
                    'assets/audio/effects/LTTP_Link_Throw.lite.ogg'
                ]
            );
            game.load.audio('effect_smash', [
                    'assets/audio/effects/LTTP_Shatter.lite.ogg'
                ]
            );
            game.load.audio('effect_sword1', [
                    'assets/audio/effects/LTTP_Sword1.lite.ogg'
                ]
            );
            game.load.audio('effect_sword2', [
                    'assets/audio/effects/LTTP_Sword1.lite.ogg'
                ]
            );
            game.load.audio('effect_menu_select', [
                    'assets/audio/effects/LTTP_Menu_Select.lite.ogg'
                ]
            );
            game.load.audio('effect_menu_select_cursor', [
                    'assets/audio/effects/LTTP_Menu_Cursor.lite.ogg'
                ]
            );
            game.load.audio('effect_menu_select_erase', [
                    'assets/audio/effects/LTTP_Menu_Erase.lite.ogg'
                ]
            );
            game.load.audio('effect_error', [
                    'assets/audio/effects/LTTP_Error.lite.ogg'
                ]
            );
            game.load.audio('effect_lowhp', [
                    'assets/audio/effects/LTTP_LowHealth.lite.ogg'
                ]
            );
            game.load.audio('effect_pause_close', [
                    'assets/audio/effects/LTTP_Pause_Close.lite.ogg'
                ]
            );
            game.load.audio('effect_fall', [
                    'assets/audio/effects/LTTP_Link_Jump.lite.ogg'
                ]
            );

            // Item effects
            game.load.audio('effect_chest', [
                    'assets/audio/effects/LTTP_Chest.lite.ogg'
                ]
            );
            game.load.audio('effect_chest_appear', [
                    'assets/audio/effects/LTTP_Chest_Appears.lite.ogg'
                ]
            );
            game.load.audio('effect_item', [
                    'assets/audio/effects/LTTP_Item.lite.ogg'
                ]
            );
            game.load.audio('effect_item_fanfaire', [
                    'assets/audio/effects/LTTP_ItemFanfare_Stereo.lite.ogg'
                ]
            );
            game.load.audio('effect_rupee1', [
                    'assets/audio/effects/LTTP_Rupee1.lite.ogg'
                ]
            );
            game.load.audio('effect_rupee2', [
                    'assets/audio/effects/LTTP_Rupee2.lite.ogg'
                ]
            );
        },
        /**
         * Items to load that are only used in the lightworld
         */
        world_lightworld: function(game) {
            // Tilemap
            game.load.tilemap('world_lightworld',   'assets/worlds/lightworld/lightworld.json', null, gf.FILE_FORMAT.JSON);

            // Overlay sprite atlases
            //game.load.atlas('sprite_overlay',       'assets/sprites/overlays/overlays.png',         'assets/sprites/overlays/overlays.json',        null, gf.ATLAS_FORMAT.JSON_HASH);

            // Music
            game.load.audio('music_lightworld', [
                    'assets/audio/music/overworld.lite.ogg'
                ]
            );
            game.load.audio('music_village', [
                    'assets/audio/music/kakariko_village.lite.ogg'
                ]
            );
        },
        /**
         * Items to load that are only used in the darkworld
         */
        world_darkworld: function(game) {
            // Tilemap
            game.load.tilemap('world_lightworld',   'assets/worlds/lightworld/lightworld.json', null, gf.FILE_FORMAT.JSON);

            // Music
            game.load.audio('music_darkworld', [
                    'assets/audio/music/dark_world.lite.ogg'
                ]
            );
        },
        /**
         * Items to load that are only used in link's house
         */
        world_linkshouse: function(game) {
            // Tilemap
            game.load.tilemap('world_linkshouse',   'assets/worlds/linkshouse/linkshouse.json', null, gf.FILE_FORMAT.JSON);

            game.load.audio('music_village', [
                    'assets/audio/music/kakariko_village.lite.ogg'
                ]
            );
        },
        /**
         * Cave 034: Hyrule Castle Secret Entrance
         */
        cave_034: function(game) {
            game.load.tilemap('cave_034',           'assets/worlds/cave_034/cave_034.json',     null, gf.FILE_FORMAT.JSON);
        }
    };
});