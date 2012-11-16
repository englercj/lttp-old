define([], function() {
    var EDITOR = {
        _init: function() {
            EDITOR.bindEvents();

            EDITOR.$dlgUpload = $('#dlgUpload').dialog({
                modal: true, autoOpen: false,
                width: 400, height: 450,
                buttons: {
                    Upload: EDITOR.utils.doImageUpload,
                    Cancel: function() { $(this). dialog('close'); }
                }
            });

            EDITOR.$workspace = $('#workspace');

            require([
                'editors/collisions',
                'editors/entity',
                'editors/replacer'
            ], function(cEditor, eEditor, rEditor) {
                EDITOR.editors = {
                    collisions: cEditor,
                    entity: eEditor,
                    replacer: rEditor
                };
            });
        },
        _destroy: function() {
            EDITOR.unbindEvents();

            EDITOR.$dlgUpload.dialog('destroy');
            EDITOR.$dlgUpload = null;
        },
        bindEvents: function() {
            $('.tool').on('click', function(e) {
                $('.tool').removeClass('selected');
                EDITOR.tool = parseInt($(this).addClass('selected').data('toolid'), 10);
            });

            $('#editors .editor').on('click', function(e) {
                EDITOR.selectEditor($(this).data('editorid'), $(this).text());
            });

            $('#btnDlTm').on('click', function(e) {
                EDITOR.ctxMinimap.putImageData(EDITOR.minimapData, 0, 0);
                window.open(EDITOR.$minimap[0].toDataURL());

                if(EDITOR._eid && EDITOR.editors[EDITOR._eid].drawMinimap) {
                    EDITOR.editors[EDITOR._eid].drawMinimap();
                }
            });
        },
        unbindEvents: function() {
            $('.tool').off('click');
            $('#editors .editor').off('click');
            $('#btnDlTm').off('click');
        },
        newMaps: function(tsz, tilemap, tileset) {
            EDITOR.$activeEditor = $('#activeEditor');
            EDITOR.$minimap = $('#minimap');
            EDITOR.$minimap2 = $('#minimap2');
            EDITOR.$map = $('#map');

            EDITOR.ctxMinimap = EDITOR.$minimap[0].getContext('2d');
            EDITOR.ctxMinimap2 = EDITOR.$minimap2[0].getContext('2d');
            EDITOR.ctxMap = EDITOR.$map[0].getContext('2d');

            EDITOR.tileSize = parseInt(tsz, 10);
            EDITOR.tilemap = tilemap;
            EDITOR.tileset = tileset;

            EDITOR.tool = 0;

            //draw initial minimap
            EDITOR.$minimap.attr({
                width: tilemap.width,
                height: tilemap.height
            });
            EDITOR.ctxMinimap.drawImage(EDITOR.tilemap, 0, 0);
            EDITOR.minimapData = EDITOR.ctxMinimap.getImageData(0, 0, EDITOR.tilemap.width, EDITOR.tilemap.height);

            $('#editors, #btnDlTm').show();

            EDITOR.selectEditor('collisions', 'Collision Editor');
        },
        selectEditor: function(id, title) {
            console.log('Selecting Editor:', id, EDITOR.editors);
            if(!EDITOR.editors[id]) return;

            if(EDITOR._eid) {
                EDITOR.editors[EDITOR._eid]._destroy();
            }

            EDITOR.ctxMinimap.putImageData(EDITOR.minimapData, 0, 0);
            if(!$('.tool.selected').length) $('.tool.empty').addClass('selected');
            EDITOR.tool = parseInt($('.tool.selected').data('toolid'), 10);

            $('.tools').hide();
            $('.tools.' + id).show();
            EDITOR.$activeEditor.text(title);

            EDITOR._eid = id;
            EDITOR.editors[id]._init();
        },
        utils: {
            getPixel: function(data, x, y) {
                var index = (y * data.width + x) * 4,
                    rgba = {
                        red: data.data[index],
                        green: data.data[index + 1],
                        blue: data.data[index + 2],
                        alpha: data.data[index + 3]
                    };

                return rgba;
            },
            setPixel: function(data, x, y, pixel) {
                var index = (y * data.width + x) * 4;

                data.data[index] = pixel.red;
                data.data[index + 1] = pixel.green;
                data.data[index + 2] = pixel.blue;
                data.data[index + 3] = pixel.alpha;
            },
            getToolColor: function(id, opacity) {
                opacity = opacity || 0.7;

                switch(id) {
                    case 0: return 'rgba(255, 255, 255, ' + opacity + ')'; //white, empty
                    case 1: return 'rgba(0, 200, 0, ' + opacity + ')'; //green, jumpdown
                    case 2: return 'rgba(0, 0, 200, ' + opacity + ')'; //blue, reserved
                    case 3: return 'rgba(200, 0, 0, ' + opacity + ')'; //red, block
                    default: return 'rgba(255, 255, 255, ' + opacity + ')'; //purple
                }
            },
            pointInPoly: function(vertices, point) {
                var x = 0, y = 1, c = false, len = vertices.length;

                for(var i = 0, j = len - 1; i < len; j = i++) {
                    if( ((vertices[i][y] > point[y]) != (vertices[j][y] > point[y])) &&
                        (point[x] < (vertices[j][x] - vertices[i][x]) * (point[y] - vertices[i][y]) / (vertices[j][y] - vertices[i][y]) + vertices[i][x]) )
                    {
                        c = !c;
                    }
                }

                return c;
            },
            doImageUpload: function(cb) {
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
                                EDITOR.newMaps(tsz, imgTilemap, imgTileset);
                                EDITOR.$dlgUpload.dialog('close');
                            }, false);
                            imgTileset.src = data.tileset;
                        }, false);
                        imgTilemap.src = data.tilemap;
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('Couldn\'t upload images!', errorThrown);
                    }
                });
            }
        }
    };

    return EDITOR;
});