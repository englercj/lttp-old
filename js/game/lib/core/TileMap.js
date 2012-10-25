define([
    'game/lib/bases/SceneObject'
], function(SceneObject) {
    // Shader
    var tilemapVS = [
        //"attribute vec2 pos;",
        //"attribute vec2 texture;",
        
        "varying vec2 pixelCoord;",
        "varying vec2 texCoord;",

        "uniform vec2 viewOffset;",
        "uniform vec2 viewportSize;",
        "uniform vec2 inverseTileTextureSize;",
        "uniform float inverseTileSize;",

        "void main(void) {",
        "    pixelCoord = (uv * viewportSize) + viewOffset;",
        "    texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;",
        //"    gl_Position = vec4(position.x, position.y, 0.0, 1.0);",
        "    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
        "}"
    ].join("\n");

    var tilemapFS = [
        //"precision highp float;",

        "varying vec2 pixelCoord;",
        "varying vec2 texCoord;",

        "uniform sampler2D tiles;",
        "uniform sampler2D sprites;",

        "uniform vec2 inverseTileTextureSize;",
        "uniform vec2 inverseSpriteTextureSize;",
        "uniform float tileSize;",
        "uniform int repeatTiles;",

        "void main(void) {",
        "    vec4 tile = texture2D(tiles, texCoord);", //load this pixel of the tilemap
        "    if(tile.x == 1.0 && tile.y == 1.0) { discard; }", //discard if R is 255 and G is 255
        "    vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;", //generate the offset in the tileset this pixel represents
        "    vec2 spriteCoord = mod(pixelCoord, tileSize);",
        "    vec4 texture = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);",
        //"    texture.y = 1.0 - texture.y;",
        "    gl_FragColor = texture;",
        //"    gl_FragColor = tile;",
        "}"
    ].join("\n");

    var TileMapLayer = Class.extend({
        init: function(tilemap, parent) {
            this.tilemap = tilemap;
            this.parent = parent;
        }
    });

    var TileMap = SceneObject.extend({
        //need to be textures
        init: function(tilemap, tileset, viewport) {
            this._super();

            this.tileScale = 4.0;
            this.tileSize = 16;
            this.repeat = false;
            this.filtered = false;

            this.tilemap = tilemap;
            this.tileset = tileset;

            this.viewport = viewport;

            this.imageData = {};
            this.imageData.tilemap = this.getImageData(this.tilemap.image);

            window.tm = this;

            /*
            var quadVerts = [
                //x  y  u  v
                -1, -1, 0, 1,
                 1, -1, 1, 1,
                 1,  1, 1, 0,

                -1, -1, 0, 1,
                 1,  1, 1, 0,
                -1,  1, 0, 0
            ];

            this.quadVertBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.quadVertBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadVerts), gl.STATIC_DRAW);

            //Attributes
            gl.enableVertexAttribArray(shader.attribute.position);
            gl.enableVertexAttribArray(shader.attribute.texture);
            gl.vertexAttribPointer(shader.attribute.position, 2, gl.FLOAT, false, 16, 0);
            gl.vertexAttribPointer(shader.attribute.texture, 2, gl.FLOAT, false, 16, 8);

            //Uniforms
            gl.uniform2fv(shader.uniform.viewportSize, this.scaledViewportSize);
            gl.uniform2fv(shader.uniform.inverseSpriteTextureSize, this.inverseSpriteTextureSize);
            gl.uniform1f(shader.uniform.tileSize, this.tileSize);
            gl.uniform1f(shader.uniform.inverseTileSize, 1/this.tileSize);

            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(shader.uniform.sprites, 0);
            gl.bindTexture(gl.TEXTURE_2D, this.spriteSheet);

            gl.activeTexture(gl.TEXTURE1);
            gl.uniform1i(shader.uniform.tiles, 1);

            gl.uniform2f(shader.uniform.viewOffset, Math.floor(x * layer.scrollScaleX), Math.floor(y * layer.scrollScaleY));
            gl.uniform2fv(shader.uniform.inverseTileTextureSize, layer.inverseTextureSize);
            gl.uniform1i(shader.uniform.repeatTiles, layer.repeat ? 1 : 0);

            gl.bindTexture(gl.TEXTURE_2D, layer.tileTexture);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            */

            //Setup Tilemap
            tilemap.magFilter = THREE.NearestFilter;
            tilemap.minFilter = THREE.NearestMipMapNearestFilter;
            //tilemap.flipY = false;
            if(this.repeat) {
                tilemap.wrapS = tilemap.wrapT = THREE.RepeatWrapping;
            } else {
                tilemap.wrapS = tilemap.wrapT = THREE.ClampToEdgeWrapping;
            }

            //Setup Tileset
            tileset.wrapS = tileset.wrapT = THREE.ClampToEdgeWrapping;
            tileset.flipY = false;
            if(this.filtered) {
                tileset.magFilter = THREE.LinearFilter;
                tileset.minFilter = THREE.LinearMipMapLinearFilter;
            } else {
                tileset.magFilter = THREE.NearestFilter;
                tileset.minFilter = THREE.NearestMipMapNearestFilter;
            }

            //setup shader uniforms
            this.offset = new THREE.Vector2(0, 0);
            this._uniforms = {
                viewportSize: { type: 'v2', value: new THREE.Vector2(viewport.width / this.tileScale, viewport.height / this.tileScale) },
                inverseSpriteTextureSize: { type: 'v2', value: new THREE.Vector2(1/tileset.image.width, 1/tileset.image.height) },
                tileSize: { type: 'f', value: this.tileSize },
                inverseTileSize: { type: 'f', value: 1/this.tileSize },

                tiles: { type: 't', value: tilemap },
                sprites: { type: 't', value: tileset },

                viewOffset: { type: 'v2', value: this.offset },
                inverseTileTextureSize: { type: 'v2', value: new THREE.Vector2(1/tilemap.image.width, 1/tilemap.image.height) },
                repeatTiles: { type: 'i', value: this.repeat ? 1 : 0 }
            };

            //create the shader material
            this._material = new THREE.ShaderMaterial({
                /*attributes: {
                    pos: { type: 'v2', value: [ new THREE.Vector2(-1, -1) ] },
                    texture: { type: 'v2', value: [ new THREE.Vector2(0, 1) ] },
                },*/
                uniforms: this._uniforms,
                vertexShader: tilemapVS,
                fragmentShader: tilemapFS,
                transparent: false
            });

            /*this._material = new THREE.MeshBasicMaterial({
                map: tileset
            });*/

            this._plane = new THREE.PlaneGeometry(viewport.width, viewport.height, this.tileSize, this.tileSize);

            this._mesh = new THREE.Mesh(this._plane, this._material);

            viewport.on('resize', $.proxy(this.onResize, this));
            this.onResize();
        },
        addTileLayer: function(tilemap, scrollScaleX, scrollScaleY) {
            this.layers.push(new TileMapLayer(tilemap, this));
        },
        onResize: function() {
            //calculate max X extent so we dont go off map
            this.maxExtentX = this.tilemap.image.width * this.tileScale * this.tileSize; //biggest X point of the map
            this.maxExtentY = this.tilemap.image.height * this.tileScale * this.tileSize; //biggest Y point of the map
        },
        rgbaToHex: function(rgba) {
            return ((rgba.r << 32) | (rgba.g << 16) | (rgba.b << 8) | (rgba.a)).toString(16);
        },
        getPixel: function(from, x, y) {
            var index = (y * this.imageData[from].width + x) * 4,
                red = this.imageData[from].data[index],
                green = this.imageData[from].data[index + 1],
                blue = this.imageData[from].data[index + 2],
                alpha = this.imageData[from].data[index + 3],
                rgba = { r: red, g: green, b: blue, a: alpha };

            rgba.hex = this.rgbaToHex(rgba);
            return rgba;
        },
        getImageData: function(image) {
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);

            return ctx.getImageData(0, 0, canvas.width, canvas.height);
        },
        atMax: function(axis) {
            return (this['maxDiff' + axis.toUpperCase()] <= 0);
        },
        atMin: function(axis) {
            return (this.offset[axis] === 0);
        },
        pan: function(x, y) {
            //update the offset
            this.offset.x -= x / this.tileScale;
            this.offset.y -= y / this.tileScale;

            this.maxDiffX = this.maxExtentX - (this.viewport.width + (this.offset.x * this.tileScale)), //biggest X camera can reach without the viewport going offscreen
            this.maxDiffY = this.maxExtentY - (this.viewport.height + (this.offset.y * this.tileScale)); //biggest Y camera can reach without the viewport going offscreen

            //constrain maximum X
            if(this.maxDiffX < 0) {
                this.offset.x += this.maxDiffX / this.tileScale;
            }

            //constrain maximum Y
            if(this.maxDiffY < 0) {
                this.offset.y += this.maxDiffY / this.tileScale;
            }

            //constrain minimum X
            if(this.offset.x < 0) {
                this.offset.x = 0;
            }

            //constrain minimum Y
            if(this.offset.y < 0) {
                this.offset.y = 0;
            }
        }
    });

    return TileMap;
});