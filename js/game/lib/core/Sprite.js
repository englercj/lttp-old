define([], function() {
    var Sprite = Class.extend({
        /*
            opts = {
                //sprite
                texture: THREE.Texture,
                size: [Number (W), Number (H)],
                offset: [Number (X), Number (Y)], //offset to first frame in texture
                zindex: Number, //default: 1

                //animations
                animations: {
                    name: { //semantic name
                        offset: [Number (X), Number (Y)], //offset to first frame in texture
                        numFrames: Number, //default: 1 (no animation)
                        area: [Number (C), Number (R)], //number of columns and rows the animation resides in, default: [frames, 1]
                        duration: Number, //default: 1000
                        loop: Boolean //default: true
                    },
                    ...
                },

                //misc
                useScreenCoordinates: Boolean, //default: false
                affectedByDistance: Boolean //default: false
            }
        */
        init: function(opts, scene) {
            //sprite info
            this.texture = opts.texture;
            this.size = opts.size; //[width, height] in pixels
            this.offset = opts.offset; //[x, y] in pixels
            this.zindex = opts.zindex || 1;

            //animations
            this.animations = {};
            for(var a in opts.animations) {
                this.animations[a] = {
                    offset: opts.animations[a].offset,
                    numFrames: opts.animations[a].numFrames || 1, //number of frames
                    area: opts.animations[a].area || [(opts.animations[a].numFrames || 1), 1], //area (cols/rows of the sprite texture animation frames)
                    duration: opts.animations[a].duration || 1000, //duration of the animation
                    loop: opts.animations[a].loop || true
                };

                this.animations[a]._frameTime = (this.animations[a].duration / this.animations[a].numFrames);
            }

            //misc
            this.affectedByDistance = opts.affectedByDistance || false;
            this.useScreenCoordinates = opts.useScreenCoordinates || false;

            //class vars
            this.currentFrameTime = 0;
            this.currentTile = 0;
            this.currentAnim = 0;

            //actual sprite
            this._sprite = new THREE.Sprite({
                map: this.texture,
                useScreenCoordinates: this.useScreenCoordinates,
                affectedByDistance: this.affectedByDistance
            });
            this._sprite.position.z = this.zindex;
        },
        addToScene: function(scene) {
            scene.add(this._sprite);
        },
        setPosition: function(x, y) {
            this._sprite.position.set(x, y, 0);
        },
        setAnimation: function(name) {
            if(this.animations[name]) {
                this.currentFrameTime = 0;
                this.currentTile = 0;
                this.currentAnim = this.animations[name];
                return this.currentAnim;
            }

            return null;
        },
        animate: function(delta) {
            if(this.currentAnim) {
                var ms = delta * 1000;

                this.currentFrameTime += ms;
                while(this.currentFrameTime > this.currentAnim._frameTime) {
                    this.currentFrameTime -= this.currentAnim._frameTime;
                    this.currentTile++;

                    if(this.currentTile == this.currentAnim.numFrames && this.currentAnim.loop)
                        this.currentTile = 0;

                    var currColumn = this.currentTile % this.currentAnim.area[0];
                    this.texture.offset.x = currColumn / this.currentAnim.area[0];

                    var currRow = Math.floor(this.currentTile / this.currentAnim.area[0]);
                    this.texture.offset.y = currRow / this.currentAnim.area[1];
                }
            }
        }
    });

    return Sprite;
});