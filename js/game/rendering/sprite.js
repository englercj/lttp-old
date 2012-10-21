define([
    'game/rendering/webgl-sprite',
], function (WebGLSprite) {
    //(gl, viewport, "image string", Number, [w, h], [cols, rows], [x, y], 
    var Sprite = function(gl, viewport, sheet, numTiles, size, area, offset, animLength, repeat) {
        this.ctx = WebGLSprite.createContext(gl);

        this.gl = gl;
        this.viewport = viewport;
        this.sheet = sheet; //sprite sheet source
        this.numTiles = numTiles; //number of tiles in animation
        this.size = size; //size of this sprite
        this.area = area; //how many columns, and rows, of the sheet this sprite takes up
        this.offset = offset; //offset of first sprite on sheet
        this.animLength = animLength; //ms of animation
        this.loop = repeat; //repeat the animation when completed

        this.scale = 4;

        this.ctx.setViewport(viewport);

        this.textureSize = vec2.create();
        this.inverseTextureSize = vec2.create();
        //this.texture = gl.loadTexture(sheet);
        this.getTexture(function() {
            this.update();
        })
    };

    Sprite.prototype.getTexture = function(cb) {
        var self = this;
        var image = new Image();
        var gl = this.gl;

        image.addEventListener('load', function() {
            gl.bindTexture(gl.TEXTURE_2D, self.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            // MUST be filtered with NEAREST or tile lookup fails
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

            /*if(repeat) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            } else {*/
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            //}

            self.textureSize[0] = image.width;
            self.textureSize[1] = image.height;

            self.inverseTextureSize[0] = 1/image.width;
            self.inverseTextureSize[1] = 1/image.height;

            if(cb) cb.call(self);
        });

        image.src = this.sheet;
    };

    Sprite.prototype.update = function() {
        this.ctx.drawSprite(
            [0, 0, 0.1], //pos
            0, //theta
            [this.size[0] * this.scale, this.size[1] * this.scale], //size
            [this.offset[0] * this.inverseTextureSize[0], this.offset[1] * this.inverseTextureSize[1]], //texpos
            [this.size[0] * this.inverseTextureSize[0], this.size[1] * this.inverseTextureSize[1]], //texsize
            this.texture //gltexture
        );
    };

    return Sprite;
});