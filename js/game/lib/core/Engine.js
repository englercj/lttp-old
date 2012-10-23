define([
    //Modules
    'game/lib/core/Viewport',
    'game/lib/core/Controls',
    'game/lib/core/TileMap',
    'game/lib/core/Player'//,
    //Scritps that modify global
    //'game/lib/core/three_fpcontrols'
], function(Viewport, Controls, TileMap, Player) {
    var Engine = Class.extend({
        init: function(container, resources) {
            //setup game
            this.scene = new THREE.Scene();
            this.clock = new THREE.Clock();
            this.renderer = new THREE.WebGLRenderer();
            this.viewport = new Viewport(container, this.renderer);

            var width = this.viewport.width(), height = this.viewport.height();
            this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);//new THREE.PerspectiveCamera(60, this.viewport.aspect(), 1, 10000);
            this.controls = new Controls(this.viewport, this.camera);//new THREE.FirstPersonControls(this.camera);

            this.map = new TileMap(resources.tilemap, resources.tileset, resources.collisionset, this.viewport);
            this.map.addToScene(this.scene);

            this.scene.add(new THREE.AmbientLight(0xFFFFFF));

            //setup camera
            this.camera.position.z = 300;
            //this.camera.position.y = CONST.UNIT_SIZE; //raise camera off the ground
            //this.camera.lookAt(this.scene.position);
            this.scene.add(this.camera);

            //setup player
            this.player = new Player(this.controls, resources);

            // set up the sphere vars
            /*var radius = 50,
                segments = 16,
                rings = 16;

            // create a new mesh with
            // sphere geometry - we will cover
            // the sphereMaterial next!
            var sphere = new THREE.Mesh(
                new THREE.SphereGeometry(
                    radius,
                    segments,
                    rings
                ),
                new THREE.MeshLambertMaterial({
                    color: 0xCC0000
                })
            );

            this.scene.add(sphere);*/
            
            //create point light
            /*var pLight = new THREE.PointLight(0xFFFFFF);

            //set position
            pLight.position.x = 10;
            pLight.position.y = 50;
            pLight.position.z = 130;

            this.scene.add(pLight);*/

            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = '0px';
            
            $('body').append(this.stats.domElement);
        },
        start: function() {
            this._tick();
        },
        //TODO: More intelligent redraw, some expensive calls
        // (such as .render()) don't need to be called every
        //  tick
        _tick: function() {
            //proxy the call so we retain the context
            requestAnimationFrame($.proxy(this._tick, this));

            //useful for throttling framerate for testing
            //0 = show all frames, 1 = half frames, 2 = 1/3 frames, 3 = 1/4 frames, etc...
            if(this.throttle) { this.throttle--; return; }
            this.throttle = 0;
            
            //simulate physics
            //this.scene.simulate();
            
            var delta = this.clock.getDelta();
            
            //update stats box
            this.stats.update();
            
            //update controls
            this.controls.update(delta);

            //update sprite
            for(var s = 0, len = this.sprites.length; s < len; ++s) {
                this.sprites[s].animate(delta);
            }
            
            //do trace/collision checks
            
            //render scene
            this.renderer.render(this.scene, this.camera);
        }
    });

    return Engine;
});