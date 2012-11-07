/*
    This tilemap class operates by rendering a plane that is textured by the tilemap.
    A plane is rendered for each layer
*/
define([
    'game/lib/bases/SceneObject',
    'game/lib/utils/util'
], function(SceneObject, util) {
    // Shader
    var tilemapVS = [
        "varying vec2 pixelCoord;",
        "varying vec2 texCoord;",

        "uniform vec2 mapSize;",
        "uniform vec2 inverseTileTextureSize;",
        "uniform float inverseTileSize;",

        "void main(void) {",
        "    pixelCoord = (uv * mapSize);",
        "    texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;",
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
        "    gl_FragColor = texture;",
        "}"
    ].join("\n");

    var TileMap = Class.extend({
        init: function(engine, opts) {
            this._super(engine);

            this.layers = [];
            opts = opts || {};

            this.tileScale = opts.tileScale || 4.0;
            this.tileSize = opts.tileSize || 16;
            this.zones = opts.zones || [];
            this.zone = this.findZoneIndex(opts.zone) || 0;
            this.tilemapSize = new THREE.Vector2(opts.mapSize[0], opts.mapSize[1]);

            this.eachZone(function(zone) {
                this.upgradeVertexUnits(zone);
            });
        },
        addLayer: function(resource, opts) {
            if(typeof opts == 'string') {
                var temp = opts;
                opts = { name: temp };
            }

            opts = opts || {};
            opts.tileScale = this.tileScale;
            opts.tileSize = this.tileSize;
            opts.zIndex = (opts.zIndex !== undefined) ? opts.zIndex : this.layers.length;

            var layer = new TileMapLayer(this.engine, resource, opts, this);
            this.layers.push(layer);

            //TODO: right now this only tracks the latest layer, should it be the biggest layer?
            //this.tilemapSize.set(layer.tilemap.image.width, layer.tilemap.image.height);

            //incase they add the map to the scene first, then add layers
            if(this.scene)
                layer.addToScene(this.scene);
        },
        //removes the first layer matching the index, or name passed
        //returns the layer removed, or undefined if not found.
        removeLayer: function(which) {
            var lyr;
            //index to remove
            if(typeof which == 'number') {
                lyr = this.layers.splice(which, 1)[0];
            }
            //name of layer to remove
            else {
                var index;
                this.eachLayer(function(layer, i) {
                    if(layer.name == which) {
                        index = i;
                        return false; //break
                    }
                });

                if(index) lyr = this.layers.splice(index, 1)[0];
            }

            return lyr;
        },
        addToScene: function(scene) {
            this.scene = this;

            //incase they add layers first, then add the map to the scene
            this.eachLayer(function(layer) {
                if(!layer.scene || layer.scene != scene)
                    layer.addToScene(scene);
            });
        },
        pan: function() {
            this.eachLayer(function(layer) {
                layer.pan.apply(layer, arguments);
            });
        },
        loadZone: function(zone) {
            //set the new zone
            this.zone = this.findZoneIndex(zone);
        },
        findZoneIndex: function(z) {
            if(typeof z == 'number') return z;
            var check, index = null;

            //if z is a vector, make it an array
            if(z instanceof THREE.Vector2) z = [z.x, z.y];

            //if z is an Array we use it as a point to find which zone that point is in
            if(z instanceof Array) {
                check = function(zone) { return util.pointInPoly(zone.vertices, z); };
            }
            //if z is a string, find the zone that has that name
            else if(typeof z == 'string') {
                check = function(zone) { return zone.name == z; };
            }

            if(check) {
                this.eachZone(function(zone, i) {
                    if(check(zone)) {
                        index = i;
                        return false;
                    }
                })
            }

            return index;
        },
        upgradeVertexUnits: function(zone) {
            if(zone.vertexUnits == 'offsets') return;

            //Convert the vertices from pixels to offsets if necessary
            for (var i = 0, il = zone.vertices.length; i < il; ++i) {
                zone.vertices[i][0] = (zone.vertices[i][0] - (this.tilemapSize.x / 2)) * this.tileSize * this.tileScale;
                zone.vertices[i][1] = (zone.vertices[i][1] - (this.tilemapSize.y / 2)) * this.tileSize * this.tileScale;
            };
            zone.vertexUnits = 'offsets';
        },
        eachLayer: function(fn) {
            for(var i = 0, il = this.layers.length; i < il; ++i) {
                if(fn.call(this, this.layers[i], i, this.layers) === false)
                    break;
            }
        },
        eachZone: function(fn) {
            for(var i = 0, il = this.zones.length; i < il; ++i) {
                if(fn.call(this, this.zones[i], i, this.zones) === false)
                    break;
            }
        }
    });

    var TileMapLayer = SceneObject.extend({
        init: function(engine, resource, opts, parent) {
            this._super(engine);
            this.parent = parent;

            //set options
            this.tileScale = opts.tileScale || 4.0;
            this.tileSize = opts.tileSize || 16;
            this.zIndex = (opts.zIndex !== undefined) ? opts.zIndex : 0;
            this.repeat = (opts.repeat !== undefined) ? opts.repeat : false;
            this.filtered = (opts.repeat !== undefined) ? opts.filtered : false;
            this.name = opts.name;

            //set maps
            this.tilemap = resource.tilemap;
            this.tileset = resource.tileset;
            this.meta = resource.meta;

            //cache image data
            this.imageData = {
                tilemap: util.getImageData(this.tilemap.image),
                tileset: util.getImageData(this.tileset.image)
            };

            //Setup Tilemap
            this.tilemap.magFilter = THREE.NearestFilter;
            this.tilemap.minFilter = THREE.NearestMipMapNearestFilter;
            //tilemap.flipY = false;
            if(this.repeat) {
                this.tilemap.wrapS = this.tilemap.wrapT = THREE.RepeatWrapping;
            } else {
                this.tilemap.wrapS = this.tilemap.wrapT = THREE.ClampToEdgeWrapping;
            }

            //Setup Tileset
            this.tileset.wrapS = this.tileset.wrapT = THREE.ClampToEdgeWrapping;
            this.tileset.flipY = false;
            if(this.filtered) {
                this.tileset.magFilter = THREE.LinearFilter;
                this.tileset.minFilter = THREE.LinearMipMapLinearFilter;
            } else {
                this.tileset.magFilter = THREE.NearestFilter;
                this.tileset.minFilter = THREE.NearestMipMapNearestFilter;
            }

            //setup shader uniforms
            this._uniforms = {
                mapSize: { type: 'v2', value: new THREE.Vector2(this.tilemap.image.width * this.tileSize, this.tilemap.image.height * this.tileSize) },
                inverseSpriteTextureSize: { type: 'v2', value: new THREE.Vector2(1/this.tileset.image.width, 1/this.tileset.image.height) },
                tileSize: { type: 'f', value: this.tileSize },
                inverseTileSize: { type: 'f', value: 1/this.tileSize },

                tiles: { type: 't', value: this.tilemap },
                sprites: { type: 't', value: this.tileset },

                inverseTileTextureSize: { type: 'v2', value: new THREE.Vector2(1/this.tilemap.image.width, 1/this.tilemap.image.height) },
                repeatTiles: { type: 'i', value: this.repeat ? 1 : 0 }
            };

            //create the shader material
            this._material = new THREE.ShaderMaterial({
                uniforms: this._uniforms,
                vertexShader: tilemapVS,
                fragmentShader: tilemapFS,
                transparent: false
            });

            this._plane = new THREE.PlaneGeometry(
                this.tilemap.image.width * this.tileSize * this.tileScale,
                this.tilemap.image.height * this.tileSize * this.tileScale
            );

            this._mesh = new THREE.Mesh(this._plane, this._material);
            this._mesh.z = this.zIndex;
        }
    });

    return TileMap;
});