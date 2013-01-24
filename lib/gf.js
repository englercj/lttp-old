/**
 * @license GrapeFruit Game Engine - v0.0.1
 * Copyright (c) 2012, Chad Engler
 * http://patherdev.com
 *
 * Compiled: 2013-01-24
 *
 * GrapeFruit Game Engine is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(window, undefined) {
    document = window.document;

/**
* @license GrapeFruit Game Engine
* Copyright (c) 2012, Chad Engler
*
* GrapeFruit is licensed under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
*
*/

/****************************************************************************
 * Global GrapeFruit Object
 ****************************************************************************/
window.gf = window.gf || {};

/****************************************************************************
 * GrapeFruit Version
 ****************************************************************************/
gf.version = '0.0.1';

/****************************************************************************
 * GrapeFruit Type Constants
 ****************************************************************************/
gf.types = {
    //Entity types
    ENTITY: {
        PLAYER: 'player',
        ENEMY: 'enemy',
        FRIENDLY: 'friendly',
        NEUTRAL: 'neutral',
        COLLECTABLE: 'collectable'
    },
    //Layer types
    LAYER: {
        TILE_LAYER: 'tilelayer',
        OBJECT_GROUP: 'objectgroup' // each zone is defined as an object group
    },
    //Tile collision types
    COLLISION: {
        NONE: 'none',
        SOLID: 'solid',
        CLIFF: 'cliff',
        LADDER: 'ladder',
        WATER: 'water',
        DEEP_WATER: 'deep_water'
    },
    //Half tile types
    HALF: {
        LEFT: 'left',
        RIGHT: 'right',
        TOP: 'top',
        BOTTOM: 'bottom'
    },
    //pubsub events
    EVENT: {
        ENTITY_MOVE: 'gf.entity.move',
        LOADER_START: 'gf.loader.start',
        LOADER_ERROR: 'gf.loader.error',
        LOADER_PROGRESS: 'gf.loader.progress',
        LOADER_LOAD: 'gf.loader.load',
        LOADER_COMPLETE: 'gf.loader.complete'
    },
    //resource types
    RESOURCE: {
        AUDIO: 'audio',
        SOUND: 'sound',
        MUSIC: 'music',
        JSON: 'json',
        XML: 'xml',
        WORLD: 'world',
        TEXTURE: 'texture',
        SPRITE: 'sprite',
        IMAGE: 'image'
    },
    //Bindable keycodes
    KEY: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        DELETE: 46,
        NUM0: 48,
        NUM1: 49,
        NUM2: 50,
        NUM3: 51,
        NUM4: 52,
        NUM5: 53,
        NUM6: 54,
        NUM7: 55,
        NUM8: 56,
        NUM9: 57,
        PLUS: 61,
        A : 65,
        B : 66,
        C : 67,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        H : 72,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        M : 77,
        N : 78,
        O : 79,
        P : 80,
        Q : 81,
        R : 82,
        S : 83,
        T : 84,
        U : 85,
        V : 86,
        W : 87,
        X : 88,
        Y : 89,
        Z : 90,
        NUMPAD0: 96,
        NUMPAD1: 97,
        NUMPAD2: 98,
        NUMPAD3: 99,
        NUMPAD4: 100,
        NUMPAD5: 101,
        NUMPAD6: 102,
        NUMPAD7: 103,
        NUMPAD8: 104,
        NUMPAD9: 105,
        NUMPAD_STAR: 106,
        NUMPAD_PLUS: 107,
        NUMPAD_MINUS: 109,
        NUMPAD_DOT: 110,
        NUMPAD_SLASH: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        MINUS: 173,
        TILDE: 192
    },
    //Bindable Mouse Events
    MOUSE: {
        WHEEL: 'mousewheel',
        MOVE: 'mousemove',
        DOWN: 'mousedown',
        UP: 'mouseup',
        CLICK: 'click',
        DBLCLICK: 'dblclick',
        RCLICK: 'contextmenu',
        CONTEXTMENU: 'contextmenu'
    },
    TOUCH: {
        //WHEEL: undefined,
        MOVE: 'touchmove',
        START: 'touchstart',
        END: 'touchend',
        TAP: 'tap',
        DBLTAP: 'dbltap',
        //RCLICK: undefined,
        //CONTEXTMENU: undefined
    },
    //Bindable Gamepad Buttons
    GP_BUTTONS: {
        FACE_1: 0, // Face (main) buttons
        FACE_2: 1,
        FACE_3: 2,
        FACE_4: 3,
        LEFT_SHOULDER: 4, // Top shoulder buttons
        RIGHT_SHOULDER: 5,
        LEFT_TRIGGER: 6, // Bottom shoulder buttons
        RIGHT_TRIGGER: 7,
        SELECT: 8,
        START: 9,
        LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
        RIGHT_ANALOGUE_STICK: 11,
        PAD_TOP: 12, // Directional (discrete) pad
        PAD_BOTTOM: 13,
        PAD_LEFT: 14,
        PAD_RIGHT: 15
    },
    getGpButtonName: function(i) {
        var name = '';

        gf.utils.each(gf.types.GP_BUTTONS, function(k, v) {
            if(v == i) {
                name = k;
                return false; //break
            }
        });

        return name;
    },
    //Bindable Gamepad Axes
    GP_AXES: {
        LEFT_ANALOGUE_HOR: 0,
        LEFT_ANALOGUE_VERT: 1,
        RIGHT_ANALOGUE_HOR: 2,
        RIGHT_ANALOGUE_VERT: 3
    },
    getGpAxisName: function(i) {
        var name = '';

        gf.utils.each(gf.types.GP_AXES, function(k, v) {
            if(v == i) {
                name = k;
                return false; //break
            }
        });

        return name;
    }
};

/****************************************************************************
 * GrapeFruit Browser Support Sniffing
 ****************************************************************************/
gf.support = {
    //user agent
    ua: navigator.userAgent.toLowerCase(),

    //canvas supported?
    canvas: !!window.CanvasRenderingContext2D,

    //webgl supported?
    webgl: (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })(),

    //web workers supported?
    workers: !!window.Worker,

    //fileapi supported?
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    //can this browser play audio?
    audio: {
        play: !!document.createElement('audio').canPlayType,
        m4a: false,
        mp3: false,
        ogg: false,
        wav: false,
    },

    //local storage supported?
    localStorage: !!window.localStorage,

    //is this a touch device
    touch: ('createTouch' in document) || ('ontouchstart' in $) || (navigator.isCocoonJS),

    //gamepad API supported?
    gamepad: !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') != -1)
};

//additional audio support checks
if(gf.support.audio.play) {
    var a = document.createElement('audio');

    gf.support.audio.m4a = !!a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, '');
    gf.support.audio.mp3 = !!a.canPlayType('audio/mpeg').replace(/no/, '');
    gf.support.audio.ogg = !!a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '');
    gf.support.audio.wav = !!a.canPlayType('audio/wav; codecs="1"').replace(/no/, '');

    //check for specific platforms
    if(gf.support.ua.search('iphone') > -1 || gf.support.ua.search('ipod') > -1 ||
        gf.support.ua.search('ipad') > -1 || gf.support.ua.search('android') > -1) {

        //if on mobile device, without a specific HTML5 acceleration framework
        if(!navigator.isCocoonJS) {
            gf.support.audio.play = false;
        }
    }
}

/****************************************************************************
 * GrapeFruit Version Checking
 ****************************************************************************/
//returns a number representing how far off a version is.
//
//will return a negative value if the first version is behind the second,
//the negative number will show how many versions behind it is on largest version
//point.
//That is: '1.0' compared with '1.1' will yield -1
//and    : '1.2.3' compared with '1.2.1' will yield -2
//
//0 is returned if the versions match, and a positive number is returned if
//the first version is larger than the second.
gf.checkVersion = function(first, second) {
    second = second || gf.version;

    var a = first.split('.'),
        b = second.split('.'),
        len = Math.min(a.length, b.length),
        result = 0;

    for(var i = 0; i < len; ++i) {
        if(result = +a[i] - +b[i]) {
            break;
        }
    }

    return result ? result : a.length - b.length;
};

/****************************************************************************
 * Javascript Inheritance Helper (use functional mixins instead?)
 ****************************************************************************/

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    
// The base Class implementation (does nothing)
Class = function() {};

// Create a new Class that inherits from this class
Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
                return function() {
                    var tmp = this._super;
                   
                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];
                   
                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                   
                    return ret;
                };
            })(name, prop[name]) :
            prop[name];
    }
    
    // The dummy class constructor
    Class = function () {
        // All construction is actually done in the init method
        if ( !initializing && this.init )
            this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.constructor = Class;
    
    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
};

/****************************************************************************
 * Main game object
 ****************************************************************************/

