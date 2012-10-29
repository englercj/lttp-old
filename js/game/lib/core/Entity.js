define([
    'game/lib/bases/Sprite',
    'game/data/types'
], function(Sprite, types) {
    var Entity = Sprite.extend({
        init: function(options, texture, engine) {
            this.engine = engine;
            //this.controls = controls;
            //this.map = map;
            //this.viewport = viewport;

            this.type = options.type;
            this.name = options.name;
            this.moveSpeed = options.moveSpeed || 200;
            this.health = options.health || 3;

            this.items = options.items || [];
            this.loot = options.loot || [];

            this.blocked = { x: false, y: false };
            this.blocker = { x: null, y: null };

            this.debug = true;
            this.debuggers = [];

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
            if(this.engine.controls.moving.up) y -= speed;
            if(this.engine.controls.moving.down) y += speed;

            if(this.engine.controls.moving.left) x += speed;
            if(this.engine.controls.moving.right) x -= speed;

            this._doCollisionCheck(x, y);

            if(x || y) this.moveEntity(x, y);

            //animation updates
            this.animate(delta);
        },
        moveEntity: function(x, y) {
            var newX = this._mesh.position.x + x,
                newY = this._mesh.position.y + y;
            
            if(!this.blocked.x) this._mesh.translateX(x);
            if(!this.blocked.y) this._mesh.translateY(y);
        },
        //the map collision checks if we were to move by X, Y units, would we collide with
        //a map element. This check is neccessary since most elements on the map are not
        //entities (walls, hills, jump downs, fences, trees, etc.) so normal entity collisions
        //won't detect these hits. Entities are only created for interactive elements of the map.
        _doMapCollisionCheck: function(x, y) {
            //if we moved the map by x,y would we collide with something?
            //if yes, set "this.blocked[axis] = true" and set the "this.blocker[axis] = tile";

            var offX = this.engine.map.offset.x - (x / this.engine.map.tileScale), //new X offset of map
                tilesX = this.engine.viewport.width / this.engine.map.tileScale / this.engine.map.tileSize, //number of tiles accross X of viewport
                pxX = tilesX + offX, //location of tile to check
                texX = pxX / this.engine.map.tileScale,//pixel in tilemap
                texXd = texX - Math.floor(texX), //decimal of the texture pixel (for getting the subtile)

                offY = this.engine.map.offset.y - (y / this.engine.map.tileScale),
                tilesY = this.engine.viewport.height / this.engine.map.tileScale / this.engine.map.tileSize,
                pxY = tilesY + offY,
                texY = this.engine.map.tilemap.image.height - (pxY / this.engine.map.tileScale),
                texYd = texY - Math.floor(texY),

                pixel = this.engine.map.getPixel('tilemap', Math.floor(texX), Math.floor(texY)),
                colliders = [];


            //texX decimal < 0.5 == left side of tile, > 0.5 == right side of tile
            //texY decimal < 0.5 == top side of tile, > 0.5 == bottom side of tile
            //
            //subtiles are a 1 byte value where 2 bits are for each subtile in the
            //order lefttop, righttop, leftbottom, rightbottom
            //to get righttop: ((pixel.a >> 4) & 3)

            var shift = 0,
                flag = 3; //binary "11" to "and" off the 2 least significant bits

            if(texXd < 0.5) shift = [2, 6]; //shift for lefts (leftbottom, lefttop)
            else shift = [0, 4]; //shifts for rights (rightbottom, righttop)

            if(texYd < 0.5) shift = shift[1]; //shift for top (second element)
            else shift = shift[0]; //shift for bottom (first element)

            var value = ((pixel.b >> shift) & flag);

            //TODO: Make everything empty, since everything is blocking right now
            value = ~value;

            //if this is a blocking subtile
            this.blocked.x = this.blocked.y = false;
            this.blocker.x = this.blocker.y = null;
            if(value == types.SUBTILE.BLOCK) {
                //if we are moving in X, block X
                if(x) {
                    this.blocked.x = true;
                    this.blocker.x = {
                        pixel: pixel,
                        tilemapLoc: new THREE.Vector2(texX, texY)
                    };
                }

                //if we are moving in Y, block Y
                if(y) {
                    this.blocked.y = true;
                    this.blocker.y = {
                        pixel: pixel,
                        tilemapLoc: new THREE.Vector2(texX, texY)
                    };
                }
            }

            if(this.debug) {
                for(var i = 0, il = this.debuggers.length; ++i) {
                    if(this.debuggers[i])
                        this.engine.destroyMesh(this.debuggers[i]);
                }

                this.debuggers.length = 0;

                if(this.blocked.x) {
                    if(x < 0) { //moving left

                    } else { //moving right

                    }
                }

                if(this.blocked.y) {
                    if(y < 0) { //moving up

                    } else { //moving down

                    }
                }
            }
        }
    });

    return Entity;
});