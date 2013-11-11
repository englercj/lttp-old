/**
 * @license
 * GrapeFruit Debug Module - v0.0.2
 * Copyright (c) 2013, Chad Engler
 * https://github.com/grapefruitjs/gf-debug
 *
 * Compiled: 2013-11-10
 *
 * GrapeFruit Debug Module is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window, undefined) {
    var document = window.document,
        debug = {};

//register the plugin to grapefruit
gf.plugin.register(debug, 'debug');
window.gfdebug = debug;

//the version of this plugin. Placed in by grunt when built you can change
//this value in the package.json (under version)
debug.version = '0.0.2';

//on tick funciton to replace the gf.Game.prototype._tick function with
//will call _super to run the normal tick, then tick the panels as well
debug.onTick = function() {
    this._super();

    var dStart = debug.game.clock.now(),
        dEnd;

    debug._statsTick();

    if(debug.panels) {
        debug.panels.map.tick();
        debug.panels.performance.tick();
        debug.panels.sprites.tick();
    }

    dEnd = debug.game.clock.now();
    debug.game.timings.__debugLastDiff = dEnd - dStart;
};

/**
 * Shows the debug bar using the specified game information
 *
 * @method show
 * @param game {gf.Game} the game to debug
 */
debug.show = function(game) {
    if(!game || !(game instanceof gf.Game))
        throw 'Please pass a game instance to debug.show!';

    if(this.game)
        throw 'Already debugging a game instance!';

    this.game = game;

    this.panels = {
        map: new debug.MapPanel(game),
        sprites: new debug.SpritesPanel(game),
        gamepad: new debug.GamepadPanel(game),
        performance: new debug.PerformancePanel(game)
    };

    //patch the tick method
    gf.plugin.patch(gf.Game, '_tick', this.onTick);

    this.logObjectCountEvent = false;

    //add element to the page
    document.body.appendChild(this._createElement());

    this._bindEvents();
};

/**
 * Shows some event occuring on the timeline of the performance graph
 * which makes it easy to see what is impacting performance and when
 *
 * @method logEvent
 * @param name {String} the event name to show on the graph
 */
debug.logEvent = function(name) {
    if(this.panels && this.panels.performance)
        this.panels.performance.logEvent(name);
};

/**
 * Draws the body of a sprite
 *
 * @method drawPhysicsShape
 * @param body {Body} The body to draw a visual representation of
 * @param [style] {Object} The style of the line draws
 * @param [style.size=1] {Number} The thickness of the line stroke
 * @param [style.color=0xff2222] {Number} The color of the line stroke
 * @param [style.alpha=1] {Number} The opacity of the line stroke [0 - 1]
 * @param [gfx] {Graphics} The graphics object to use to draw with, if
 *      none is passed a new one is created and added ot the world.
 * @return {Graphics} The graphics object used to draw the shape
 */
debug.drawPhysicsShape = function(shape, style, gfx) {
    var p = shape.body.p,
        game = this.game;

    //setup gfx
    gfx = gfx || (function() {
                    var g = new gf.PIXI.Graphics();
                    game.world.add.obj(g);
                    return g;
                })();

    //setup style
    style = style || {};

    gfx.lineStyle(
        style.size !== undefined ? style.size : 1,
        style.color !== undefined ? style.color : 0xff2222,
        style.alpha !== undefined ? style.alpha : 1
    );

    //draw circle
    if(shape.type === 'circle') {
        /* jshint -W106 */
        var cx = shape.bb_l + ((shape.bb_r - shape.bb_l) / 2),
            cy = shape.bb_t + ((shape.bb_b - shape.bb_t) / 2);
        /* jshint +W106 */

        gfx.drawCircle(cx, cy, shape.r);
    }
    //draw polygon
    else {
        var vx = shape.verts[0],
            vy = shape.verts[1];

        gfx.moveTo(
            p.x + vx,
            p.y + vy
        );

        for(var i = 2; i < shape.verts.length; i += 2) {
            gfx.lineTo(
                p.x + shape.verts[i],
                p.y + shape.verts[i + 1]
            );
        }

        gfx.lineTo(
            p.x + vx,
            p.y + vy
        );
    }

    return gfx;
};

/**
 * Draws the quadtree used by physics onto the screen
 *
 * @method drawQuadTree
 * @param [tree=game.physics.tree] {QuadTree} The quadtree to draw, generally this is for recursing
 * @param [style] {Object} The style of the line draws
 * @param [style.size=1] {Number} The thickness of the line stroke
 * @param [style.color=0x2222ff] {Number} The color of the line stroke
 * @param [style.alpha=1] {Number} The opacity of the line stroke [0 - 1]
 * @param [gfx] {Graphics} The graphics object to use to draw with, if
 *      none is passed a new one is created and added ot the world.
 * @return {Graphics} The graphics object used to draw the tree
 */
