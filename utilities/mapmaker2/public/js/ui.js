(function($, window, undefined) {
    $(function() {
        $('#tabs').tabs();
        $('progress').progressbar();

        $('#btnMapify').on('click', function() {
            var $form = $('#makemap'),
                tilesize = $('#tilesize').val(),
                tilesheet = $('#tilesheet').val(),
                formData = new FormData($form[0]);

            $.ajax({
                url: '/makemap/' + tilesize + '/' + tilesheet,
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data, textStatus, jqXHR) {
                    $('#imgTileset').attr('src', data.tileset);
                    $('#imgTilemap').attr('src', data.tilemap);
                },
                error: function(jqXHR, textStatus, errorThrown) {

                },
                progress: function(e) {
                    if(e.lengthComputable) {
                        var pct = (e.loaded / e.total) * 100;

                        $('#progUpload')
                            .progressbar('option', 'value', pct)
                            .children('.ui-progressbar-value')
                            .html(pct.toPrecision(3) + '%')
                            .css('display', 'block');
                    } else {
                        console.warn('Content Length not reported!');
                    }
                }
            });
        });
    });
})(jQuery, window);