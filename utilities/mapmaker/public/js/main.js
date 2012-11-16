/*require.config({
    waitSeconds: 2000
});*/

require([
    'eyes',
    'mapeditor',
    'mapgenerator'
], function(eyes, editor, generator) {
    $(function() {
        $('#tabs').tabs();
        $('.progress').progressbar();

        generator._init();
        editor._init();

        $('#btnEdit').on('click', function() {
            editor.newMaps($('#tilesize').val(), $('#imgTilemap')[0], $('#imgTileset')[0]);
            $('#tabs').tabs('option', 'active', 1);
        });

        $('#btnUploadEdit').on('click', function(e) {
            editor.$dlgUpload.dialog('open');
        });
    });
});