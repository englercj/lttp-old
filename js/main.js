/*require.config({
    waitSeconds: 2000
});*/

require([
    'global/class',
    'global/game-shim'
], function() {
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

    require(['game/main']);
});
