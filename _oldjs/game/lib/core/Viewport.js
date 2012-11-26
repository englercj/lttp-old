define([
    'game/lib/utils/util',
    'game/lib/bases/Emitter'
], function(util, Emitter) {
    var Viewport = Emitter.extend({
        init: function(container, engine) {
            this.isDocument = false;
            this.engine = engine;
            this.renderer = engine.renderer;
            this._$doc = $(document);
            this._$win = $(window);
            
            if(!container) {
                this._$container = $(document);
                this.isDocument = true;
            } else {
                this._$container = util.jquerify(container).show();
            }
            
            this._$container.attr('tabindex', -1);
            
            this._$doc.on('fullscreenchange', $.proxy(this.onFullScreenChange, this));
            this._$doc.on('fullscreenerror', $.proxy(this.onFullScreenError, this));
            this._$doc.on('pointerlockchange', $.proxy(this.onPointerLockChange, this));
            this._$doc.on('pointerlockcerror', $.proxy(this.onPointerLockError, this));
            
            this._$container.on('resize', $.proxy(this.onResize, this));
            this._$win.on('resize', $.proxy(this.onResize, this));
            this._$win.on('blur', $.proxy(this.onWindowBlur, this));
            
            this.width = this._$container.width();
            this.height = this._$container.height();

            this.renderer.setSize(this.width, this.height);
            this.append(this.renderer.domElement);

            //this.requestFullScreen();
        },
        append: function() {return this._$container.append.apply(this._$container, arguments);},
        offset: function() {return this._$container.offset.apply(this._$container, arguments);},
        setCamera: function(camera) {
            this.camera = camera;
        },
        focus: function() {
            if(!this.isDocument)
                return this._$container;
            else
                return this._$contianer.focus();
        },
        toScreenXY: function(position) {
            var pos = position.clone();
            projScreenMat = new THREE.Matrix4();
            projScreenMat.multiply(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
            projScreenMat.multiplyVector3(pos);

            return {
                x: ((pos.x + 1) * (this.width / 2)) + this._$container.offset().left,
                y: ((-pos.y + 1) * (this.height / 2)) + this._$container.offset().top
            };
        },
        aspect: function() {
            return (this.width / this.height);
        },
        requestFullScreen: function() {
            return this._$container[0].requestFullscreen();
        },
        exitFullScreen: function() {
            return this._$container[0].exitFullscreen();
        },
        requestPointerLock: function() {
            return this._$container[0].requestPointerLock();
        },
        exitPointerLock: function() {
            return this._$container[0].exitPointerLock();
        },
        onResize: function(e) {
            this.width = this._$container.width();
            this.height = this._$container.height();

            this.renderer.setSize(this.width, this.height);
            this.emit('resize', this.width, this.height);
        },
        onFullScreenChange: function(e) {
            console.log('fullscreen', e);
            if(!document.fullscreenElement) {
                //fullscreen was disabled, hide!
                this._$container.hide();
            } else {
                //fullscreen is enabled, lets get pointer lock
                this._$container.show();
                this.requestPointerLock();

                this.width = this._$container.width();
                this.height = this._$container.height();
                this.renderer.setSize(this.width, this.height);
            }
        },
        onFullScreenError: function(e) {
            console.warn('Unable to enter fullscreen!', e);
        },
        onPointerLockChange: function(e) {
            console.log('pointerlock', e);
            if(!document.pointerLockElement) {
                //don't have lock
                console.warn('NO Pointer Lock')
            }
        },
        onPointerLockError: function(e) {
            console.warn('Unable to capture pointer lock!', e);
        },
        onWindowBlur: function(e) {
            this.engine.pause();
        }
    });
    
    return Viewport;
});