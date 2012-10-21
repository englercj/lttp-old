"use strict";

var MapMaker = function() {
    this.sprites = {};
    this.tileSize = 16;
    this.nextTileId = 0;
    this.tilesPerRow = 0;

    this.tileCanvas = document.createElement("canvas");
    this.spriteCanvas = document.createElement("canvas");
    this.mapCanvas = document.createElement("canvas");

    this.tileCtx = this.tileCanvas.getContext("2d");
    this.spriteCtx = this.spriteCanvas.getContext("2d");
    this.mapCtx = this.mapCanvas.getContext("2d");

    var self = this;
    this.srcImage = new Image();
    this.srcImage.addEventListener("load", function() {
        self.processImage();
    }, false);
};

MapMaker.prototype.setSpriteSheetSize = function(sheetSize) {
    this.spriteCanvas.width = sheetSize;
    this.spriteCanvas.height = sheetSize;
};

MapMaker.prototype.parseMap = function(src, tileSize, firstTileId) {
    this.sprites = {};
    this.tileSize = tileSize;
    this.tilesPerRow = Math.floor(this.spriteCanvas.width / tileSize);

    if(firstTileId) {
        this.nextTileId = firstTileId;
    }

    this.tileCanvas.width = tileSize;
    this.tileCanvas.height = tileSize;

    this.srcImage.src = src;
};

MapMaker.prototype.processImage = function() {
    var mapWidth = this.srcImage.width / this.tileSize;
    var mapHeight = this.srcImage.height / this.tileSize;
    this.mapCanvas.width = mapWidth;
    this.mapCanvas.height = mapHeight;

    var x, y;
    for(y = 0; y &lt; mapHeight; ++y) {
        for(x = 0; x &lt; mapWidth; ++x) {
            this.processTile(x, y);
        }
    }

    var spriteImg = document.getElementById("spriteImg");
    var mapImg = document.getElementById("mapImg");

    spriteImg.src = this.spriteCanvas.toDataURL("image/png");
    mapImg.src = this.mapCanvas.toDataURL("image/png");
};

MapMaker.prototype.processTile = function(x, y) {
    this.tileCtx.drawImage(this.srcImage, 
        x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, 
        0, 0, this.tileSize, this.tileSize);

    var sprite = this.cacheSprite();

    this.mapCtx.fillStyle="rgb(" + sprite.x + "," + sprite.y + ", 0)";
    this.mapCtx.fillRect(x,y,1,1);
    this.tileCtx.drawImage(this.srcImage, 
        x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, 
        0, 0, this.tileSize, this.tileSize);
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
    for (var i = 0; i &lt; imgData.data.length; i++) {
        hash = ((hash&lt;&lt;5)-hash)+imgData.data[i];
        hash = hash &amp; hash; // Convert to 32bit integer
    }
    return hash;
};

var mapMaker = new MapMaker();
mapMaker.setSpriteSheetSize(512);
mapMaker.parseMap("root/zelda/ZeldaMassive.png", 16);