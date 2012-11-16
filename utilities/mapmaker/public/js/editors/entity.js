define([
    'mapeditor',
    'types'
], function(EDITOR, types) {
    var eEditor = {
        _init: function() {
            EDITOR.$map.attr({
                width: EDITOR.tileset.width,
                height: EDITOR.tileset.height
            });

            EDITOR.ctxMap.strokeWidth = 3;
            EDITOR.ctxMap.drawImage(EDITOR.tileset, 0, 0);

            //EDITOR.tool = parseInt($('#ent_type').val(), 10);
            eEditor.props = {};

            $('#tools .tools.entity').children().each(function(i, child) {
                if(child.id && child.id.match(/^ent_.+$/)) {
                    var p = this.id.match(/^ent_(.+)$/)[1];

                    eEditor.props[p] = this.value;
                }
            });

            $('.mapTitle').text('Tileset');

            eEditor.bindEvents();

            //show our workspace
            EDITOR.$workspace.find('.map, .input, .data').show();
        },
        _destroy: function() {
            $('.mapTitle').text('Map');
            eEditor.unbindEvents();

            eEditor.selectedTile = eEditor.locs = eEditor.props = null;

            //hide our workspace
            EDITOR.$workspace.find('.map, .input, .data').hide();
        },
        bindEvents: function() {
            EDITOR.$map.on('mousemove', function(e) {
                var pos = EDITOR.$map.position(),
                    x = Math.floor((e.pageX - pos.left) / EDITOR.tileSize) * EDITOR.tileSize,
                    y = Math.floor((e.pageY - pos.top) / EDITOR.tileSize) * EDITOR.tileSize;

                EDITOR.ctxMap.drawImage(EDITOR.tileset, 0, 0);

                //draw the tile sized tool
                EDITOR.ctxMap.strokeStyle = 'rgba(0, 255, 0, 1)';
                EDITOR.ctxMap.strokeRect(x, y, EDITOR.tileSize, EDITOR.tileSize);

                //draw selected tile
                if(eEditor.selectedTile) {
                    EDITOR.ctxMap.strokeStyle = 'rgba(255, 0, 0, 1)';
                    EDITOR.ctxMap.strokeRect(eEditor.selectedTile.x * EDITOR.tileSize, eEditor.selectedTile.y * EDITOR.tileSize, EDITOR.tileSize, EDITOR.tileSize);
                }
            });

            EDITOR.$map.on('click', function(e) {
                var pos = EDITOR.$map.position(),
                    x = Math.floor((e.pageX - pos.left) / EDITOR.tileSize),
                    y = Math.floor((e.pageY - pos.top) / EDITOR.tileSize);

                eEditor.selectedTile = { x: x, y: y };
            });

            $('#tools .tools.entity').children().each(function(i, child) {
                if(child.id && child.id.match(/^ent_.+$/)) {
                    $(child).on('change', function() {
                        var p = this.id.match(/^ent_(.+)$/)[1];

                        eEditor.props[p] = this.value;
                    });
                }
            });

            $('#btnEntGen').on('click', function() {
                eEditor.generateEntity();
            });
        },
        unbindEvents: function() {
            EDITOR.$map.off('mousemove');
            EDITOR.$map.off('click');
            $('#ent_type').off('change');

            $('#locEntity').children().each(function(i, child) {
                if(child.id && child.id.match(/^ent_.+$/)) {
                    $(child).off('change');
                }
            });
        },
        generateEntity: function() {
            var tile = eEditor.selectedTile;

            eEditor.locs = [];

            //iterate through each pixel of the tilemap and place an entity at the ones that match this tile
            for(var x = 0; x < EDITOR.tilemap.width; ++x) {
                for(var y = 0; y < EDITOR.tilemap.height; ++y) {
                    var px = EDITOR.utils.getPixel(EDITOR.minimapData, x, y);

                    //tile to replace
                    if(px.red == tile.x && px.green == tile.y) {
                        eEditor.locs.push([x, y]);
                    }
                }
            }

            //now insert each entity into it's zone
            var zones = eval(EDITOR.$workspace.find('.input textarea').val()),
                indexes = {};

            for(var e = 0, el = eEditor.locs.length; e < el; ++e) {
                var loc = eEditor.locs[e];

                for(var z = 0, zl = zones.length; z < zl; ++z) {
                    var zone = zones[z];

                    if(EDITOR.utils.pointInPoly(zone.vertices, loc)) {
                        var entId = indexes[z],
                            ent = zone.entities[entId];

                        //no index for this entity yet, meaning we didn't generate
                        //it yet for this zone; so do that now and store the index
                        if(entId === undefined) {
                            ent = $.extend({}, eEditor.props);
                            ent.locations = [];
                            ent.locationUnits = 'pixels';

                            var len = zone.entities.push(ent);
                            indexes[z] = len - 1;
                        }

                        ent.locations.push(loc);
                        break;
                    }
                }
            }

            //now eval turned out "types." stuff into actual numbers, so lets change those back
            var data = pretify(zones);

            EDITOR.ctxMinimap.putImageData(EDITOR.minimapData, 0, 0);
            EDITOR.$workspace.find('.data pre').html(pretify(zones));
            console.log(indexes);
        }
    };

    return eEditor;
});