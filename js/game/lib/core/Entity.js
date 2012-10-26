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
        //check if we were to move to X, Y would we collide?
        _doCollisionCheck: function(x, y) {
            //if we moved the map by x,y would we collide with something?
            //if yes, set this.blocked[axis] = true and set the this.blocker[axis] = tile;

            var offX = this.map.offset.x - (x / this.map.tileScale), //new X offset of map
                tilesX = this.viewport.width / this.map.tileScale / this.map.tileSize, //number of tiles accross X of viewport
                pxX = tilesX + offX, //location of tile to check
                texX = pxX / this.map.tileScale,//pixel in tilemap
                texXd = texX - Math.floor(texX), //decimal of the texture pixel (for getting the subtile)

                offY = this.map.offset.y - (y / this.map.tileScale),
                tilesY = this.viewport.height / this.map.tileScale / this.map.tileSize,
                pxY = tilesY + offY,
                texY = this.map.tilemap.image.height - (pxY / this.map.tileScale),
                texYd = texY - Math.floor(texY),

                pixel = this.map.getPixel('tilemap', Math.floor(texX), Math.floor(texY)),
                colliders = [];


            //texX decimal < 0.5 == left side of tile, > 0.5 == right side of tile
            //texY decimal < 0.5 == top side of tile, > 0.5 == bottom side of tile
            //
            //subtiles are a 1 byte value where 2 bits are for each subtile in the
            //order lefttop, righttop, leftbottom, rightbottom
            //to get righttop: ((pixel.a >> 4) & 3)

            var shift = 0,
                flag = 3; //binary "11" to and off the 2 lowest bits

            if(texXd < 0.5) shift = [2, 6]; //shift for lefts
            else shift = [0, 4]; //shifts for rights

            if(texYd < 0.5) shift = shift[1]; //shift for top
            else shift = shift[0]; //shift for bottom

            var value = ((pixel.a >> shift) & flag);

            //TODO: Make everything empty, since everything is blocking right now
            value = ~value;

            if(value == types.SUBTILE.BLOCK) {
                if(x) {
                    this.blocked.x = true;
                    this.blocker.x = {
                        pixel: pixel,
                        location: new THREE.Vector2(texX, texY)
                    };
                }

                if(y) {
                    this.blocked.y = true;
                    this.blocker.y = {
                        pixel: pixel,
                        location: new THREE.Vector2(texX, texY)
                    };
                }
            }

            //console.log('(', texX, ',', texY, ')', pixel);
        }
    });

    return Entity;
});