$(function() {
    var tileset = new Image(),
        stripes = new Image(),
        tool = 0,
        dragMap = false,
        tileSize = 16,
        lastSlice = null,
        colliders = {},
        $set = $('#colSet'),
        $tile = $('#colTile'),
        $slice = $('#colSlice'),
        ctxSet = $set[0].getContext('2d'),
        ctxTile = $tile[0].getContext('2d'),
        ctxSlice = $slice[0].getContext('2d'),
        tilesetData = null;

    var subtiles = [
        { name: 'empty', value: 0, color: null },
        { name: 'solid', value: 1, color: [null, { r: 65, g: 65, b: 65 }] },
        { name: 'cliff', value: 2, color: null /*{ r: 96, g: 72, b: 40 }*/ },
        { name: 'stairs', value: 3, color: null },
        { name: 'water', value: 4, color: { r: 88, g: 128, b: 192 } },
        { name: 'deep_water', value: 5, color: { r: 56, g: 96, b: 176 } },
        { name: 'cactus', value: 6, color: null /*{ r: 40, g: 104, b: 64 }*/ },
    ];

    stripes.src = '/img/stripes.png';

    $('#colTools').show();

    $('#colTileset').on('change', function(e) {
        var formData = new FormData($('#colUpload')[0]);

        tileSize = parseInt($('#upTilesize').val(), 10);

        $.ajax({
            url: '/uploadmaps',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data, textStatus, jqXHR) {
                tileset.src = data.tileset;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Couldn\'t upload images!', errorThrown);
            }
        });
    });

    $(tileset).on('load', function(e) {
        init();
    });

    $('.tool').on('click', function(e) {
        tool = parseInt($(this).data('toolid'), 10);
    });

    $set.on('mousedown', function(e) {
        dragMap = true;
    });

    $set.on('mouseup', function(e) {
        dragMap = false;
    });

    $set.on('mousemove', function(e) {
        var pos = $set.position(),
            sz = tileSize / 2,
            x = Math.floor((e.pageX - pos.left) / sz),
            y = Math.floor((e.pageY - pos.top) / sz);

        //this is the first slice, setup the slice canvas
        if(lastSlice) {
            //we haven't moved to a new subtile, don't redraw it
            if(x == lastSlice.x && y == lastSlice.y) return;

            //if dragging then paint collisions
            if(dragMap) updateMapCollisionPoint(x, y);

            //we have moved to a new subtile, restore this subtile
            ctxSet.drawImage($slice[0],
                0, 0, sz, sz,
                lastSlice.x * sz, lastSlice.y * sz, sz, sz);


            //draw tile's collision info
            var tx = Math.floor(lastSlice.x / 2),
                ty = Math.floor(lastSlice.y / 2),
                index = tx + (ty * (tileset.width / tileSize));

            if(colliders[index]) {
                var decX = (lastSlice.x / 2) - tx,
                    decY = (lastSlice.y / 2) - ty,
                    t = (decX == 0 ? [0, 2] : [1, 3]);

                t = (decY == 0 ? t[0] : t[1]);

                var tile = colliders[index][t];
                //console.log(t, tile, lastSlice.x, lastSlice.y)

                if(tile) {
                    ctxSet.fillStyle = getToolColor(tile);
                    ctxSet.fillRect(lastSlice.x * sz, lastSlice.y * sz, sz, sz);
                    ctxSet.drawImage(stripes, lastSlice.x * sz, lastSlice.y * sz);
                }
            }
        }

        lastSlice = { x: x, y: y };
        ctxSlice.drawImage(tileset,
            x * sz, y * sz, sz, sz,
            0, 0, sz, sz);

        //draw the subtile sized tool
        //if(tool) {
            ctxSet.fillStyle = getToolColor(tool);
            ctxSet.fillRect(x * sz, y * sz, sz, sz);
            ctxSet.drawImage(stripes, x * sz, y * sz);
        //}
    });

    $set.on('click', function(e) {
        var pos = $set.position(),
            sz = tileSize / 2,
            x = Math.floor((e.pageX - pos.left) / sz),
            y = Math.floor((e.pageY - pos.top) / sz);

        updateMapCollisionPoint(x, y);
    });

    $('#colTools .tool').each(function(i, toolio) {
        var $tl = $(toolio);

        $tl.css('background-color', getToolColor(parseInt($tl.data('toolid'), 10), 1));
    });

    function init() {
        //set image and draw it
        $set[0].width = tileset.width;
        $set[0].height = tileset.height;

        $tile[0].width = tileSize;
        $tile[0].height = tileSize;

        $slice[0].width = tileSize / 2;
        $slice[0].height = tileSize / 2;

        tilesetData = ctxSet.getImageData(0, 0, tileset.width, tileset.height);

        drawTileset();
    }

    function updateMapCollisionPoint(x, y) {
        var tx = Math.floor(x / 2),
            ty = Math.floor(y / 2),
            index = tx + (ty * (tileset.width / tileSize));

        if(!colliders[index])
            colliders[index] = [0, 0, 0, 0];

        if(colliders[index]) {
            var decX = (lastSlice.x / 2) - tx,
                decY = (lastSlice.y / 2) - ty,
                t = (decX == 0 ? [0, 2] : [1, 3]);

            t = (decY == 0 ? t[0] : t[1]);

            colliders[index][t] = tool;

            //empty tiles have no collider info
            if(!colliders[index][0] && !colliders[index][1] && !colliders[index][2] && !colliders[index][3])
                delete colliders[index];
        }
    }

    function drawTileset() {
        ctxSet.drawImage(tileset, 0, 0);

        //iterate through each tile and guess the collision data
        var width = tileset.width / tileSize,
            height = tileset.height / tileSize;

        for(var x = 0; x < width; ++x) {
            for(var y = 0; y < height; ++y) {
                drawTile(x, y);
            }
        }
    }

    function drawTile(x, y) {
        //calculate index
        var index = x + (y * (tileset.width / tileSize));

        if(!colliders[index]) {
            var tile = guessTileCollisions(x, y);
            if(tile) colliders[index] = tile;
        }

        //draw tile's collision info
        if(colliders[index]) {
            for(var t = 0, tl = colliders[index].length; t < tl; ++t) {
                var tile = colliders[index][t],
                    x2 = x * tileSize + (t == 1 || t == 3 ? tileSize / 2 : 0),
                    y2 = y * tileSize + (t == 2 || t == 3 ? tileSize / 2 : 0);

                if(tile) {
                    ctxSet.fillStyle = getToolColor(tile);
                    ctxSet.fillRect(x2, y2, tileSize / 2, tileSize / 2);
                    ctxSet.drawImage(stripes, x2, y2);
                }
            }
        }
    }

    function guessTileCollisions(x, y) {
        //draw this tile onto the tile canvas
        ctxTile.drawImage(tileset,
            x * tileSize, y * tileSize, tileSize, tileSize,
            0, 0, tileSize, tileSize);

        var data = ctxTile.getImageData(0, 0, tileSize, tileSize),
            tile = [0, 0, 0, 0],
            quads = [[0, 1], [2, 3]];

        //iterate through each pixel and guess its collision types
        for(var p = 0; p < data.data.length; p += 4) {
            var y2 = Math.floor((p / 4) / tileSize),
                x2 = Math.floor(p / 4) - (y2 * tileSize),
                px = getPixel(data, x2, y2);

            var quad = quads[Math.round(y2 / tileSize)][Math.round(x2 / tileSize)];

            //if this is a pure black tile, then skip it
            if(px.red === 0 && px.green === 0 && px.blue === 0)
                return;

            //try to guess the type of this tile
            for(var s = 0, sl = subtiles.length; s < sl; ++s) {
                var st = subtiles[s];

                if(!st.color) continue;

                if(st.color instanceof Array) {
                    //range
                    if(
                        (!st.color[0] || (px.red >= st.color[0].r && px.green >= st.color[0].g && px.blue >= st.color[0].b)) &&
                        (!st.color[1] || (px.red <= st.color[1].r && px.green <= st.color[1].g && px.blue <= st.color[1].b))
                        )
                    {
                        tile[quad] = st.value;
                    }
                } else {
                    if(px.red == st.color.r && px.green == st.color.g && px.blue == st.color.b) {
                        tile[quad] = st.value;
                    }
                }
            }
        }

        if(!tile[0] && !tile[1] && !tile[2] && !tile[3])
            tile = undefined;

        return tile;
    }

    function getPixel(data, x, y) {
        var index = (y * data.width + x) * 4,
            rgba = {
                red: data.data[index],
                green: data.data[index + 1],
                blue: data.data[index + 2],
                alpha: data.data[index + 3]
            };

        return rgba;
    }

    function setPixel(data, x, y, pixel) {
        var index = (y * data.width + x) * 4;

        data.data[index] = pixel.red;
        data.data[index + 1] = pixel.green;
        data.data[index + 2] = pixel.blue;
        data.data[index + 3] = pixel.alpha;
    }

    function getToolColor(tl, opacity) {
        opacity = opacity || 0.7;

        switch(tl) {
            case 1: return 'rgba(200, 0, 0, ' + opacity + ')'; //solid
            case 2: return 'rgba(0, 200, 0, ' + opacity + ')'; //cliff
            case 3: return 'rgba(200, 200, 0, ' + opacity + ')'; //stairs
            case 4: return 'rgba(0, 185, 200, ' + opacity + ')'; //shallow water
            case 5: return 'rgba(0, 85, 200, ' + opacity + ')'; //deep water
            case 6: return 'rgba(5, 200, 110, ' + opacity + ')'; //cactus
        }

        return 'rgba(255, 255, 255, 1)';
    }
});