/*
 * Copyright (c) 2012 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
 require([
    'game/rendering/renderer',
    'game/util/gl-context-helper',
    'game/controls',
    'game/rendering/sprite',
    //'game/util/gl-util',
    //'game/util/gl-matrix-min',
    'game/util/game-shim',
    'game/util/stats.min'
], function(Renderer, GLContextHelper, Controls, Sprite/*, GLUtil*/) {
    'use strict';

    // Setup the canvas and GL context, initialize the scene 
    var canvas = document.getElementById('game-canvas');
    var contextHelper = new GLContextHelper(canvas, document.getElementById('game-content'));
    contextHelper.drawOnDemand = true;
    var renderer = new Renderer(contextHelper.gl, canvas);

    var controls = new Controls(contextHelper.gl, renderer, canvas);

    var sprite = new Sprite(
        contextHelper.gl,
        canvas,
        'assets/sprites/Zelda3Sheet1.gif',
        8,
        [25, 25],
        [0, 1],
        [9, 454],
        1000,
        true
    );

    var stats = new Stats();
    document.getElementById('controls-container').appendChild(stats.domElement);
    
    // Get the render loop going
    contextHelper.start(renderer, controls, sprite, stats);
});