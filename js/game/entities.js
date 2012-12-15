define([
    'game/data/types'
], function(types) {
    var entities = {
        Sprite: gf.Sprite.extend({
            init: function(pos, settings) {
                /****************************************************************************
                 * Properties that are defined in the `settings` object,
                 * these can be specified in the properties of the object layer
                 * in Tiled, and overriden on a per-object basis
                 ****************************************************************************/
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

                /****************************************************************************
                 * Call base constructor
                 ****************************************************************************/
                this._super(pos, settings);
            }
        })
    };

    //Base enemy object
    entities.Enemy = gf.entityPool.add('enemy', entities.Sprite.extend({
        init: function(pos, settings) {
            settings = settings || {};

            //enemy type
            settings.type = gf.types.ENTITY.ENEMY;

            //set the index of enemies
            settings.zIndex = 10;

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(pos, settings);
        }
    }));

    //Link Player sprite
    entities.Link = gf.entityPool.add('link', entities.Sprite.extend({
        init: function(pos, settings) {
            settings = settings || {};

            //player type
            settings.type = gf.types.ENTITY.PLAYER;

            //set name of Link
            settings.name = 'link';

            //set the zindex of the player
            settings.zIndex = 10;

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(pos, settings);

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

            //make the camera track this entity
            gf.game.cameraTrack(this);
        },
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
            if(this.velocity.isZero() && this.currentAnim && this.currentAnim.name.indexOf('idle') === -1)
                this.setActiveAnimation(this.currentAnim.name + '_idle');
        },
        //use equipted item
        onUseItem: function() {},
        //when attack key is pressed
        onAttack: function() {}
    }));

    return entities;
});
