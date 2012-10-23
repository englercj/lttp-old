define([
    'game/lib/bases/SceneObject'
], function(SceneObject) {
    var Sprite = SceneObject.extend({
        /*
            Notes:
            > Offsets are counted as if the bottom left was 0, 0 like in  a Cartesian plane.
                Positive Y moves UP the rows, and positive X moves to down the cols right -> left.
            > Frames must be evenly spaced between eachother (recommend atleast 1px of space)

            opts = {
                //sprite
                texture: THREE.Texture, //texture of the sprite
                size: THREE.Vector2,    //width, height of the sprite
                area: THREE.Vector2,    //number of frame cols and frame rows in the texture
                offset: THREE.Vector2,  //offset to first frame in texture (cols, rows), default: (0, 0)
                zindex: Number,         //default: 1

                //animations
                animations: {
                    name: { //semantic name
                        offset: THREE.Vector2,  //offset to first frame in texture, default: (0, 0)
                        numFrames: Number,      //default: 1 (no animation)
                        area: THREE.Vector2,    //number of columns and rows the animation resides in, default: (frames, 1)
                        duration: Number,       //length of animation, default: 1000
                        loop: Boolean           //loop the animation, default: true
                    },
                    ...
                },

                //misc
                useScreenCoordinates: Boolean, //default: false
                affectedByDistance: Boolean //default: false
            }
        */
        init: function(opts) {
            this._super();

            //sprite info
            this.texture = opts.texture;
            this.size = opts.size; //[width, height] in pixels
            this.area = opts.area;
            this.offset = (opts.offset !== undefined) ? opts.offset : THREE.Vector2(0, 0); //[x, y] in pixels
            this.zindex = (opts.zindex !== undefined) ? opts.zindex : 1;

            //animations
            this.animations = {};
            for(var a in opts.animations) {
                this.animations[a] = {
                    area:       opts.animations[a].area,
                    offset:     (opts.animations[a].offset !== undefined) ? opts.animations[a].offset : new THREE.Vector2(0, 0),
                    numFrames:  (opts.animations[a].numFrames !== undefined) ? opts.animations[a].numFrames : 1, //number of frames
                    duration:   (opts.animations[a].duration !== undefined) ? opts.animations[a].duration : 1000, //duration of the animation
                    loop:       (opts.animations[a].loop !== undefined) ? opts.animations[a].loop : true
                };

                if(this.animations[a].area === undefined)
                    this.animations[a].area = new THREE.Vector2(this.animations[a].numFrames, 1);

                this.animations[a]._frameTime = (this.animations[a].duration / this.animations[a].numFrames);
            }

            //misc
            this.affectedByDistance = opts.affectedByDistance || false;
            this.useScreenCoordinates = opts.useScreenCoordinates || false;

            //class vars
            this.currentFrameTime = 0;
            this.currentTile = 0;
            this.currentAnim = 0;

            this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.repeat.set(1 / this.area.x, 1 / this.area.y);

            //actual sprite
            this._plane = new THREE.PlaneGeometry(this.size.x, this.size.y, 1, 1);
            this._material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });
            this._mesh = new THREE.Mesh(this._plane, this._material);
            this._mesh.position.set(0, 0, this.zindex);
        },
        setAnimation: function(name) {
            if(this.animations[name]) {
                this.currentFrameTime = 0;
                this.currentTile = 0;
                this.currentAnim = this.animations[name];
                this.currentAnim._done = false;
                return this.currentAnim;
            }

            return null;
        },
        animate: function(delta) {
            if(this.currentAnim) {
                if(this.currentAnim._done) return;

                var ms = delta * 1000;

                this.currentFrameTime += ms;
                while(this.currentFrameTime > this.currentAnim._frameTime) {
                    this.currentFrameTime -= this.currentAnim._frameTime;
                    this.currentTile++;

                    if(this.currentTile == this.currentAnim.numFrames) {
                        if(this.currentAnim.loop) {
                            this.currentTile = 0;
                        }
                        else {
                            this.currentAnim._done = true;
                            this.emit('animDone', this.currentAnim);
                            return;
                        }
                    }

                    var currColumn = this.currentTile % this.currentAnim.area.x;
                    this.texture.offset.x = (currColumn / this.currentAnim.area.x) + (this.offset.x / this.area.x) + (this.currentAnim.offset.x / this.area.x);

                    var currRow = Math.floor(this.currentTile / this.currentAnim.area.x);
                    this.texture.offset.y = (currRow / this.currentAnim.area.y) + (this.offset.y / this.area.y) + (this.currentAnim.offset.y / this.area.y);
                }
            }
        }
    });

    return Sprite;
});