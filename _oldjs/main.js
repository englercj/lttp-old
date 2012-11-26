var resources = [
    {
        name: 'lightworld_world',
        type: 'world',
        src: '/assets/worlds/lightworld/lightworld.json'
    },
    {
        name: 'link_sprite',
        type: 'texture',
        src: '/assets/characters/link/zelda.png'
    }
];

gf.debug.showFps = true;
gf.debug.showOutline = true;
gf.debug.showHitbox = true;

$(function() {
    //initialize the renderer
    gf.game.init('game');

    //load resources
    gf.loader.load(resources, {
        error: onResourcesError,
        complete: onResourcesLoaded
    });
});

function onResourcesLoaded(resources) {
    //initialize map and add to scene
    var map = new gf.Tilemap(gf.resources.lightworld_world.data);
    gf.game.addObject(map);

    //bind the keymap
    gf.controls.bindKey(gf.types.KEY.W, 'moveup');
    gf.controls.bindKey(gf.types.KEY.A, 'moveleft');
    gf.controls.bindKey(gf.types.KEY.S, 'movedown');
    gf.controls.bindKey(gf.types.KEY.D, 'moveright');

    //initialize link and add to scene
    var Link = gf.Sprite.extend({
        init: function(pos, settings) {
            this._super(pos, settings);
        },
        update: function(delta) {
            //check if the player is moving, and update the velocity
            this.checkMovement(delta);
     
            //update player movement
            this.moveEntity();

            //check for collisions with other entities
            /*var collider = gf.game.checkCollision(this);
         
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
                this._super(delta);
            }*/
        },
        checkMovement: function(delta) {
            if(gf.controls.isActionActive('moveleft')) {
                this.velocity.x = -this.maxVelocity.x;//this.accel.x * delta;
            } else if(gf.controls.isActionActive('moveright')) {
                this.velocity.x = this.maxVelocity.x;//this.accel.x * delta;
            } else {
                this.velocity.x = 0;
            }

            if(gf.controls.isActionActive('movedown')) {
                this.velocity.y = -this.maxVelocity.y;//this.accel.y * delta;
            } else if(gf.controls.isActionActive('moveup')) {
                this.velocity.y = this.maxVelocity.y;//this.accel.y * delta;
            } else {
                this.velocity.y = 0;
            }
        }
    });

    var link = new Link([0, 0], {
        scale: 1,
        zindex: 5,
        texture: gf.resources.link_sprite.data,
        size: [64, 64],
        offset: [0, 0],
        hitSize: [16, 24],
        hitOffset: [0, -5],
        maxVelocity: [5, 5],
        type: gf.types.ENTITY.PLAYER
    });
    gf.game.addObject(link);

    //setup controls for the character


    //start render loop
    gf.game.render();
}

function onResourcesError() {
    console.log(arguments);
}