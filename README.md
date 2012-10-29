## The Legend of Zelda: A Link to the Past (WebGL Edition)

This is a recreation of [Nintendo's The Legend of Zelda: A Link to the Past](http://www.nintendo.com/games/detail/5oMtHuB3aOHoawfC6brZ6myQYnE4flQ_).
This is _not_ a port of the game, this is _not_ code conversion, this is _not_ the ROM running in an emulator. This is a complete, written from scratch,
recreation of one of my favorite classic games using WebGL in the browser.

This project is in no way endorsed by [Nintendo](http://www.nintendo.com/). All images, logos, characters, dialog, plot, and other assets taken
from the original Link to the Past are copyrights of Nintendo; I claim no ownership of any of the mentioned assets.

None of the code was taken from the original game, all the code is written by me and released under the MPL 2.0 license (with the exception of
the below listed dependencies).

### Dependencies

Here is a list of external dependencies and what they are used for. Each is released under its own respective license:

* [jQuery v1.8.2](http://jquery.com/) - For DOM manipulation and utility methods
* [jQuery UI v1.8.23](http://jqueryui.com/) - For extension of jQuery's DOM manipulation methods
* [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) - Provides simple class hierarchy for the project
* [EventEmitter2](https://github.com/hij1nx/EventEmitter2) - Enables namespaced events between components
* [Three.js](https://github.com/mrdoob/three.js) - For abstracting WebGL functionality
* [Stats.js](https://github.com/mrdoob/stats.js/) - For framerate debugging
* [Detector.js](https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js) - For detecting WebGL support
* [game-shim](https://github.com/toji/game-shim) - For normalizing many browser-specific functions
* [require.js](http://requirejs.org/) - Provides dependency loading/management
* [modernizr v2.6.1](http://modernizr.com/) - For browser feature detection
* [Return of Ganon Font](http://www.zone38.net/font/#ganon) - For dialog and other text

All of these dependencies are included in this repository and there is no need to download or add them individually.
Note that jQuery and jQuery-UI attempt to load from Google CDN, and fallback to the local files if that fails.

### Acknowledgments

Below is a list of tutorials, code snippetes, and other resources I used to develope many of the methods used in this game.
I wanted to be sure to credit them all, if I miss someone please let me know.

* [Texture Animation](https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Texture-Animation.html) by [stemkoski](https://github.com/stemkoski)
* [GPU Tilemaps](http://blog.tojicode.com/2012/08/more-gpu-tile-map-demos-zelda.html) by [Toji](https://github.com/toji)

### License and Legal

This code-base is released under the [Mozilla Public License 2.0](http://www.mozilla.org/MPL/2.0/).

All dependencies are released under their own respective licenses.

All images, logos, characters, dialog, plot, and other assets taken from the original The Legend of Zelda: A Link to the Past
are copyrights of [Nintendo](http://www.nintendo.com/); I claim no ownership of any of the mentioned assets.