(function() {
    gf.game = {
        //array of objects in the scene
        objects: {},
        numObjects: 0,

        //special user-defined entity types
        entTypes: {},

        //maximum Z index, where the camera lies
        MAX_Z: 500,

        //raw THREE objects that will control rendering
        _scene: new THREE.Scene(),
        _clock: new THREE.Clock(false),
        _renderer: null,
        _camera: null,

        //id for the next entity to be added
        _nextId: Date.now(),

        //the object that will contain the render domElement
        _cont: null,

        //have we initialized the game already?
        _initialized: false,

        init: function(contId, opts) {
            if(gf.controls._initialized) return;

            opts = opts || {};

            gf.game.gravity = (opts.gravity !== undefined ? opts.velocity : 0.98);
            gf.game.friction = gf.utils.ensureVector(opts.friction);
            gf.game.clearColor = opts.clearColor || 0xcccccc;

            /****************************************************************************
             * Choose a render method (WebGL or Canvas)
             ****************************************************************************/
            //if they speciy a method, check if it is available
            if(opts.renderMethod) {
                if(!gf.support[renderMethod]) {
                    throw 'Render method ' + renderMethod + ' is not supported by this browser!';
                    return;
                }
            }
            //if they don't specify a method, guess the best to use
            else {
                if(gf.support.webgl) renderMethod = 'webgl';
                else if(gf.support.canvas) renderMethod = 'canvas';
                else {
                    throw 'Neither WebGL nor Canvas is supported by this browser!';
                    return;
                }
            }

            //initialize the correct renderer
            if(renderMethod == 'webgl') {
                gf.game._renderer = new THREE.WebGLRenderer({
                    //can also specify 'canvas' dom element, but we just let THREE generate one
                    precision: 'highp',
                    alpha: true,
                    premultipliedAlpha: true,
                    antialias: false,
                    clearColor: gf.game.clearColor,
                    clearAlpha: 0,
                    maxLights: 4
                });
            } else if(renderMethod == 'canvas') {
                gf.game._renderer = new THREE.CanvasRenderer({
                    //can also specify 'canvas' dom element, but we just let THREE generate one
                });
            }

            gf.game._renderMethod = renderMethod;

            /****************************************************************************
             * Setup game container
             ****************************************************************************/
            //cache the container object
            gf.game._cont = document.getElementById(contId);

            var w = opts.width || gf.utils.getStyle(gf.game._cont, 'width'),
                h = opts.height || gf.utils.getStyle(gf.game._cont, 'height');

            //initialize the renderer
            gf.game._renderer.domElement.style['z-index'] = 5;
            gf.game._renderer.setSize(w, h);
            gf.game._cont.appendChild(gf.game._renderer.domElement);

            /****************************************************************************
             * Initialize the camera and lighting
             ****************************************************************************/
            //initialize the camera
            gf.game._camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 1000);
            gf.game._camera.position.z = gf.game.MAX_Z;

            gf.game._scene.add(this.camera);

            //add ambient light to the scene
            gf.game._scene.add(new THREE.AmbientLight(0xffffff));

            /****************************************************************************
             * Initialize the various game components
             ****************************************************************************/
            //initialize the controls
            gf.controls.init();

            //initialize the audio player
            gf.audio.init();

            //initialize the GUI (HUD, menus, etc)
            gf.gui.init();

            //initialize gamepad support
            gf.gamepad.init();

            /****************************************************************************
             * Add some debug elements
             ****************************************************************************/
            //fps counter
            if(gf.debug.showFps) {
                gf.debug._fpsCounter = new gf.debug.FpsCounter();
                gf.utils.each(gf.debug.fpsStyle, function(k, v) { gf.debug._fpsCounter.domElement.style[k] = v; });
                document.body.appendChild(gf.debug._fpsCounter.domElement);
            }

            //debug info
            if(gf.debug.showInfo) {
                gf.debug._info = new gf.debug.Info();
                gf.utils.each(gf.debug.infoStyle, function(k, v) { gf.debug._info.domElement.style[k] = v; });
                document.body.appendChild(gf.debug._info.domElement);
            }

            gf.game._initialized = true;

            return this;
        },
        getNextObjectId: function() {
            return gf.game._nextId++;
        },
        addObject: function(obj) {
            if(!obj) return;

            if(!obj.id) obj.id = gf.game.getNextObjectId();
            if(!gf.game.objects[obj.id]) gf.game.numObjects++;

            gf.game.objects[obj.id] = obj;

            if(obj.addToScene) obj.addToScene(gf.game._scene);

            if(obj.type == gf.types.ENTITY.PLAYER)
                gf.game.player = obj;

            return this;
        },
        removeObject: function(obj) {
            if(!obj) return;

            //remove object from our list
            delete gf.game.objects[obj.id];
            gf.game.numObjects--;

            if(obj.removeFromScene) obj.removeFromScene(gf.game._scene);

            if(obj.type == gf.types.ENTITY.PLAYER)
                gf.game.player = null;

            //deallocate resources for this entity
            gf.game._dealloc(obj._geom, obj._materials);
            gf.game._dealloc(obj._hitboxGeom, obj._hitboxMaterial);

            return this;
        },
        _dealloc: function(geom, mats) {
            if(mats) {
                if(mats instanceof Array) {
                    mats.forEach(function(mat) { mat.dispose(); });
                }
                else mats.dispose();
            }

            if(geom) geom.dispose();
        },
        loadWorld: function(world) {
            if(typeof world == 'string'){
                if(gf.resources[world]) world = gf.resources[world].data;
                else {
                    throw 'World not found in resources!';
                    return;
                }
            }

            gf.game.world = new gf.TiledMap(world);
            gf.game.addObject(gf.game.world);

            if(gf.game.world.properties.music) {
                gf.audio.play(gf.game.world.properties.music);
            }

            return this;
        },
        render: function() {
            gf.game._clock.start();
            gf.game._tick();

            return this;
        },
        //Check if passed entity collides with any others
        checkCollisions: function(obj) {
            var colliders = [];

            gf.utils.each(gf.game.objects, function(id, o) {
                //check if this object collides with any others
                if(o.inViewport && o.isVisible && o.isCollidable && o.isEntity && (o != obj)) {
                    var collisionVector = o.checkCollision(obj);
                    if(collisionVector.x !== 0 && collisionVector.y !== 0) {
                        colliders.push({
                            entity: o,
                            vector: collisionVector
                        });
                        o.onCollision(obj);
                    }
                }
            });

            return colliders;
        },
        //lock the camera on an entity
        cameraTrack: function(ent) {
            if(ent.isEntity) {
                if(this._trackedEntMoveHandle) {
                    gf.event.unsubscribe(this._trackedEntMoveHandle);
                }

                gf.game._camera.position.x = ent._mesh.position.x;
                gf.game._camera.position.y = ent._mesh.position.y;
                this._trackedEntMoveHandle = gf.event.subscribe(gf.types.EVENT.ENTITY_MOVE + '.' + ent.id, function(velocity) {
                    gf.game._camera.translateX(velocity.x);
                    gf.game._camera.translateY(velocity.y);

                    //If this gets heavy, then just remove it
                    //update if each object is within the viewport

                    //update matrices
                    //gf.game._camera.updateMatrix(); // make sure camera's local matrix is updated
                    //gf.game._camera.updateMatrixWorld(); // make sure camera's world matrix is updated
                    //gf.game._camera.matrixWorldInverse.getInverse( camera.matrixWorld );
                    var frustum = new THREE.Frustum();
                    frustum.setFromMatrix(new THREE.Matrix4().multiply(gf.game._camera.projectionMatrix, gf.game._camera.matrixWorldInverse));
                    gf.utils.each(gf.game.objects, function(id, o) {
                        if(o.isEntity && o._mesh && o._mesh.geometry) {
                            //o._mesh.updateMatrix(); // make sure plane's local matrix is updated
                            //o._mesh.updateMatrixWorld(); // make sure plane's world matrix is updated
                            o.inViewport = frustum.contains(o._mesh);
                        }
                    });
                });
            }

            return this;
        },
        _tick: function() {
            //start render loop
            requestAnimationFrame(gf.game._tick);

            //get clock delta
            gf.game._delta = gf.game._clock.getDelta();

            //update fps box
            if(gf.debug._fpsCounter) gf.debug._fpsCounter.update();

            //update debug info
            if(gf.debug._info) gf.debug._info.update();

            //update the HUD
            if(gf.HUD.initialized) gf.HUD.update();

            //update the gamepad poller
            gf.gamepad.update();

            //update each object
            gf.utils.each(gf.game.objects, function(id, o) {
                if(o.inViewport && o.isVisible && o.update) {
                    o.update();
                }
            });

            //render scene
            gf.game._renderer.render(gf.game._scene, gf.game._camera);
        }
    };
})();
(function() {
    //the list of audio channels
    var playing = {},
        resetTime = 0;

    gf.audio = {
        //have we initialized the audio already?
        _initialized: false,

        init: function() {
            if(gf.audio._initialized) return;

            //activeAudioExt = gf.audio.getSupportedAudioFormat(!!format ? format.toString() : 'mp3');

            gf.audio._initialized = true;
        },
        play: function(soundid, opts, cb) {
            if(!gf.resources[soundid]) return this;

            if(typeof opts == 'function') {
                cb = opts;
                opts = null;
            }

            opts = opts || {};

            //paused
            if(playing[soundid]) {
                playing[soundid].play();
                return this;
            }

            var sound = playing[soundid] = gf.resources[soundid].data;
            sound.loop = opts.loop || false;
            sound.volume = opts.volume || 1.0;
            sound.play();

            if(!opts.loop) {
                sound.addEventListener('ended', function(e) {
                    sound.removeEventListener('ended', arguments.callee, false);
                    sound.pause();
                    sound.currentTime = resetTime;
                    delete playing[soundid];
                    if(cb) cb();
                }, false);
            }

            return this;
        },
        stop: function(soundid) {
            if(!playing[soundid]) return this;

            playing[soundid].pause();
            playing[soundid].currentTime = resetTime;
            delete playing[soundid];

            return this;
        },
        pause: function(soundid) {
            if(!playing[soundid]) return this;

            playing[soundid].pause();

            return this;
        },
        isPlaying: function(soundid) {
            return !!playing[soundid];
        }
    };
})();
(function() {
    gf.controls = {
        key: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many keys an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {}
        },
        mouse: {
            //maps a mouse event to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many keys an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //the current screen touches
            touches: [{ x: 0, y: 0 }],
            //the position of the mouse
            position: new THREE.Vector2(0, 0),
            //the offset of the mouse
            offset: null
        },
        gpButton: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many buttons an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //track the status of each button
            buttons: {}
        },
        gpStick: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many buttons an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //track the status of the axes
            axes: {}
        },

        //have we initialized the controls already?
        _initialized: false,

        init: function() {
            if(gf.controls._initialized) return;

            gf.controls.mouse.offset = gf.utils.getOffset(gf.game._renderer.domElement);

            document.addEventListener('keydown', gf.controls.onKeyDown, false);
            document.addEventListener('keyup', gf.controls.onKeyUp, false);

            //bind all the mouse/touch events
            if(gf.support.touch) {
                gf.game._cont.addEventListener('touchmove', gf.controls.onMouseMove, false);
                gf.utils.each(gf.types.TOUCH, function(k, v) {
                    if(v === 'touchmove') return;
                    gf.game._cont.addEventListener(v, gf.controls.onTouch, false);
                });
            } else {
                gf.game._cont.addEventListener('mousemove', gf.controls.onMouseMove, false);
                document.addEventListener('mousewheel', gf.controls.onMouseWheel, false);
                gf.utils.each(gf.types.MOUSE, function(k, v) {
                    if(v === 'mousemove' || v === 'mousewheel') return;
                    gf.game._cont.addEventListener(v, gf.controls.onMouse, false);
                });
            }

            gf.controls._initialized = true;
        },
        //binds an action to a keycode
        bindKey: function(keycode, action, fn) {
            return gf.controls._doBind('key', keycode, action, fn);
        },
        //binds an action to mouse event
        bindMouse: function(evt, action, fn) {
            return gf.controls._doBind('mouse', evt, action, fn);
        },
        //binds an action to a gamepad button
        bindGamepadButton: function(code, action, fn) {
            return gf.controls._doBind('gpButton', code, action, fn);
        },
        //bind an action to a stick movement
        bindGamepadStick: function(code, negative, action, fn) {
            negative = !!negative; //I want gf.controls to be true/false, not truthy or falsey

            return gf.controls._doBind('gpStick', code.toString() + negative, action, fn);
        },
        //unbind an action from a keycode
        unbindKey: function(keycode) {
            return gf.controls._doUnbind('key', keycode);
        },
        //unbind an action to mouse event
        unbindMouse: function(evt) {
            return gf.controls._doUnbind('mouse', evt);
        },
        //unbind an action from a gamepad button
        unbindGamepadButton: function(code) {
            return gf.controls._doUnbind('gpButton', code);
        },
        //bind an action to a stick movement
        unbindGamepadStick: function(code, negative) {
            negative = negative ? true : false; //I want gf.controls to be true/false, not truthy or falsey

            return gf.controls._doUnbind('gpStick', code.toString() + negative);
        },
        //on keydown event set gf.controls keycode's action as active
        //and call any registered callbacks
        onKeyDown: function(e, override) {
            var which = override || e.keyCode || e.which;

            //if gf.controls key is bound
            if(gf.controls.key.binds[which]) {
                //track that gf.controls action is active
                gf.controls.key.status[gf.controls.key.binds[which]] = true;

                //call each callback
                var cbs = gf.controls.key.callbacks[gf.controls.key.binds[which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        if(cbs[i].code === which)
                            cbs[i].fn(gf.controls.key.binds[which], true);
                    }
                }

                return gf.controls.preventDefault(e);
            }

            return gf.controls;
        },
        onKeyUp: function(e, override) {
            var which = override || e.keyCode || e.which;

            //if gf.controls key is bound
            if(gf.controls.key.binds[which]) {
                //track that gf.controls action is active
                gf.controls.key.status[gf.controls.key.binds[which]] = false;

                //call each callback
                var cbs = gf.controls.key.callbacks[gf.controls.key.binds[which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        if(cbs[i].code === which)
                            cbs[i].fn(gf.controls.key.binds[which], false);
                    }
                }

                return gf.controls.preventDefault(e);
            }

            return gf.controls;
        },
        //mouse/touch move event
        onMouseMove: function(e) {
            gf.controls.updateCoords(e);

            if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);

            return true;
        },
        //generic mouse event (click, down, up, etc)
        onMouse: function(e) {
            gf.controls.updateCoords(e);

            if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);

            //incase touch event button is undefined
            var keycode = gf.controls.mouse.binds[e.button || 0];

            if(keycode) {
                if(e.type === 'mousedown' || e.type === 'touchstart')
                    return gf.controls.onKeyDown(e, keycode);
                else
                    return gf.controls.onKeyUp(e, keycode);
            }

            return true;
        },
        onMouseWheel: function(e) {
            if(e.target == gf.game._renderer.domElement) {
                if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);
            }

            return true;
        },
        //generic touch event (tap, start, end, etc)
        onTouch: function(e) {
            gf.controls.updateCoords(e);

            return gf.controls.onMouse(e);
        },
        //update the mouse coords
        updateCoords: function(e) {
            gf.controls.mouse.touches.length = 0;

            var off = gf.controls.mouse.offset;

            //mouse event
            if(!e.touches) {
                gf.controls.mouse.touches.push({
                    x: e.pageX - off.left,
                    y: e.pageY - off.top,
                    id: 0
                });
            }
            //touch event
            else {
                for(var i = 0, il = e.changedTouches.length; i < il; ++i) {
                    var t = e.changedTouches[i];

                    gf.controls.mouse.touches.push({
                        x: t.clientX - off.left,
                        y: t.clientY - off.top
                    });
                }
            }
            gf.controls.mouse.position.set(gf.controls.mouse.touches[0].x, gf.controls.mouse.touches[0].y);
        },
        dispatchMouseEvent: function(e) {
            if(gf.controls.mouse.binds[e.type]) {
                //track that gf.controls action is active
                gf.controls.mouse.status[gf.controls.mouse.binds[e.type]] = true;

                //for each touch
                var cbs = gf.controls.mouse.callbacks[gf.controls.mouse.binds[e.type]];
                if(cbs) {
                    for(var t = 0, tl = gf.controls.mouse.touches.length; t < tl; ++t) {
                        //call each callback
                        for(var i = 0, il = cbs.length; i < il; ++i) {
                            if(cbs[i].code === e.type)
                                cbs[i].fn(gf.controls.mouse.binds[e.type], gf.controls.mouse.touches[t]);
                        }
                    }

                    return gf.controls.preventDefault(e);
                }

                return true;
            }
        },
        //helper to prevent default stuffs accross different browsers
        preventDefault: function(e) {
            if(e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true;

            if(e.preventDefault) e.preventDefault();
            else e.returnValue = false;

            return false;
        },
        //check if an action is active accross any binds
        isActionActive: function(action) {
            return gf.controls.key.status[action] ||
                    gf.controls.mouse.status[action] ||
                    gf.controls.gpButton.status[action] ||
                    gf.controls.gpStick.status[action];
        },
        _doBind: function(type, code, action, fn) {
            gf.controls[type].binds[code] = action;
            gf.controls[type].bindCount[action]++;
            gf.controls[type].status[action] = false;

            if(fn) {
                if(gf.controls[type].callbacks[action]) gf.controls[type].callbacks[action].push({ code: code, fn: fn });
                else gf.controls[type].callbacks[action] = [{ code: code, fn: fn }];
            }

            return gf.controls;
        },
        _doUnbind: function(type, code) {
            var act = gf.controls[type].binds[code];

            delete gf.controls[type].binds[code];

            gf.controls[type].bindCount[action]--;

            if(gf.controls[type].bindCount <= 0) {
                gf.controls[type].bindCount = 0;
                delete gf.controls[type].status[action];
                delete gf.controls[type].callbacks[action];
            }

            return gf.controls;
        },
    };
})();
//Got some help from html5Rocks :)
//https://github.com/html5rocks/www.html5rocks.com/blob/master/content/tutorials/doodles/gamepad/static/gamepad-tester/gamepad.js

