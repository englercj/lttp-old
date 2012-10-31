(function($, window, undefined) {
    $(function() {
        //TODO: this is gross, need to organize it
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
            stripes = new Image(),
            tileSize = 16,
            activeTool = null,
            lastSlice = null,
            dragMap = false;

        window.initEditor = function initEditor(tilesz) {
            maps = {
                tilemap: $('#imgTilemap')[0],
                tileset: $('#imgTileset')[0]
            };

            if(typeof tilesz == 'string')
                tileSize = parseInt(tilesz, 10);
            else
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

        $('.tool').on('click', function(e) {
            $('.tool').removeClass('selected');
            activeTool = $(this).addClass('selected').data('toolid');
        });

        $('#btnDlTm').on('click', function(e) {
            ctxMinimap.putImageData(tilemapData, 0, 0);
            window.open($minimap[0].toDataURL());
            drawMinimap();
        });

        $map.on('mousedown', function(e) {
            dragMap = true;
        });

        $map.on('mouseup', function(e) {
            if(dragMap) dragMap = false;
        });

        $map.on('mousemove', function(e) {
            var pos = $map.position(),
                sz = tileSize / 2,
                x = Math.floor((e.pageX - pos.left) / sz),
                y = Math.floor((e.pageY - pos.top) / sz);

            //this is the first slice, setup the slice canvas
            if(lastSlice) {
                //we haven't moved to a new subtile, don't redraw it
                if(x == lastSlice.x && y == lastSlice.y) return;

                //if dragging then paint collisions
                if(dragMap) updateMapCollisionPoint(x, y);

                //we have moved to a new subtile, restore this full tile before drawing the tool
                drawMapTile(Math.floor(lastSlice.x / 2), Math.floor(lastSlice.y / 2));
            }

            //save this position so we can redraw this single tile later
            lastSlice = { x: x, y: y };

            //draw the subtile sized tool
            ctxMap.fillStyle = getToolColor(activeTool);
            ctxMap.fillRect(x * sz, y * sz, sz, sz);
            ctxMap.drawImage(stripes, x * sz, y * sz);
        });

        $map.on('click', function(e) {
            var pos = $map.position(),
                sz = tileSize / 2,
                x = Math.floor((e.pageX - pos.left) / sz),
                y = Math.floor((e.pageY - pos.top) / sz);

            updateMapCollisionPoint(x, y);
        });

        function updateMapCollisionPoint(x, y) {
            var tx = Math.floor(x / 2),
                ty = Math.floor(y / 2),
                pixel = getTilemapPixel(tx, ty),

                xpos = (x / 2) - tx, //will be 0 (left) or 0.5 (right)
                ypos = (y / 2) - ty, //will be 0 (top) or 0.5 (bottom)
                shift = 0;

            if(xpos < 0.5) shift = [2, 6]; //shift for lefts (leftbottom, lefttop)
            else shift = [0, 4]; //shifts for rights (rightbottom, righttop)

            if(ypos < 0.5) shift = shift[1]; //shift for top (second element)
            else shift = shift[0]; //shift for bottom (first element)

            var value = (activeTool << shift);

            //clear these bits
            pixel.b &= ~(3 << shift);

            //set these bits
            pixel.b |= (activeTool << shift);

            setTilemapPixel(tx, ty, pixel);
            drawMinimap();
        }

        function drawMinimap() {
            //ctxMinimap.drawImage(maps.tilemap, 0, 0);
            ctxMinimap.putImageData(tilemapData, 0, 0);
            ctxMinimap.strokeRect(offset.x, offset.y, viewSize.x, viewSize.y);
        }

        function drawMap() {
            for(var x = 0; x < viewSize.x; ++x) {
                for(var y = 0; y < viewSize.y; ++y) {
                    drawMapTile(x, y);
                }
            }
        }

        function drawMapTile(x, y) {
            var pixel = getTilemapPixel(offset.x + x, offset.y + y);

            //flip the tile image
            ctxTile.drawImage(maps.tileset, pixel.r * tileSize, pixel.g * tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);

            //draw tile to map
            ctxMap.drawImage(tilecanvas, 0, 0, tileSize, tileSize, x * tileSize, y * tileSize, tileSize, tileSize);

            //draw collision types
            if(pixel.b) {
                //left top, right top, left bottom, right bottom
                var subtiles = [((pixel.b >> 6) & 3), ((pixel.b >> 4) & 3), ((pixel.b >> 2) & 3), (pixel.b & 3)],
                    numTiles = Math.sqrt(subtiles.length);

                for(var s = 0, sl = subtiles.length; s < sl; ++s) {
                    if(!subtiles[s]) continue;

                    var x2 = s % numTiles,
                        y2 = Math.floor(s / numTiles);

                    ctxMap.fillStyle = getToolColor(subtiles[s]);

                    ctxMap.fillRect(
                        (x * tileSize) + (x2 * (tileSize / numTiles)),
                        (y * tileSize) + (y2 * (tileSize / numTiles)),
                        tileSize / numTiles,
                        tileSize / numTiles
                    );

                    ctxMap.drawImage(
                        stripes,
                        (x * tileSize) + (x2 * (tileSize / numTiles)),
                        (y * tileSize) + (y2 * (tileSize / numTiles))
                    );
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

        function setTilemapPixel(x, y, pixel) {
            var index = (y * tilemapData.width + x) * 4;

            tilemapData.data[index] = pixel.r;
            tilemapData.data[index + 1] = pixel.g;
            tilemapData.data[index + 2] = pixel.b;
            tilemapData.data[index + 3] = pixel.a;
        }

        function getToolColor(id, opacity) {
            opacity = opacity || 0.7;

            switch(id) {
                case 0: return 'rgba(255, 255, 255, ' + opacity + ')'; //white, empty
                case 1: return 'rgba(0, 200, 0, ' + opacity + ')'; //green, jumpdown
                case 2: return 'rgba(0, 0, 200, ' + opacity + ')'; //blue, reserved
                case 3: return 'rgba(200, 0, 0, ' + opacity + ')'; //red, block
                default: return 'rgba(255, 255, 255, ' + opacity + ')'; //purple
            }
        }
    });
})(jQuery, window);