/*debug.drawQuadTree = function(tree, style, gfx) {
    var self = this;

    //setup gfx
    gfx = gfx || (function() {
                    var g = new gf.PIXI.Graphics();
                    self.game.world.add.obj(g);
                    return g;
                })();

    tree = tree || this.game.physics.tree;

    //setup style
    style = style || {};

    gfx.lineStyle(
        style.size !== undefined ? style.size : 1,
        style.color !== undefined ? style.color : 0x2222ff,
        style.alpha !== undefined ? style.alpha : 1
    );

    //draw our bounds
    gfx.drawRect(
        tree.bounds.x,
        tree.bounds.y,
        tree.bounds.width,
        tree.bounds.height
    );

    //draw each node
    if(tree.nodes.length) {
        for(var i = 0; i < tree.nodes.length; ++i) {
            //recurse for children
            this.drawQuadTree(tree.nodes[i], style, gfx);
        }
    }

    return gfx;
};*/

debug._bindEvents = function() {
    var activePanel,
        self = this;

    this.ui.delegate(this._bar, 'click', '.gf_debug_menu_item', function(e) {
        var panel = self.panels[e.target.className.replace(/gf_debug_menu_item|active/g, '').trim()];

        if(!panel)
            return;

        if(activePanel) {
            activePanel.toggle();
            self.ui.removeClass(activePanel._menuItem, 'active');

            if(activePanel.name === panel.name) {
                activePanel = null;
                return;
            }
        }

        self.ui.addClass(e.target, 'active');
        panel.toggle();
        activePanel = panel;
    });
};

debug._createElement = function() {
    var c = this._container = document.createElement('div'),
        bar = this._bar = document.createElement('div');

    //container
    this.ui.addClass(c, 'gf_debug');
    c.appendChild(bar);

    //the menu bar
    this.ui.addClass(bar, 'gf_debug_menu');
    bar.appendChild(this._createMenuHead());
    bar.appendChild(this._createMenuStats());

    //add the panels
    for(var p in this.panels) {
        bar.appendChild(this.panels[p].createMenuElement());
        c.appendChild(this.panels[p].createPanelElement());
    }

    return c;
};

debug._createMenuHead = function() {
    var div = document.createElement('div');

    this.ui.addClass(div, 'gf_debug_head');
    this.ui.setText(div, 'Gf Debug (' + this.game.renderMethod + '):');

    return div;
};

debug._createMenuStats = function() {
    this._stats = {};

    var div = document.createElement('div'),
        fps = this._stats.fps = document.createElement('div'),
        ms = this._stats.ms = document.createElement('div'),
        obj = this._stats.obj = document.createElement('div');

    this.ui.addClass(div, 'gf_debug_stats');

    this.ui.addClass(obj, 'gf_debug_stats_item world');
    this.ui.setHtml(obj, '<span>0</span>/<span>0</span> Scene Objects Renderable');
    div.appendChild(obj);

    this.ui.addClass(ms, 'gf_debug_stats_item ms');
    this.ui.setHtml(ms, '<span>0</span> ms');
    div.appendChild(ms);

    this.ui.addClass(fps, 'gf_debug_stats_item fps');
    this.ui.setHtml(fps, '<span>0</span> fps');
    div.appendChild(fps);

    return div;
};

debug.padString = function(str, to, pad) {
    while(str.length < to) {
        str = pad + str;
    }

    return str;
};

debug._statsTick = function() {
    var ms = this.game.timings.tickEnd - this.game.timings.tickStart,
        fps = 1000/ms;

    fps = fps > 60 ? 60 : fps;

    //update stats
    this.ui.setText(this._stats.ms.firstElementChild, debug.padString(ms.toFixed(2), 7, 0));
    this.ui.setText(this._stats.fps.firstElementChild, debug.padString(fps.toFixed(2), 5, 0));

    //count objects in the world
    var objs = 0,
        rnds = 0,
        object = this.game.stage.first,
        lastObj = this.game.stage.last._iNext;

    do {
        objs++;

        if(!object.visible) {
            object = object.last._iNext;
            continue;
        }
        
        if(!object.renderable) {
            object = object._iNext;
            continue;
        }

        rnds++;
        object = object._iNext;
    } while(object !== lastObj);

    //set the element values
    debug.ui.setText(debug._stats.obj.children[0], rnds);
    debug.ui.setText(debug._stats.obj.children[1], objs);
};

debug.Panel = function(game) {
    this.game = game;
    this.name = '';
    this.title = '';
    this.active = false;
};

gf.inherit(debug.Panel, Object, {
    //builds the html for a panel
    createPanelElement: function() {
        var div = this._panel = document.createElement('div');
        debug.ui.addClass(div, 'gf_debug_panel');
        debug.ui.addClass(div, this.name);

        return div;
    },
    //builds the html for this panels menu item
    createMenuElement: function() {
        var div = this._menuItem = document.createElement('div');
        debug.ui.addClass(div, 'gf_debug_menu_item ' + this.name);
        debug.ui.setText(div, this.title);

        return div;
    },
    toggle: function() {
        if(this._panel.style.display === 'block') {
            this.hide();
            this.active = false;
        } else {
            this.show();
            this.active = true;
        }
    },
    show: function() {
        debug.ui.setStyle(this._panel, 'display', 'block');
    },
    hide: function() {
        debug.ui.setStyle(this._panel, 'display', 'none');
    }
});
debug.GamepadPanel = function(game) {
    debug.Panel.call(this, game);

    this.name = 'gamepad';
    this.title = 'Gamepad';

    this.gamepad = new debug.Gamepad();
    this.bindEvents();
};

