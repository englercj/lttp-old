define([
    'game/data/types'
], function(types) {
    var Sprite = function(pos, settings) {
        //can be lifted by another entity
        this.isLiftable = false;

        //can be effected by bombs
        this.isExplodable = true;

        //is cutable by a sword
        this.isCutable = false;

        //is this sprite attacking?
        this.attacking = false;

        //will break the sprint of an entity that hits this one
        this.breakSprint = false;

        //maximum health of this entity
        this.maxHealth = 3;

        //current health of this entity
        this.health = 3;

        //current inventory of the entity
        this.inventory = {};

        //loot of the entity that is dropped when it dies
        this.loot = [];

        gf.Entity.call(this, pos, settings);
    };

    gf.inherits(Sprite, gf.Entity);

    var Enemy = function(pos, settings) {
        settings = settings || {};

        //enemy type
        settings.type = gf.types.ENTITY.ENEMY;

        //set the index of enemies
        settings.zIndex = 10;

        Sprite.call(this, pos, settings);
    };

    gf.inherits(Enemy, Sprite);

    gf.entityPool.add('enemy', Enemy);

    var Link = function(pos, settings) {
        settings = settings || {};

        //player type
        settings.type = gf.types.ENTITY.PLAYER;

        //set name of Link
        settings.name = 'link';

        //set the zindex of the player
        settings.zIndex = 10;

        //set default scale
        settings.scale = 2;

        //size
        settings.size = [64, 64];

        //hitSize
        settings.hitSize = [12, 12];

        //hitOffset
        settings.hitOffset = [0, -10];

        Sprite.call(this, pos, settings);

        //bind the keyboard
        gf.controls.bindKey(gf.types.KEY.W, 'move_up');
        gf.controls.bindKey(gf.types.KEY.A, 'move_left');
        gf.controls.bindKey(gf.types.KEY.S, 'move_down');
        gf.controls.bindKey(gf.types.KEY.D, 'move_right');

        gf.controls.bindKey(gf.types.KEY.E, 'use_item', this.onUseItem.bind(this));
        gf.controls.bindKey(gf.types.KEY.K, 'attack', this.onAttack.bind(this));

        //bind the gamepad
        gf.controls.bindGamepadStick(gf.types.GP_AXES.LEFT_ANALOGUE_HOR, true, 'move_left');
        gf.controls.bindGamepadStick(gf.types.GP_AXES.LEFT_ANALOGUE_HOR, false, 'move_right');
        gf.controls.bindGamepadStick(gf.types.GP_AXES.LEFT_ANALOGUE_VERT, true, 'move_up');
        gf.controls.bindGamepadStick(gf.types.GP_AXES.LEFT_ANALOGUE_VERT, false, 'move_down');

        gf.controls.bindGamepadButton(gf.types.GP_BUTTONS.FACE_1, 'use_item', this.onUseItem.bind(this));
        gf.controls.bindGamepadButton(gf.types.GP_BUTTONS.FACE_2, 'attack', this.onAttack.bind(this));

        //add our animations
        this.addAnimation('move_right', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7],
            duration: 500,
            loop: true
        });
        this.addAnimation('move_left', {
            frames: [12, 13, 14, 15, 16, 17, 18, 19],
            duration: 500,
            loop: true
        });
        this.addAnimation('move_down', {
            frames: [24, 25, 26, 27, 28, 29, 30, 31],
            duration: 500,
            loop: true
        });
        this.addAnimation('move_up', {
            frames: [36, 37, 38, 39, 40, 41, 42, 43],
            duration: 500,
            loop: true
        });
        this.addAnimation('move_right_idle', [0]);
        this.addAnimation('move_left_idle', [12]);
        this.addAnimation('move_down_idle', [24]);
        this.addAnimation('move_up_idle', [36]);
        this.setActiveAnimation('move_down_idle');

        //make the camera track this entity
        gf.game.cameraTrack(this);
    };

    gf.inherits(Link, Sprite, {
        update: function() {
            //check if the player is moving, and update the velocity
            this.checkMovement();
     
            //update player movement
            this.updateMovement();

            //check for collisions with other entities
            var collider = gf.game.checkCollisions(this);
         
            if(collider) {
                //if we collide with an enemy
                if(collider.type == gf.types.ENTITY.ENEMY) {
                    //TODO: take damage, and do damage animation
                    // let's flicker in case we touched an enemy
                    this.flicker(45);
                }
            }

            this._super();
        },
        checkMovement: function() {
            if(gf.controls.isActionActive('move_left')) {
                this.velocity.x = -this.accel.x * gf.game._delta;
            }
            else if(gf.controls.isActionActive('move_right')) {
                this.velocity.x = this.accel.x * gf.game._delta;
            }
            else {
                this.velocity.x = 0;
            }

            if(gf.controls.isActionActive('move_down')) {
                this.velocity.y = -this.accel.y * gf.game._delta;
            }
            else if(gf.controls.isActionActive('move_up')) {
                this.velocity.y = this.accel.y * gf.game._delta;
            }
            else {
                this.velocity.y = 0;
            }

            if(gf.controls.isActionActive('move_up')) {
                if(!this.isActiveAnimation('move_up'))
                    this.setActiveAnimation('move_up');
            } else if(gf.controls.isActionActive('move_down')) {
                if(!this.isActiveAnimation('move_down'))
                    this.setActiveAnimation('move_down');
            } else if(gf.controls.isActionActive('move_left')) {
                if(!this.isActiveAnimation('move_left'))
                    this.setActiveAnimation('move_left');
            } else if(gf.controls.isActionActive('move_right')) {
                if(!this.isActiveAnimation('move_right'))
                    this.setActiveAnimation('move_right');
            } 

            //if not moving, there is a currentAnimation, and the currentAnimation isn't an idle one
            if(this.velocity.x === 0 && this.velocity.y === 0 && this.currentAnim && this.currentAnim.name.indexOf('idle') === -1)
                this.setActiveAnimation(this.currentAnim.name + '_idle');
        },
        //use equipted item
        onUseItem: function() {},
        //when attack key is pressed
        onAttack: function() {}
    });

    gf.entityPool.add('link', Link);

    return {
        Sprite: Sprite,
        Enemy: Enemy,
        Link: Link
    };
});