(function() {
    gf.gamepad = {
        // A number of typical buttons recognized by Gamepad API and mapped to
        // standard controls. Any extraneous buttons will have larger indexes.
        TYPICAL_BUTTON_COUNT: 16,

        // A number of typical axes recognized by Gamepad API and mapped to
        // standard controls. Any extraneous buttons will have larger indexes.
        TYPICAL_AXIS_COUNT: 4,

        // How “deep” does an analogue button need to be depressed to consider it
        // a button down.
        ANALOGUE_BUTTON_THRESHOLD: 0.4,

        AXIS_THRESHOLD: 0.5,

        //are we polling for status/connections?
        ticking: false,

        //the currently activated gamepads list
        pads: [],

        //timestamp tracking for state changes
        prevTimestamps: [],

        //have we initialized the controls already?
        _initialized: false,

        init: function() {
            if(gf.gamepad._initialized) return;

            //Firefox uses connect/disconnect events so listen to those
            window.addEventListener('MozGamepadConnected', gf.gamepad.onGamepadConnect, false);
            window.addEventListener('MozGamepadDisconnected', gf.gamepad.onGamepadDisconnect, false);

            //Since chrome only supports polling, we have to start looping immediately
            if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
                gf.gamepad.startPolling();
            }

            gf.gamepad._initialized = true;
        },
        //When a gamepad is connected (currently FF only)
        onGamepadConnect: function(event) {
            //add the gamepad to our list
            gf.gamepad.pads.push(event.gamepad);

            //start polling
            gf.gamepad.startPolling();
        },
        onGamepadDisconnect: function(event) {
            //remove the gamepad from our list
            for(var i = 0, il = pads.length; i < il; ++i) {
                if(gf.gamepad.pads[i].index == event.gamepad.index) {
                    gf.gamepad.pads.splice(i, 1);
                    break;
                }
            }

            //if no pads left connected, stop polling
            if(gf.gamepad.pads.length === 0)
                gf.gamepad.stopPolling();
        },
        startPolling: function() {
            if(gf.gamepad.ticking) return;

            gf.gamepad.ticking = true;
            gf.gamepad.update();
        },
        stopPolling: function() {
            gf.gamepad.ticking = false;
        },
        //called on Chrome, which doesn't do the connect/disconnect events
        pollGamepads: function() {
            //get a list of connected gamepads
            var rawPads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;

            if(rawPads) {
                //reset the pads list
                gf.gamepad.pads = [];

                //don't use the raw array from the browser, since it can have "holes"
                //if you plug in 2, then remove the first the second one is still index 1 (not 0)
                for(var i = 0, il = rawPads.length; i < il; ++i) {
                    if(rawPads[i]) {
                        gf.gamepad.pads.push(rawPads[i]);
                    }
                }
            }
        },
        pollStatus: function() {
            for(var i = 0, il = gf.gamepad.pads.length; i < il; ++i) {
                var pad = gf.gamepad.pads[i];

                //don't do anything if the current timestamp is the same as the previous one
                //(meaning the state has not changed). This is a chrome-only feature right now,
                //so first we have to check if it is empty as well
                if(pad.timestamp && (pad.timestamp == gf.gamepad.prevTimestamps[i]))
                    continue;

                gf.gamepad.prevTimestamps[i] = pad.timestamp;

                //I would like to be able to emit events when something updates, but for now
                //just update the status of bound keys in controls; controls only has 1 "gamepad"
                //so this loop will blow away the changes each iteration (only the "last" gamepad is supported)
                for(var b = 0, bl = pad.buttons.length; b < bl; ++b) {
                    if(!gf.controls.gpButton.binds[b]) continue;

                    var pressed = (pad.buttons[b] > gf.gamepad.ANALOGUE_BUTTON_THRESHOLD);

                    if(!gf.controls.gpButton.buttons[b])
                        gf.controls.gpButton.buttons[b] = { pressed: false, code: b };

                    gf.controls.gpButton.buttons[b].val = pad.buttons[b];

                    //state changed
                    if(gf.controls.gpButton.buttons[b].pressed !== pressed) {
                        gf.controls.gpButton.buttons[b].pressed = pressed;
                        //call each callback
                        var cbs = gf.controls.gpButton.callbacks[gf.controls.gpButton.binds[b]];
                        if(cbs) {
                            for(var i = 0, il = cbs.length; i < il; ++i) {
                                if(cbs[i].code === b)
                                    cbs[i].fn(gf.controls.gpButton.binds[b], pressed);
                            }
                        }
                        gf.controls.gpButton.status[gf.controls.gpButton.binds[b]] = pressed;
                    }
                }

                for(var a = 0, al = pad.axes.length; a < al; ++a) {
                    gf.utils.each(['true', 'false'], function(i, v) {
                        if(!gf.controls.gpStick.binds[a + v]) return;

                        var moved = v == 'true' ? (pad.axes[a] < -gf.gamepad.AXIS_THRESHOLD) : (pad.axes[a] > gf.gamepad.AXIS_THRESHOLD);

                        if(!gf.controls.gpStick.axes[a + v])
                            gf.controls.gpStick.axes[a + v] = { moved: false, code: a, negative: v == 'true' };

                        gf.controls.gpStick.axes[a + v].val = pad.axes[a];

                        //movement state updated
                        if(gf.controls.gpStick.axes[a + v].moved !== moved) {
                            gf.controls.gpStick.axes[a + v].moved = moved;
                            //call each callback
                            var cbs = gf.controls.gpStick.callbacks[gf.controls.gpStick.binds[a + v]];
                            if(cbs) {
                                for(var i = 0, il = cbs.length; i < il; ++i) {
                                    if(cbs[i].code === a)
                                        cbs[i].fn(gf.controls.gpStick.binds[a + v], pad.axes[a]);
                                }
                            }
                            gf.controls.gpStick.status[gf.controls.gpStick.binds[a + v]] = moved;
                        }
                    });
                }
            }
        },
        update: function() {
            if(!gf.gamepad.ticking) return;

            //DAMN YOU CHROME!
            gf.gamepad.pollGamepads();

            //poll for the status of our gamepads
            gf.gamepad.pollStatus();
        }
    };
})();
(function() {
    gf.debug = {
        //show fps counter
        showFps: false,
        fpsStyle: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            'z-index': 10
        },

        //provide detailed debug info such as player position, number of entities,
        // tiles the player is colliding with.
        showInfo: false,
        infoStyle: {
            position: 'absolute',
            top: '50px',
            left: '0px',
            'z-index': 10,
            color: '#fff',
            'font-size': '0.9em'
        },

        //draw hitboxes on entities
        showHitbox: false,
        hitboxColor: new THREE.Color(0xff00ff),

        //draw outline around entities
        showOutline: false,
        outlineColor: new THREE.Color(0x000000),

        //provide access directly to the tiledmap layer shader uniforms
        accessTiledUniforms: false,
        tiledUniforms: [],

        //draw map collision points
        showMapColliders: false,

        //show gamepad info in the info box
        showGamepadInfo: false,

        /****************************************************************************
         * DebugInfo box that displays live-updaing debug info
         ****************************************************************************/
        Info: function() {
            var br = document.createElement('br');

            //container
            var container = document.createElement('div');
            container.id = 'gf-debug-info';

            //title
            var title = document.createElement('h3');
            title.id = 'gf-debug-info-title';
            title.textContent = 'Debug Info';
            title.style.cssText = 'margin:1px;display:block;';

            container.appendChild(title);

            //number of entities
            var ents = document.createElement('span'),
                entsVal = document.createElement('span');
            ents.id = 'gf-debug-info-entities';
            entsVal.id = 'gf-debug-info-entities-value';
            ents.textContent = 'Number of Objects: ';
            entsVal.textContent = '0';

            ents.appendChild(entsVal);
            container.appendChild(ents);
            container.appendChild(br.cloneNode());

            //gamepads
            var pads = document.createElement('span');
            pads.id = 'gf-debug-info-gamepads';

            container.appendChild(pads);

            //player position
            var pos = document.createElement('span'),
                posVal = document.createElement('span');
            pos.id = 'gf-debug-info-position';
            posVal.id = 'gf-debug-info-position-value';
            pos.textContent = 'Player Position: ';
            posVal.textContent = 'X: 0, Y: 0, Z: 0';

            pos.appendChild(posVal);
            container.appendChild(pos);
            container.appendChild(br.cloneNode());

            //colliding tiles
            var tiles = document.createElement('span'),
                tilesVal = document.createElement('span');
            tiles.id = 'gf-debug-info-tiles';
            tilesVal.id = 'gf-debug-info-tiles-value';
            tiles.textContent = 'Colliding Tiles: ';
            tilesVal.textContent = '';

            tiles.appendChild(tilesVal);
            container.appendChild(tiles);
            container.appendChild(br.cloneNode());

            return {
                REVISION: 1,
                domElement: container,
                update: function() {
                    entsVal.textContent = gf.game.numObjects;
                    posVal.textContent = gf.game.player ?
                                            'X: ' + gf.game.player._hitboxMesh.position.x.toFixed(1) +
                                                ', Y: ' + gf.game.player._hitboxMesh.position.y.toFixed(1) +
                                                ', Z: ' + gf.game.player._hitboxMesh.position.z.toFixed(1) :
                                            'none';

                    if(gf.debug._playerColliders && gf.debug._playerColliders.dirty) {
                        gf.debug._playerColliders.dirty = false;
                        tilesVal.innerHTML = '<br/>';
                        for(var i = 0, il = gf.debug._playerColliders.length; i < il; ++i) {
                            tilesVal.innerHTML += '&nbsp;&nbsp;&nbsp;Tile (' + gf.debug._playerColliders[i].axis + '): ' + 
                                                gf.debug._playerColliders[i].tile.type + 
                                                ' (' + (!!gf.debug._playerColliders[i].tile.normal ? 
                                                        gf.debug._playerColliders[i].tile.normal.x + ', ' + gf.debug._playerColliders[i].tile.normal.y :
                                                        '0, 0')
                                                    + ')<br/>';
                        }
                    }

                    if(gf.debug.showGamepadInfo) {
                        pads.innerHTML = '';
                        if(gf.gamepad.pads && gf.gamepad.pads.length) {
                            for(var i = 0, il = gf.gamepad.pads.length; i < il; ++i) {
                                var pad = gf.gamepad.pads[i];

                                pads.innerHTML += 'Gamepad: [' + pad.index + '] ' + pad.id + '<br/>';
                                pads.innerHTML += '&nbsp;&nbsp;&nbsp;Buttons:<br/>' + 
                                                    pad.buttons.map(function(v, i) { return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + gf.types.getGpButtonName(i) + ': ' + v.toFixed(2); }).join('<br/>') + '<br/>';
                                pads.innerHTML += '&nbsp;&nbsp;&nbsp;Axes:<br/>' + 
                                                    pad.axes.map(function(v, i) { return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + gf.types.getGpAxisName(i) + ': ' + v.toFixed(2); }).join('<br/>') + '<br/>';
                            }
                        }
                    }
                }
            }
        },
        /****************************************************************************
         * mrdoob's stats.js (stats.js r10 - http://github.com/mrdoob/stats.js)
         ****************************************************************************/
        FpsCounter:function(){var l=Date.now(),m=l,g=0,n=1E3,o=0,h=0,p=1E3,q=0,r=0,s=0,f=document.createElement("div");f.id="gf-stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
        i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
        k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
        "block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
        a+"px",m=b,r=0);return b},update:function(){l=this.end()}}}
    };
})();
(function() {
    gf.SceneObject = Class.extend({
        //initialize this scene object
        init: function(settings) {
            //size of the entity
            this.size = new THREE.Vector2(1, 1);

            this.zIndex = settings.zIndex || 0;

            this.inViewport = true;

            //for typing arrays as strings in Tiled
            this._arrayDelim = '|';

            this.id = gf.game.getNextObjectId();

            //raw mesh that is the actual object in the scene
            this._mesh = null;

            this.animationQueue = [];

            gf.utils.setValues(this, settings);
        },
        addToScene: function(scene) {
            this.scene = scene;

            if(this._mesh) scene.add(this._mesh);

            return this;
        },
        removeFromScene: function(scene) {
            this.scene = null;

            if(this._mesh) scene.remove(this._mesh);

            return this;
        },
        //set the position of this object in the scene
        setPosition: function(x, y, z) {
            if(!this._mesh) return;

            var zi = (z !== undefined ? z : (this.zIndex ? this.zIndex : 0));

            if(x instanceof THREE.Vector2)
                this._doSetPos(x.x, x.y, zi);
            else if(x instanceof THREE.Vector3)
                this._doSetPos(x.x, x.y, x.z);
            else if(x instanceof Array) {
                if(x.length === 2) this._doSetPos(x[0], x[1], zi);
                else if(x.length === 3) this._doSetPos(x[0], x[1], x[2]);
            } else
                this._doSetPos(x, y, zi);

            return this;
        },
        _doSetPos: function(x, y, z) {
            if(this._mesh) this._mesh.position.set(x, y, z);

            return this;
        },
        update: function() {
            return this;
        }
        //This is being replaced by TWEEN
        /*update: function() {
            return;
            //go backwards so we can splice off things without destroying the array iteration
            for(var i = this.animationQueue.length - 1; i >= 0 && this.animationQueue.length; --i) {
                var item = this.animationQueue[i], ms = delta * 1000;

                item.ms += ms;
                item.part = ms / item.duration;

                //custom animation function
                if(item.step && typeof item.step == 'function') {
                    item.step(item);
                }

                //do property animation
                for(var p in item.properties) {
                    var op, val = util.getObjectProperty(item.object, p);

                    if(!item.interpol[p]) {
                        op = item.properties[p].toString().match(/^(.=)[ ]*(\-?[\d]+\.?[\d]*)$/);

                        if(op === null) {
                            item.op = '+=';
                            item.interpol[p] = parseInt(item.properties[p], 10) - val;
                        } else {
                            item.op = op[1];
                            item.interpol[p] = parseInt(op[2], 10);
                        }
                    }

                    switch(item.op) {
                        case '+=': val += item.part * item.interpol[p]; break;
                        case '-=': val -= item.part * item.interpol[p]; break;
                        case '*=': val *= item.part * item.interpol[p]; break;
                        case '/=': val /= item.part * item.interpol[p]; break;
                    }

                    util.setObjectProperty(item.object, p, val);
                }

                //complete the animation
                if(item.ms >= item.duration) {
                    if(item.complete && typeof item.complete == 'function') {
                        item.complete(item);
                    }

                    this.animationQueue.splice(i, 1);
                }
            }
        },
        //object to aniamte, properties to animate, duration of animation, completed callback
        //not really "Queue" right now, so much as a "list" of animations. There is no deferal yet
        animate: function(obj, opts) {
            this.animationQueue.push({
                object: obj,
                properties: opts.props,
                duration: opts.duration,
                step: opts.step,
                complete: opts.complete,
                ms: 0,
                interpol: {}
            });
        }*/
    });
})();
(function() {
    //Features TODO:
    // * Methods (https://github.com/obiot/melonJS/blob/master/src/entity/entity.js)
    //      - flipX
    //      - flipY
    //      - doWalk
    //      - doClimb
    //      - doJump
    //      - forceJump
    //      - checkSlope
    //      - updateMovement (slopes/breakable tiles)
    gf.Entity = gf.SceneObject.extend({
        //initializes a new entity with the start position (pos)
        //and properties (settings). Many of these properties can
        //be specified in Tiled.
        init: function(pos, settings) {
            /****************************************************************************
             * Properties that are defined in the `settings` object,
             * these can be specified in the properties of the object layer
             * in Tiled, and overriden on a per-object basis
             ****************************************************************************/
            this.type = gf.types.ENTITY.NEUTRAL;

            //scale of the entity
            this.scale = 1;

            //can collide with other entities
            this.isCollidable = true;

            //can collide with the map when moving
            this.isMapCollidable = true;

            //is the entity visible
            this.isVisible = true;

            //is an entity
            this.isEntity = true;

            //you can still set these in Tiled by using "x|y" notation
            //velocity of the entity (units per tick)
            this.velocity = new THREE.Vector2(0, 0);

            //max velocity to cap the entity at (units per tick)
            this.maxVelocity = new THREE.Vector2(15, 15);

            //acceleration of the entity when moving (units per second)
            this.accel = new THREE.Vector2(250, 250);

            //size of the hitbox
            this.hitSize = new THREE.Vector2(0, 0);

            //offset from the center to have the hitbox NOT IMPLEMENTED
            this.hitOffset = new THREE.Vector2(0, 0);

            //the name of this entitiy
            this.name = '';

            //friction to apply to this entities movement
            this.friction = settings.friction || gf.game.friction;

            //gravity of the world
            this.gravity = settings.gravity || gf.game.gravity;

            //entity alive
            this.alive = true;

            //entity falling (read only)
            this.falling = false;

            //entity jumping (read only)
            this.jumping = false;

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(settings);

            /****************************************************************************
             * Create the actual object for the scene
             ****************************************************************************/
            //if the hitbox size isn't set, use the same as normal size
            if(this.hitSize.x === 0 && this.hitSize.y === 0)
                this.hitSize = this.size.clone();

            //scale size vectors
            this.scaledSize = this.size.clone().multiplyScalar(this.scale);
            this.scaledHitSize = this.hitSize.clone().multiplyScalar(this.scale);
            this.scaledHitOffset = this.hitOffset.clone().multiplyScalar(this.scale);

            //create main entity mesh
            this._createMesh();

            //create a second mesh for the hitbox
            this._createHitboxMesh();

            //set default position
            this.setPosition(pos);
        },
        //calculates distance between this object and another
        distanceTo: function(obj) {
            var dx = this._hitboxMesh.position.x - entity._hitboxMesh.position.x,
                dy = this._hitboxMesh.position.y - entity._hitboxMesh.position.y;

            return Math.sqrt(dx*dx + dy*dy);
        },
        //computes the velocity taking into account gravity, friction, etc
        computeVelocity: function(vel) {
            //apply gravity
            if(this.gravity) {
                vel.y -= !this.onladder ? (this.gravity * gf.game._delta) : 0;

                //check if falling/jumping
                this.falling = (vel.y > 0);
                this.jumping = this.falling ? false : this.jumping;
            }

            //apply friction
            if(this.friction.x) vel.x = gf.utils.applyFriction(vel.x, this.friction.x);
            if(this.friction.y) vel.y = gf.utils.applyFriction(vel.y, this.friction.y);

            //cap velocity
            if(vel.x) vel.x = gf.utils.clamp(vel.x, -this.maxVelocity.x, this.maxVelocity.x);
            if(vel.y) vel.y = gf.utils.clamp(vel.y, -this.maxVelocity.y, this.maxVelocity.y);

            return this;
        },
        //from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
        intersects: function(entity)  {
            return (Math.abs(this._hitboxMesh.position.x - entity._hitboxMesh.position.x) * 2 < (this.hitSize.x + entity.hitSize.x)) && 
                    (Math.abs(this._hitboxMesh.position.y - entity._hitboxMesh.position.y) * 2 < (this.hitSize.y + entity.hitSize.y));
        },
        checkCollision: function(entity) {
            //response vector
            var p = new THREE.Vector2(0, 0);

            //check if hitboxes intersect
            if (this.intersects(entity)) {
                //compute delta between this & entity
                var dx = this._hitboxMesh.position.x - entity._hitboxMesh.position.x,
                    dy = this._hitboxMesh.position.y - entity._hitboxMesh.position.y;

                //compute penetration depth for both axis
                p.x = dx / 2;
                p.y = dy / 2;

                //check and "normalize" axis
                /*if (p.x < p.y) {
                    p.y = 0;
                    p.x = dx < 0 ? -p.x : p.x;
                } else {
                    p.x = 0;
                    p.y = dy < 0 ? -p.y : p.y;
                }*/
            }

            return p;
        },
        addToScene: function(scene) {
            this._super(scene);

            if(this._hitboxMesh) scene.add(this._hitboxMesh);

            return this;
        },
        addToPool: function(name) {
            return gf.entityPool.add(name || this.name, this);
        },
        removeFromScene: function(scene) {
            this._super(scene);

            if(this._hitboxMesh) scene.remove(this._hitboxMesh);

            return this;
        },
        updateMovement: function() {
            if(this.velocity.x === 0 && this.velocity.y === 0) return;

            var colliders = gf.game.world !== undefined ? gf.game.world.checkCollision(this._hitboxMesh, this.scaledHitSize, this.velocity) : [];

            //update flags
            this.onladder = false;

            //collisions
            var self = this;
            gf.utils.each(colliders, function(i, collider) {
                var tile = collider.tile,
                    axis = collider.axis;

                self.onladder = (tile.type == gf.types.COLLISION.LADDER ? true : self.onladder);

                //if a solid tile
                if(tile.type == gf.types.COLLISION.SOLID) {
                    //if it is a slope, apply the normal
                    if(tile.normal && (!self.velocity.x || !self.velocity.y)) {
                        var badMovement = tile.normal.clone().multiplyScalar(self.velocity.dot(tile.normal)),
                            newMovement = self.velocity.clone().subSelf(badMovement);

                        self.velocity.addSelf(newMovement);
                        return false;
                    }
                    //otherwise just stop movement
                    else {
                        self.velocity[axis] = 0;
                    }
                }
            });

            //TODO: Edge rolling (if you are on the tip edge of a blocking tile, roll around it)

            //apply gravity, friction, etc to this velocity
            this.computeVelocity(this.velocity);

            //do the actual entity movement
            this.moveEntity();

            gf.debug._playerColliders = colliders;
            gf.debug._playerColliders.dirty = true;

            return colliders;
        },
        moveEntity: function(vel) {
            //optionally override current velocity
            vel = vel || this.velocity;

            if(vel.x === 0 && vel.y === 0) return;

            //update the entity position
            this._mesh.translateX(vel.x);
            this._mesh.translateY(vel.y);

            //also update the hitbox mesh if it is different
            if(this._hitboxMesh) {
                this._hitboxMesh.translateX(vel.x);
                this._hitboxMesh.translateY(vel.y);
            }

            //onMove event
            this.onMove(vel);

            //emit movement
            gf.event.publish(gf.types.EVENT.ENTITY_MOVE + '.' + this.id, vel);

            return this;
        },
        //On Collision Event
        // called when this object is collided into by another, by default if something collides with
        // a collectable entity we remove the collectable
        //vec - Collision Vector (THREE.Vector2)
        //obj - Colliding object (gf.Entity)
        onCollision: function(vec, obj) {
            if(this.collidable && this.type == gf.types.ENTIY.COLLECTABLE)
                gf.game.removeObject(this);

            return this;
        },

        //On Move Event
        // called when this entity moves
        //vel - Velocity the entity moved (THREE.Vector2)
        onMove: function(vel) {
            return this;
        },

        //On Tile Break Event
        // called when a tile is broken
        //tile - the tile that is broken
        onTileBreak: function(tile) {
            return this;
        },

        //Privates
        _doSetPos: function(x, y, z) {
            this._super(x, y, z);

            if(this._hitboxMesh) {
                this._hitboxMesh.position.set(x, y, z);
                if(this.hitOffset) {
                    this._hitboxMesh.translateX(this.hitOffset.x);
                    this._hitboxMesh.translateY(this.hitOffset.y);
                }
            }
        },
        _createMesh: function() {
            if(this._mesh) return;

            this._materials = [];

            this._materials.push(new THREE.MeshBasicMaterial({ transparent: true }));

            //add outline material if needed
            if(gf.debug.showOutline) {
                this._materials.push(new THREE.MeshBasicMaterial({
                    color: gf.debug.outlineColor,
                    wireframe: true,
                    wireframeLinewidth: 1
                }));
            }

            this._geom = new THREE.PlaneGeometry(this.scaledSize.x, this.scaledSize.y);
            this._mesh = THREE.SceneUtils.createMultiMaterialObject(this._geom, this._materials);//new THREE.Mesh(this._geom, this._materials);

            //multimaterials object doesn't have .geometry defined
            this._mesh.geometry = this._geom;

            //set visible
            //this._mesh.visible = this.isVisible;
        },
        _createHitboxMesh: function() {
            if(this._hitboxMesh) return;

            this._hitboxMaterial = new THREE.MeshBasicMaterial({
                color: gf.debug.hitboxColor,
                wireframe: gf.debug.showHitbox,
                wireframeLinewidth: 1,
                transparent: true,
                opacity: gf.debug.showHitbox ? 0.8 : 0
            });

            this._hitboxGeom = new THREE.PlaneGeometry(1, 1);

            this._hitboxMesh = new THREE.Mesh(this._hitboxGeom, this._hitboxMaterial);
            this._hitboxMesh.scale.set(this.scaledHitSize.x, this.scaledHitSize.y, 1);
        },
    });
})();
(function() {
    gf.Sprite = gf.Entity.extend({
        //initializes a new entity with the start position (pos) and the settings defined in Tiled
        init: function(pos, settings) {
            /****************************************************************************
             * Properties that are defined in the `settings` object,
             * these can be specified in the properties of the object layer
             * in Tiled, and overriden on a per-object basis
             ****************************************************************************/
            //size of the sprite (each frame)
            this.size = new THREE.Vector2(0, 0);

            //number of frames accross x / y (calculated, not set)
            this.numFrames = new THREE.Vector2(0, 0);

            //offset in the image to the first frame (in pixels)
            this.offset = new THREE.Vector2(0, 0);

            //opacity of the sprite
            this.opacity = 1.0;

            //raw THREE.Texture instance loaded by the gf.loader
            this.texture = null;

            //defined sprite animations
            this.anim = {};

            //currently active animation
            this.currentAnim = null;

            //currently active frame's active time
            this.currentFrameTime = 0;

            //animations paused
            this.animPaused = false;

            //use screen coords instead of world coords
            this.useScreenCoords = false;

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(pos, settings);

            this._baseHitSize = this.hitSize.clone();
            this._baseScaledHitSize = this.scaledHitSize.clone();
            this._baseHitOffset = this.hitOffset.clone();

            // create a default animation sequence with all sprites
            this.addAnimation('default', { frames: null, duration: 1000 });
            // set as default
            this.setActiveAnimation('default');
        },
        //add a new animation
        addAnimation: function(name, settings) {
            settings = settings || {};

            if(settings instanceof Array)
                settings = { frames: settings };

            this.anim[name] = {
                name: name,
                frames: [],
                idx: 0,
                length: 0,
                frameTime: 0,
                loop: !!settings.loop,
                hitSize: settings.hitSize,
                hitOffset: settings.hitOffset
            };

            if(!settings.frames) {
                settings.frames = [];
                // create a default animation with all sprites in the spritesheet
                for(var f = 0, fl = this.numFrames.x * this.numFrames.y; f < fl; ++f) {
                    settings.frames[f] = f;
                }
            }

            // compute and add the offset of each frame
            for(var i = 0, il = settings.frames.length; i < il; ++i) {
                this.anim[name].frames[i] = new THREE.Vector2(this.size.x * (settings.frames[i] % this.numFrames.x), this.size.y * Math.floor(settings.frames[i] / this.numFrames.x));
            }
            this.anim[name].length = this.anim[name].frames.length;
            this.anim[name].frameTime = (settings.duration || 0) / this.anim[name].frames.length;

            return this;
        },
        setActiveAnimation: function(name, resetAnim, cb) {
            if(typeof resetAnim == 'function') {
                cb = resetAnim;
                resetAnim = null;
            }

            if(!this.anim[name]) {
                this.currentAnim = name;
            } else {
                if(this.currentAnim && this.currentAnim._cb && !this.currentAnim._cbCalled) {
                    this.currentAnim._cbCalled = true;
                    this.currentAnim._cb(true);
                }

                this.currentAnim = this.anim[name];
                this.currentAnim._done = false;
                this.currentAnim._cbCalled = false;
                this.currentAnim._cb = cb;
                if(resetAnim) this.currentAnim.idx = 0;
                this._setOffset();

                //if we are changing hitbox, save current settings and update
                if(this.currentAnim.hitSize) {
                    if(this.currentAnim.hitSize instanceof THREE.Vector2) {
                        this.hitSize.copy(this.currentAnim.hitSize);
                        this.scaledHitSize.copy(this.currentAnim.hitSize).multiplyScalar(this.scale);
                    }
                    else if(this.currentAnim.hitSize instanceof Array) {
                        this.hitSize.set(this.currentAnim.hitSize[0], this.currentAnim.hitSize[1]);
                        this.scaledHitSize.set(this.currentAnim.hitSize[0], this.currentAnim.hitSize[1]).multiplyScalar(this.scale);
                    }
                }
                else {
                    this.hitSize.copy(this._baseHitSize);
                    this.scaledHitSize.copy(this._baseScaledHitSize);
                }

                if(this.currentAnim.hitOffset) {
                    if(this.currentAnim.hitOffset instanceof THREE.Vector2)
                        this.hitOffset.copy(this.currentAnim.hitOffset);
                    else if(this.currentAnim.hitOffset instanceof Array)
                        this.hitOffset.set(this.currentAnim.hitOffset[0], this.currentAnim.hitOffset[1]);
                }
                else {
                    this.hitOffset.copy(this._baseHitOffset);
                }

                this._hitboxMesh.scale.set(this.scaledHitSize.x, this.scaledHitSize.y, 1);
                this.setPosition(this._mesh.position);
            }

            this.currentFrameTime = 0;

            return this;
        },
        isActiveAnimation: function(name) {
            return this.currentAnim.name == name;
        },
        update: function() {
            this._super();

            if(!this.currentAnim || this.currentAnim.frameTime === 0 || this.currentAnim.length <= 1) return;

            this.currentFrameTime += gf.game._delta * 1000;

            //update animation if necessary
            if (this.isVisible && !this.animPaused && !this.currentAnim._done && (this.currentFrameTime > this.currentAnim.frameTime)) {
                while(this.currentFrameTime > this.currentAnim.frameTime) {
                    this.currentFrameTime -= this.currentAnim.frameTime;
                    this.currentAnim.idx++;

                    if(this.currentAnim.idx == this.currentAnim.length) {
                        if(this.currentAnim.loop) {
                            this.currentAnim.idx = 0;
                        }
                        else {
                            this.currentAnim._done = true;
                            if(this.currentAnim._cb && !this.currentAnim._cbCalled) {
                                this.currentAnim._cbCalled = true;
                                this.currentAnim._cb();
                            }
                            return;
                        }
                    }

                    this._setOffset();
                }
            }

            return this;
        },
        _setOffset: function() {
            //for some reason when inversed, the tiles need to start at 1 instead of 0
            var add = this.currentAnim.inverse ? 1 : 0,
                frame = this.currentAnim.frames[this.currentAnim.idx];

            this._material.uvOffset.set(
                frame.x / this.texture.image.width,
                1 - (this.size.y / this.texture.image.height) - (frame.y / this.texture.image.height)
            );
        },
        //override Entity mesh with a sprite instead
        _createMesh: function() {
            if(this._mesh) return;

            if(this.filtered) {
                this.texture.magFilter = THREE.LinearFilter;
                this.texture.minFilter = THREE.LinearMipMapLinearFilter;
            } else {
                this.texture.magFilter = THREE.NearestFilter;
                this.texture.minFilter = THREE.NearestMipMapNearestFilter;
            }

            this.numFrames.set(this.texture.image.width / this.size.x, this.texture.image.height / this.size.y);

            this._material = new THREE.SpriteMaterial({
                color: 0xffffff,
                opacity: 1,
                map: this.texture,

                blending: THREE.NormalBlending,
                alignment: THREE.SpriteAlignment.center,
                useScreenCoordinates: this.useScreenCoords,
                //depthTest: false, //default: !useScreenCoordinates
                sizeAttenuation: true, //default: !useScreenCoordinates
                //scaledByViewport: true //default: !sizeAttenuation
            });

            this._material.uvScale.set(
                1 / this.numFrames.x,
                1 / this.numFrames.y
            );
            this._material.uvOffset.set(0, 0);

            this._mesh = new THREE.Sprite(this._material);

            var scale = (this.size.x / this.texture.image.width); //scale of a frame
            scale *= (this.texture.image.width / gf.game._renderer.domElement.height); //relationship to viewport
            scale *= this.scale; //user defined scale
            this._mesh.scale.set(scale, scale, 1);
        }
    });
})();
(function() {
    var entObjects = {};

    gf.entityPool = {
        add: function(name, obj) {
            return entObjects[name] = obj;
        },
        has: function(name) {
            return !!entObjects[name];
        },
        create: function(name, props) {
            if(name && gf.entityPool.has(name)) {
                return new entObjects[name](props.pos || props.position || [props.x, props.y], props);
            }
            else if(props.texture) {
                return new gf.Sprite(props.pos || props.position || [props.x, props.y], props);
            }
            else {
                return new gf.Entity(props.pos || props.position || [props.x, props.y], props);
            }
        }
    };
})();
(function() {
    gf.gui = {
        //have we initialized the gui already?
        _initialized: false,

        init: function() {
            if(gf.gui._initialized) return;

            gf.gui._initialized = true;
        }
    };
})();
(function() {
    gf.HUD = {
        //has the HUD been initialized
        initialized: false,

        init: function(settings) {
            if(this.initialized) return;

            //is the HUD visible?
            this.visible = true;

            //use the passed settings object ot override the default values above
            gf.utils.setValues(this, settings);

            //create the base div of this element
            this._createElement();

            this.initialized = true;

            //some private stuffs
            this.dirty = true;

            //the items in this HUD
            this.items = {};
            this.numItems = 0;
        },
        addItem: function(name, item) {
            //increment if a new item
            if(!this.items[name]) this.numItems++;

            item.name = name;
            this.items[name] = item;
            this.dirty = true;
            this.elm.appendChild(item.elm);
            return this;
        },
        removeItem: function(name) {
            if(this.items[name]) {
                this.items[name].elm.parentNode.removeChild(this.items[name].elm);
                this.items[name] = null;
                this.numItems--;
                this.dirty = true;
            }

            return this;
        },
        setItemValue: function(name, value) {
            if(this.items[name]) {
                this.items[name].setValue(value);
                this.dirty = true;
            }

            return this;
        },
        getItemValue: function(name) {
            return (this.items[name] ? this.items[name].getValue() : null);
        },
        reset: function(name) {
            if(name !== undefined) {
                if(this.items[name]) this.items[name].reset();
                this.dirty = true;
            } else {
                this.resetAll();
            }

            return this;
        },
        resetAll: function() {
            gf.utils.each(this.items, function(name, item) {
                item.reset();
            });

            return this;
        },
        update: function() {
            if(!this.dirty) return;

            gf.utils.each(this.items, function(name, item) {
                if(item.visible) {
                    item.update();
                }
            });

            this.dirty = false;
        },
        _createElement: function() {
            this.elm = document.createElement('div');
            this.elm.className = 'gf-hud';

            this.elm.style.cssText = 'position: absolute; width: 100%; height: 100%; z-index: 6;';

            gf.game._cont.appendChild(this.elm);
        }
    };
})();
(function() {
    gf.HudItem = Class.extend({
        init: function(x, y, settings) {
            //can be dragged
            this.draggable = false;

            //is this item visible?
            this.visible = true;

            //value of the item
            this.value = typeof settings.value == 'string' ? '' : 0;

            this.name = '';

            //use the passed settings object ot override the default values above
            gf.utils.setValues(this, settings);

            this.default = this.value;

            //create the base div of this element
            this._createElement(x, y);

            //some private stuffs
            this.dirty = true;

            //dragging stuff
            this.dragging = false;
        },
        reset: function() {
            this.set(this.default);
            return this;
        },
        setValue: function(val) {
            this.value = val;
            this.dirty = true;
            return this;
        },
        getValue: function() {
            return this.value;
        },
        update: function() {
            if(!this.dirty) return;

            this.elm.innerText = this.value;
            return this;
        },
        //virtual events
        onClick: function(e) {},
        onDragStart: function(e) {},
        onDragEnd: function(e) {},
        onMouseDown: function(e) {
            if(!this.draggable) return;

            this.dragging = {
                x: e.clientX,
                y: e.clientY
            };
            this.onDragStart(e);
        },
        onMouseUp: function(e) {
            this.dragging = false;
            this.onDragEnd(e);
        },
        onMouseMove: function(e) {
            if(!this.draggable || !this.dragging) return;

            var diffX = e.clientX - this.dragging.x,
                diffY = e.clientY - this.dragging.y,
                pos = gf.utils.getPosition(this.elm);

            this.dragging.x = e.clientX;
            this.dragging.y = e.clientY;

            this.elm.style.top = pos.top + diffY;
            this.elm.style.left = pos.left + diffX;
        },
        //private functions
        _createElement: function(x, y) {
            this.elm = document.createElement('div');
            this.elm.className = 'gf-hud-item ' + this.name;

            this.elm.style.cssText = 'position: absolute; top: ' + y + 'px; left: ' + x + 'px;';

            this._bindEvents();
        },
        _bindEvents: function() {
            this.elm.addEventListener('click', this.onClick.bind(this), false);
            this.elm.addEventListener('mousedown', this.onMouseDown.bind(this), false);
            this.elm.addEventListener('mouseup', this.onMouseUp.bind(this), false);
            this.elm.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        }
    });
})();
(function() {
    //TODO: Retries?

    //simple memory cache
    var _cache = {};

    gf.resources = {};
    gf.loader = {
        /**
         * Resource format:
            {
                name: String,   //key name
                type: String,   //image, json, xml, texture, world
                src: String     //url
            }
         * Callbacks format:
            {
                error: function(error, resource),       //an error occured when loading a resource
                progress: function(percent, resource),  //progress of a resource loading
                load: function(resource),               //a resource has loaded

            }
         */
        load: function(resource) {
            //do this so we can just call load, without having to type the long one
            if(resource instanceof Array) {
                gf.loader.loadResources.apply(gf.loader, arguments);
                return;
            }

            var cached = gf.loader._getCached(resource);

            if(cached) {
                gf.resources[resource.name] = resource;
                gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, cached);

                return cached;
            }

            if(gf.loader._loaders[resource.type] && gf.loader._loaders[resource.type].load) {
                gf.loader._setCache(resource);
                gf.resources[resource.name] = resource;
                gf.loader._loaders[resource.type].load(resource);
            } else {
                //at this point we have no loader for this type
                throw new Error('Unknown resource type: ' + resource.type + ' for res');
            }

            return this;
        },
        /**
         * Resources format:
            [
                {
                    name: String,   //key name
                    type: String,   //image, json, xml, texture, world
                    src: String     //url
                },
                ...
            ]
         * Callbacks format:
            {
                start: function(resource),              //when loading of a resource starts
                error: function(error, resource),       //an error occured when loading a resource
                progress: function(percent, resource),  //progress of a resource loading
                load: function(resource),               //a resource has loaded
                complete: function(resources),          //all resources have completed loading
            }
         */
        loadResources: function(resources) {
            var done = 0, handles = [];

            for(var r = 0, rl = resources.length; r < rl; ++r) {
                gf.event.publish(gf.types.EVENT.LOADER_START, resources[r]);

                handles.push({
                    load: gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + resources[r].name, loadDone.bind(null, r, null)),
                    error: gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + resources[r].name, loadDone.bind(null, r))
                });
                gf.loader.load(resources[r]);
            }

            function loadDone(r, err, resource) {
                done++;

                if(err)
                    gf.event.publish(gf.types.EVENT.LOADER_ERROR, err, resource);
                else
                    gf.event.publish(gf.types.EVENT.LOADER_LOAD, resource);

                gf.event.unsubscribe(handles[r].load);
                gf.event.unsubscribe(handles[r].error);

                handles[r] = null;

                if(done >= resources.length)
                    gf.event.publish(gf.types.EVENT.LOADER_COMPLETE, resources);
            }

            return this;
        },
        //Privates for loaders only, not public use
        _loaders: {},
        _getCacheKey: function(resource) {
            return gf.utils.b64.encode(resource.src + '_!_' + resource.type);
        },
        _getCached: function(resource) {
            return _cache[gf.loader._getCacheKey(resource)];
        },
        _setCache: function(resource) {
            return _cache[gf.loader._getCacheKey(resource)] = resource;
        },
        _get: function(url, dataType, progress, cb) {
            $.ajax({
                url: url,
                dataType: dataType,
                type: 'GET',
                error: function(jqXHR, textStatus, errorThrown) {
                    if(cb) cb(errorThrown || textStatus);
                },
                success: function(data, textStatus, jqXHR) {
                    _cache[url] = data;

                    if(cb) cb(null, data);
                },
                progress: function(e) {
                    if(e.lengthComputable) {
                        var pct = (e.loaded / e.total) * 100;

                        if(progress) progress(pct);
                    } else {
                        //console.warn('Content Length not reported!');
                    }
                }
            });
        }
    };

    //Image loader
    gf.loader._loaders.image = {
        load: function(resource) {
            resource.data = new Image();
            resource.data.addEventListener('load', function() {
                gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
            }, false);
            resource.data.src = resource.src;
        }
    };

    //JSON and XML loaders
    gf.loader._loaders.json = gf.loader._loaders.xml = {
        load: function(resource) {
            gf.loader._get(
                resource.src,
                resource.type,
                function(pct) { //progress
                    gf.event.publish(gf.types.EVENT.LOADER_PROGRESS + '.' + resource.name, pct, resource);
                },
                function(err, data) {
                    if(err) {
                        gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, err, resource);
                        return;
                    }

                    resource.data = data;
                    gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
                }
            );
        }
    };

    //Texture loader
    gf.loader._loaders.texture = gf.loader._loaders.sprite = {
        load: function(resource) {
            var tloader = new THREE.TextureLoader();
                    
            tloader.addEventListener('error', function(err) {
                gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, err, resource);
            });

            tloader.addEventListener('load', function(evt) {
                resource.data = evt.content;
                gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
            });

            tloader.load(resource.src);
        }
    };

    //Audio loader
    gf.loader._loaders.audio = gf.loader._loaders.sound = gf.loader._loaders.music = {
        load: function(resource) {
            if(!gf.support.audio.play) {
                gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, 'This browser does not support HTML5 Audio!', resource);
                return false;
            }

            var ext = resource.src.substr(resource.src.lastIndexOf('.') + 1);
            if(!gf.support.audio[ext]) {
                gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, 'This browser does not support playing ' + ext + ' audio files!', resource);
                return false;
            }

            var sound = resource.data = new Audio(resource.src);
            sound.preload = 'auto';

            sound.addEventListener('canplaythrough', function(e) {
                this.removeEventListener('canplaythrough', arguments.callee, false);
                gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
            }, false);

            sound.addEventListener('error', function(e) {
                gf.event.publish(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, 'Error loading the audio file!', resource);
            }, false);

            sound.load();
        }
    };

    //World loader, loads a world JSON file and all of its resources listed within
    gf.loader._loaders.world = {
        load: function(resource) {
            if(!resource.texturePath)
                resource.texturePath = resource.src.substr(0, resource.src.lastIndexOf('/') + 1);

            //set the type to json, and load it first
            resource._oldName = resource.name;
            resource.name = resource.name + '_json';
            resource.type = 'json';

            var handles = {};

            handles.load = gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, function() {
                //gf.event.unsubscribe(handles.load);
                //gf.event.unsubscribe(handles.progress);
                //gf.event.unsubscribe(handles.error);

                //set the resource back to world
                resource.name = resource._oldName;
                resource.type = 'world';

                var done = 0, max = 0, lhandles = [], thandles = [];

                //loop through each layer and load the sprites (objectgroup types)
                for(var i = 0, il = resource.data.layers.length; i < il; ++i) {
                    var layer = resource.data.layers[i];
                    if(layer.type != gf.types.LAYER.OBJECT_GROUP) continue;

                    //loop through each object, and load the textures
                    for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                        var obj = layer.objects[o];
                        if(!obj.properties.spritesheet) continue;

                        (function(layer, obj, o) {
                            addRes();
                            var name = layer.name + '_' + obj.name + '_texture';
                            lhandles.push({
                                load: gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + name, function(rsrc) {
                                    obj.properties.texture = rsrc.data;
                                    resDone(o, true, null, rsrc);
                                }),
                                error: gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + name, function(err, rsrc) {
                                    obj.properties.texture = null;
                                    obj.properties._error = err;
                                    resDone(o, true, err, rsrc);
                                })
                            });
                            gf.loader.load({
                                name: layer.name + '_' + obj.name + '_texture',
                                type: 'texture',
                                src: obj.properties.spritesheet
                            });
                        })(layer, obj, o);
                    }
                }

                //loop through each tileset and load the texture
                for(var s = 0, sl = resource.data.tilesets.length; s < sl; ++s) {
                    var set = resource.data.tilesets[s];
                    if(!set.image) continue;

                    (function(set, s) {
                        addRes();
                        var name = set.name + '_texture';
                        thandles.push({
                            load: gf.event.subscribe(gf.types.EVENT.LOADER_LOAD + '.' + name, function(rsrc) {
                                set.texture = rsrc.data;
                                resDone(s, false, null, rsrc);
                            }),
                            error: gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + name, function(err, rsrc) {
                                set.texture = null;
                                set._error = err;
                                resDone(s, false, err, rsrc);
                            })
                        });
                        gf.loader.load({
                            name: name,
                            type: 'texture',
                            src: resource.texturePath + set.image
                        });
                    })(set, s);
                }

                if(max === 0) gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);

                //for counting downloading resources, and tracking when all are done
                function addRes() { max++; }
                function resDone(i, layer, err, rsrc) {
                    done++;

                    if(layer) {
                        gf.event.unsubscribe(lhandles[i].load);
                        gf.event.unsubscribe(lhandles[i].error);
                    } else {
                        gf.event.unsubscribe(thandles[i].load);
                        gf.event.unsubscribe(thandles[i].error);
                    }

                    if(done >= max)
                        gf.event.publish(gf.types.EVENT.LOADER_LOAD + '.' + resource.name, resource);
                }
            });

            handles.error = gf.event.subscribe(gf.types.EVENT.LOADER_ERROR + '.' + resource.name, function(err, resource) {
                //gf.event.unsubscribe(handles.load);
                //gf.event.unsubscribe(handles.progress);
                //gf.event.unsubscribe(handles.error);

                gf.event.publish(gf.types.EVENT.LOADER_PROGRESS + '.' + resource._oldName, err, resource);
            });

            handles.progress = gf.event.subscribe(gf.types.EVENT.LOADER_PROGRESS + '.' + resource.name, function(pct, resource) {
                gf.event.publish(gf.types.EVENT.LOADER_PROGRESS + '.' + resource._oldName, pct, resource);
            });

            gf.loader.load(resource);
        }
    };
})();
(function() {
    gf.Map = gf.SceneObject.extend({
        init: function(settings) {
            //size of the map
            this.size = new THREE.Vector2(settings.width, settings.height);

            //orientation of the map
            this.orientation = settings.orientation; //only orthogonal supported

            //layers of the map
            this.layers = [];
        },
        //virtual add layer
        addLayer: function(layer) {
            this.layers.push(layer);

            return this;
        },
        getLayer: function(id) {
            if(typeof id == 'number')
                return this.layers[id];

            if(typeof id == 'string') {
                var lyr = null, self = this;
                this.eachLayer(function(layer) {
                    if(layer.name == id) {
                        lyr = layer;
                        return false;
                    }
                });

                return lyr;
            }

            return this;
        },
        //add all layers to the scene
        addToScene: function(scene) {
            this.scene = scene;

            //incase they add layers first, then add the map to the scene
            this.eachLayer(function(layer) {
                if(!layer.scene || layer.scene != scene)
                    layer.addToScene(scene);
            });

            return this;
        },
        //apply an iterator to each layer
        eachLayer: function(fn) {
            for(var i = 0, il = this.layers.length; i < il; ++i) {
                if(fn.call(this, this.layers[i], i, this.layers) === false)
                    break;
            }

            return this;
        }
    });
})();
(function() {
    gf.Layer = gf.SceneObject.extend({
        init: function(settings) {
            this._super(settings);

            //name of this layer
            this.name = settings.name || '';

            //size of this layer
            this.size = new THREE.Vector2(settings.width || 1, settings.height || 1);

            //half size
            this.hSize = this.size.clone().divideScalar(2);

            //offset of this layer
            this.offset = new THREE.Vector2(settings.x || 0, settings.y || 0);

            //scale of this layer
            this.scale = settings.scale || 1;

            //wireframe this mesh?
            this.wireframe = settings.wireframe || false;

            //color of this layer
            this.color = (settings.color !== undefined ? settings.color : 0xffffff);

            //texture of the layer
            this.texture = settings.texture || null;

            //opacity of this layer
            this.opacity = settings.opacity || 1;
            this.visible = (settings.visible !== undefined ? settings.visible : true);

            this._createMesh();
        },
        _createMesh: function() {
            if(this._mesh) return;

            //create the shader material
            this._material = new THREE.MeshBasicMaterial({
                color: this.color,
                wireframe: this.wireframe,
                map: this.texture,
                opacity: this.opacity,
                transparent: (this.opacity !== 1) //if the opacity isn't 1.0, then this needs to be transparent
            });

            this._plane = new THREE.PlaneGeometry(
                this.size.x * this.scale,
                this.size.y * this.scale
            );

            this._mesh = new THREE.Mesh(this._plane, this._material);
            this._mesh.visible = this.visible;
            this._mesh.position.z = this.zIndex;
        }
    });
})();
(function() {
    //Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
    //The loader knows to load all textures and other resources when loading a world TMX
    //file, and this expets that to already be done.
    gf.TiledMap = gf.Map.extend({
        //Init Tilemap and all layers
        init: function(map) {
            /*if(!gf.support.webgl) {
                throw 'TiledMap is only supported using WebGL rendering.';
            }*/

            this._super(map);

            //tile size
            this.tileSize = new THREE.Vector2(map.tilewidth, map.tileheight);

            //user-defined properties
            this.properties = map.properties || {};
            this.scale = this.properties.scale || 1;

            //scaled size (size * tileSize * scale)
            this.scaledSize = new THREE.Vector2(
                this.size.x * this.tileSize.x * this.scale,
                this.size.y * this.tileSize.y * this.scale
            );
            //assuming 0,0 is in the middle of the map, calculate the minimum
            //and maximum extent of the map
            this.extent = {
                x: {
                    min: ~~(this.scaledSize.x / 2) - this.scaledSize.x, 
                    max: this.scaledSize.x - ~~(this.scaledSize.x / 2)
                },
                y: {
                    min: ~~(this.scaledSize.y / 2) - this.scaledSize.y,
                    max: this.scaledSize.y - ~~(this.scaledSize.y / 2)
                }
            };

            //tilesets
            this.tilesets = [];

            //object groups
            this.objectGroups = [];

            //the layer for collisions
            this.collisionLayer = [];
            this.collisionTileset = null;

            //version
            this.version = map.version;

            //create the tileset objects
            this.tilesetMaps = {
                textures: [],
                firstgids: [],
                lastgids: [],
                sizes: [],
                inverseSizes: [],
                numTiles: []
            };
            for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
                var ts = new gf.TiledTileset(map.tilesets[t]);

                //Since Three.js doesn't support passing structs into a shader
                //we have to create some arrays with each index corresponding
                //to the values of each element.
                //
                //Basically instead of 
                //struct Tileset { gid, ... }
                //uniform Tileset tilesets[];
                //
                //We do:
                //uniform int gids[];
                //uniform sampler2D textures[];
                this.tilesetMaps.textures.push(ts.texture);
                this.tilesetMaps.firstgids.push(ts.firstgid);
                this.tilesetMaps.lastgids.push(ts.lastgid);
                this.tilesetMaps.sizes.push(ts.size);
                this.tilesetMaps.inverseSizes.push(new THREE.Vector2(1 / ts.size.x, 1 / ts.size.y));
                this.tilesetMaps.numTiles.push(ts.numTiles);
                this.tilesets.push(ts);

                if(ts.name.toLowerCase().indexOf('collider') === 0) {
                    this.collisionTileset = ts;
                }
            }

            for(var i = 0, il = map.layers.length; i < il; ++i) {
                if(map.layers[i].type == gf.types.LAYER.TILE_LAYER)
                    this.addLayer(map.layers[i]);
                else if(map.layers[i].type == gf.types.LAYER.OBJECT_GROUP) {
                    var grp = this.addObjectGroup(map.layers[i]);

                    //auto spawn the player object group
                    if(grp.name === 'player' && !grp.properties.manual)
                        grp.spawn();
                }
            }
        },
        //add a new layer to this tilemap
        addLayer: function(layer) {
            layer.scale = this.scale;
            layer.zIndex = this.layers.length;
            var tilemapLayer = new gf.TiledLayer(layer, this.tileSize, this.tilesetMaps);
            this.layers.push(tilemapLayer);

            if(tilemapLayer.name.toLowerCase().indexOf('collision') === 0) {
                this.collisionLayer = tilemapLayer;
                if(!gf.debug.showMapColliders) tilemapLayer.hide();
            }

            //incase they add the map to the scene first, then add layers
            if(this.scene)
                tilemapLayer.addToScene(this.scene);

            return tilemapLayer;
        },
        //add a new object group to this tilemap
        addObjectGroup: function(group) {
            group.zIndex = this.objectGroups.length + 1;
            var objgroup = new gf.TiledObjectGroup(group, this);
            this.objectGroups.push(objgroup);

            return objgroup;
        },
        //if object is moved by pv get the tile it would be at
        checkCollision: function(mesh, sz, pv) {
            if(!this.collisionLayer || !this.collisionTileset) return;

            var pos = new THREE.Vector2(mesh.position.x, mesh.position.y),
                size = sz.clone().divideScalar(2),
                left = pos.x - size.x,
                right = pos.x + size.x,
                top = pos.y + size.y,
                bottom = pos.y - size.y,
                x = (pv.x < 0) ? Math.floor(left + pv.x) : Math.ceil(right + pv.x),
                y = (pv.y < 0) ? Math.floor(bottom + pv.y) : Math.ceil(top + pv.y),
                res = [],
                tile = null;

            //check X movement
            if(x <= this.extent.x.min || x >= this.extent.x.max) {
                res.push({ axis: 'x', tile: { type: gf.types.COLLISION.SOLID } });
            } else if(pv.x) {
                //x, bottom corner
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(x, Math.floor(bottom)));
                if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                    res.push({ axis: 'x', tile: tile });
                } else {
                    //x, top corner
                    tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(x, Math.ceil(top)));
                    if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                        res.push({ axis: 'x', tile: tile });
                    }
                }
            }

            //check Y movement
            if(y <= this.extent.y.min || y >= this.extent.y.max) {
                res.push({ axis: 'y', tile: { type: gf.types.COLLISION.SOLID } });
            } else if(pv.y) {
                //y, left corner
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId((pv.x < 0) ? Math.floor(left) : Math.ceil(right), y));
                if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                    res.push({ axis: 'y', tile: tile });
                } else {
                    //y, right corner
                    tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId((pv.x < 0) ? Math.ceil(right) : Math.floor(left), y));
                    if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                        res.push({ axis: 'y', tile: tile });
                    }
                }
            }

            return res;
        },

        _checkHalfBlock: function(half, x, y) {
            tx = Math.floor(x / this.tileSize.x) * this.tileSize.x;
            ty = Math.floor(y / this.tileSize.y) * this.tileSize.y;

            var midX = tx + ((this.tileSize.x) / 2),
                endX = tx + (this.tileSize.x),
                midY = ty - ((this.tileSize.y) / 2),
                endY = ty - (this.tileSize.y);

            switch(half) {
                case gf.types.HALF.LEFT:
                    return (x > tx && x < midX);

                case gf.types.HALF.RIGHT:
                    return (x > midX && x < endX);

                case gf.types.HALF.TOP:
                    return (y > midY && y < ty);

                case gf.types.HALF.BOTTOM:
                    return (y > endY && y < midY);
            }

            return false;
        },

        /////////////////////////
        // REMOVE BELOW??
        /////////////////////////

        //load a new zone as the player enters it
        loadZone: function(zone) {
            //set the new zone
            this.zone = this.findZoneIndex(zone);

            return this;
        },
        //find the index of a zone based on different inputs
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
                });
            }

            return index;
        },
        //converts the vertex units of zones into world coordinates
        upgradeVertexUnits: function(zone) {
            if(zone.vertexUnits === types.UNIT.OFFSETS) return;

            //Convert the vertices from pixels to offsets if necessary
            //pixel offsets are from the topleft of the tilemap, but offset units are from the center of the screen
            for (var i = 0, il = zone.vertices.length; i < il; ++i) {
                this.upgradeCoord(zone.vertices[i]);
            }
            zone.vertexUnits = types.UNIT.OFFSETS;

            return this;
        },
        //converts a coord from pixel position to world coord
        upgradeCoord: function(coord) {
            if(coord instanceof THREE.Vector2) {
                coord.x = (coord.x - (this.tilemapSize.x / 2)) * this.tileSize * this.tileScale;
                coord.y = ((this.tilemapSize.y / 2) - coord.y) * this.tileSize * this.tileScale;
            } else if(coord instanceof Array) {
                coord[0] = (coord[0] - (this.tilemapSize.x / 2)) * this.tileSize * this.tileScale;
                coord[1] = ((this.tilemapSize.y / 2) - coord[1]) * this.tileSize * this.tileScale;
            }

            return coord;
        },
        //apply an iterator to each zone
        eachZone: function(fn) {
            for(var i = 0, il = this.zones.length; i < il; ++i) {
                if(fn.call(this, this.zones[i], i, this.zones) === false)
                    break;
            }

            return this;
        }
    });
})();
(function() {
    //Shaders
    var vShader = [
        'varying vec2 pixelCoord;',
        'varying vec2 texCoord;',

        'uniform vec2 mapSize;',
        'uniform vec2 inverseLayerSize;',

        //'uniform vec2 tileSize;',
        'uniform vec2 inverseTileSize;',

        //'uniform sampler2D tileIds;'
        //'uniform int repeatTiles;',
        //'uniform float opacity;',
        'uniform float bias;',
        'uniform float inverseScale;',

        //tileset maps
        //'uniform sampler2D textures[NUM_TILESETS];',
        //'uniform float firstgids[NUM_TILESETS];',
        //'uniform float lastgids[NUM_TILESETS];',
        //'uniform vec2 sizes[NUM_TILESETS];',
        //'uniform vec2 inverseSizes[NUM_TILESETS];',
        //'uniform vec2 numTiles[NUM_TILESETS];',

        'void main(void) {',
        '   pixelCoord = (uv * mapSize) - ((1.0 - bias) * inverseScale);', //this bias fixes a strange wrapping error
        '   texCoord = pixelCoord * inverseLayerSize * inverseTileSize;', //calculate the coord on this map
        '   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);', //hand this position to WebGL
        '}'
    ].join('\n');

    var fShader = [
        //"precision highp float;",

        'varying vec2 pixelCoord;',         
        'varying vec2 texCoord;',

        //'uniform vec2 mapSize;',
        //'uniform vec2 inverseLayerSize;',

        'uniform vec2 tileSize;',
        //'uniform vec2 inverseTileSize;',

        'uniform sampler2D tileIds;',
        'uniform int repeatTiles;',
        'uniform float opacity;',
        'uniform float bias;',
        'uniform float inverseScale;',

        //tileset maps
        'uniform sampler2D textures[NUM_TILESETS];',
        'uniform float firstgids[NUM_TILESETS];',
        'uniform float lastgids[NUM_TILESETS];',
        //'uniform vec2 sizes[NUM_TILESETS];',
        'uniform vec2 inverseSizes[NUM_TILESETS];',
        'uniform vec2 numTiles[NUM_TILESETS];',

        'float decode24(vec3 rgb) {',
        '   const vec3 bit_shift = vec3((256.0*256.0), 256.0, 1.0);',
        '   float fl = dot(rgb, bit_shift);', //shift the values appropriately
        '   return fl * 255.0;', //denormalize the value
        '}',

        'vec4 getColor(float tileValue) {',
        '   for(int i = 0; i < NUM_TILESETS; ++i) {',
        '       if(tileValue >= firstgids[i] && tileValue <= lastgids[i]) {', //choose the right tileset, and use it
        '           tileValue -= (firstgids[i] - 1.0);',
        '           if(tileValue <= 1.0) { break; }',

        '           vec2 tileLoc = vec2(mod(tileValue, numTiles[i].x), tileValue / numTiles[i].x);', //convert the ID into x, y coords
        '           tileLoc.x = tileLoc.x - (bias * inverseScale);', //the bias fixes a precision error by making the later floor go down by 1
        '           tileLoc.y = numTiles[i].y - tileLoc.y;', //convert the coord from bottomleft to topleft

        '           vec2 offset = (floor(tileLoc) * tileSize) + (bias * inverseScale);', //offset in the tileset; the bias removes the spacing between tiles
        '           vec2 coord = mod(pixelCoord, tileSize);', //coord of the tile

        '           return texture2D(textures[i], (offset + coord) * inverseSizes[i]);', //grab tile from tileset
        '       }',
        '   }',

        '   return vec4(0.0, 0.0, 0.0, 0.0);', //tileValue was 0 for gid was bad
        '}',

        'void main(void) {',
        '   if(repeatTiles == 0 && (texCoord.x < 0.0 || texCoord.x > 1.0 || texCoord.y < 0.0 || texCoord.y > 1.0)) { discard; }',

        '   vec3 tileId = texture2D(tileIds, texCoord).rgb;', //grab this tileId from the layer data
        //'   tileId.rgb = tileId.bgr;', //if some hardware is different endian (little?) then we need to flip here
        '   float tileValue = decode24(tileId);', //decode the normalized vec3 into the float ID

        '   vec4 color = getColor(tileValue);',
        '   if(color.r == 0.0 && color.g == 0.0 && color.b == 0.0 && color.a == 0.0) { discard; }',

        '   color.a -= (1.0 - opacity);', //subtract the opacity of this layer
        '   if(color.a < 0.0) { color.a = 0.0; }',
        '   gl_FragColor = color;',
        '}'
    ].join('\n');

    //Each tilemap layer is just a Plane object with the map drawn on it
    gf.TiledLayer = gf.Layer.extend({
        init: function(layer, tileSize, tilesetMaps) {
            this._super(layer);

            //set options
            this.data = layer.data;
            this.dataBuffer = new ArrayBuffer(layer.data.length * 3);
            this.data8 = new Uint8Array(this.dataBuffer);
            this.tileSize = tileSize;

            this.repeat = false;
            this.filtered = false;

            this.tilesetMaps = tilesetMaps;

            //pack our layer data array into an 8-bit uint array
            for (var i = 0, y = 0, il = layer.data.length; i < il; ++i, y += 3) {
                var value = layer.data[i];

                //this.data[y + 0] = (value & 0xff000000) >> 24;
                this.data8[y + 0] = (value & 0x00ff0000) >> 16;
                this.data8[y + 1] = (value & 0x0000ff00) >> 8;
                this.data8[y + 2] = (value & 0x000000ff);
            }

            this.dataTex = new THREE.DataTexture(
                                this.data8,
                                this.size.x, //width
                                this.size.y, //height
                                THREE.RGBFormat, //format
                                THREE.UnsignedByteType, //type
                                THREE.UVMapping, //mapping
                                THREE.ClampToEdgeWrapping, //wrapS
                                THREE.ClampToEdgeWrapping, //wrapT
                                THREE.NearestFilter, //magFilter
                                THREE.NearestMipMapNearestFilter //minFilter
                            );
            this.dataTex.needsUpdate = true;

            //setup shader uniforms
            //
            //Types:
            // i - integer
            // f - float
            // c - color
            // t - Texture
            // tv - array of Textures
            // m4 - Matrix4
            // m4v - array of Matrix4s
            // iv - array of integers with 3 x N size
            // iv1 - array of integers
            // fv - array of floats with 3 x N size
            // fv1 - array of floats
            // v2 - Vector2
            // v3 - Vector3
            // v4 - Vector4
            // v2v - array of Vector2s
            // v3v - array of Vector3s
            // v4v - array of Vector4s
            this._uniforms = {
                mapSize:            { type: 'v2', value: new THREE.Vector2(this.size.x * this.tileSize.x, this.size.y * this.tileSize.y) },
                inverseLayerSize:   { type: 'v2', value: new THREE.Vector2(1 / this.size.x, 1 / this.size.y) },

                tileSize:           { type: 'v2', value: this.tileSize },
                inverseTileSize:    { type: 'v2', value: new THREE.Vector2(1 / this.tileSize.x, 1 / this.tileSize.y) },

                tileIds:            { type: 't', value: this.dataTex },
                repeatTiles:        { type: 'i', value: this.repeat ? 1 : 0 },
                opacity:            { type: 'f', value: this.opacity },
                bias:               { type: 'f', value: 0.002 },
                inverseScale:       { type: 'f', value: 1 / this.scale },

                //tileset maps
                textures:           { type: 'tv', value: this.tilesetMaps.textures },
                firstgids:          { type: 'fv1', value: this.tilesetMaps.firstgids },
                lastgids:           { type: 'fv1', value: this.tilesetMaps.lastgids },
                //sizes:              { type: 'v2v', value: this.tilesetMaps.sizes },
                inverseSizes:       { type: 'v2v', value: this.tilesetMaps.inverseSizes },
                numTiles:           { type: 'v2v', value: this.tilesetMaps.numTiles }

                //firstGid:           { type: 'f', value: this.tileset.firstgid },
                //tilesets:           { type: 't', value: this.tilesets.texture },
                //numTiles:           { type: 'v2', value: new THREE.Vector2(this.tileset.texture.image.width / this.tileSize.x, this.tileset.texture.image.height / this.tileSize.y) },
                //inverseTilesetSize: { type: 'v2', value: new THREE.Vector2(1 / this.tileset.texture.image.width, 1 / this.tileset.texture.image.height) },
            };

            if(gf.debug.accessTiledUniforms)
                gf.debug.tiledUniforms.push(this._uniforms);

            this.vShader = vShader;
            this.fShader = '#define NUM_TILESETS ' + this.tilesetMaps.textures.length + '\n' + fShader;

            //create the shader material
            this._material = new THREE.ShaderMaterial({
                uniforms: this._uniforms,
                vertexShader: this.vShader,
                fragmentShader: this.fShader,
                transparent: (this.opacity !== 1) //if the opacity isn't 1.0, then this needs to be transparent
            });

            this._plane = new THREE.PlaneGeometry(
                this.size.x * this.tileSize.x * this.scale,
                this.size.y * this.tileSize.y * this.scale
            );

            this._mesh = new THREE.Mesh(this._plane, this._material);
            this._mesh.visible = this.visible;
            this._mesh.position.z = this.zIndex;
        },
        //get ID of tile at specified location
        getTileId: function(x, y, realCoords) {
            pos = x instanceof THREE.Vector2 ? x.clone() : new THREE.Vector2(x, y);
            //if not realCoords, they are world coords; and must be converted
            if(!realCoords) {
                //do some division to make position be in "tiles from center" instead of "units from center"
                pos.divideScalar(this.scale);
                pos.x = pos.x / this.tileSize.x;
                pos.y = pos.y / this.tileSize.y;

                //inverse the Y so the next addSelf will actually subtract from Y
                pos.y = -pos.y;

                //pos is now the offset from the center, to make it from the top left
                //we add half the size of the tilemap to x (and sub from y since we inverted)
                pos.addSelf(this.hSize);

                pos.x = ~~pos.x; //floor
                pos.y = ~~pos.y;
            }

            //calculate index
            var idx = Math.floor(pos.x + (pos.y * (this.size.x)));

            return this.data[idx];
        },
        hide: function() {
            this.visible = this._mesh.visible = false;

            return this;
        },
        show: function() {
            this.visible = this._mesh.visible = true;

            return this;
        },
        //skip parent creating mesh
        _createMesh: function() {}
    });
})();
(function() {
    gf.TiledTileset = Class.extend({
        init: function(settings) {
            this.size = new THREE.Vector2(settings.imagewidth, settings.imageheight);
            this.tileSize = new THREE.Vector2(settings.tilewidth, settings.tileheight);
            this.texture = settings.texture;

            this.name = settings.name;
            this.margin = settings.margin;
            this.spacing = settings.spacing;

            this.numTiles = new THREE.Vector2(
                ~~((this.texture.image.width - this.margin) / (this.tileSize.x + this.spacing)),
                ~~((this.texture.image.height - this.margin) / (this.tileSize.y + this.spacing))
            );
            this.firstgid = settings.firstgid;
            this.lastgid = this.firstgid + ( ((this.numTiles.x * this.numTiles.y) - 1) || 0);

            this.properties = settings.properties || {};
            this.tileproperties = settings.tileproperties || {};

            this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
            //this.texture.flipY = false;
            if(this.properties.filtered) {
                this.texture.magFilter = THREE.LinearFilter;
                this.texture.minFilter = THREE.LinearMipMapLinearFilter;
            } else {
                this.texture.magFilter = THREE.NearestFilter;
                this.texture.minFilter = THREE.NearestMipMapNearestFilter;
            }

            //massage normal
            gf.utils.each(this.tileproperties, function(k, v) {
                if(v.normal && !(v.normal instanceof THREE.Vector2))
                    v.normal = gf.utils.ensureVector(v.normal);

                if(v.isCollidable == 'true') v.isCollidable = true;
                if(v.isBreakable == 'true') v.isBreakable = true;
            });
        },
        getTileProperties: function(tileId) {
            if(tileId === undefined) return null;

            tileId = tileId - this.firstgid;

            if(tileId < 0) return null;

            return this.tileproperties[tileId.toString()] ?
                    //get this value
                    this.tileproperties[tileId.toString()] :
                    //set this id to default values and cache
                    this.tileproperties[tileId.toString()] = {
                        isCollidable: false,
                        isBreakable: false,
                        type: gf.types.COLLISION.NONE
                    };
        }
    });
})();
(function() {
    gf.TiledObjectGroup = Class.extend({
        init: function(group, map) {
            //objects in this group
            this.objects = group.objects;

            //spawned enitites
            this.ents = [];

            //map reference
            this.map = map;

            //tilesets in the map
            this.tilesets = map.tilesets;

            //name
            this.name = group.name;

            //size
            this.size = new THREE.Vector2(group.width, group.height);

            //position
            this.position = new THREE.Vector2(group.x * this.map.scale, group.y * this.map.scale);

            //visible
            this.visible = group.visible;

            //opacity
            this.opacity = group.opacity;

            //zIndex
            this.zIndex = group.zIndex;

            //user-defined properties
            this.properties = group.properties || {};
        },
        spawn: function() {
            for(var i = 0, il = this.objects.length; i < il; ++i) {
                var o = this.objects[i],
                    props = o.properties || {};

                props.name = o.name;
                props.type = o.type;
                props.size = [o.width, o.height];
                props.zIndex = this.zIndex;
                props.opacity = this.opacity;
                props.visible = this.visible;
                //convert tiled x,y coords into world coords
                //tiled does x,y from top left. We do x,y from center
                props.position = [
                    (o.x * this.map.scale) - (this.map.scaledSize.x / 2),
                    -((o.y * this.map.scale) - (this.map.scaledSize.y / 2))
                ];

                //spawn from entity pool
                this.ents.push(gf.entityPool.create(props.name, props));

                //add the new entity to the game
                gf.game.addObject(this.ents[i]);
            }

            return this;
        },
        despawn: function() {
            //remove each entity from the game
            for(var i = 0, il = this.ents.length; i < il; ++i) {
                gf.game.removeObject(this.ents[i]);
            }

            //empty the ents array
            this.ents.length = 0;

            return this;
        }
    });
})();

