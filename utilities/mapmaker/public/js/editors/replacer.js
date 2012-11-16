define([
    'mapeditor'
], function(EDITOR) {
    var rEditor = {
        _init: function() {
            EDITOR.$map.attr({
                width: EDITOR.tileset.width,
                height: EDITOR.tileset.height
            });

            EDITOR.ctxMap.drawImage(EDITOR.tileset, 0, 0);

            rEditor.firstTile =  rEditor.secondTile = null;

            $('.mapTitle').text('Tileset');

            rEditor.bindEvents();

            //show our workspace
            EDITOR.$workspace.find('.minimap, .map').show();
        },
        _destroy: function() {
            $('.mapTitle').text('Map');
            rEditor.firstTile =  rEditor.secondTile = null;
            rEditor.unbindEvents();

            //hide our workspace
            EDITOR.$workspace.find('.minimap, .map').hide();
        },
        bindEvents: function() {
            EDITOR.$map.on('mousemove', function(e) {
                var pos = EDITOR.$map.position(),
                    x = Math.floor((e.pageX - pos.left) / EDITOR.tileSize) * EDITOR.tileSize,
                    y = Math.floor((e.pageY - pos.top) / EDITOR.tileSize) * EDITOR.tileSize;

                //draw the tile sized tool
                EDITOR.ctxMap.drawImage(EDITOR.tileset, 0, 0);
                if(!rEditor.firstTile) {
                    EDITOR.ctxMap.strokeStyle = 'rgba(0, 255, 0, 1)';
                    EDITOR.ctxMap.strokeRect(x, y, EDITOR.tileSize, EDITOR.tileSize);
                }
                else {
                    //draw green
                    EDITOR.ctxMap.strokeStyle = 'rgba(0, 255, 0, 1)';
                    EDITOR.ctxMap.strokeRect(rEditor.firstTile.x * EDITOR.tileSize, rEditor.firstTile.y * EDITOR.tileSize, EDITOR.tileSize, EDITOR.tileSize);

                    //draw red
                    EDITOR.ctxMap.strokeStyle = 'rgba(255, 0, 0, 1)';
                    EDITOR.ctxMap.strokeRect(x, y, EDITOR.tileSize, EDITOR.tileSize);
                }
            });

            EDITOR.$map.on('click', function(e) {
                var pos = EDITOR.$map.position(),
                    x = Math.floor((e.pageX - pos.left) / EDITOR.tileSize),
                    y = Math.floor((e.pageY - pos.top) / EDITOR.tileSize);

                if(rEditor.firstTile) {
                    rEditor.secondTile = { x: x, y: y };
                    rEditor.doReplaceTile();
                }
                else {
                    rEditor.firstTile = { x: x, y: y };
                }
            });

            EDITOR.$map.on('contextmenu', function(e) {
                e.preventDefault();

                rEditor.firstTile = rEditor.secondTile = null;
                EDITOR.ctxMap.drawImage(EDITOR.tileset, 0, 0);
            });
        },
        unbindEvents: function() {
            EDITOR.$map.off('mousemove');
            EDITOR.$map.off('click');
            EDITOR.$map.off('contextmenu');
        },
        doReplaceTile: function() {
            var replaced = 0;

            //replace rEditor.firstTile with rEditor.secondTile using either our best-guess for the collision type
            //or if overriden the activeTool
            for(var x = 0; x < EDITOR.tilemap.width; ++x) {
                for(var y = 0; y < EDITOR.tilemap.height; ++y) {
                    var px = EDITOR.utils.getPixel(EDITOR.minimapData, x, y);

                    //tile to replace
                    if(px.red == rEditor.firstTile.x && px.green == rEditor.firstTile.y) {
                        replaced++;
                        px.red = rEditor.secondTile.x;
                        px.green = rEditor.secondTile.y;
                        px.blue = EDITOR.tool;

                        EDITOR.utils.setPixel(EDITOR.minimapData, x, y, px);
                    }
                }
            }

            EDITOR.ctxMinimap.putImageData(EDITOR.minimapData, 0, 0);
            alert('Success! Replaced ' + replaced + ' tiles!');
            EDITOR.$map.trigger('contextmenu');
        }
    };

    return rEditor;
});