gf.inherit(debug.GamepadPanel, debug.Panel, {
    createPanelElement: function() {
        var div = debug.Panel.prototype.createPanelElement.call(this);

        div.appendChild(this.gamepad.element);

        return div;
    },
    bindEvents: function() {
        var game = this.game,
            pad = this.gamepad;

        //bind all buttons
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_1, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_2, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_3, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_4, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.LEFT_SHOULDER, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.RIGHT_SHOULDER, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.LEFT_TRIGGER, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.RIGHT_TRIGGER, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.SELECT, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.START, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.LEFT_ANALOGUE_STICK, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.RIGHT_ANALOGUE_STICK, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_TOP, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_BOTTOM, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_LEFT, pad.updateButton.bind(pad));
        game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_RIGHT, pad.updateButton.bind(pad));

        //bind all sticks
        game.input.gamepad.sticks.on(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_HOR, pad.updateAxis.bind(pad));
        game.input.gamepad.sticks.on(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_VERT, pad.updateAxis.bind(pad));
        game.input.gamepad.sticks.on(gf.GamepadSticks.AXIS.RIGHT_ANALOGUE_HOR, pad.updateAxis.bind(pad));
        game.input.gamepad.sticks.on(gf.GamepadSticks.AXIS.RIGHT_ANALOGUE_VERT, pad.updateAxis.bind(pad));
    }
});
debug.PerformancePanel = function(game) {
    debug.Panel.call(this, game);

    this.name = 'performance';
    this.title = 'Performance';
    this.eventQueue = [];
};

gf.inherit(debug.PerformancePanel, debug.Panel, {
    createPanelElement: function() {
        var div = debug.Panel.prototype.createPanelElement.call(this);

        this.graph = new debug.Graph(div, window.innerWidth - 20, 250 - 5, {
            input: 'rgba(80, 220, 80, 1)',
            camera: 'rgba(80, 80, 220, 1)',
            phys: 'rgba(80, 220, 200, 1)',
            user: 'rgba(200, 80, 220, 1)',
            draw: 'rgba(220, 80, 80, 1)',
            debug: 'rgba(220, 220, 80, 1)',
            event: 'rgba(200, 200, 200, 0.6)'
        });
        this.graph.max = 45;

        return div;
    },
    tick: function() {
        var t = this.game.timings,
            o = {
                input: t.inputEnd - t.inputStart,
                camera: t.cameraEnd - t.cameraStart,
                phys: t.physicsEnd - t.physicsStart,
                user: t.userFuncsEnd - t.userFuncsStart,
                debug: t.__debugLastDiff || 0,
                draw: t.renderEnd - t.renderStart
            },
            evt = this.eventQueue.shift();

        if(evt)
            o.event = evt;

        this.graph.addData(o);
    },
    logEvent: function(name) {
        this.eventQueue.push(name);
    }
});
debug.SpritesPanel = function(game) {
    debug.Panel.call(this, game);

    this.name = 'sprites';
    this.title = 'Sprites';

    this.showing = {
        shapes: false,
        tree: false
    };
};

gf.inherit(debug.SpritesPanel, debug.Panel, {
    createPanelElement: function() {
        var div = debug.Panel.prototype.createPanelElement.call(this),
            pad = document.createElement('div');

        // Show colliders
        debug.ui.setHtml(pad,
            '<div class="checkbox">' +
                '<input type="checkbox" value="" id="gf_debug_toggleShapes" class="gf_debug_toggleShapes" name="check" />' +
                '<label for="gf_debug_toggleShapes"></label>' +
            '</div>' +
            '<span>Draw Collider Shapes</span>'/* +
            '<div class="checkbox">' +
                '<input type="checkbox" value="" id="gf_debug_toggleQuadTree" class="gf_debug_toggleQuadTree" name="check" />' +
                '<label for="gf_debug_toggleQuadTree"></label>' +
            '</div>' +
            '<span>Draw QuadTree</span>'*/
        );
        debug.ui.delegate(pad, 'change', '.gf_debug_toggleShapes', this.toggleType.bind(this, 'shapes'));
        //debug.ui.delegate(pad, 'change', '.gf_debug_toggleQuadTree', this.toggleType.bind(this, 'tree'));

        div.appendChild(pad);

        this.physics = new debug.Physics(div, this.game);

        return div;
    },
    toggleType: function(type) {
        this.showing[type] = !this.showing[type];
    },
    tick: function() {
        if(!this.active)
            return;

        this.physics.render();
        /*
        if(this.game.world !== this.gfx.parent) {
            if(this.gfx.parent)
                this.gfx.parent.removeChild(this.gfx);

            this.game.world.add.obj(this.gfx);
        }

        this.gfx.clear();

        //ensure always on top
        if(!this.showing.shapes && !this.showing.tree)
            return this._updateGfx(true);
        else
            this._updateGfx();

        //draw all the bodies
        if(this.showing.shapes) {
            var self = this;
            this.game.physics.space.eachShape(function(shape) {
                if(!shape.body) return;

                debug.drawPhysicsShape(
                    shape,
                    shape.sensor ? self.style.sensorShape : self.style._defaultShape,
                    self.gfx
                );
            });
        }

        //draw the quadtree
        if(this.showing.tree) {
            debug.drawQuadTree(
                this.game.physics.tree,
                this.style.tree,
                this.gfx
            );
        }
        */
    },
    _updateGfx: function(rm) {
        if(rm) {
            if(this.gfx.parent)
                this.gfx.parent.removeChild(this.gfx);
        } else {
            if(!this.gfx.parent)
                this.game.world.add.obj(this.gfx);
        }
    }
});

