(function($, window, undefined) {
    $(function() {
        var $tilemap = $('#rplTilemap'),
            $tileset = $('#rplTileset'),
            ctxMap = $tilemap[0].getContext('2d'),
            ctxSet = $tileset[0].getContext('2d'),
            tileSize = 16,
            tilemapData = null,
            lastSlice = null,
            maps = null,
            firstTile = null,
            secondTile = null,
            override = false,
            init = false;

        window.initReplacer = function initEditor(tilesz, tm, ts) {
            maps = {
                tilemap: tm,
                tileset: ts
            };

            if(typeof tilesz == 'string')
                tileSize = parseInt(tilesz, 10);
            else
                tileSize = tilesz;

            //init tilemap
            $tilemap.attr({
                width: maps.tilemap.width,
                height: maps.tilemap.height
            });

            ctxMap.drawImage(maps.tilemap, 0, 0);
            tilemapData = ctxMap.getImageData(0, 0, maps.tilemap.width, maps.tilemap.height);

            //init tileset
            $tileset.attr({
                width: maps.tileset.width,
                height: maps.tileset.height
            });

            ctxSet.drawImage(maps.tileset, 0, 0);
            ctxSet.save();

            init = true;
        };

        $('#btnUploadReplace').on('click', function() {
            $dlgUpload.dialog('option', 'buttons', {
                Upload: doUploadToReplacer,
                Cancel: function() { $(this). dialog('close'); }
            });
            $dlgUpload.dialog('open');
        });

        $tileset.on('mousemove', function(e) {
            if(!init) return;

            var pos = $tileset.position(),
                x = Math.floor((e.pageX - pos.left) / tileSize) * tileSize,
                y = Math.floor((e.pageY - pos.top) / tileSize) * tileSize;

            //this is first 
            /*if(!lastSlice)  {
                lastSlice = {
                    x: x, y: y,
                    slice: document.createElement('canvas')
                };

                lastSlice.slice.width = tileSize + (indicatorWidth * 2);
                lastSlice.slice.height = tileSize + (indicatorWidth * 2);
                lastSlice.ctx = lastSlice.slice.getContext('2d');
            }
            //we have a slice, restore it
            else {
                //we haven't moved to a new subtile, don't redraw it
                if(x == lastSlice.x && y == lastSlice.y) return;

                //we have moved to a new subtile, restore this full tile before drawing the tool
                ctxSet.drawImage(lastSlice.slice,
                    0, 0, tileSize + (indicatorWidth * 2), tileSize + (indicatorWidth * 2),
                    lastSlice.x - indicatorWidth, lastSlice.y - indicatorWidth, tileSize + indicatorWidth, tileSize + indicatorWidth);
                //drawMapTile(Math.floor(lastSlice.x / 2), Math.floor(lastSlice.y / 2));

                lastSlice.x = x;
                lastSlice.y = y;
            }

            //save this square before it is overwritten
            lastSlice.ctx.drawImage($tileset[0], x - indicatorWidth, y - indicatorWidth, tileSize + indicatorWidth, tileSize + indicatorWidth,
                0, 0, tileSize + (indicatorWidth * 2), tileSize + (indicatorWidth * 2));*/

            //draw the tile sized tool
            ctxSet.drawImage(maps.tileset, 0, 0);
            if(!firstTile) {
                ctxSet.strokeStyle = 'rgba(0, 255, 0, 1)';
                ctxSet.strokeRect(x, y, tileSize, tileSize);
            }
            else {
                //draw green
                ctxSet.strokeStyle = 'rgba(0, 255, 0, 1)';
                ctxSet.strokeRect(firstTile.x * tileSize, firstTile.y * tileSize, tileSize, tileSize);

                //draw red
                ctxSet.strokeStyle = 'rgba(255, 0, 0, 1)';
                ctxSet.strokeRect(x, y, tileSize, tileSize);
            }
        });

        $tileset.on('click', function(e) {
            if(!init) return;

            var pos = $tileset.position(),
                x = Math.floor((e.pageX - pos.left) / tileSize),
                y = Math.floor((e.pageY - pos.top) / tileSize);

            if(firstTile) {
                secondTile = { x: x, y: y };
                doReplaceTile();
            }
            else {
                firstTile = { x: x, y: y };
            }
        });

        $tileset.on('contextmenu', function(e) {
            e.preventDefault();

            firstTile = secondTile = null;
            ctxSet.drawImage(maps.tileset, 0, 0);
        });

        $('#btnEditRepl').on('click', function() {
            initEditor(tileSize, $tilemap[0], maps.tileset);
            $('#tabs').tabs('option', 'active', 1);
        });

        $('#chkOverride').on('change', function() {
            var $this = $(this);

            override = !!$this.attr('checked');
        });

        function doReplaceTile() {
            console.log(firstTile);
            var replaced = 0;
            //replace firstTile with secondTile using either our best-guess for the collision type
            //or if overriden the activeTool
            for(var x = 0; x < maps.tilemap.width; ++x) {
                for(var y = 0; y < maps.tilemap.height; ++y) {
                    var px = getTilemapPixel(x, y);

                    //tile to replace
                    if(px.red == firstTile.x && px.green == firstTile.y) {
                        replaced++;
                        px.red = secondTile.x;
                        px.green = secondTile.y;
                        px.alpha = 255;

                        if(override) {
                            px.blue = activeTool;
                        } else {
                            px.blue = 0;
                        }

                        setTilemapPixel(x, y, px);
                    }
                }
            }

            ctxMap.putImageData(tilemapData, 0, 0);
            console.log('Success! Replaced', replaced, 'tiles!');
            $tileset.trigger('contextmenu');
        }

        function getTilemapPixel(x, y) {
            var index = (y * tilemapData.width + x) * 4,
                red = tilemapData.data[index],
                green = tilemapData.data[index + 1],
                blue = tilemapData.data[index + 2],
                alpha = tilemapData.data[index + 3],
                rgba = { red: red, green: green, blue: blue, alpha: alpha };

            //rgba.hex = this.rgbaToHex(rgba);
            return rgba;
        }

        function setTilemapPixel(x, y, pixel) {
            var index = (y * tilemapData.width + x) * 4;

            tilemapData.data[index] = pixel.red;
            tilemapData.data[index + 1] = pixel.green;
            tilemapData.data[index + 2] = pixel.blue;
            tilemapData.data[index + 3] = pixel.alpha;
        }

        function doUploadToReplacer() {
            var $form = $('#upload'),
                formData = new FormData($form[0]);

            $.ajax({
                url: '/uploadmaps',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data, textStatus, jqXHR) {
                    var imgTilemap = new Image(),
                        imgTileset = new Image(),
                        tsz = $('#upTilesize').val();

                    imgTilemap.addEventListener('load', function() {
                        imgTileset.addEventListener('load', function() {
                            initReplacer(tsz, imgTilemap, imgTileset);
                            $dlgUpload.dialog('close');
                        }, false);
                        imgTileset.src = data.tileset;
                    }, false);
                    imgTilemap.src = data.tilemap;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('DERP!', errorThrown);
                }
            });
        }
    });
})(jQuery, window);