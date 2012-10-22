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
                        frames: Number, //default: 1 (no animation)
                        area: [Number (C), Number (R)] //number of columns and rows the animation resides in, default: [frames, 1]
                        loop: Boolean, //default: true
                    },
                    ...
                }

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

            //animations
            this.animations = {};
            for(var a in opts.animations) {
                this.animations[a] = {
                    offset: opts.animations[a].offset,
                    frames: opts.animations[a].frames || 1; //number of frames
                    area: opts.animations[a].area || [(opts.animations[a].frames || 1), 1]; //area (cols/rows of the sprite texture animation frames)
                    loop: opts.animations[a].loop || true;
                };
            }

            //misc
            this.affectedByDistance = opts.affectedByDistance || false;
            this.useScreenCoordinates = opts.useScreenCoordinates || false;

            //actual sprite
            this._sprite = new THREE.Sprite({
                map: texture,
                useScreenCoordinates: this.useScreenCoordinates,
                affectedByDistance: this.affectedByDistance
            });
        },
        setPosition: function(x, y) {
            this.sprite.position.set(x, y, 0);
        },
        update: function() {

        }
    });
});