//Great ideas taken from: https://github.com/obiot/melonJS/blob/master/src/plugin/plugin.js
(function() {
    gf.plugin = {
        Base: Class.extend({
            gfVersion: undefined,
            init: function() {}
        }),
        //patch a core function
        //For example, to patch the gf.game.update function:
        //
        //gf.plugin.patch(gf.game, 'update', function() {
        //    //display a console message
        //    console.log('doing update!');
        //    //call the original function
        //    this._super();
        //});
        patch: function(obj, name, fn) {
            if(obj.prototype !== undefined) {
                obj = obj.prototype;
            }

            if(typeof prototy[name] == 'function' && typeof fn == 'function') {
                var _super = obj[name];

                obj[name] = (function(name, fn) {
                    return function() {
                        var tmp = this._super;

                        this._super = _super;

                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                       
                        return ret;
                    }
                })(name, fn);
            }
            else {
                console.error(name + ' is not a function in the passed object.');
            }
        },
        //register a plugin
        //For example, to register a new plugin:
        //
        //gf.plugin.register(MyPluginClass, 'myPluginName');
        //
        //var plg = new gf.plugin.myPluginName();
        // //OR
        //gf.plugin.myPluginName.someFunction();
        register: function(plugin, name) {
            //ensure we don't overrite a name
            if(gf.plugin[name]) {
                console.error('plugin ' + name + ' already registered, skipping.');
                return;
            }

            if(plugin.prototype.gfVersion === undefined) {
                throw 'GradeFruitJS: Plugin gfVersion not defined for ' + name;
            } else if(gf.checkVersion(plugin.prototype.gfVersion) > 0) {
                throw 'GradeFruitJS: Plugin gfVersion mismatch, expected: ' + plugin.prototype.gfVersion + ', got: ' + gf.version;
            }

            //store the plugin in the namespace
            gf.plugin[name] = plugin;
        }
    };
})();
(function() {
    gf.utils = {
        applyFriction: function(vel, friction) {
            return (
                        vel + friction < 0 ? 
                        vel + (friction * gf.game._delta) : 
                        (
                            vel - friction > 0 ? 
                            vel - (friction * gf.game._delta) : 
                            0
                        )
                    );
        },
        _arrayDelim: '|',
        ensureVector: function(vec) {
            if(vec instanceof THREE.Vector2 || vec instanceof THREE.Vector3)
                return vec;

            var a = vec;
            if(typeof vec == 'string') a = vec.split(gf.utils._arrayDelim);

            if(a instanceof Array) {
                switch(a.length) {
                    case 2: return new THREE.Vector2(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
                    case 3: return new THREE.Vector3(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10));
                }
            }
            else {
                return new THREE.Vector2();
            }
        },
        spawnSquare: function(x, y, w, h, color) {
            var mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(w || 1, h || 1),
                new THREE.MeshBasicMaterial({ color: color || 0xff0000 })
            );
            mesh.position.set(x || 0, y || 0, 400);
            gf.game._scene.add(mesh);
        },
        numToHexColor: function(num) { return ("00000000" + num.toString(16)).substr(-8); },
        RGBToHex: function(r, g, b) { return r.toHex() + g.toHex() + b.toHex(); },
        //similar to https://github.com/mrdoob/three.js/blob/master/src/materials/Material.js#L42
        setValues: function(obj, values) {
            if(!values) return;

            for(var key in values) {
                var newVal = values[key];

                if(newVal === undefined) {
                    console.warn('Object parameter "' + key + '" is undefined.');
                    continue;
                }

                if(key in obj) {
                    var curVal = obj[key];

                    //type massaging
                    if(typeof curVal === 'number' && typeof newVal === 'string') {
                        var n;
                        if(newVal.indexOf('0x') === 0) n = parseInt(newVal, 16);
                        else n = parseInt(newVal, 10);

                        if(!isNaN(n))
                            curVal = n;
                        else
                            console.warn('Object parameter "' + key + '" evaluated to NaN, using default. Value passed: ' + newVal);

                    } else if(curVal instanceof THREE.Color && typeof newVal === 'number') {
                        curVal.setHex(newVal);
                    } else if(curVal instanceof THREE.Vector2 && newVal instanceof Array) {
                        curVal.set(newVal[0] || 0, newVal[1] || 0);
                    } else if(curVal instanceof THREE.Vector3 && newVal instanceof Array) {
                        curVal.set(newVal[0] || 0, newVal[1] || 0, newVal[2] || 0);
                    } else if(curVal instanceof THREE.Vector2 && typeof newVal === 'string') {
                        var a = newVal.split(gf.utils._arrayDelim, 2);
                        curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
                    } else if(curVal instanceof THREE.Vector3 && typeof newVal === 'string') {
                        var a = newVal.split(gf.utils._arrayDelim, 3);
                        curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0);
                    } else if(curVal instanceof Array && typeof newVal === 'string') {
                        curVal = newVal.split(gf.utils._arrayDelim);
                        gf.utils.each(curVal, function(i, val) {
                            if(!isNaN(val)) curVal[i] = parseInt(val, 10);
                        });
                    } else {
                        obj[key] = newVal;
                    }
                }
            }

            return obj;
        },
        clamp: function(n, min, max) { return Math.max(min, Math.min(max, n)); },
        isPowerOfTwo: function(n) { return ((n & (n - 1)) === 0); },
        nextPowerofTwo: function(n) { return Math.pow(2, Math.ceil(Math.log(n)/Math.LN2)); },
        //http://jsperf.com/find-power
        getPowerofTwoPower: function(n) {
            if(!gf.utils.isPowerOfTwo(n) || n === 0) return undefined;

            var p = 0;
            while (n >>= 1) ++p;
            return p;
        },
        getPosition: function(o) {
            var l = o.offsetLeft,
                t = o.offsetTop;

            while(o = o.offsetParent) {
                l += o.offsetLeft;
                t += o.offsetTop;
            }

            return {
                top: t,
                left: l
            };
        },
        getStyle: function(elm, prop) {
            var style = window.getComputedStyle(elm);

            return parseInt(style.getPropertyValue(prop).replace(/px|em|%|pt/, ''), 10);
        },
        setStyle: function(elm, prop, value) {
            var style = window.getComputedStyle(elm);

            return style.setPropertyValue(prop, value);
        },
        //Some things stolen from jQuery
        getOffset: function(elem) {
            var doc = elem && elem.ownerDocument,
                docElem = doc.documentElement;

            try {
                box = elem.getBoundingClientRect();
            } catch(e) {}

            // Make sure we're not dealing with a disconnected DOM node
            if (!box || !(docElem !== elem && (docElem.contains ? docElem.contains(elem) : true))) {  //(!box || !jQuery.contains(docElem, elem)) {
                return box ? {
                    top: box.top,
                    left: box.left
                } : {
                    top: 0,
                    left: 0
                };
            }

            var body = doc.body,
                win = window,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop,
                scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                top = box.top + scrollTop - clientTop,
                left = box.left + scrollLeft - clientLeft;

            return {
                top: top,
                left: left
            };
        },
        each: function(object, callback, args) {
            var name, i = 0,
                length = object.length,
                isObj = length === undefined || typeof object == 'function';
            if (args) {
                if (isObj) {
                    for (name in object) {
                        if (callback.apply(object[name], args) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.apply(object[i++], args) === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isObj) {
                    for (name in object) {
                        if (callback.call(object[name], name, object[name]) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.call(object[i], i, object[i++]) === false) {
                            break;
                        }
                    }
                }
            }
            return object;
        },
        project: {
            _projector: new THREE.Projector(),
            positionToViewport: function(position) {
                var vector = gf.utils.project._projector.projectVector(position, gf.game._camera),
                    hWidth = gf.game._domElement.width / 2,
                    hHeight = gf.game._domElement.height / 2;

                return new THREE.Vector2(
                    Math.round(vector.x * hWidth + hWidth),
                    Math.round(-vector.y * hHeight + hHeight)
                );
            },
            positionToScreen: function(position) {
                var pos = gf.utils.project.positionToViewport(position),
                    offset = gf.utils.getOffset(gf.game._domElement);

                pos.x += offset.left;
                pos.y += offset.top;

                return pos;
            },
            screenToPosition: function(pos) {
                var vector = new THREE.Vector3(
                        (pos.x * 2) - 1,
                        (-pos.y * 2) + 1,
                        0.5
                    );

                gf.utils.project._projector.unprojectVector(vector, gf.game._camera);

                var dir = vector.subSelf(gf.game._camera.position).normalize(),
                    ray = new THREE.Ray(gf.game._camera.position, dir),
                    distance = - gf.game._camera.position.z / dir.z;

                return gf.game._camera.position.clone().addSelf(dir.multiplyScalar(distance));
            }
        },
        b64: {
            // private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode: (window.btoa !== undefined) ? function() { return window.btoa.apply(window, arguments); } : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = gf.util.b64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            // public method for decoding
            decode: (window.atob !== undefined) ? function() { return window.atob.apply(window, arguments); } : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = gf.util.b64._utf8_decode(output);

                return output;

            },

            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode : function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;

                while ( i < utftext.length ) {

                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }

                }

                return string;
            }
        }
    };
})();
/**
 * @fileoverview game-shim - Shims to normalize gaming-related APIs to their respective specs
 * @author Brandon Jones
 * @version 0.9
 */

