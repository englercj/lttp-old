define([
    'game/lib/core/Entity'
], function(Entity) {
    var Player = Entity.extend({
        init: function(resource, engine) {
            //initialize entity
            this._super(resource, engine);

            this.maxMagic = resource.data.maxMagic || 100;
            this.magic = resource.data.magic || 100;
            this.inventory = resource.data.inventory || {
                rupees: 0,
                bombs: 0,
                arrows: 0,
                heart_pieces: 0
            };
            this.equipted = null;


            //link the player moving to the controls
            this.moving = this.engine.controls.moving;

            //for keeping player centered
            this.centerThreshold = 5;
            this.cameraLock = { x: false, y: false };

            //bind events
            this.bindEvents();
        },
        bindEvents: function() {
            this._super();

            var self = this;

            //set blocked animations
            self.engine.controls.on('move::*', function(dir) {
            });

            //TODO: when blocked, show pushing animation
        },
        moveEntity: function(x, y) {
            this._super(x, y);

            //constrain the camera to this zone
            this.checkCameraLock(x, y);

            if(!this.blocked.x && !this.cameraLock.x) this.engine.camera.translateX(x);
            if(!this.blocked.y && !this.cameraLock.y) this.engine.camera.translateY(y);

            //check if the character has gotten back on center, and unlock the camera if necessary
            this.checkOnCenter();

            //check is it is time to zone based on if the mesh reaches the viewport edge
            var data = this.checkZoneOut();
            if(data && data.zone !== null) {
                this.doZoneOut(data, x, y);
            }
        },
        animateMoveEntity: function(x, y, speed, cb) {
            this._super(x, y, speed);

            //constrain the camera to this zone
            this.checkCameraLock(x, y);

            var props = {}, self = this;
            if(!this.blocked.x && !this.cameraLock.x) props.x = '+=' + x;
            if(!this.blocked.y && !this.cameraLock.y) props.y = '+=' + y;

            this.animate(this.engine.camera.position, {
                duration: speed,
                props: props,
                complete: function() {
                    //check if the character has gotten back on center, and unlock the camera if necessary
                    self.checkOnCenter();

                    //check is it is time to zone based on if the mesh reaches the viewport edge
                    var data = self.checkZoneOut();
                    if(data && data.zone !== null) {
                        self.doZoneOut(data, x, y);
                    }

                    if(cb) cb();
                }
            });
        },
        doZoneOut: function(data, x, y) {
            this.freeze = true;

            //unload current zone
            this.engine.unloadZone(this.engine.map.zone);

            //load the new zone
            this.engine.loadZone(data.zone);

            //animate the camera
            var camProps = {},
                meshProps = {},
                vals = { x: x, y: y },
                self = this,
                ax = data.axis,
                nax = (ax == 'x' ? 'y' : 'x');

            //animate the camera in the direction of the zone
            camProps[ax] = '+=' + (this.engine.viewport[(ax == 'x' ? 'width' : 'height')] * (vals[ax] < 0 ? -1 : 1));
            //center the other axis on the player
            camProps[nax] = this.getConstrainedCenter()[nax];

            //move the player a small bit so they are off the zone line
            meshProps[ax] = '+=' + ((this.size[ax] * 1.25)  * (vals[ax] < 0 ? -1 : 1));

            this.animate(this.engine.camera.position, {
                duration: 1000,
                props: camProps,
                complete: function() {
                    self.cameraLock.x = self.cameraLock.y = false;
                    self.freeze = false;
                }
            });

            this.animate(this._mesh.position, {
                duration: 1000,
                props: meshProps,
                complete: function() {
                }
            });
        },
        getConstrainedCenter: function(ax) {
            var pos = this._mesh.position.clone(),
                out = true,
                verts;

            while(out)
            {
                verts = this.getViewportVerts(pos);

                //check if top left, and if it is out we need to move either down or right
                if(!util.pointInPoly(this.engine.map.zones[this.engine.map.zone].vertices, verts.topLeft)) {
                    //check bottom left, and if it is out we need to move right
                    if(!util.pointInPoly(this.engine.map.zones[this.engine.map.zone].vertices, verts.bottomLeft)) {
                        pos.x++; //positive X is right
                    }
                    //if it is in, we need to move down
                    else {
                        pos.y--; //negative Y is down
                    }
                }
                //check bottom right, and if it is out we need to move either up or left
                else if(!util.pointInPoly(this.engine.map.zones[this.engine.map.zone].vertices, verts.bottomRight)) {
                    //check top right, and if it is out we need to move left
                    if(!util.pointInPoly(this.engine.map.zones[this.engine.map.zone].vertices, verts.topRight)) {
                        pos.x--; //negative X is left
                    }
                    //if it is in, we need to move down
                    else {
                        pos.y++; //positive Y is up
                    }
                }
                //both are in, so lets get out of here
                else out = false;
            }

            return pos;
        },
        getViewportVerts: function(pos, offX, offY, array) {
            var vpSize = [this.engine.viewport.width / 2, this.engine.viewport.height / 2],
                verts;

            //vertices array
            if(array) {
                verts = [
                    [pos.x + offX - vpSize[0], pos.y + offY - vpSize[1]], //bottom left
                    [pos.x + offX - vpSize[0], pos.y + offY + vpSize[1]], //top left
                    [pos.x + offX + vpSize[0], pos.y + offY + vpSize[1]], //top right
                    [pos.x + offX + vpSize[0], pos.y + offY - vpSize[1]] //bottom right
                ];
            }
            //easy-to-use readable object
            else {
                verts = {
                    bottomLeft:  [pos.x + offX - vpSize[0], pos.y + offY - vpSize[1]], //bottom left
                    topLeft:     [pos.x + offX - vpSize[0], pos.y + offY + vpSize[1]], //top left
                    topRight:    [pos.x + offX + vpSize[0], pos.y + offY + vpSize[1]], //top right
                    bottomRight: [pos.x + offX + vpSize[0], pos.y + offY - vpSize[1]] //bottom right
                };
            }

            return verts;
        },
        checkCameraLock: function(x, y) {
            //This will simulate movement to X and Y seperately and test that each corner of the viewport is
            //within the current zone's vertices
            var vertsX = this.getViewportVerts(this.engine.camera.position, x, 0, true),
                vertsY = this.getViewportVerts(this.engine.camera.position, 0, y, true);

            //check vertices
            for(var i = 0, il = vertsX.length; i < il; ++i) {
                //check X verts
                if(!util.pointInPoly(this.engine.map.zones[this.engine.map.zone].vertices, vertsX[i])) {
                    this.cameraLock.x = true;
                }

                //check Y verts
                if(!util.pointInPoly(this.engine.map.zones[this.engine.map.zone].vertices, vertsY[i])) {
                    this.cameraLock.y = true;
                }
            }
        },
        checkOnCenter: function() {
            //check that X is within the acceptable "center" range and if so, unlock X of the camera
            if(this._mesh.position.x > (this.engine.camera.position.x - this.centerThreshold) &&
                this._mesh.position.x < (this.engine.camera.position.x + this.centerThreshold))
            {
                this.cameraLock.x = false;
            }
            else this.cameraLock.x = true;


            //check that Y is within the acceptable "center" range and if so, unlock X of the camera
            if(this._mesh.position.y > (this.engine.camera.position.y - this.centerThreshold) &&
                this._mesh.position.y < (this.engine.camera.position.y + this.centerThreshold))
            {
                this.cameraLock.y = false;
            }
            else this.cameraLock.y = true;
        },
        checkZoneOut: function() {
            //check that the player
            var diffX = Math.abs(this._mesh.position.x - this.engine.camera.position.x) + (this.size.x / 2),
                diffXSign = (this._mesh.position.x - this.engine.camera.position.x) < 0 ? -1 : 1,
                biasX = diffXSign * this.size.x,

                diffY = Math.abs(this._mesh.position.y - this.engine.camera.position.y) + (this.size.y / 2),
                diffYSign = (this._mesh.position.y - this.engine.camera.position.y) < 0 ? -1 : 1,
                biasY = diffYSign * this.size.y;

            if(diffX >= (this.engine.viewport.width / 2)) { //zone X
                //to find what zone they are moving into we add a bit to their X position
                //and see what zone that puts us in, if any
                return {
                    axis: 'x',
                    zone: this.engine.map.findZoneIndex([this._mesh.position.x + biasX, this._mesh.position.y])
                };
            }
            else if(diffY >= (this.engine.viewport.height / 2)) { //zone Y
                //to find what zone they are moving into we add a bit to their Y position
                //and see what zone that puts us in, if any
                return {
                    axis: 'y',
                    zone: this.engine.map.findZoneIndex([this._mesh.position.x, this._mesh.position.y + biasY]),
                    pos: this._mesh.position.y,
                    bis: this._mesh.position.y + biasY
                };
            }
        }
    });

    return Player;
});