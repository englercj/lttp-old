define([
    'game/lib/bases/Sprite',
    'game/data/types'
], function(Sprite, types) {
    var Entity = Sprite.extend({
        init: function(resource, engine) {
            this.engine = engine;
            //this.controls = controls;
            //this.map = map;
            //this.viewport = viewport;

            this.type = resource.data.type;
            this.name = resource.data.name;
            this.moveSpeed = resource.data.moveSpeed || 200;
            this.maxHealth = resource.data.maxHealth || 3;
            this.health = resource.data.health || 3;

            this.items = resource.data.items || [];
            this.loot = resource.data.loot || [];

            this.sounds = resource.data.sounds || {};

            this.blocked = { x: false, y: false };
            this.blocker = { x: null, y: null };

            this.ray = new THREE.Ray();

            resource.data.sprite = resource.data.sprite || { size: [0, 0], area: [1, 1] };

            resource.data.sprite.texture = resource.texture || new THREE.Texture();

            //initialize visual sprite
            this._super(resource.data.sprite);

            //this.setAnimation('idle');
            this.setPosition(resource.data.location[0], resource.data.location[1]);
        },
        update: function(delta) {
            //animation updates
            this.animate(delta);

            if(this.freeze) return;

            //calculate actual sprite movement accross the world
            var speed = delta * this.moveSpeed,
                x = 0,
                y = 0;

            //clamp speed to fix issues with collision calculations when framerate gets low
            if(speed > 0) speed = Math.min(speed, 10);
            else if(speed < 0) speed = Math.max(speed, -10);

            //these values are the inverse of the player movement, since because pickles
            if(this.engine.controls.moving.up) y -= speed;
            if(this.engine.controls.moving.down) y += speed;

            if(this.engine.controls.moving.left) x += speed;
            if(this.engine.controls.moving.right) x -= speed;

            this._doMapCollisionCheck(x, y);

            if(x || y) this.moveEntity(x, y);
        },
        moveEntity: function(x, y) {
            if(!this.blocked.x) this._mesh.translateX(x);
            if(!this.blocked.y) this._mesh.translateY(y);
        },
        die: function() {
            console.log('ENTITY DIED!', this);
            var self = this;

            //remove weapon, do death animation/sounds, drop loot, and destroy
            this.weapon = null;
            this.engine.ui.playSound(this.sounds.death);
            this.setAnimation('death');

            this.once('animDone', function() {
                self.dropLoot();
                self.engine.destroyEntity(self);
            });
        },
        damage: function(dmg, knockback, dir) {
            this.health -= dmg;

            if(this.health <= 0) {
                //death of entity
                this.die();
            } else {
                var self = this;

                //free movement for the duration of damage animation
                this.freeze = true;
                this.engine.ui.playSound(this.sounds.damage);
                this.setAnimation('damage' + dir);

                this.once('animDone', function() {
                    this.freeze = false;
                    this.setAnimation('idle' + dir);
                });

                //do knockback effect
                if(knockback) {
                    var x = 0, y = 0;

                    if(dir == 'up') y -= knockback;
                    if(dir == 'down') y += knockback;

                    if(dir == 'left') x += knockback;
                    if(dir == 'right') x -= knockback;

                    this.moveEntity(x, y);
                }
            }
        },
        _doEntityCollisionCheck: function() {
            var origin = this._mesh.position.clone();

            //loop through each vertex of the mesh's geometry
            for(var v = 0, vl = this._mesh.geometry.vertices.length; v < vl; ++v) {
                //some calculations for each vertex
                var localV = this._mesh.geometry.vertices[v].clone(),
                    globalV = this._mesh.matrix.multiplyVector3(localV),
                    directionV = globalV.subSelf(this._mesh.position),
                    collisions = [];

                this.ray.set(origin, directionV);

                //check for a collision for each entity
                for(var e = 0, el = this.engine.entities.length; e < el; ++e) {
                    var entity = this.engine.entities[e],
                        hits = this.ray.intersectObject(entity._mesh);

                    /*for(var i = 0, il = hits.length; i < il; ++i) {
                        hits[i].entity = entity;
                        collisions.push(hits[i]);
                    }*/

                    //for now we only care about the first hit on this object
                    //that is only one per entity
                    if(hits.length) {
                        hits[0].entity = entity;
                        hits[0].direction = 'left'; //this needs to be based on directionV
                        collisions.push(hits[0]);
                    }
                }

                //sort the collisions
                collisions.sort(function(a, b) {
                    return a.distance - b.distance;
                });

                //if any collisions
                if(collisions.length > 0 && collisions[0].distance < directionV.length()) {
                    for(var c = 0, cl = collisions.length; c < cl; ++c) {
                        var hit = collisions[c];

                        //check if this entity should take damage
                        if(hit.entity.weapon) 
                            this.damage(hit.entity.weapon.damage, hit.entity.weapon.knockback, hit.direction);
                    }
                }
            }
        },
        //the map collision checks if we were to move by X, Y units, would we collide with
        //a map element. This check is neccessary since most elements on the map are not
        //entities (walls, hills, jump downs, fences, trees, etc.) so normal entity collisions
        //won't detect these hits. Entities are only created for interactive elements of the map.
        _doMapCollisionCheck: function(x, y) {
            if(!x && !y) return;

            //if we moved the map by x,y would we collide with something?
            //if yes, set "this.blocked[axis] = true" and set the "this.blocker[axis] = tile";

            var mesh = this._mesh.clone();

            mesh.translateX(x);
            mesh.translateY(y);

            var vpSize = this.engine.map._uniforms.viewportSize.value.clone().divideScalar(this.engine.map.tileSize).divideScalar(2), //half the number of tiles in viewport
                pos = mesh.position, //mesh tiles offset
                off = this.engine.map.offset.clone().divideScalar(this.engine.map.tileSize), //map tiles offset
                loc = new THREE.Vector2(); //map tiles offset

            //position is really the "origin" of the entity, it is the center point.
            //checking the origin when moving up is perfect, but when moving down we
            //need to check at the entity's feet; not the center point. To achieve this
            //we give an offset of (entity height / 2).
            if(y > 0)
                pos.y += (this.size.y / 4); //bias of 10 to make it look good

            //in the same manner as above we want the x checks to always be on the sides
            if(pos.x < 0)
                pos.x += (this.size.x / 2);
            else if(pos.x > 0)
                pos.x -= 3 * (this.size.x / 4);

            //do some division to make position be in "number of tiles" instead of "pixels from center"
            pos.divideScalar(this.engine.map.tileScale).divideScalar(this.engine.map.tileSize);

            //inverse the Y since offset is counted from the other direction
            pos.y = -pos.y;

            //y needs to be inversed
            //vpSize.y = vpSize.y;

            //pxCoord
            loc.addSelf(off).addSelf(vpSize).addSelf(pos);//.subSelf({ x: 6.25, y: 4.6875 });
            loc.y = this.engine.map.tilemap.image.height - loc.y; //this value is from bottom-left, but we need top-left offset

            //need to get decimals off to test which part of the tile
            //we are on
            var texX = loc.x,
                texY = loc.y,
                texXd = texX - Math.floor(texX),
                texYd = texY - Math.floor(texY);

            //these calculations are the tiniest bit off, so do some manual rounding
            if(texXd > 0.8) { texX++; texXd = 0; }
            if(texYd > 0.8) { texY++; texYd = 0; }

            var pixel = this.engine.map.getPixel('tilemap', Math.floor(texX), Math.floor(texY)),
                colliders = [];

            //console.log(x, y, loc);
            //console.log(pixel);

            this.blocked.x = this.blocked.y = false;
            this.blocker.x = this.blocker.y = null;

            if(!pixel.b) {
                //console.log('NO BLUE!', x, texX, texXd, pixel);
                return;
            }

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
            //value = ~value;

            //if this is a blocking subtile
            if(value == types.SUBTILE.BLOCK) {
                //if we are moving in X, block X
                if(x) {
                    console.log(x, loc, pixel);
                    this.blocked.x = true;
                    this.blocker.x = {
                        pixel: pixel,
                        tilemapLoc: loc
                    };
                } //else console.log('NOT BLOCKING X!', x, loc, pixel);

                //if we are moving in Y, block Y
                if(y) {
                    console.log(y, loc, pixel);
                    this.blocked.y = true;
                    this.blocker.y = {
                        pixel: pixel,
                        tilemapLoc: loc
                    };
                } //else console.log('NOT BLOCKING Y!', y, loc, pixel);
            }
            //if this is a jumpdown tile
            else if(value == types.SUBTILE.JUMPDOWN && this.movePlayer) {
                //do jumpdown
                //this.freeze = true;
                this.engine.ui.playSound(this.sounds.jumpdown);
                //this.setAnimation('jumpdown');
                this.movePlayer(0, 200); //47 is the size of a cliff

                /*this.once('animDone', function() {
                    this.freeze = false;
                    this.setAnimation('idle' + dir);
                });*/
            }
        }
    });

    return Entity;
});