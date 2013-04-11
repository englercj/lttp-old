define([
    'game/data/types'
], function(types) {
    var Sprite = function(game, pos, settings) {
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

        //speed the ent moves at
        this.speed = 1.5;

        gf.Entity.call(this, game, pos, settings);
    };

    gf.inherits(Sprite, gf.Entity);

    var Enemy = function(game, pos, settings) {
        settings = settings || {};

        //enemy type
        settings.type = gf.Entity.TYPE.ENEMY;

        Sprite.call(this, game, pos, settings);
    };

    gf.inherits(Enemy, Sprite);

    gf.entityPool.add('enemy', Enemy);

    var Link = function(game, pos, settings) {
        settings = settings || {};

        //player type
        settings.type = gf.Entity.TYPE.PLAYER;

        //set name of Link
        settings.name = 'link';

        //size
        settings.size = [16, 22];

        //accelleration = 0
        settings.accel = [0, 0];

        Sprite.call(this, game, pos, settings);

        //bind the keyboard
        this.game.input.keyboard.bind(gf.input.KEY.W, 'walk_up', this.onWalk.bind(this, 'up'));
        this.game.input.keyboard.bind(gf.input.KEY.A, 'walk_left', this.onWalk.bind(this, 'left'));
        this.game.input.keyboard.bind(gf.input.KEY.S, 'walk_down', this.onWalk.bind(this, 'down'));
        this.game.input.keyboard.bind(gf.input.KEY.D, 'walk_right', this.onWalk.bind(this, 'right'));

        this.game.input.keyboard.bind(gf.input.KEY.E, 'use_item', this.onUseItem.bind(this));
        this.game.input.keyboard.bind(gf.input.KEY.K, 'attack', this.onAttack.bind(this));

        //bind the gamepad
        this.game.input.gamepad.bindStick(gf.input.GP_AXIS.LEFT_ANALOGUE_HOR, true, 'walk_left', this.onWalk.bind(this, 'left'));
        this.game.input.gamepad.bindStick(gf.input.GP_AXIS.LEFT_ANALOGUE_HOR, false, 'walk_right', this.onWalk.bind(this, 'right'));
        this.game.input.gamepad.bindStick(gf.input.GP_AXIS.LEFT_ANALOGUE_VERT, true, 'walk_up', this.onWalk.bind(this, 'up'));
        this.game.input.gamepad.bindStick(gf.input.GP_AXIS.LEFT_ANALOGUE_VERT, false, 'walk_down', this.onWalk.bind(this, 'down'));

        this.game.input.gamepad.bindButton(gf.input.GP_BUTTON.FACE_1, 'use_item', this.onUseItem.bind(this));
        this.game.input.gamepad.bindButton(gf.input.GP_BUTTON.FACE_2, 'attack', this.onAttack.bind(this));

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
        window.link = this;
    };

    gf.inherits(Link, Sprite, {
        onWalk: function(dir, action, kpress) {
            var p = (dir === 'left' || dir === 'right' ? 'x' : 'y'),
                amt = (dir === 'right' || dir === 'down' ? this.speed : -this.speed);

            if(kpress) {
                this.setActiveAnimation('walk_' + dir);
                this.velocity[p] = amt;
            } else {
                this.setActiveAnimation('idle_' + dir);
                this.velocity[p] = 0;

                //this fixes an issue if you hold more than one at once and release one
                if(this.game.input.isActionActive('walk_left')) 
                    this.setActiveAnimation('walk_left');
                else if(this.game.input.isActionActive('walk_right'))
                    this.setActiveAnimation('walk_right');
                else if(this.game.input.isActionActive('walk_down'))
                    this.setActiveAnimation('walk_down');
                else if(this.game.input.isActionActive('walk_up'))
                    this.setActiveAnimation('walk_up');
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
            if(gf.controls.isActionActive('walk_left')) {
                this.velocity.x = -this.accel.x * gf.game._delta;
            }
            else if(gf.controls.isActionActive('walk_right')) {
                this.velocity.x = this.accel.x * gf.game._delta;
            }
            else {
                this.velocity.x = 0;
            }

            if(gf.controls.isActionActive('walk_down')) {
                this.velocity.y = -this.accel.y * gf.game._delta;
            }
            else if(gf.controls.isActionActive('walk_up')) {
                this.velocity.y = this.accel.y * gf.game._delta;
            }
            else {
                this.velocity.y = 0;
            }

            if(gf.controls.isActionActive('walk_up')) {
                if(!this.isActiveAnimation('walk_up'))
                    this.setActiveAnimation('walk_up');
            } else if(gf.controls.isActionActive('walk_down')) {
                if(!this.isActiveAnimation('walk_down'))
                    this.setActiveAnimation('walk_down');
            } else if(gf.controls.isActionActive('walk_left')) {
                if(!this.isActiveAnimation('walk_left'))
                    this.setActiveAnimation('walk_left');
            } else if(gf.controls.isActionActive('walk_right')) {
                if(!this.isActiveAnimation('walk_right'))
                    this.setActiveAnimation('walk_right');
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
