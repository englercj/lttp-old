define([
], function() {
    var GEN = {
        _init: function() {
            GEN.socket = io.connect();
            GEN.lastId = null;

            GEN.bindEvents();
        },
        _destroy: function() {
            GEN.unbindEvents();

            GEN.socket.disconnect();
            GEN.socket = null;
            GEN.lastId = null;
        },
        bindEvents: function() {
            $('#btnMapify').on('click', function() {
                var $form = $('#makemap'),
                    tilesize = $('#tilesize').val(),
                    tilesheet = $('#tilesheet').val(),
                    formData = new FormData($form[0]);
                    
                $('#status').text('Uploading...');

                $.ajax({
                    url: '/makemap/' + tilesize + '/' + tilesheet + '/' + GEN.socket.id,
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(data, textStatus, jqXHR) {
                        /*if(lastId) GEN.socket.emit('unsubscribe', lastId);

                        GEN.socket.emit('subscribe', data);
                        lastId = data;*/
                        $('#status').text('Generating...');
                    },
                    error: function(jqXHR, textStatus, errorThrown) {

                    }
                });
            });

            GEN.socket.on('id', function(id) { GEN.socket.id = id; });

            GEN.socket.on('progress', function(data) {
                $('#progUpload').progressbar('option', 'value', data.complete / data.total);
                console.log('progress', data);
            });

            GEN.socket.on('complete', function(data) {
                //slight delay to ensure files are flushed
                setTimeout(function() {
                    $('#status').text('Done.');
                    $('#btnEdit').show();
                    $('#imgTileset').attr('src', data.tileset);
                    $('#imgTilemap').attr('src', data.tilemap);
                }, 200);
            });
        },
        unbindEvents: function() {
            $('#btnMapify').off('click');

            GEN.socket.off('id');
            GEN.socket.off('progress');
            GEN.socket.off('complete');
        }
    };

    return GEN;
});