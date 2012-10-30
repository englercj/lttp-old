(function($, window, undefined) {
    $(function() {
        var $map = $('#map'),
            $minimap = $('#minimap'),
            tilecanvas = document.createElement('canvas'),
            ctxMap = $map[0].getContext('2d'),
            ctxMinimap = $minimap[0].getContext('2d'),
            ctxTile = tilecanvas.getContext('2d'),
            tilemapData = null,
            maps = null,
            offset = { x: 0, y: 0 },
            dragMinimap = null,
            viewSize = { x: 96, y: 48 },
            stripes = new Image();

        window.initEditor = function initEditor(tilesz) {
            maps = {
                tilemap: $('#imgTilemap')[0],
                tileset: $('#imgTileset')[0]
            };

            tileSize = tilesz;

            window.drawMinimap = drawMinimap;
            window.drawMap = drawMap;

            tilecanvas.width = tileSize;
            tilecanvas.height = tileSize;
            ctxTile.translate(0, tileSize);
            ctxTile.scale(1, -1);

            //init minimap
            $minimap.attr({
                width: maps.tilemap.width,
                height: maps.tilemap.height
            });

            ctxMinimap.drawImage(maps.tilemap, 0, 0);
            tilemapData = ctxMinimap.getImageData(0, 0, maps.tilemap.width, maps.tilemap.height);

            ctxMinimap.strokeStyle = 'rgba(255,255,255,1)';
            drawMinimap();

            //init regular map
            stripes.addEventListener('load', function () {
                $map.attr({
                    width: viewSize.x * tileSize,
                    height: viewSize.y * tileSize
                });
                drawMap();
            }, false);
            stripes.src = '/img/stripes.png';
        };

        $minimap.on('mousedown', function(e) {
            var pos = $minimap.position();
            if(e.pageX > (pos.left + offset.x) && e.pageX < (pos.left + offset.x + viewSize.x) &&
                e.pageY > (pos.top + offset.y) && e.pageY < (pos.top + offset.y + viewSize.y)) 
            {
                dragMinimap = { x: e.clientX, y: e.clientY };
            }
        });

        $minimap.on('mousemove', function(e) {
            if(dragMinimap) {
                var diffX = e.clientX - dragMinimap.x,
                    diffY = e.clientY - dragMinimap.y;

                dragMinimap.x = e.clientX;
                dragMinimap.y = e.clientY;

                offset.x += diffX;
                offset.y += diffY;

                drawMinimap();
            }
        });

        $minimap.on('mouseup', function(e) {
            if(dragMinimap) dragMinimap = null;
        });

        $minimap.on('click', function(e) {
            var pos = $minimap.position();

            offset.x = Math.round(e.pageX - pos.left - (viewSize.x / 2));
            offset.y = Math.round(e.pageY - pos.top - (viewSize.y / 2));

            if(offset.x < 0) offset.x = 0;
            if(offset.y < 0) offset.y = 0;

            if(offset.x > (maps.tilemap.width - viewSize.x)) offset.x = (maps.tilemap.width - viewSize.x);
            if(offset.y > (maps.tilemap.height - viewSize.y)) offset.y = (maps.tilemap.height - viewSize.y);

            drawMinimap();
            drawMap();
        });

        function drawMinimap() {
            ctxMinimap.drawImage(maps.tilemap, 0, 0);
            ctxMinimap.strokeRect(offset.x, offset.y, viewSize.x, viewSize.y);
        }

        function drawMap() {
            var flag = 3;

            for(var x = 0; x < viewSize.x; ++x) {
                for(var y = 0; y < viewSize.y; ++y) {
                    var pixel = getTilemapPixel(offset.x + x, offset.y + y);

                    //flip the image
                    ctxTile.drawImage(maps.tileset, pixel.r * tileSize, pixel.g * tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);

                    //draw to map tile
                    ctxMap.drawImage(tilecanvas, 0, 0, tileSize, tileSize, x * tileSize, y * tileSize, tileSize, tileSize);

                    //left top, right top, left bottom, right bottom
                    //[((pixel.b >> 6) & 3), ((pixel.b >> 4) & 3), ((pixel.b >> 2) & 3), (pixel.b & 3)]
                    
                    //draw collision type
                    if(pixel.b == 0)
                        ctxMap.fillStyle = 'rgba(200, 0, 0, 0.9)';

                    //jumpdown
                    if(pixel.b == 1)
                        ctxMap.fillStyle = 'rgba(0, 200, 0, 0.9)';

                    //reserved
                    if(pixel.b == 2)
                        ctxMap.fillStyle = 'rgba(0, 0, 200, 0.9)';

                    //block
                    if(pixel.b == 3)
                        ctxMap.fillStyle = 'rgba(200, 0, 0, 0.9)';

                    //unknown
                    if(pixel.b == 3)
                        ctxMap.fillStyle = 'rgba(0, 0, 0, 0.9)';

                    ctxMap.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                    ctxMap.drawImage(stripes, x * tileSize, y * tileSize);
                }
            }
        }

        function getTilemapPixel(x, y) {
            var index = (y * tilemapData.width + x) * 4,
                red = tilemapData.data[index],
                green = tilemapData.data[index + 1],
                blue = tilemapData.data[index + 2],
                alpha = tilemapData.data[index + 3],
                rgba = { r: red, g: green, b: blue, a: alpha };

            //rgba.hex = this.rgbaToHex(rgba);
            return rgba;
        }
    });
})(jQuery, window);