debug.MapPanel = function (game) {
    debug.Panel.call(this, game);

    this.name = 'map';
    this.title = 'Mini-Map';
    this.map = null;
    this.maps = {};

    this._cache = {
        numStates: 0,
        state: null
    };

    this.fullRender = true;
};

gf.inherit(debug.MapPanel, debug.Panel, {
    createPanelElement: function() {
        var div = debug.Panel.prototype.createPanelElement.call(this),
            left = document.createElement('div'),
            right = document.createElement('div');

        //states (left)
        debug.ui.addClass(left, 'left');
        debug.ui.setHtml(left, '<h2>Game States</h2>');

        this.states = document.createElement('ul');
        debug.ui.addClass(this.states, 'states');
        debug.ui.delegate(this.states, 'click', 'li', this.onClickState.bind(this));
        left.appendChild(this.states);

        //maps (right)
        debug.ui.addClass(right, 'right');
        debug.ui.setHtml(right, '<h2>Tilemaps</h2>');

        this.mapsui = document.createElement('ul');
        debug.ui.addClass(this.mapsui, 'maps');
        debug.ui.delegate(this.mapsui, 'click', 'li', this.onClickMap.bind(this));
        right.appendChild(this.mapsui);

        div.appendChild(left);
        div.appendChild(right);
        div.appendChild(debug.ui.clear());

        return div;
    },
    refresh: function() {
        //build states list
        this.buildStateList();

        //clear maps/layers
        debug.ui.empty(this.mapsui);

        //hide current map
        if(this.map)
            this.map.hide();

        this.map = null;
    },
    buildStateList: function() {
        debug.ui.empty(this.states);

        var states = this.game.state.states,
            name, state;

        for(name in states) {
            state = states[name];

            var li = this.createLi('state', name, state.visible);
            li.dataset.name = name;
            this.states.appendChild(li);

            if(!this.maps[name])
                this.maps[name] = new debug.Minimap(this._panel, state);
            else
                this.maps[name].render(true);

            this.maps[name].hide();
        }
    },
    buildMapList: function(state) {
        debug.ui.empty(this.mapsui);

        //loop through each child of the selected state
        for(var i = 0; i < state.world.children.length; ++i) {
            var child = state.world.children[i];

            //if this is a tilemap show it and all layers
            if(child instanceof gf.Tilemap) {
                var li = this.createLi('map', child._cachekey, child.visible);
                li.dataset.index = i;

                //if there are any children create a sublist
                if(child.children.length) {
                    var ul = document.createElement('ul'),
                        add = false;

                    for(var l = 0; l < child.children.length; ++l) {
                        var layer = child.children[l];

                        //only add tilelayers
                        if(layer.type === 'tilelayer') {
                            var lli = this.createLi('layer', layer.name, layer.visible);

                            lli.dataset.mapIndex = i;
                            lli.dataset.index = l;

                            ul.appendChild(lli);

                            add = true;
                        }
                    }

                    //add the sublist to the map li
                    if(add)
                        li.appendChild(ul);
                }

                //add the map li to the list
                this.mapsui.appendChild(li);
            }
        }
    },
    createLi: function(cls, text, active) {
        var li = document.createElement('li');

        debug.ui.addClass(li, cls);
        debug.ui.setText(li, text);

        if(active)
            debug.ui.addClass(li, 'active');

        return li;
    },
    onClickState: function(e) {
        var data = e.target.dataset;

        if(this.map)
            this.map.hide();

        this.map = this.maps[data.name];
        this.map.show();
        this.buildMapList(this.game.state.states[data.name]);
    },
    onClickMap: function(e) {
        var data = e.target.dataset,
            obj;

        if(data.mapIndex !== undefined) {
            obj = this._cache.state.world.children[data.mapIndex].children[data.index];
        } else {
            obj = this._cache.state.world.children[data.index];
        }

        //toggle visibility
        obj.visible = !obj.visible;
        this.fullRender = true;

        if(obj.visible)
            debug.ui.addClass(e.target, 'active');
        else
            debug.ui.removeClass(e.target, 'active');
    },
    tick: function() {
        if(!this.active)
            return;

        if(this._cache.numStates !== this.game.state.count || this._cache.state !== this.game.state.active) {
            this._cache.numStates = this.game.state.count;
            this._cache.state = this.game.state.active;
            this.refresh();
            this.map = this.maps[this.game.state.active.name];
        }

        if(this.map) {
            this.map.render(this.fullRender);
            this.fullRender = false;
        }
    }
});
debug.Graph = function(container, width, height, dataStyles) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');

    //setup data canvases, these are used to prerender the data graph
    //and having two of them allows me to clear one with the other takes
    //up the entire graph, so I have "wrap" the graph around to get more
    this.dataCanvases = [
        document.createElement('canvas'),
        document.createElement('canvas')
    ];
    this.dataCtxs = [
        this.dataCanvases[0].getContext('2d'),
        this.dataCanvases[1].getContext('2d')
    ];
    this.dataScroll = [
        0,
        0
    ];
    this.dataIndex = 0;

    this.label = 'ms';
    this.labelPrecision = 0;
    this.labelStyle = 'rgba(200, 200, 200, 0.6)';
    this.max = 50;
    this.dataLineWidth = 1;
    this.padding = 5;

    this.keySize = 115;

    this.dataCanvases[0].width = this.dataCanvases[1].width = width - this.keySize;
    this.dataCanvases[0].height = this.dataCanvases[1].height = height;

    this.data = [];
    this.styles = dataStyles || {};

    if(!this.styles._default)
        this.styles._default = 'red';

    if(!this.styles.event)
        this.styles.event = 'gray';
};

