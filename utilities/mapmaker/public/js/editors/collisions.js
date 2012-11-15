(function($, window, undefined) {
    var cEditor = EDITOR.editors.collisions = {
        _init: function() {
            //setup some variables
            cEditor.tilecanvas = document.createElement('canvas');
            cEditor.ctxTile = cEditor.tilecanvas.getContext('2d');
            cEditor.dragMinimap = null;
            cEditor.dragMap = false;
            cEditor.offset = { x: 0, y: 0 };
            cEditor.viewSize = { x: 85, y: 50 };
            cEditor.stripes = new Image();
            cEditor.lastSlice = null;

            //init the tile canvas
            cEditor.tilecanvas.width = EDITOR.tileSize;
            cEditor.tilecanvas.height = EDITOR.tileSize;
            cEditor.ctxTile.translate(0, EDITOR.tileSize);
            cEditor.ctxTile.scale(1, -1);

            //draw the minimap view range
            EDITOR.ctxMinimap.strokeStyle = 'rgba(255,255,255,1)';
            cEditor.drawMinimap();

            //load the stripes
            cEditor.stripes.addEventListener('load', function () {
                EDITOR.$map.attr({
                    width: cEditor.viewSize.x * EDITOR.tileSize,
                    height: cEditor.viewSize.y * EDITOR.tileSize
                });
                //draw the map and bind events
                cEditor.drawMap();
                cEditor.bindEvents();
            }, false);
            cEditor.stripes.src = '/img/stripes.png';
        },
        _destroy: function() {
            cEditor.unbindEvents();
            cEditor.tilecanvas = cEditor.ctxTile = cEditor.dragMinimap = cEditor.viewSize = cEditor.stripes = null;
        },
        bindEvents: function() {
            //Minimap events
            EDITOR.$minimap.on('mousedown', function(e) {
                var pos = EDITOR.$minimap.position();
                if(e.pageX > (pos.left + cEditor.offset.x) && e.pageX < (pos.left + cEditor.offset.x + cEditor.viewSize.x) &&
                    e.pageY > (pos.top + cEditor.offset.y) && e.pageY < (pos.top + cEditor.offset.y + cEditor.viewSize.y)) 
                {
                    cEditor.dragMinimap = { x: e.clientX, y: e.clientY };
                }
            });

            EDITOR.$minimap.on('mousemove', function(e) {
                if(cEditor.dragMinimap) {
                    var diffX = e.clientX - cEditor.dragMinimap.x,
                        diffY = e.clientY - cEditor.dragMinimap.y;

                    cEditor.dragMinimap.x = e.clientX;
                    cEditor.dragMinimap.y = e.clientY;

                    cEditor.offset.x += diffX;
                    cEditor.offset.y += diffY;

                    cEditor.drawMinimap();
                }
            });

            EDITOR.$minimap.on('mouseup', function(e) {
                if(cEditor.dragMinimap) cEditor.dragMinimap = null;
            });

            EDITOR.$minimap.on('click', function(e) {
                var pos = EDITOR.$minimap.position();

                cEditor.offset.x = Math.round(e.pageX - pos.left - (cEditor.viewSize.x / 2));
                cEditor.offset.y = Math.round(e.pageY - pos.top - (cEditor.viewSize.y / 2));

                if(cEditor.offset.x < 0) cEditor.offset.x = 0;
                if(cEditor.offset.y < 0) cEditor.offset.y = 0;

                if(cEditor.offset.x > (EDITOR.tilemap.width - cEditor.viewSize.x)) cEditor.offset.x = (EDITOR.tilemap.width - cEditor.viewSize.x);
                if(cEditor.offset.y > (EDITOR.tilemap.height - cEditor.viewSize.y)) cEditor.offset.y = (EDITOR.tilemap.height - cEditor.viewSize.y);

                cEditor.drawMinimap();
                cEditor.drawMap();
            });

            //Map events
            EDITOR.$map.on('mousedown', function(e) {
                cEditor.dragMap = true;
            });

            EDITOR.$map.on('mouseup', function(e) {
                cEditor.dragMap = false;
            });

            EDITOR.$map.on('mousemove', function(e) {
                var pos = EDITOR.$map.position(),
                    sz = EDITOR.tileSize / 2,
                    x = Math.floor((e.pageX - pos.left) / sz),
                    y = Math.floor((e.pageY - pos.top) / sz);

                //this is the first slice, setup the slice canvas
                if(cEditor.lastSlice) {
                    //we haven't moved to a new subtile, don't redraw it
                    if(x == cEditor.lastSlice.x && y == cEditor.lastSlice.y) return;

                    //if dragging then paint collisions
                    if(cEditor.dragMap) cEditor.updateMapCollisionPoint(x, y);

                    //we have moved to a new subtile, restore this full tile before drawing the tool
                    cEditor.drawMapTile(Math.floor(cEditor.lastSlice.x / 2), Math.floor(cEditor.lastSlice.y / 2));
                }

                //save this position so we can redraw this single tile later
                cEditor.lastSlice = { x: x, y: y };

                //draw the subtile sized tool
                EDITOR.ctxMap.fillStyle = EDITOR.utils.getToolColor(EDITOR.tool);
                EDITOR.ctxMap.fillRect(x * sz, y * sz, sz, sz);
                EDITOR.ctxMap.drawImage(cEditor.stripes, x * sz, y * sz);
            });

            EDITOR.$map.on('click', function(e) {
                var pos = EDITOR.$map.position(),
                    sz = EDITOR.tileSize / 2,
                    x = Math.floor((e.pageX - pos.left) / sz),
                    y = Math.floor((e.pageY - pos.top) / sz);

                cEditor.updateMapCollisionPoint(x, y);
            });
        },
        unbindEvents: function() {
            //Minimap events
            EDITOR.$minimap.off('mousedown');
            EDITOR.$minimap.off('mousemove');
            EDITOR.$minimap.off('mouseup');
            EDITOR.$minimap.off('click');

            //Map events
            EDITOR.$map.off('mousedown');
            EDITOR.$map.off('mouseup');
            EDITOR.$map.off('mousemove');
            EDITOR.$map.off('click');
        },
        drawMap: function() {
            for(var x = 0; x < cEditor.viewSize.x; ++x) {
                for(var y = 0; y < cEditor.viewSize.y; ++y) {
                    cEditor.drawMapTile(x, y);
                }
            }
        },
        drawMinimap: function() {
            //EDITOR.ctxMinimap.drawImage(EDITOR.tilemap, 0, 0);
            EDITOR.ctxMinimap.putImageData(EDITOR.minimapData, 0, 0);
            EDITOR.ctxMinimap.strokeRect(cEditor.offset.x, cEditor.offset.y, cEditor.viewSize.x, cEditor.viewSize.y);
        },
        drawMapTile: function(x, y) {
            var pixel = EDITOR.utils.getPixel(EDITOR.minimapData, cEditor.offset.x + x, cEditor.offset.y + y);

            //flip the tile image
            cEditor.ctxTile.drawImage(EDITOR.tileset, pixel.red * EDITOR.tileSize, pixel.green * EDITOR.tileSize, EDITOR.tileSize, EDITOR.tileSize, 0, 0, EDITOR.tileSize, EDITOR.tileSize);

            //draw tile to map
            EDITOR.ctxMap.drawImage(cEditor.tilecanvas, 0, 0, EDITOR.tileSize, EDITOR.tileSize, x * EDITOR.tileSize, y * EDITOR.tileSize, EDITOR.tileSize, EDITOR.tileSize);

            //draw collision types
            if(pixel.blue) {
                //left top, right top, left bottom, right bottom
                var subtiles = [((pixel.blue >> 6) & 3), ((pixel.blue >> 4) & 3), ((pixel.blue >> 2) & 3), (pixel.blue & 3)],
                    numTiles = Math.sqrt(subtiles.length);

                for(var s = 0, sl = subtiles.length; s < sl; ++s) {
                    if(!subtiles[s]) continue;

                    var x2 = s % numTiles,
                        y2 = Math.floor(s / numTiles);

                    EDITOR.ctxMap.fillStyle = EDITOR.utils.getToolColor(subtiles[s]);

                    EDITOR.ctxMap.fillRect(
                        (x * EDITOR.tileSize) + (x2 * (EDITOR.tileSize / numTiles)),
                        (y * EDITOR.tileSize) + (y2 * (EDITOR.tileSize / numTiles)),
                        EDITOR.tileSize / numTiles,
                        EDITOR.tileSize / numTiles
                    );

                    EDITOR.ctxMap.drawImage(
                        cEditor.stripes,
                        (x * EDITOR.tileSize) + (x2 * (EDITOR.tileSize / numTiles)),
                        (y * EDITOR.tileSize) + (y2 * (EDITOR.tileSize / numTiles))
                    );
                }
            }
        },
        updateMapCollisionPoint: function(x, y) {
            var tx = Math.floor(x / 2),
                ty = Math.floor(y / 2),
                pixel = EDITOR.utils.getPixel(EDITOR.minimapData, cEditor.offset.x + tx, cEditor.offset.y + ty),

                xpos = (x / 2) - tx, //will be 0 (left) or 0.5 (right)
                ypos = (y / 2) - ty, //will be 0 (top) or 0.5 (bottom)
                shift = 0;

            if(xpos < 0.5) shift = [2, 6]; //shift for lefts (leftbottom, lefttop)
            else shift = [0, 4]; //shifts for rights (rightbottom, righttop)

            if(ypos < 0.5) shift = shift[1]; //shift for top (second element)
            else shift = shift[0]; //shift for bottom (first element)

            var value = (EDITOR.tool << shift);

            //clear these bits
            pixel.blue &= ~(3 << shift);

            //set these bits
            pixel.blue |= (EDITOR.tool << shift);

            EDITOR.utils.setPixel(EDITOR.minimapData, cEditor.offset.x + tx, cEditor.offset.y + ty, pixel);
            cEditor.drawMinimap();
        }
    };
})(jQuery, window);