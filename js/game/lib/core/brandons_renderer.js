var Renderer = function(gl, canvas) {
        gl.clearColor(0.0, 0.0, 0.1, 1.0);
        gl.clearDepth(1.0);
        /*gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);*/
        this.tileMap = new TileMap(gl);
        this.tileMap.setSpriteSheet("root/texture/lttp-tiles.png");
        this.tileMap.setTileLayer("root/texture/lttp-all.png", 0);
        this.tileMap.tileSize = 16;
        this.tileMap.setTileScale(2);
        this.offset = vec2.create();
        this.zoomLevels = [0.125, 0.25, 0.5, 1, 2, 4];
        this.zoomIndex = 4;
        this.zooming = false;
        this.zoomPrev = 0;
        this.zoomNext = 0;
        this.offsetPrev = vec2.create();
        this.offsetNext = vec2.create();
        this.zoomProgress = 0;
        this.zoomTime = 250;
        this.scaleFactor = this.zoomLevels[this.zoomIndex];
        this.waitingForDraw = false;
        this.canvas = canvas;
        this.bindEvents(canvas);
    };
Renderer.prototype.bindEvents = function(canvas) {
    var self = this;
    var tracking = false;
    var lastX, lastY;
    canvas.addEventListener("mousedown", function(ev) {
        tracking = true;
        lastX = ev.pageX;
        lastY = ev.pageY;
    }, false);
    canvas.addEventListener("mousemove", function(ev) {
        if(tracking) {
            self.pan(ev.pageX - lastX, ev.pageY - lastY);
            lastX = ev.pageX;
            lastY = ev.pageY;
        }
    }, false);
    document.addEventListener("mouseup", function(ev) {
        tracking = false;
    }, false);
    canvas.addEventListener("mousewheel", function(ev) {
        self.zoom(ev.wheelDeltaY);
        ev.preventDefault();
    }, false);
    canvas.addEventListener("DOMMouseScroll", function(ev) {
        self.zoom(-ev.detail);
        ev.preventDefault();
    }, false);
    canvas.addEventListener("touchstart", function(ev) {
        tracking = true;
        lastX = ev.touches[0].pageX;
        lastY = ev.touches[0].pageY;
        ev.preventDefault();
    }, false);
    canvas.addEventListener("touchmove", function(ev) {
        if(tracking) {
            self.pan(ev.touches[0].pageX - lastX, ev.touches[0].pageY - lastY);
            lastX = ev.touches[0].pageX;
            lastY = ev.touches[0].pageY;
        }
        ev.preventDefault();
    }, false);
    document.addEventListener("touchend", function(ev) {
        tracking = false;
        ev.preventDefault();
    }, false);
};
Renderer.prototype.resize = function(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    this.tileMap.resizeViewport(canvas.width, canvas.height);
};
Renderer.prototype.pan = function(x, y) {
    this.offset[0] -= x / this.scaleFactor;
    this.offset[1] -= y / this.scaleFactor;
    var maxExtentX = this.tileMap.layers[0].textureSize[0] * this.scaleFactor * this.tileMap.tileSize;
    var maxExtentY = this.tileMap.layers[0].textureSize[1] * this.scaleFactor * this.tileMap.tileSize;
    var maxDiffX = maxExtentX - (this.tileMap.viewportSize[0] + (this.offset[0] * this.scaleFactor));
    if(maxDiffX < 0) {
        this.offset[0] += maxDiffX / this.scaleFactor;
    }
    var maxDiffY = maxExtentY - (this.tileMap.viewportSize[1] + (this.offset[1] * this.scaleFactor));
    if(maxDiffY < 0) {
        this.offset[1] += maxDiffY / this.scaleFactor;
    }
    if(this.offset[0] < 0) {
        this.offset[0] = 0;
    }
    if(this.offset[1] < 0) {
        this.offset[1] = 0;
    }
};
Renderer.prototype.zoom = function(zoom) {
    if(!this.zooming) {
        this.zoomIndex += (zoom > 0 ? 1 : -1);
        if(this.zoomIndex < 0) {
            this.zoomIndex = 0;
        }
        if(this.zoomIndex >= this.zoomLevels.length) {
            this.zoomIndex = this.zoomLevels.length - 1;
        }
        this.zoomPrev = this.scaleFactor;
        this.zoomNext = this.zoomLevels[this.zoomIndex];
        this.zoomProgress = 0;
        vec2.set(this.offset, this.offsetPrev);
        var moveX = ((this.tileMap.viewportSize[0] / this.zoomNext) - (this.tileMap.viewportSize[0] / this.zoomPrev)) * 0.5;
        var moveY = ((this.tileMap.viewportSize[1] / this.zoomNext) - (this.tileMap.viewportSize[1] / this.zoomPrev)) * 0.5;
        this.offsetNext[0] = this.offset[0] - moveX;
        this.offsetNext[1] = this.offset[1] - moveY;
        if(this.zoomPrev != this.zoomNext) {
            this.zooming = true;
        }
    }
};
Renderer.prototype.draw = function(gl, timing) {
    // TODO: Update Zoom/Pan
    if(this.zooming) {
        this.zoomProgress += (timing.frameTime / this.zoomTime);
        if(this.zoomProgress >= 1) {
            this.zoomProgress = 1;
            this.zooming = false;
            this.scaleFactor = this.zoomNext;
            // Make sure to clamp the offset to an "even" number
            this.offset[0] = Math.floor(this.offset[0] * this.scaleFactor) / this.scaleFactor;
            this.offset[1] = Math.floor(this.offset[1] * this.scaleFactor) / this.scaleFactor;
        } else {
            this.scaleFactor = this.zoomPrev + this.zoomProgress * (this.zoomNext - this.zoomPrev);
            vec2.lerp(this.offsetPrev, this.offsetNext, this.zoomProgress, this.offset);
        }
        this.tileMap.setTileScale(this.scaleFactor);
        this.pan(0, 0);
    }
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.tileMap.draw(this.offset[0], this.offset[1]);
};