/*
 * Copyright (c) 2012 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

(function(global) {
    "use strict";

    var elementPrototype = (global.HTMLElement || global.Element)["prototype"];
    var getter;

    var GameShim = global.GameShim = {
        supports: {
            fullscreen: true,
            pointerLock: true,
            gamepad: true,
            highResTimer: true
        }
    };
    
    //=====================
    // Animation
    //=====================
    
    // window.requestAnimaionFrame, credit: Erik Moller
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    (function() {
        var lastTime = 0;
        var vendors = ["webkit", "moz", "ms", "o"];
        var x;

        for(x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+"RequestAnimationFrame"];
        }

        window.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame; // Check for older syntax
        for(x = 0; x < vendors.length && !window.cancelAnimationFrame; ++x) {
            window.cancelAnimationFrame = window[vendors[x]+"CancelAnimationFrame"] || window[vendors[x]+"CancelRequestAnimationFrame"];
        }

        // Manual fallbacks
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = Date.now();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
        
        // window.animationStartTime
        if(!window.animationStartTime) {
            getter = (function() {
                for(x = 0; x < vendors.length; ++x) {
                    if(window[vendors[x] + "AnimationStartTime"]) {
                        return function() { return window[vendors[x] + "AnimationStartTime"]; };
                    }
                }

                return function() { return Date.now(); };
            })();

            Object.defineProperty(window, "animationStartTime", {
                enumerable: true, configurable: false, writeable: false,
                get: getter
            });
        }
    }());
    
    //=====================
    // Fullscreen
    //=====================
    // document.fullscreenEnabled
    if(!document.hasOwnProperty("fullscreenEnabled")) {
        getter = (function() {
            // These are the functions that match the spec, and should be preferred
            if("webkitIsFullScreen" in document) {
                return function() { return webkitRequestFullScreen in document; };
            }
            if("mozFullScreenEnabled" in document) {
                return function() { return document.mozFullScreenEnabled; };
            }

            GameShim.supports.fullscreen = false;
            return function() { return false; }; // not supported, never fullscreen
        })();
        
        Object.defineProperty(document, "fullscreenEnabled", {
            enumerable: true, configurable: false, writeable: false,
            get: getter
        });
    }
    
    if(!document.hasOwnProperty("fullscreenElement")) {
        getter = (function() {
            // These are the functions that match the spec, and should be preferred
            var i=0, name=["webkitCurrentFullScreenElement", "webkitFullscreenElement", "mozFullScreenElement"];
            for (; i<name.length; i++)
            {
                if (name[i] in document)
                {
                    return function() { return document[name[i]]; };
                }
            }
            return function() { return null; }; // not supported
        })();
        
        Object.defineProperty(document, "fullscreenElement", {
            enumerable: true, configurable: false, writeable: false,
            get: getter
        });
    }
    
    // Document event: fullscreenchange
    function fullscreenchange(oldEvent) {
        var newEvent = document.createEvent("CustomEvent");
        newEvent.initCustomEvent("fullscreenchange", true, false, null);
        // TODO: Any need for variable copy?
        document.dispatchEvent(newEvent);
    }
    document.addEventListener("webkitfullscreenchange", fullscreenchange, false);
    document.addEventListener("mozfullscreenchange", fullscreenchange, false);
    
    // Document event: fullscreenerror
    function fullscreenerror(oldEvent) {
        var newEvent = document.createEvent("CustomEvent");
        newEvent.initCustomEvent("fullscreenerror", true, false, null);
        // TODO: Any need for variable copy?
        document.dispatchEvent(newEvent);
    }
    document.addEventListener("webkitfullscreenerror", fullscreenerror, false);
    document.addEventListener("mozfullscreenerror", fullscreenerror, false);
    
    // element.requestFullScreen
    if(!elementPrototype.requestFullscreen) {
        elementPrototype.requestFullscreen = (function() {
            if(elementPrototype.webkitRequestFullScreen) {
                return function() {
                    this.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                };
            }

            if(elementPrototype.mozRequestFullScreen) {
                return function() {
                    this.mozRequestFullScreen();
                };
            }
            
            return function(){ /* unsupported, fail silently */ };
        })();
    }
    
    // document.exitFullscreen
    if(!document.exitFullscreen) {
        document.exitFullscreen = (function() {
            return  document.webkitExitFullscreen ||
                    document.mozCancelFullScreen ||
                    function(){ /* unsupported, fail silently */ };
        })();
    }
    
    //=====================
    // Pointer Lock
    //=====================
    
    var mouseEventPrototype = global.MouseEvent.prototype;
    
    if(!("movementX" in mouseEventPrototype)) {
        Object.defineProperty(mouseEventPrototype, "movementX", {
            enumerable: true, configurable: false, writeable: false,
            get: function() { return this.webkitMovementX || this.mozMovementX || 0; }
        });
    }
    
    if(!("movementY" in mouseEventPrototype)) {
        Object.defineProperty(mouseEventPrototype, "movementY", {
            enumerable: true, configurable: false, writeable: false,
            get: function() { return this.webkitMovementY || this.mozMovementY || 0; }
        });
    }
    
    // Navigator pointer is not the right interface according to spec.
    // Here for backwards compatibility only
    if(!navigator.pointer) {
        navigator.pointer = navigator.webkitPointer || navigator.mozPointer;
    }

    // Document event: pointerlockchange
    function pointerlockchange(oldEvent) {
        var newEvent = document.createEvent("CustomEvent");
        newEvent.initCustomEvent("pointerlockchange", true, false, null);
        document.dispatchEvent(newEvent);
    }
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlocklost", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlocklost", pointerlockchange, false);

    // Document event: pointerlockerror
    function pointerlockerror(oldEvent) {
        var newEvent = document.createEvent("CustomEvent");
        newEvent.initCustomEvent("pointerlockerror", true, false, null);
        document.dispatchEvent(newEvent);
    }
    document.addEventListener("webkitpointerlockerror", pointerlockerror, false);
    document.addEventListener("mozpointerlockerror", pointerlockerror, false);
    
    if(!document.hasOwnProperty("pointerLockElement")) {
        getter = (function() {
            // These are the functions that match the spec, and should be preferred
            if("webkitPointerLockElement" in document) {
                return function() { return document.webkitPointerLockElement; };
            }
            if("mozPointerLockElement" in document) {
                return function() { return document.mozPointerLockElement; };
            }
            return function() { return null; }; // not supported
        })();
        
        Object.defineProperty(document, "pointerLockElement", {
            enumerable: true, configurable: false, writeable: false,
            get: getter
        });
    }
    
    // element.requestPointerLock
    if(!elementPrototype.requestPointerLock) {
        elementPrototype.requestPointerLock = (function() {
            if(elementPrototype.webkitRequestPointerLock) {
                return function() {
                    this.webkitRequestPointerLock();
                };
            }

            if(elementPrototype.mozRequestPointerLock) {
                return function() {
                    this.mozRequestPointerLock();
                };
            }

            if(navigator.pointer) {
                return function() {
                    var elem = this;
                    navigator.pointer.lock(elem, pointerlockchange, pointerlockerror);
                };
            }

            GameShim.supports.pointerLock = false;

            return function(){}; // not supported
        })();
    }
    
    // document.exitPointerLock
    if(!document.exitPointerLock) {
        document.exitPointerLock = (function() {
            return  document.webkitExitPointerLock ||
                    document.mozExitPointerLock ||
                    function(){
                        if(navigator.pointer) {
                            var elem = this;
                            navigator.pointer.unlock();
                        }
                    };
        })();
    }
    
    //=====================
    // Gamepad
    //=====================
    
    if(!navigator.gamepads) {
        getter = (function() {
            // These are the functions that match the spec, and should be preferred
            if("webkitGamepads" in navigator) {
                return function() { return navigator.webkitGamepads; };
            }
            if("mozGamepads" in navigator) {
                return function() { return navigator.mozGamepads; };
            }
            
            GameShim.supports.gamepad = false;
            var gamepads = [];
            return function() { return gamepads; }; // not supported, return empty array
        })();
        
        Object.defineProperty(navigator, "gamepads", {
            enumerable: true, configurable: false, writeable: false,
            get: getter
        });
    }

    //=======================
    // High Resolution Timer
    //=======================

    if(!window.performance) {
        window.performance = {};
    }

    if(!window.performance.timing) {
        window.performance.timing = {
            navigationStart: Date.now() // Terrible approximation, I know. Sorry.
        };
    }

    if(!window.performance.now) {
        window.performance.now = (function() {
            // FYI: Mozilla supports high-res timers without prefixes.

            if(window.performance.webkitNow) {
                return window.performance.webkitNow;
            }

            GameShim.supports.highResTimer = false;

            return function(){ // not supported, return a low-resolution approximation
                return Date.now() - window.performance.timing.navigationStart;
            };
        })();
    }
    
})((typeof(exports) != 'undefined') ? global : window); // Account for CommonJS environments

