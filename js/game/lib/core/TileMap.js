define([
    //Modules
], function() {

    // Shader
    var tilemapVS = [
        "attribute vec2 position;",
        "attribute vec2 texture;",
        
        "varying vec2 pixelCoord;",
        "varying vec2 texCoord;",

        "uniform vec2 viewOffset;",
        "uniform vec2 viewportSize;",
        "uniform vec2 inverseTileTextureSize;",
        "uniform float inverseTileSize;",

        "void main(void) {",
        "   pixelCoord = (texture * viewportSize) + viewOffset;",
        "   texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;",
        "   gl_Position = vec4(position, 0.0, 1.0);",
        "}"
    ].join("\n");

    var tilemapFS = [
        "precision highp float;",

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

    var TileMap = Class.extend({
        //need to be textures
        init: function(tilemap, tileset, collisionset) {
            //this.tileScale = 4;
            this.tileSize = 16;

            this.tilemap = tilemap;
            this.tileset = tileset;
            this.collisionset = collisionset;

            /*this.material = new THREE.ShaderMaterial({
                uniforms: {
                    tiles: { type: 't', value: tilemap },
                    sprites: { type: 't', value: tileset },
                    inverseTileTextureSize: { type: 'v2', value: new THREE.Vector2() },
                    inverseSpriteTextureSize: { type: 'v2', value: new THREE.Vector2() },
                    tileSize: { type: 'f', value: this.tileSize },
                    repeatTiles: { type: 'i', value: 1 },
                    viewOffset: { type: 'v2', value: new THREE.Vector2() },
                    viewportSize: { type: 'v2', value: new THREE.Vector2() },
                    inverseTileSize: { type: 'f', value: 1/this.tileSize }
                },
                attributes: {
                    position: { type: 'v2', value: new THREE.Vector2() },
                    texture: { type: 'v2', value: new THREE.Vector2() }
                },
                vertexShader: tilemapVS,
                fragmentShader: tilemapFS,
                transparent: false
            });*/

            this.plane = new THREE.PlaneGeometry(
                tilemap.image.width/* * this.tileSize*/, //width
                tilemap.image.height/* * this.tileSize*///, //height
                //tilemap.image.width * this.tileScale, //width-segments
                //tilemap.image.height * this.tileScale //height-segments
            );

            this.mesh = new THREE.Mesh(this.plane/*, this.material*/);
        },
        addTileLayer: function(tilemap, scrollScaleX, scrollScaleY) {
            this.layers.push(new TileMapLayer(tilemap, this));
        }
    });

    return TileMap;
});