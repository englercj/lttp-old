define([
], function() {
    var entities = {};

    //Extend the core Entity object with some Zelda specific stuffs
    entities.Sprite = gf.Sprite.extend({
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

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(pos, settings);
        }
    });

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
            if(gf.controls.isActionActive('move_left'))
                this.velocity.x = -this.accel.x * gf.game._delta;
            else if(gf.controls.isActionActive('move_right'))
                this.velocity.x = this.accel.x * gf.game._delta;
            else
                this.velocity.x = 0;

            if(gf.controls.isActionActive('move_down'))
                this.velocity.y = -this.accel.y * gf.game._delta;
            else if(gf.controls.isActionActive('move_up'))
                this.velocity.y = this.accel.y * gf.game._delta;
            else
                this.velocity.y = 0;

            //if not moving, there is a currentAnimation, and the currentAnimation isn't an idle one
            if(this.velocity.isZero() && this.currentAnim && this.currentAnim.name.indexOf('idle') === -1)
                this.setActiveAnimation(this.currentAnim.name + '_idle');
        },
        onMove: function(vel) {
            this._super(vel);

            if(vel.y > 0) {
                if(!this.isActiveAnimation('move_up'))
                    this.setActiveAnimation('move_up');
            }
            else if(vel.y < 0) {
                if(!this.isActiveAnimation('move_down'))
                    this.setActiveAnimation('move_down');
            }
            else if(vel.x > 0) {
                if(!this.isActiveAnimation('move_right'))
                    this.setActiveAnimation('move_right');
            }
            else if(vel.x < 0) {
                if(!this.isActiveAnimation('move_left'))
                    this.setActiveAnimation('move_left');
            }
        }
    }));

    return entities;
});
