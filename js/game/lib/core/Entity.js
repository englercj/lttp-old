define([
    'game/lib/bases/Sprite'
], function(Sprite) {
    var Entity = Sprite.extend({
        init: function(options, texture, controls, map, viewport) {
            this.controls = controls;
            this.map = map;
            this.viewport = viewport;

            this.type = options.type;
            this.name = options.name;
            this.moveSpeed = options.moveSpeed || 200;
            this.health = options.health || 3;

            this.items = options.items || [];
            this.loot = options.loot || [];

            this.blocked = { x: false, y: false };
            this.blocker = { x: null, y: null };

            options.sprite = options.sprite || { size: [0, 0], area: [1, 1] };

            options.sprite.texture = texture || new THREE.Texture();

            //initialize visual sprite
            this._super(options.sprite);

            //this.setAnimation('idle');
            this.setPosition(0, 0);
        },
        update: function(delta) {
            //calculate actual sprite movement accross the world
            var speed = delta * this.moveSpeed,
                x = 0,
                y = 0;

            //these values are the inverse of the player movement, since because pickles
            if(this.controls.moving.up) y -= speed;
            if(this.controls.moving.down) y += speed;

            if(this.controls.moving.left) x += speed;
            if(this.controls.moving.right) x -= speed;

            if(x || y) this.moveEntity(x, y);

            //animation updates
            this.animate(delta);
        },
        moveEntity: function(x, y) {
            var newX = this._mesh.position.x + x,
                newY = this._mesh.position.y + y;

            this._doCollisionCheck(newX, newY);
            
            if(!this.blocked.x) this._mesh.translateX(x);
            if(!this.blocked.y) this._mesh.translateY(y);
        },
        //check if we were at X, Y would we collide?
        _doCollisionCheck: function(x, y) {
            /*//if we moved to x,y would we collide with something?
            //if yes, set this.blocked[axis] = true and set the this.blocker[axis] = tile;

            var offX = this.map.offset.x - (x / this.map.tileScale), //new map offset X
                tilesX = this.viewport.width / this.map.tileScale, //number of tiles accross X
                locX = width + Math.floor(offX), //location of current offset
                pxX = locX / this.map.tilemap.image.width / this.map.tileSize, //pixel in tilemap

                hieght*/
        }
    });

    return Entity;
});