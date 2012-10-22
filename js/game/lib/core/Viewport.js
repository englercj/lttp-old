define([], function() {
    var Viewport = Class.extend({
        init: function(container, renderer) {
            this.isDocument = false;
            this.renderer = renderer;
            this._$doc = $(document);
            
            if(!container) {
                this._$container = $(document);
                this.isDocument = true;
            }
            else if(!container.jquery)
                this._$container = $(container);
            else
                this._$container = container;
            
            this._$container.attr('tabindex', -1);
            
            this._$doc.on('fullscreenchange', $.proxy(this.onFullScreenChange, this));
            this._$doc.on('fullscreenerror', $.proxy(this.onFullScreenError, this));
            this._$doc.on('pointerlockchange', $.proxy(this.onPointerLockChange, this));
            this._$doc.on('pointerlockcerror', $.proxy(this.onPointerLockError, this));
            
            this.on('resize', $.proxy(this.onResize, this));
            
            renderer.setSize(this.width(), this.height());
            this.append(renderer.domElement);
            
            //this.requestFullScreen();
        },
        height: function() {return this._$container.height.apply(this._$container, arguments);},
        width: function() {return this._$container.width.apply(this._$container, arguments);},
        append: function() {return this._$container.append.apply(this._$container, arguments);},
        offset: function() {return this._$container.offset.apply(this._$container, arguments);},
        on: function() { return this._$container.on.apply(this._$container, arguments);},
        focus: function() {
            if(!this.isDocument)
                return this._$container;
            else
                return this._$contianer.focus();
        },
        aspect: function() {
            return (this.width() / this.height());
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
            this.renderer.setSize(this.width(), this.height());
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
                this.renderer.setSize(this.width(), this.height());
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
        }
    });
    
    return Viewport;
});