gf.inherit(debug.Graph, Object, {
    addData: function(values) {
        this.data.push(values);

        if(this.data.length > ((this.canvas.width - this.keySize) / this.dataLineWidth))
            this.data.shift();

        this.render();
    },
    render: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateData();

        this.drawBg();
        this.drawKey();
        this.drawData();
    },
    drawBg: function() {
        var ctx = this.ctx,
            minX = this.keySize,
            maxX = this.canvas.width,
            maxY = this.canvas.height,
            step = maxY / 3;

        ctx.strokeStyle = ctx.fillStyle = this.labelStyle;

        //draw top marker line
        ctx.beginPath();
        ctx.moveTo(minX, step);
        ctx.lineTo(maxX, step);
        ctx.stroke();

        //draw the second marker line
        ctx.beginPath();
        ctx.moveTo(minX, step*2);
        ctx.lineTo(maxX, step*2);
        ctx.stroke();

        //draw baseline marker
        ctx.beginPath();
        ctx.moveTo(minX, maxY);
        ctx.lineTo(maxX, maxY);
        ctx.stroke();

        //draw marker line text
        ctx.fillText(((this.max / 3)*2).toFixed(this.labelPrecision) + this.label, minX + this.padding, step-this.padding);
        ctx.fillText((this.max / 3).toFixed(this.labelPrecision) + this.label, minX + this.padding, (step*2)-this.padding);
    },
    drawKey: function() {
        var ctx = this.ctx,
            i = 0,
            box = 10,
            data = this.data[this.data.length - 1],
            pad = this.padding,
            lbl = this.labelStyle;

        for(var k in this.styles) {
            var style = this.styles[k],
                y = (box * i) + (pad * (i+1)),
                val = typeof data[k] === 'number' ? data[k].toFixed(2) : null,
                text = k + (val ? ' (' + val + ' ms)' : '');

            ctx.fillStyle = style;
            ctx.fillRect(pad, y, box, box);
            ctx.fillStyle = lbl;
            ctx.fillText(text, pad + box + pad, y + box);

            i++;
        }
    },
    drawData: function() {
        var i = this.dataIndex,
            ni = this.dataIndex ? 0 : 1,
            c1 = this.dataCanvases[i],
            s1 = this.dataScroll[i],
            c2 = this.dataCanvases[ni],
            s2 = this.dataScroll[ni],
            w = c1.width,
            h = c1.height;

        //draw on prerender of data
        this.ctx.drawImage(
            c1,
            0, //sx
            0, //sy
            s1, //sw
            h, //sh
            w - s1 + this.keySize, //dx
            0, //dy
            s1,
            h
        );
        this.ctx.drawImage(
            c2,
            s2 - w, //sx
            0, //sy
            w - (s2 - w), //sw
            h, //sh
            this.keySize, //dx
            0, //dy
            w - (s2 - w), //dw
            h //dh
        );

        if(w === s1) {
            this.dataScroll[ni] = this.dataLineWidth;
            this.dataCtxs[ni].clearRect(0, 0, w, h);
            this.dataIndex = ni;
        }
    },
    //draw the latest data point into the dataCanvas
    updateData: function() {
        var ctx = this.dataCtxs[this.dataIndex],
            x = this.dataScroll[this.dataIndex],
            maxY = this.dataCanvases[this.dataIndex].height,
            lw = this.dataLineWidth,
            vals = this.data[this.data.length - 1],
            v = 0, step = 0, y = maxY;

        for(var k in vals) {
            ctx.beginPath();
            ctx.strokeStyle = ctx.fillStyle = this.styles[k] || this.styles._default;
            ctx.lineWidth = lw;

            v = vals[k];
            if(k === 'event') {
                ctx.moveTo(x, maxY);
                ctx.lineTo(x, 0);
                ctx.fillText(v, x+this.padding, (this.padding*2));
            } else {
                step = ((v / this.max) * maxY);
                step = step < 0 ? 0 : step;

                ctx.moveTo(x, y);
                ctx.lineTo(x, y-=step);
            }

            ctx.stroke();
        }
        this.dataScroll[0] += lw;
        this.dataScroll[1] += lw;
    }
});
debug.Minimap = function(container, state) {
    this.canvas = document.createElement('canvas');
    this.prerenderCanvas = document.createElement('canvas');

    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.pctx = this.prerenderCanvas.getContext('2d');

    this.world = state.world;
    this.camera = state.camera;

    this.scale = 1;

    this._hasRendered = false;

    this.viewportRectColor = 'rgba(255, 0, 255, 1)';

    this.active = true;
    this.maxSize = new gf.Vector();
};

