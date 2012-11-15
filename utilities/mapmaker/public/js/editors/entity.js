(function($, window, undefined) {
    var eEditor = EDITOR.editors.entity = {
        _init: function() {
            EDITOR.$map.attr({
                width: EDITOR.tileset.width,
                height: EDITOR.tileset.height
            });

            EDITOR.ctxMap.strokeStyle = 'rgba(0, 255, 0, 1)';
            EDITOR.ctxMap.drawImage(EDITOR.tileset, 0, 0);

            EDITOR.tool = parseInt($('#ent_type').val(), 10);

            $('.mapTitle').text('Tileset');
            $('.entlyr').show();

            eEditor.bindEvents();
        },
        _destroy: function() {
            $('.mapTitle').text('Map');
            $('.entlyr').hide();
            eEditor.unbindEvents();
        },
        bindEvents: function() {
            EDITOR.$map.on('mousemove', function(e) {
                var pos = EDITOR.$map.position(),
                    x = Math.floor((e.pageX - pos.left) / EDITOR.tileSize) * EDITOR.tileSize,
                    y = Math.floor((e.pageY - pos.top) / EDITOR.tileSize) * EDITOR.tileSize;

                //draw the tile sized tool
                EDITOR.ctxMap.drawImage(EDITOR.tileset, 0, 0);
                EDITOR.ctxMap.strokeRect(x, y, EDITOR.tileSize, EDITOR.tileSize);
            });

            EDITOR.$map.on('click', function(e) {
                var pos = EDITOR.$map.position(),
                    x = Math.floor((e.pageX - pos.left) / EDITOR.tileSize),
                    y = Math.floor((e.pageY - pos.top) / EDITOR.tileSize);

                eEditor.placeEntity({ x: x, y: y });
            });

            $('#ent_type').on('change', function() {
                EDITOR.tool = parseInt($(this).val(), 10);
            });
        },
        unbindEvents: function() {
            EDITOR.$map.off('mousemove');
            EDITOR.$map.off('click');
            $('#ent_type').off('change');
        },
        placeEntity: function(tile) {
            var placed = 0;

            //iterate through each pixel of the tilemap and place an entity at the ones that match this tile
            for(var x = 0; x < EDITOR.tilemap.width; ++x) {
                for(var y = 0; y < EDITOR.tilemap.height; ++y) {
                    var px = EDITOR.utils.getPixel(EDITOR.minimapData, x, y);

                    //tile to replace
                    if(px.red == tile.x && px.green == tile.y) {
                        placed++;
                        px.alpha = EDITOR.tool;

                        EDITOR.utils.setPixel(EDITOR.minimapData, x, y, px);
                    }
                }
            }

            EDITOR.ctxMinimap.putImageData(EDITOR.minimapData, 0, 0);
            alert('Success! Placed ' + placed + ' entities (entity id: ' + EDITOR.tool + ')!');
        }
    };
})(jQuery, window);