/**
 * pubsub.js
 *
 * A tiny, optimized, tested, standalone and robust
 * pubsub implementation supporting different javascript environments
 *
 * @author Federico "Lox" Lucignano <http://plus.ly/federico.lox>
 *
 * @see https://github.com/federico-lox/pubsub.js
 *
 * NOTE: This has been modified for the GrapeFruit Engine. The exported
 *  object is now placed into the `gf` object, and callbacks are run synchronously.
 */

/*global define, module*/
(function (context) {
	'use strict';

	var channels = {},
		funcType = Function;

	gf.event = {
		/*
		 * @public
		 *
		 * Publish some data on a channel
		 *
		 * @param String channel The channel to publish on
		 * @param Mixed argument The data to publish, the function supports
		 * as many data parameters as needed
		 *
		 * @example Publish stuff on '/some/channel'.
		 * Anything subscribed will be called with a function
		 * signature like: function(a,b,c){ ... }
		 *
		 * PubSub.publish(
		 *		"/some/channel", "a", "b",
		 *		{total: 10, min: 1, max: 3}
		 * );
		 */
		publish: function () {
			//help minification
			var args = arguments,
				// args[0] is the channel
				subs = channels[args[0]],
				len,
				params,
				x;

			if (subs) {
				len = subs.length;
				params = (args.length > 1) ?
						Array.prototype.splice.call(args, 1) : [];


				//run the callbacks asynchronously,
				//do not block the main execution process
				/* I want these run synchronously
				setTimeout(
					function () {*/
						//executes callbacks in the order
						//in which they were registered
						for (x = 0; x < len; x += 1) {
							subs[x].apply(context, params);
						}

						//clear references to allow garbage collection
						subs = context = params = null;
					/*},
					0
				);*/
			}
		},

		/*
		 * @public
		 *
		 * Register a callback on a channel
		 *
		 * @param String channel The channel to subscribe to
		 * @param Function callback The event handler, any time something is
		 * published on a subscribed channel, the callback will be called
		 * with the published array as ordered arguments
		 *
		 * @return Array A handle which can be used to unsubscribe this
		 * particular subscription
		 *
		 * @example PubSub.subscribe(
		 *				"/some/channel",
		 *				function(a, b, c){ ... }
		 *			);
		 */
		subscribe: function (channel, callback) {
			if (typeof channel !== 'string') {
				throw "invalid or missing channel";
			}

			if (!(callback instanceof funcType)) {
				throw "invalid or missing callback";
			}

			if (!channels[channel]) {
				channels[channel] = [];
			}

			channels[channel].push(callback);

			return {channel: channel, callback: callback};
		},

		/*
		 * @public
		 *
		 * Disconnect a subscribed function f.
		 *
		 * @param Mixed handle The return value from a subscribe call or the
		 * name of a channel as a String
		 * @param Function callback [OPTIONAL] The event handler originaally
		 * registered, not needed if handle contains the return value
		 * of subscribe
		 *
		 * @example
		 * var handle = PubSub.subscribe("/some/channel", function(){});
		 * PubSub.unsubscribe(handle);
		 *
		 * or
		 *
		 * PubSub.unsubscribe("/some/channel", callback);
		 */
		unsubscribe: function (handle, callback) {
			if (handle.channel && handle.callback) {
				callback = handle.callback;
				handle = handle.channel;
			}

			if (typeof handle !== 'string') {
				throw "invalid or missing channel";
			}

			if (!(callback instanceof funcType)) {
				throw "invalid or missing callback";
			}

			var subs = channels[handle],
				x,
				y = (subs instanceof Array) ? subs.length : 0;

			for (x = 0; x < y; x += 1) {
				if (subs[x] === callback) {
					subs.splice(x, 1);
					break;
				}
			}
		}
	};
}(this));

})(window);