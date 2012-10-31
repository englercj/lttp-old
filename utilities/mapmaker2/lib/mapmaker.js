/*
Copyright (c) 2012 Brandon Jones

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

    1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software
    in a product, an acknowledgment in the product documentation would be
    appreciated but is not required.

    2. Altered source versions must be plainly marked as such, and must not
    be misrepresented as being the original software.

    3. This notice may not be removed or altered from any source
    distribution.

>>>>>>>>>
>Note from Chad Engler:
> This is tweaked to run on Node.js using node-canvas
> This modified version will draw each tile upside down, so it will work with my shader
> This version will run each processTile() in parallel
> Use cluster module and have workers for each processTile()???
>>>>>>>>>
*/
var Canvas = require('canvas'),
    events = require('events'),
    async = require('async'),
    util = require('util');

var MapMaker = exports.MapMaker = function() {
    events.EventEmitter.call(this);

    this.sprites = {};
    this.tileSize = 16;
    this.nextTileId = 0;
    this.tilesPerRow = 0;
    this.blockThreshold = 65;

    this.tileCanvas = new Canvas(); //document.createElement("canvas");
    this.spriteCanvas = new Canvas(); //document.createElement("canvas");
    this.mapCanvas = new Canvas(); //document.createElement("canvas");

    this.tileCtx = this.tileCanvas.getContext('2d');
    this.spriteCtx = this.spriteCanvas.getContext('2d');
    this.mapCtx = this.mapCanvas.getContext('2d');
    
    var self = this;
    this.srcImage = new Canvas.Image();
    /*this.srcImage.addEventListener("load", function() {
        self.processImage();
    }, false);*/
};

util.inherits(MapMaker, events.EventEmitter);

MapMaker.prototype.setSpriteSheetSize = function(sheetSize) {
    this.spriteCanvas.width = sheetSize;
    this.spriteCanvas.height = sheetSize;
};

MapMaker.prototype.parseMap = function(src, tileSize, firstTileId, cb) {
    if(typeof tileSize == 'function') {
        cb = tileSize;
        tileSize = 16;
    }

    if(typeof firstTileId == 'function') {
        cb = firstTileId;
        firstTileId = null;
    }

    this.sprites = {};
    this.tileSize = tileSize;
    this.tilesPerRow = Math.floor(this.spriteCanvas.width / tileSize);

    if(firstTileId) {
        this.nextTileId = firstTileId;
    }

    this.tileCanvas.width = tileSize;
    this.tileCanvas.height = tileSize;

    this.srcImage.src = src;

    this.processImage(cb);
};

MapMaker.prototype.processImage = function(cb) {
    var mapWidth = this.srcImage.width / this.tileSize;
    var mapHeight = this.srcImage.height / this.tileSize;
    this.mapCanvas.width = mapWidth;
    this.mapCanvas.height = mapHeight;

    var x, y, fns = [], self = this, total = mapHeight * mapWidth;
    for(y = 0; y < mapHeight; ++y) {
        for(x = 0; x < mapWidth; ++x) {
            (function(x, y) {
                fns.push(function(_cb) {
                    self.processTile(x, y, function() {
                        self.emit('progress', total);
                        _cb();
                    });
                });
            })(x, y);
        }
    }

    async.parallel(fns, function(err, results) {
        if(cb) {
            cb(err, {
                tileset: self.spriteCanvas,
                tilemap: self.mapCanvas
            });
        }
    });

    /*
    var spriteImg = document.getElementById("spriteImg");
    var mapImg = document.getElementById("mapImg");

    spriteImg.src = this.spriteCanvas.toDataURL("image/png");
    mapImg.src = this.mapCanvas.toDataURL("image/png");
    */
    //this.emit('parsed', this.spriteCanvas.toBuffer(), this.spriteCanvas.toBuffer());
};

MapMaker.prototype.processTile = function(x, y, cb) {
    //rotate upside down, and draw
    this.tileCtx.save();
    this.tileCtx.translate(0, this.tileSize);
    this.tileCtx.scale(1, -1);
    this.tileCtx.drawImage(this.srcImage, 
        x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, 
        0, 0, this.tileSize, this.tileSize);

    var sprite = this.cacheSprite();

    this.tileCtx.restore();

    //need to do collision intelligence here
    //valid values are:
    //0 = empty
    //1 = jumpdown
    //2 = reserved
    //3 = block
    var blue = 0,
        shifts = [[2, 6], [0, 4]],
        pixels = this.tileCtx.getImageData(0, 0, this.tileSize, this.tileSize);

    //if there is any black then make it completely blocking
    //this is a naive way to guess if this tile blocks. hopefully
    //this can get smarter in the future
    for(var p = 0; p < pixels.data.length; p += 4) {
        if(pixels.data[p] < this.blockThreshold && //red
            pixels.data[p + 1] < this.blockThreshold && //green
            pixels.data[p + 2] < this.blockThreshold) //blue
        {
            var y2 = Math.floor((p / 4) / this.tileSize), //y coord
                x2 = (p / 4) - (y2 * this.tileSize), //x coord
                shift = shifts[Math.round(x2 / this.tileSize)][Math.round(y2 / this.tileSize)];

            blue |= (3 << shift);
        }
    }

    this.mapCtx.fillStyle='rgb(' + sprite.x + ',' + sprite.y + ', ' + blue + ')';
    this.mapCtx.fillRect(x,y,1,1);

    process.nextTick(function() {
        if(cb) cb();
    });

    /* Why was this thing drawing 2 times?
    this.tileCtx.drawImage(this.srcImage, 
        x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, 
        0, 0, this.tileSize, this.tileSize);*/
};

MapMaker.prototype.cacheSprite = function() {
    var imgData = this.tileCtx.getImageData(0, 0, this.tileSize, this.tileSize);
    var hash = this.getTileHash(imgData);
    var sprite = this.sprites[hash];
    if(!sprite) {
        sprite = {
            x: this.nextTileId % this.tilesPerRow,
            y: Math.floor(this.nextTileId / this.tilesPerRow)
        };

        this.spriteCtx.drawImage(this.tileCanvas, 
            0, 0, this.tileSize, this.tileSize, 
            sprite.x * this.tileSize, sprite.y * this.tileSize, this.tileSize, this.tileSize);

        this.nextTileId++;
        this.sprites[hash] = sprite;
    }
    return sprite;
};

MapMaker.prototype.getTileHash = function(imgData) {
    var hash = 0;
    if (imgData.data.length == 0) return hash;
    for (var i = 0; i < imgData.data.length; i++) {
        hash = ((hash<<5)-hash)+imgData.data[i];
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};