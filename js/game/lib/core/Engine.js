define([
    //Modules
    'game/lib/core/Viewport',
    'game/lib/core/Controls',
    'game/lib/core/TileMap',
    'game/lib/core/Player',
    'game/lib/core/UI'
    //Scritps that modify global
    //'game/lib/core/three_fpcontrols'
], function(Viewport, Controls, TileMap, Player, UI) {
    var Engine = Class.extend({
        init: function(elements, resources) {
            this.debug = true;

            if(this.debug) window.engine = this;

            //setup game
            this.entities = [];
            this.ui = new UI(elements, this);
            this.scene = new THREE.Scene();
            this.clock = new THREE.Clock();
            this.renderer = new THREE.WebGLRenderer();
            this.viewport = new Viewport(elements.container, this.renderer);

            //show mudora text
            /*this.ui.showDialog([
                '`~`^`~`^`^`',
                '`^`~`~`^`~',
                '`^`~`~`^`~`'
            ]);*/

            //camera setup
            var width = this.viewport.width, height = this.viewport.height;
            this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);//new THREE.PerspectiveCamera(60, this.viewport.aspect(), 1, 10000);
            this.camera.position.z = 250;
            this.scene.add(this.camera);
            this.viewport.setCamera(this.camera);

            //map setup
            this.map = new TileMap(resources.maps.lightworld, this.viewport);
            this.map.addToScene(this.scene);

            //controls setup
            this.controls = new Controls(this.viewport, this.camera, this.map);//new THREE.FirstPersonControls(this.camera);
            this.controls.lockCamera.x = this.controls.lockCamera.y = true;

            //setup player
            this.player = new Player(resources.entities.link, this);
            this.player.addToScene(this.scene);

            //create entities (enemies, items, bushes, etc)
            //this.entities.push(link);

            //add ambient light
            this.scene.add(new THREE.AmbientLight(0xFFFFFF));

            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = '0px';
            
            $('body').append(this.stats.domElement);
        },
        start: function() {
            this._tick();
        },
        destroyMesh: function(mesh) {
            this.scene.remove(mesh);
            this.renderer.deallocateObject(mesh);
        },
        destroyTexture: function(tex) {
            this.renderer.deallocateTexture(tex);
        },
        destroyEntity: function(ent) {
            this.destroyMesh(ent._mesh);

            if(ent.texture)
                this.destroyTexture(ent.texture);
        },
        loadZone: function(zone) { //loads and places all the entities in a zone

        },
        unloadZone: function(zone) { //cleans up all the entities in a zone
            for(var i = 0, il = this.entities.length; i < il; ++i) {
                this.destryEntity(this.entities[i]);
            }
        },
        //TODO: More intelligent redraw, some expensive calls (such as .render() and entity updates)
        //don't need to be called every tick
        _tick: function() {
            //proxy the call so we retain the context
            requestAnimationFrame($.proxy(this._tick, this));

            //useful for throttling framerate for testing
            //0 = show all frames, 1 = half frames, 2 = 1/3 frames, 3 = 1/4 frames, etc...
            if(this.throttle) { this.throttle--; return; }
            this.throttle = 0;
            
            var delta = this.clock.getDelta();
            
            //update stats box
            this.stats.update();
            
            //update controls
            this.controls.update(delta);

            //update player entity
            this.player.update(delta);

            //update other entities
            for(var i = 0, il = this.entities.length; i < il; ++i) {
                if(this.entities[i] && this.entities[i].update)
                    this.entities[i].update(delta);
            }
            
            //update UI
            //TODO: this should only update when dirty, not all the time
            this.ui.update(delta);
            
            //render scene
            this.renderer.render(this.scene, this.camera);
        }
    });

    return Engine;
});