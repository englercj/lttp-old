require.config({
    waitSeconds: 2000
});

require([
    'ui',
    'global/class',
    'global/game-shim'
], function(ui) {
    var $game = $('#game'),
    $win = $(window);
    
    /*$win.on('resize', checkWinSize);
    checkWinSize();
    
    function checkWinSize() {
        var winHeight = $win.height(),
        winWidth = $win.width();
        
        $game.removeClass('tiny small');

        if(winHeight < 450 || winWidth < 750)
            $game.addClass('tiny');
        else if(winHeight < 700 || winWidth < 1200)
            $game.addClass('small');
    }*/
    
    $('.progressbar').progressbar();
    
    ui.init();

    $win.on('keypress', function(e) {
        if(e.shiftKey && e.which == 43) { //shift and "+"
            ui.showStartScreen();
        }
    })

    require(['game/main']);
});
