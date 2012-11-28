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

    //Link Player sprite
    entities.Link = entities.Sprite.extend({
        init: function(pos, settings) {
            this._super(pos, settings);

            gf.game.cameraTrack(this);
        },
        update: function() {
            //check if the player is moving, and update the velocity
            this.checkMovement();
     
            //update player movement
            this.moveEntity();

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
     
            //update animation if necessary
            if(this.velocity.x != 0 || this.velocity.y != 0) {
                this._super();
            }
        },
        checkMovement: function() {
            if(gf.controls.isActionActive('moveleft')) {
                this.velocity.x = -this.accel.x * gf.game._delta;
            } else if(gf.controls.isActionActive('moveright')) {
                this.velocity.x = this.accel.x * gf.game._delta;
            } else {
                this.velocity.x = 0;
            }

            if(gf.controls.isActionActive('movedown')) {
                this.velocity.y = -this.accel.y * gf.game._delta;
            } else if(gf.controls.isActionActive('moveup')) {
                this.velocity.y = this.accel.y * gf.game._delta;
            } else {
                this.velocity.y = 0;
            }
        }
    });

    return entities;
});
