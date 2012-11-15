(function($, window, undefined) {
    $(function() {
        $('#tabs').tabs();
        $('.progress').progressbar();

        var socket = io.connect(),
            lastId = null;

        $('#btnMapify').on('click', function() {
            var $form = $('#makemap'),
                tilesize = $('#tilesize').val(),
                tilesheet = $('#tilesheet').val(),
                formData = new FormData($form[0]);
                
            $('#status').text('Uploading...');

            $.ajax({
                url: '/makemap/' + tilesize + '/' + tilesheet + '/' + socket.id,
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data, textStatus, jqXHR) {
                    /*if(lastId) socket.emit('unsubscribe', lastId);

                    socket.emit('subscribe', data);
                    lastId = data;*/
                    $('#status').text('Generating...');
                },
                error: function(jqXHR, textStatus, errorThrown) {

                }
            });
        });

        $('#btnEdit').on('click', function() {
            EDITOR._init($('#tilesize').val(), $('#imgTilemap')[0], $('#imgTileset')[0]);
            $('#tabs').tabs('option', 'active', 1);
        });

        socket.on('id', function(id) { socket.id = id; });

        socket.on('progress', function(data) {
            $('#progUpload').progressbar('option', 'value', data.complete / data.total);
            console.log('progress', data);
        });

        socket.on('complete', function(data) {
            //slight delay to ensure files are flushed
            setTimeout(function() {
                $('#status').text('Done.');
                $('#btnEdit').attr('disabled', false);
                $('#imgTileset').attr('src', data.tileset);
                $('#imgTilemap').attr('src', data.tilemap);
            }, 200);
        });
    });
})(jQuery, window);