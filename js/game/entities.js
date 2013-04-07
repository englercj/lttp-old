define([
    'game/data/types'
], function(types) {
    var Sprite = function(pos, settings) {
        //can be lifted by another entity
        this.liftable = false;

        //can be effected by bombs
        this.explodable = true;

        //is cutable by a sword
        this.cutable = false;

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

        //size
        settings.size = [16, 22];

        Sprite.call(this, pos, settings);

        //bind the keyboard
        gf.controls.bindKey(gf.types.KEY.W, 'move_up', this.onMove.bind(this, 'up'));
        gf.controls.bindKey(gf.types.KEY.A, 'move_left', this.onMove.bind(this, 'left'));
        gf.controls.bindKey(gf.types.KEY.S, 'move_down', this.onMove.bind(this, 'down'));
        gf.controls.bindKey(gf.types.KEY.D, 'move_right', this.onMove.bind(this, 'right'));

        gf.controls.bindKey(gf.types.KEY.E, 'use_item', this.onUseItem.bind(this));
        gf.controls.bindKey(gf.types.KEY.K, 'attack', this.onAttack.bind(this));

        //bind the gamepad
        gf.controls.bindGamepadStick(gf.types.GP_AXES.LEFT_ANALOGUE_HOR, true, 'move_left', this.onMove.bind(this, 'left'));
        gf.controls.bindGamepadStick(gf.types.GP_AXES.LEFT_ANALOGUE_HOR, false, 'move_right', this.onMove.bind(this, 'right'));
        gf.controls.bindGamepadStick(gf.types.GP_AXES.LEFT_ANALOGUE_VERT, true, 'move_up', this.onMove.bind(this, 'up'));
        gf.controls.bindGamepadStick(gf.types.GP_AXES.LEFT_ANALOGUE_VERT, false, 'move_down', this.onMove.bind(this, 'down'));

        gf.controls.bindGamepadButton(gf.types.GP_BUTTONS.FACE_1, 'use_item', this.onUseItem.bind(this));
        gf.controls.bindGamepadButton(gf.types.GP_BUTTONS.FACE_2, 'attack', this.onAttack.bind(this));

        //add our animations
        this.addAnimation('walk_left', [
            'walk_left/walk_left_1.png',
            'walk_left/walk_left_2.png',
            'walk_left/walk_left_3.png',
            'walk_left/walk_left_4.png',
            'walk_left/walk_left_5.png',
            'walk_left/walk_left_6.png',
            'walk_left/walk_left_7.png',
            'walk_left/walk_left_8.png'
        ], 0.23);
        this.addAnimation('walk_right', [
            'walk_right/walk_right_1.png',
            'walk_right/walk_right_2.png',
            'walk_right/walk_right_3.png',
            'walk_right/walk_right_4.png',
            'walk_right/walk_right_5.png',
            'walk_right/walk_right_6.png',
            'walk_right/walk_right_7.png',
            'walk_right/walk_right_8.png'
        ], 0.23);
        this.addAnimation('walk_down', [
            'walk_down/walk_down_1.png',
            'walk_down/walk_down_2.png',
            'walk_down/walk_down_3.png',
            'walk_down/walk_down_4.png',
            'walk_down/walk_down_5.png',
            'walk_down/walk_down_6.png',
            'walk_down/walk_down_7.png',
            'walk_down/walk_down_8.png'
        ], 0.23);
        this.addAnimation('walk_up', [
            'walk_up/walk_up_1.png',
            'walk_up/walk_up_2.png',
            'walk_up/walk_up_3.png',
            'walk_up/walk_up_4.png',
            'walk_up/walk_up_5.png',
            'walk_up/walk_up_6.png',
            'walk_up/walk_up_7.png',
            'walk_up/walk_up_8.png'
        ], 0.23);
        this.addAnimation('idle_left', 'idle_left/idle_left_1.png');
        this.addAnimation('idle_right', 'idle_right/idle_right_1.png');
        this.addAnimation('idle_down', 'idle_down/idle_down_1.png');
        this.addAnimation('idle_up', 'idle_up/idle_up_1.png');
        this.setActiveAnimation('idle_down');

        //make the camera track this entity
        gf.game.cameraTrack(this);
    };

    gf.inherits(Link, Sprite, {
        onMove: function(dir, action, kpress) {
            if(kpress) {
                this.setActiveAnimation('walk_' + dir);
            } else {
                this.setActiveAnimation('idle_' + dir);
            }
        },/*
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
        },*/
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