gf.inherit(debug.Minimap, Object, {
    show: function() {
        debug.ui.show(this.canvas);
        this.active = true;
    },
    hide: function() {
        debug.ui.hide(this.canvas);
        this.active = false;
    },
    render: function(full) {
        if(!this.active)
            return;

        if(full || !this._hasRendered) {
            //find the largest tilemap
            for(var w = 0, wl = this.world.children.length; w < wl; ++w) {
                var map = this.world.children[w];

                if(map instanceof gf.Tilemap) {
                    this.maxSize.x = gf.math.max(this.maxSize.x, map.size.x * map.tileSize.x);
                    this.maxSize.y = gf.math.max(this.maxSize.y, map.size.y * map.tileSize.y);
                }
            }

            if(this.maxSize.x === 0 || this.maxSize.y === 0) {
                return;
            }

            this._hasRendered = true;

            this.canvas.width = this.prerenderCanvas.width = this.maxSize.x;
            this.canvas.height = this.prerenderCanvas.height = this.maxSize.y;

            //pre renders the tilemaps to the prerenderCanvas
            this.prerender();
        }

        //redraw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap();
        this.drawObjects();
        this.drawViewport();
    },
    drawMap: function() {
        //draw the prerendered map canvas
        this.ctx.drawImage(this.prerenderCanvas, 0, 0);
    },
    drawObjects: function() {
        // NOT YET IMPLEMENTED
    },
    drawViewport: function() {
        //draw the viewport
        var world = this.world,
            pos = world.position,
            cam = this.camera,
            scaleX = this.scale * world.scale.x,
            scaleY = this.scale * world.scale.y,
            sizeX = Math.min(cam.size.x, this.maxSize.x),
            sizeY = Math.min(cam.size.y, this.maxSize.y);

        this.ctx.strokeStyle = this.viewportRectColor;
        this.ctx.strokeRect(
            -pos.x * scaleX,
            -pos.y * scaleY,
            sizeX * scaleX,
            sizeY * scaleY
        );
    },
    prerender: function() {
        var world = this.world;

        //for each child of world, if it is visible and a tilemap, prerender it
        for(var w = 0, wl = world.children.length; w < wl; ++w) {
            if(world.children[w].visible && world.children[w] instanceof gf.Tilemap) {
                this.prerenderMap(world.children[w]);
            }
        }
    },
    prerenderMap: function(map) {
        for(var l = 0, ll = map.children.length; l < ll; ++l) {
            var layer = map.children[l];

            //if it is a Tilelayer and is visible
            if(layer.tileIds && layer.visible) {
                this.prerenderLayer(layer, map);
            }
        }
    },
    prerenderLayer: function(layer, map) {
        var size = map.size;

        //render the layer one tile at a time
        for(var x = 0, xl = size.x; x < xl; ++x) {
            for(var y = 0, yl = size.y; y < yl; ++y) {
                var id = (x + (y * size.x)),
                    tid = layer.tileIds[id];

                this.prerenderTile(tid, map, x, y);
            }
        }
    },
    prerenderTile: function(tid, map, x, y) {
        var set = map.getTileset(tid),
            tx;

        if(!set) return;

        tx = set.getTileTexture(tid);

        if(!tx) return;

        //from pixi canvas renderer
        this.pctx.drawImage(
            tx.baseTexture.source,
            tx.frame.x,
            tx.frame.y,
            tx.frame.width,
            tx.frame.height,
            x * tx.frame.width,
            y * tx.frame.height,
            tx.frame.width * this.scale,
            tx.frame.height * this.scale
        );
    }
});
//based on: http://www.html5rocks.com/en/tutorials/doodles/gamepad/
var STICK_OFFSET = 10,
btnIds = [
    'button-1',
    'button-2',
    'button-3',
    'button-4',
    'button-left-shoulder-top',
    'button-right-shoulder-top',
    'button-left-shoulder-bottom',
    'button-right-shoulder-bottom',
    'button-select',
    'button-start',
    'stick-1',
    'stick-2',
    'button-dpad-top',
    'button-dpad-bottom',
    'button-dpad-left',
    'button-dpad-right'
],
axisIds = [
    ['stick-1-axis-x', 'stick-1'],
    ['stick-1-axis-y', 'stick-1'],
    ['stick-2-axis-x', 'stick-2'],
    ['stick-2-axis-y', 'stick-2']
],
template =
'<div class="gf_debug_gp_buttons">' +
    '<div class="gf_debug_gp_face" name="button-1"></div>' +
    '<div class="gf_debug_gp_face" name="button-2"></div>' +
    '<div class="gf_debug_gp_face" name="button-3"></div>' +
    '<div class="gf_debug_gp_face" name="button-4"></div>' +
    '<div class="gf_debug_gp_top-shoulder" name="button-left-shoulder-top"></div>' +
    '<div class="gf_debug_gp_top-shoulder" name="button-right-shoulder-top"></div>' +
    '<div class="gf_debug_gp_bottom-shoulder" name="button-left-shoulder-bottom"></div>' +
    '<div class="gf_debug_gp_bottom-shoulder" name="button-right-shoulder-bottom"></div>' +
    '<div class="gf_debug_gp_select-start" name="button-select"></div>' +
    '<div class="gf_debug_gp_select-start" name="button-start"></div>' +
    '<div class="gf_debug_gp_stick" name="stick-1"></div>' +
    '<div class="gf_debug_gp_stick" name="stick-2"></div>' +
    '<div class="gf_debug_gp_face" name="button-dpad-top"></div>' +
    '<div class="gf_debug_gp_face" name="button-dpad-bottom"></div>' +
    '<div class="gf_debug_gp_face" name="button-dpad-left"></div>' +
    '<div class="gf_debug_gp_face" name="button-dpad-right"></div>' +
