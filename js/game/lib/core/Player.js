define([
    'game/lib/core/Entity'
], function(Entity) {
    var Player = Entity.extend({
        init: function(resource, engine) {
            //initialize entity
            this._super(resource, engine);

            this.maxMagic = resource.data.maxMagic || 70;
            this.magic = resource.data.magic || 70;
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

            //check is it is time to zone based on exit points
            this.checkZoneOut();
        },
        checkCameraLock: function(x, y) {
            //This will simulate movement to X and Y seperately and test that each corner of the viewport is
            //within the current zone's vertices
            var pos = new THREE.Vector2(this.engine.camera.position.x, this.engine.camera.position.y),
                vpSize = [this.engine.viewport.width / 2, this.engine.viewport.height / 2],
                vertsX = [
                    [pos.x + x - vpSize[0], pos.y - vpSize[1]],
                    [pos.x + x - vpSize[0], pos.y + vpSize[1]],
                    [pos.x + x + vpSize[0], pos.y + vpSize[1]],
                    [pos.x + x + vpSize[0], pos.y - vpSize[1]]
                ],
                vertsY = [
                    [pos.x - vpSize[0], pos.y + y - vpSize[1]],
                    [pos.x - vpSize[0], pos.y + y + vpSize[1]],
                    [pos.x + vpSize[0], pos.y + y + vpSize[1]],
                    [pos.x + vpSize[0], pos.y + y - vpSize[1]]
                ];

            //this.cameraLock.x = this.cameraLock.y = false;

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
        }
    });

    return Player;
});