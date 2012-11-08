define([
    'game/lib/bases/Sprite',
    'game/data/types',
    'game/lib/utils/util'
], function(Sprite, types, util) {
    var Entity = Sprite.extend({
        init: function(resource, engine) {
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

            this.lastDirection = null;

            this.blocked = { x: false, y: false };
            this.blocker = { x: null, y: null };

            this.moving = {
                up: false, down: false,
                left: false, right: false
            };

            this.ray = new THREE.Ray();

            resource.data.sprite = resource.data.sprite || { size: [0, 0], area: [1, 1] };

            resource.data.sprite.texture = resource.texture || new THREE.Texture();

            //initialize visual sprite
            this._super(resource.data.sprite, engine);

            //this.setAnimation('idle');
            this.setPosition(resource.data.location[0], resource.data.location[1]);

            this.bindEvents();
        },
        bindEvents: function() {
            var self = this;

            //set moving animations
            self.engine.controls.on('move::*', function(dir, startMoving) {
                if(!self.engine.controls.isMoving) {
                    self.setAnimation('idle_' + self.lastDirection);
                    self.setAnimation();
                }
                else {
                    this.moving[dir] = startMoving;
                    if(this.moving.up) self.setAnimation('move_up');
                    else if(this.moving.down) self.setAnimation('move_down');
                    else if(this.moving.left) self.setAnimation('move_left');
                    else if(this.moving.right) self.setAnimation('move_right');
                }
            });
        },
        update: function(delta) {
            this._super(delta);

            if(this.freeze) return;

            //calculate actual sprite movement accross the world
            var speed = delta * this.moveSpeed,
                x = 0,
                y = 0;

            //clamp speed to fix issues with collision calculations when framerate gets low
            if(speed > 0) speed = Math.min(speed, 10);
            else if(speed < 0) speed = Math.max(speed, -10);

            //these values are the inverse of the player movement, since because pickles
            if(this.moving.up) y += speed;
            if(this.moving.down) y -= speed;

            if(this.moving.left) x -= speed;
            if(this.moving.right) x += speed;

            this.checkMapCollision(x, y);
            this.checkEntityCollision(x, y);

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
                this.setAnimation('damage_' + dir);

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
        checkEntityCollision: function() {
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
                        console.log('HIT! DirectionV:', entity, directionV);
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
        checkMapCollision: function(x, y) {
            if(!x && !y) return;

            //if we moved by x,y would we collide with a wall or other map element?
            //if yes, set "this.blocked[axis] = true" and set the "this.blocker[axis] = tile";

            //clone our mesh and simulate movement
            var mesh = this._mesh.clone();

            var tilemapSize = this.engine.map.tilemapSize.clone().divideScalar(2), //half tilemap size
                pos = new THREE.Vector2(mesh.position.x, mesh.position.y), //position before simulation
                posX = new THREE.Vector2(mesh.position.x + x, mesh.position.y), //simulated movement for X
                posY = new THREE.Vector2(mesh.position.x, mesh.position.y + y), //simulated movement for Y
                loc = new THREE.Vector2();

            //position is really the "origin" of the entity, it is the center point.
            //link has 4 "hot spots" that are used to detect collision:
            // - if moving left: his leftmost foot position, and leftmost center are checked
            // - if moving right: his rightmost foot position, and rightmost center are checked
            // - if moving up: his leftmost center and his rightmost center positions are checked
            // - if moving down: his leftmost foot position and his rightmost foot positions are checked

            this.blocked.x = this.blocked.y = false;
            this.blocker.x = this.blocker.y = null;

            var tilesX = [],
                tilesY = [],
                space = 5;

            //if moving along X, check that blockage
            if(x) {
                //moving left
                if(x < 0) {
                    var leftFoot = posX.clone(),
                        leftCenter = posX.clone();

                    leftFoot.x -= (this.size.x / 2) - space;
                    leftFoot.y -= (this.size.y / 2) - space;

                    leftCenter.x -= (this.size.x / 2) - space;
                    leftCenter.y -= space * 2;

                    //get the tiles for the left foot and left center hotspots
                    Array.prototype.push.apply(tilesX, this._getMapBlock(leftFoot, tilemapSize));
                    Array.prototype.push.apply(tilesX, this._getMapBlock(leftCenter, tilemapSize));
                }
                //moving right
                else {
                    var rightFoot = posX.clone(),
                        rightCenter = posX.clone();

                    rightFoot.x += (this.size.x / 2) - space;
                    rightFoot.y -= (this.size.y / 2) - space;

                    rightCenter.x += (this.size.x / 2) - space;
                    rightCenter.y -= space * 2;

                    //get the tiles for the right foot and right center hotspots
                    Array.prototype.push.apply(tilesX, this._getMapBlock(rightFoot, tilemapSize));
                    Array.prototype.push.apply(tilesX, this._getMapBlock(rightCenter, tilemapSize));
                }
            }

            //if moving along Y, check that blockage
            if(y) {
                //moving down
                if(y < 0) {
                    var leftFoot = posY.clone(),
                        rightFoot = posY.clone()

                    leftFoot.x -= (this.size.x / 2) - space;
                    leftFoot.y -= (this.size.y / 2) - space;

                    rightFoot.x += (this.size.x / 2) - space;
                    rightFoot.y -= (this.size.y / 2) - space;

                    //get the tiles for the left foot and right foot hotspots
                    Array.prototype.push.apply(tilesY, this._getMapBlock(leftFoot, tilemapSize));
                    Array.prototype.push.apply(tilesY, this._getMapBlock(rightFoot, tilemapSize));
                }
                //moving up
                else {
                    var leftCenter = posY.clone(),
                        rightCenter = posY.clone();

                    leftCenter.x -= (this.size.x / 2) - space;
                    leftCenter.y -= space * 2;

                    rightCenter.x += (this.size.x / 2) - space;
                    rightCenter.y -= space * 2;

                    //get the tiles for the left center and right center hotspots
                    Array.prototype.push.apply(tilesY, this._getMapBlock(leftCenter, tilemapSize));
                    Array.prototype.push.apply(tilesY, this._getMapBlock(rightCenter, tilemapSize));
                }
            }

            //check X tiles
            for(var z = 0, zl = tilesX.length; z < zl; ++z) {
                if(tilesX[z].blockType == types.SUBTILE.BLOCK) {
                    this.blocked.x = true;
                    this.blocker.x = tilesX[z];
                    break;
                } else if(tilesX[z].blockType == types.SUBTILE.JUMPDOWN) {
                    //do jumpdown
                    //this.freeze = true;
                    this.engine.ui.playSound(this.sounds.jumpdown);
                    //this.setAnimation('jumpdown');
                    this.moveEntity((x > 0 ? 75 : -75), 0);

                    /*this.once('animDone', function() {
                        this.freeze = false;
                        this.setAnimation('idle' + dir);
                    });*/
                }
            }

            //check Y tiles
            for(var q = 0, ql = tilesY.length; q < ql; ++q) {
                if(tilesY[q].blockType == types.SUBTILE.BLOCK) {
                    this.blocked.y = true;
                    this.blocker.y = tilesY[q];
                    break;
                } else if(tilesY[q].blockType == types.SUBTILE.JUMPDOWN) {
                    //do jumpdown
                    //this.freeze = true;
                    this.engine.ui.playSound(this.sounds.jumpdown);
                    //this.setAnimation('jumpdown_' + this.lastDirection);
                    this.moveEntity(0, (y > 0 ? 100 : -100));

                    /*this.once('animDone', function() {
                        this.freeze = false;
                        this.setAnimation('idle_' + this.lastDirection);
                    });*/
                }
            }
        },
        _getMapBlock: function(pos, tilemapSize) {
            //do some division to make position be in "tiles from center" instead of "pixels from center"
            pos.divideScalar(this.engine.map.tileScale).divideScalar(this.engine.map.tileSize);

            //inverse the Y since we are getting offset from top not bottom like the position does
            pos.y = -pos.y;

            //pos is now the offset from the center, to make it from the top left
            //we subtract half the size of the tilemap
            pos.addSelf(tilemapSize);

            //need to get decimals off to test which part of the tile
            //we are on
            var texX = pos.x,
                texY = pos.y,
                texXd = texX - Math.floor(texX),
                texYd = texY - Math.floor(texY);

            var pixel = util.getImagePixel(this.engine.map.layers[0].imageData.tilemap, Math.floor(texX), Math.floor(texY)),
                colliders = [];

            if(!pixel.blue) return;

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

            var value = ((pixel.blue >> shift) & flag);

            return [{
                blockType: value,
                pixel: pixel,
                tilemapLoc: pos
            }];
        }
    });

    return Entity;
});