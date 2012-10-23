define([
    'game/lib/bases/Sprite'
], function(Sprite) {
    var Player = Sprite.extend({
        init: function(controls, resources) {
            //initialize the visible sprite
            this._super({
                texture: resources.link_walking,
                size: new THREE.Vector2(32, 44),
                offset: new THREE.Vector2(0, 0), //offset to first frame in texture (in cols/rows)
                area: new THREE.Vector2(8, 2), //number of cols/rows of frames in the texture
                zindex: 2, //default: 1

                //animations
                animations: {
                    movedown: { numFrames: 8, duration: 600 },
                    moveleft: { offset: new THREE.Vector2(0, 1), numFrames: 8, duration: 600, loop:false },
                },

                //misc
                useScreenCoordinates: true, //default: false
                affectedByDistance: false //default: false
            });

            spr.setAnimation('movedown');
            spr.setPosition(-475 + (i * 35), -400 + (z * 50));
            spr.addToScene(this.scene);
        },
        something: function() {}
    });

    return Player;
});