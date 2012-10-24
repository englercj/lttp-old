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
        "   pixelCoord = (uv * viewportSize) + viewOffset;",
        "   texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;",
        "   gl_Position = vec4(position.x, position.y, 0.0, 1.0);",
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
        "   if(repeatTiles == 0 && (texCoord.x < 0.0 || texCoord.x > 1.0 || texCoord.y < 0.0 || texCoord.y > 1.0)) { discard; }",
        "   vec4 tile = texture2D(tiles, texCoord);",
        "   if(tile.x == 1.0 && tile.y == 1.0) { discard; }",
        "   vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;",
        "   vec2 spriteCoord = mod(pixelCoord, tileSize);",
        "   gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);",
        //"   gl_FragColor = tile;",
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
        init: function(tilemap, tileset, collisionset, viewport) {
            this._super();

            this.tileScale = 1.0;
            this.tileSize = 16;
            this.repeat = false;
            this.filtered = false;

            this.tilemap = tilemap;
            this.tileset = tileset;
            this.collisionset = collisionset;

            this.viewport = viewport;

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
            if(this.repeat) {
                tilemap.wrapS = tilemap.wrapT = THREE.RepeatWrapping;
            } else {
                tilemap.wrapS = tilemap.wrapT = THREE.ClampToEdgeWrapping;
            }
            tilemap.magFilter = THREE.NearestFilter;
            tilemap.minFilter = THREE.NearestMipMapNearestFilter;

            //Setup Tileset
            tileset.wrapS = tileset.wrapT = THREE.ClampToEdgeWrapping;
            if(this.filtered) {
                tileset.magFilter = THREE.LinearFilter;
                tileset.minFilter = THREE.LinearMipMapLinearFilter;
            } else {
                tileset.magFilter = THREE.NearestFilter;
                tileset.minFilter = THREE.NearestMipMapNearestFilter;
            }

            /*this._material = new THREE.ShaderMaterial({
                //attributes: {
                //    pos: { type: 'v2', value: new THREE.Vector2(0, 0) },
                //    texture: { type: 'v2', value: new THREE.Vector2(0, 0) }
                //},
                uniforms: {
                    viewportSize: { type: 'v2v', value: [new THREE.Vector2(viewport.width() / this.tileScale, viewport.height() / this.tileScale)] },
                    inverseSpriteTextureSize: { type: 'v2v', value: [new THREE.Vector2(1/tileset.image.width, 1/tileset.image.height)] },
                    tileSize: { type: 'f', value: this.tileSize },
                    inverseTileSize: { type: 'f', value: 1/this.tileSize },

                    tiles: { type: 't', value: tilemap },
                    sprites: { type: 't', value: tileset },

                    viewOffset: { type: 'v2', value: new THREE.Vector2(0, 0) },
                    inverseTileTextureSize: { type: 'v2v', value: [new THREE.Vector2(1/tilemap.image.width, 1/tilemap.image.height)] },
                    repeatTiles: { type: 'i', value: 1 }
                },
                vertexShader: tilemapVS,
                fragmentShader: tilemapFS,
                transparent: false
            });*/

            /*this._material = new THREE.MeshBasicMaterial({
                color: 0xCC0000
            });*/

            this._material = new THREE.MeshBasicMaterial({
                map: tileset
            });

            this._plane = new THREE.PlaneGeometry(
                tilemap.image.width * this.tileSize * this.tileScale, //width
                tilemap.image.height * this.tileSize * this.tileScale//, //height
                //tilemap.image.width * this.tileScale, //width-segments
                //tilemap.image.height * this.tileScale //height-segments
            );

            this._mesh = new THREE.Mesh(this._plane, this._material);
        },
        addTileLayer: function(tilemap, scrollScaleX, scrollScaleY) {
            this.layers.push(new TileMapLayer(tilemap, this));
        }
    });

    return TileMap;
});