'</div>' +
'<div class="gf_debug_gp_labels">' +
    '<label for="button-1">?</label>' +
    '<label for="button-2">?</label>' +
    '<label for="button-3">?</label>' +
    '<label for="button-4">?</label>' +
    '<label for="button-left-shoulder-top">?</label>' +
    '<label for="button-right-shoulder-top">?</label>' +
    '<label for="button-left-shoulder-bottom">?</label>' +
    '<label for="button-right-shoulder-bottom">?</label>' +
    '<label for="button-select">?</label>' +
    '<label for="button-start">?</label>' +
    '<label for="stick-1">?</label>' +
    '<label for="stick-2">?</label>' +
    '<label for="button-dpad-top">?</label>' +
    '<label for="button-dpad-bottom">?</label>' +
    '<label for="button-dpad-left">?</label>' +
    '<label for="button-dpad-right">?</label>' +
    '<label for="stick-1-axis-x">?</label>' +
    '<label for="stick-1-axis-y">?</label>' +
    '<label for="stick-2-axis-x">?</label>' +
    '<label for="stick-2-axis-y">?</label>' +
'</div>' +
'<div class="gf_debug_gp_name">Grapefruit</div>';

debug.Gamepad = function() {
    var el = this.element = document.createElement('div');
    el.classList.add('gf_debug_gp');
    el.innerHTML = template;
};

gf.inherit(debug.Gamepad, Object, {
    updateButton: function(status) {
        var buttonEl = this.element.querySelector('[name="' + btnIds[status.code] + '"]'),
            labelEl = this.element.querySelector('label[for="' + btnIds[status.code] + '"]');

        labelEl.innerHTML = status.value.toFixed(2);

        if(status.down) {
            buttonEl.classList.add('pressed');
            labelEl.classList.add('visible');
        } else {
            buttonEl.classList.remove('pressed');
            labelEl.classList.remove('visible');
        }
    },
    updateAxis: function(status) {
        var stickEl = this.element.querySelector('[name="' + axisIds[status.code][1] + '"]'),
            labelEl = this.element.querySelector('label[for="' + axisIds[status.code][0] + '"]'),
            offsetVal = status.value * STICK_OFFSET;

        if(status.code === gf.GamepadSticks.AXIS.LEFT_ANALOGUE_HOR || status.code === gf.GamepadSticks.AXIS.RIGHT_ANALOGUE_HOR) {
            stickEl.style.marginLeft = offsetVal + 'px';
        } else {
            stickEl.style.marginTop = offsetVal + 'px';
        }

        labelEl.innerHTML = status.value.toFixed(2);
        if(status.value !== 0) {
            labelEl.classList.add('visible');
            if (status.value > 0) {
                labelEl.classList.add('positive');
            } else {
                labelEl.classList.add('negative');
            }
        } else {
            labelEl.classList.remove('visible');
            labelEl.classList.remove('positive');
            labelEl.classList.remove('negative');
        }
    }
});

debug.Physics = function(container, game) {
    //create canvases
    this.canvas = document.createElement('canvas');
    this.staticCanvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.sctx = this.staticCanvas.getContext('2d');
    container.appendChild(this.canvas);
    //container.appendChild(this.staticCanvas);

    //store trees
    this.game = game;

    //style of things to draw
    this.style = {
        _defaultShape: {
            size: 1,
            color: '#ff2222',
            alpha: 1
        },
        sensorShape: {
            size: 1,
            color: '#22ff22',
            alpha: 1
        },
        tree: {
            size: 1,
            color: '#2222ff',
            alpha: 1
        }
    };
};

gf.inherit(debug.Physics, Object, {
    render: function() {
        var sw, sh,
            fw, fh,
            doRender = false,
            actShapes = this.game.physics.space.activeShapes,
            stcShapes = this.game.physics.space.staticShapes;

        sw = sh = fw = fh = 0;

        if(actShapes.root) {
            /* jshint -W106 */
            sw = actShapes.root.bb_r - actShapes.root.bb_l;
            sh = actShapes.root.bb_t - actShapes.root.bb_b;
            /* jshint +W106 */
            doRender = true;
        }

        if(stcShapes.root) {
            /* jshint -W106 */
            fw = Math.max(sw, stcShapes.root.bb_r - stcShapes.root.bb_l);
            fh = Math.max(sh, stcShapes.root.bb_t - stcShapes.root.bb_b);
            /* jshint +W106 */
            doRender = true;
        }

        if(doRender) {
            //clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width = fw, this.canvas.height = fh);

            //render static shapes
            //if(this.staticCanvas.width !== sw || this.staticCanvas.height !== sh) {
            //this.sctx.clearRect(0, 0, this.staticCanvas.width = sw, this.staticCanvas.height = sh);
            //this.staticCanvas.width = sw;
            //this.staticCanvas.height = sh;
            this.drawShapes(this.ctx, stcShapes);
            //}

            //draw static canvas
            /* jshint -W106 */
            //this.ctx.drawImage(this.staticCanvas, 0, 0);
            /* jshint +W106 */

            //render active shapes
            this.drawShapes(this.ctx, actShapes);
        }
    },
    drawShapes: function(ctx, tree) {
        var self = this;
        tree.each(function(shape) {
            self.drawShape(
                ctx,
                shape,
                shape.sensor ? self.style.sensorShape : self.style._defaultShape
            );
        });
    },
    drawShape: function(ctx, shape, style) {
        ctx.lineWidth = style.size;
        ctx.strokeStyle = style.color;

        var p = shape.body.p;

        //draw circle
        if(shape.type === 'circle') {
            /* jshint -W106 */
            var cx = shape.bb_l + ((shape.bb_r - shape.bb_l) / 2),
                cy = shape.bb_t + ((shape.bb_b - shape.bb_t) / 2);
            /* jshint +W106 */

            ctx.arc(cx, cy, shape.r, 0, 2 * Math.PI);
        }
        //draw polygon
        else {
            var vx = shape.verts[0],
                vy = shape.verts[1];

            ctx.beginPath();
            ctx.moveTo(
                p.x + vx,
                p.y + vy
            );

            for(var i = 2; i < shape.verts.length; i += 2) {
                ctx.lineTo(
                    p.x + shape.verts[i],
                    p.y + shape.verts[i + 1]
                );
            }

            ctx.closePath();
        }

        ctx.stroke();
    }
});

//Some general dom helpers
debug.ui = {
    delegate: function(dom, evt, selector, fn) {
        dom.addEventListener(evt, function(e) {
            if(e.target && e.target.matches(selector)) {
                if(fn) fn(e);
            }
        });
    },

    removeClass: function(dom, cls) {
        var classes = dom.className.split(' '),
            i = classes.indexOf(cls);

        if(i !== -1) {
            classes.splice(i, 1);
            dom.className = classes.join(' ').trim();
        }
    },

    addClass: function(dom, cls) {
        var classes = dom.className.split(' ');

        classes.push(cls);
        dom.className = classes.join(' ').trim();
    },

    setText: function(dom, txt) {
        dom.textContent = txt;
    },

    setHtml: function(dom, html) {
        dom.innerHTML = html;
    },

    setStyle: function(dom, style, value) {
        if(typeof style === 'string') {
            dom.style[style] = value;
        } else {
            for(var key in style) {
                dom.style[key] = style[key];
            }
        }
    },

    empty: function(dom) {
        while(dom.firstChild) {
            dom.removeChild(dom.firstChild);
        }
    },

    show: function(dom) {
        this.setStyle(dom, 'display', 'block');
    },

    hide: function(dom) {
        this.setStyle(dom, 'display', 'none');
    },

    clear: function() {
        var br = document.createElement('br');
        debug.ui.addClass(br, 'clear');

        return br;
    }
};

// polyfill for matchesSelector
if (!HTMLElement.prototype.matches) {
    var htmlprot = HTMLElement.prototype;

    htmlprot.matches =
        htmlprot.matches ||
        htmlprot.webkitMatchesSelector ||
        htmlprot.mozMatchesSelector ||
        htmlprot.msMatchesSelector ||
        htmlprot.oMatchesSelector ||
        function (selector) {
            // poorman's polyfill for matchesSelector
            var elements = this.parentElement.querySelectorAll(selector),
                element,
                i = 0;

            while (element = elements[i++]) {
                if (element === this) return true;
            }
            return false;
        };
}

})(window);