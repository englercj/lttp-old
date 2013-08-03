/**
 * @license
 * GrapeFruit Debug Plugin - v0.0.1
 * Copyright (c) 2013, Chad Engler
 * https://github.com/grapefruitjs/gf-debug
 *
 * Compiled: 2013-08-03
 *
 * GrapeFruit Debug Plugin is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window, undefined) {
    var document = window.document;

//register the plugin to grapefruit
gf.plugin.register({}, 'debug');

//the version of this plugin. Placed in by grunt when built you can change
//this value in the package.json (under version)
gf.debug.version = '0.0.1';

//the version of gf that is required for this plugin to function correctly.
//Placed in by grunt when built you can change this value in the package.json (under engines.gf)
gf.debug.gfVersion = '0.0.x';

//on tick funciton to replace the gf.Game.prototype._tick function with
//will call _super to run the normal tick, then tick the panels as well
gf.debug.onTick = function() {
    this._super();

    gf.debug._statsTick();

    if(gf.debug.panels) {
        gf.debug.panels.map.tick();
        gf.debug.panels.performance.tick();
        gf.debug.panels.gamepad.tick();
        gf.debug.panels.sprites.tick();
    }
};

/**
 * Shows the debug bar using the specified game information
 *
 * @method show
 * @param game {gf.Game} the game to debug
 */
gf.debug.show = function(game) {
    if(!game || !(game instanceof gf.Game))
        throw 'Please pass a game instance to gf.debug.show!';

    if(this.game)
        throw 'Already debugging a game instance!';

    this.game = game;

    this.panels = {
        map: new gf.debug.MapPanel(game),
        sprites: new gf.debug.SpritesPanel(game),
        gamepad: new gf.debug.GamepadPanel(game),
        performance: new gf.debug.PerformancePanel(game)
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
gf.debug.logEvent = function(name) {
    if(this.panels && this.panels.performance)
        this.panels.performance.logEvent(name);
};

gf.debug._bindEvents = function() {
    var activePanel,
        self = this;

    this.ui.bindDelegate(this._bar, 'click', 'gf_debug_menu_item', function(e) {
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

        if(panel.name === 'performance')
            panel.active = true;
        else
            self.panels.performance.active = false;

        self.ui.addClass(e.target, 'active');
        panel.toggle();
        activePanel = panel;
    });
};

gf.debug._createElement = function() {
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

gf.debug._createMenuHead = function() {
    var div = document.createElement('div');

    this.ui.addClass(div, 'gf_debug_head');
    this.ui.setText(div, 'Gf Debug (' + this.game.renderMethod + '):');

    return div;
};

gf.debug._createMenuStats = function() {
    this._stats = {};

    var div = document.createElement('div'),
        fps = this._stats.fps = document.createElement('div'),
        ms = this._stats.ms = document.createElement('div'),
        obj = this._stats.obj = document.createElement('div');

    this.ui.addClass(div, 'gf_debug_stats');

    this.ui.addClass(ms, 'gf_debug_stats_item ms');
    this.ui.setHtml(ms, '<span>0</span> ms');
    div.appendChild(ms);

    this.ui.addClass(fps, 'gf_debug_stats_item fps');
    this.ui.setHtml(fps, '<span>0</span> fps');
    div.appendChild(fps);

    this.ui.addClass(obj, 'gf_debug_stats_item obj');
    this.ui.setHtml(obj, '<span>0</span> objects');
    div.appendChild(obj);

    return div;
};

gf.debug._statsTick = function() {
    var ms = this.game.timings.tickEnd - this.game.timings.tickStart,
        fps = 1000/ms;

    fps = fps > 60 ? 60 : fps;

    //update stats
    this.ui.setText(this._stats.ms.firstElementChild, ms.toFixed(2));
    this.ui.setText(this._stats.fps.firstElementChild, fps.toFixed(2));
};

//update the number of sprites every couple seconds (instead of every frame)
//since it is so expensive
setInterval(function() {
    if(gf.debug._stats && gf.debug._stats.obj) {
        //count objects in active state
        var c = 0,
            s = gf.debug.game.activeState,
            wld = s.world,
            cam = s.camera;

        while(wld) {
            c++;
            wld = wld._iNext;
        }

        while(cam) {
            c++;
            cam = cam._iNext;
        }

        gf.debug.ui.setText(gf.debug._stats.obj.firstElementChild, c);

        //log the event to the performance graph
        if(gf.debug.logObjectCountEvent)
            gf.debug.logEvent('debug_count_objects');
    }
}, 2000);
gf.debug.Panel = function(game) {
    this.game = game;
    this.name = '';
    this.title = '';
};

gf.inherits(gf.debug.Panel, Object, {
    //builds the html for a panel
    createPanelElement: function() {
        var div = this._panel = document.createElement('div');
        gf.debug.ui.addClass(div, 'gf_debug_panel');

        return div;
    },
    //builds the html for this panels menu item
    createMenuElement: function() {
        var div = this._menuItem = document.createElement('div');
        gf.debug.ui.addClass(div, 'gf_debug_menu_item ' + this.name);
        gf.debug.ui.setText(div, this.title);

        return div;
    },
    toggle: function() {
        if(this._panel.style.display === 'block')
            this.hide();
        else
            this.show();
    },
    show: function() {
        gf.debug.ui.setStyle(this._panel, 'display', 'block');
    },
    hide: function() {
        gf.debug.ui.setStyle(this._panel, 'display', 'none');
    }
});
gf.debug.GamepadPanel = function(game) {
    gf.debug.Panel.call(this, game);

    this.name = 'gamepad';
    this.title = 'Gamepad';
};

gf.inherits(gf.debug.GamepadPanel, gf.debug.Panel, {
    createPanelElement: function() {
        var div = gf.debug.Panel.prototype.createPanelElement.call(this);

        gf.debug.ui.setText(div, 'a gamepad image that shows the current gamepad state');

        return div;
    },
    tick: function() {
        
    }
});
gf.debug.PerformancePanel = function(game) {
    gf.debug.Panel.call(this, game);

    this.name = 'performance';
    this.title = 'Performance';
    this.eventQueue = [];
    this.active = false;
};

gf.inherits(gf.debug.PerformancePanel, gf.debug.Panel, {
    createPanelElement: function() {
        var div = gf.debug.Panel.prototype.createPanelElement.call(this);

        this.graph = new gf.debug.Graph(div, window.innerWidth, 200, {
            input: 'rgba(80, 220, 80, 1)',
            camera: 'rgba(80, 80, 220, 1)',
            phys: 'rgba(80, 220, 200, 1)',
            draw: 'rgba(220, 80, 80, 1)',
            event: 'rgba(200, 200, 200, 0.6)'
        });
        this.graph.max = 50;

        return div;
    },
    tick: function() {
        if(!this.active)
            return;

        var t = this.game.timings,
            o = {
                input: t.inputEnd - t.inputStart,
                camera: t.cameraEnd - t.cameraStart,
                phys: t.physicsEnd - t.physicsStart,
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
gf.debug.SpritesPanel = function(game) {
    gf.debug.Panel.call(this, game);

    this.name = 'sprites';
    this.title = 'Sprites';

    this.gfx = new PIXI.Graphics();

    this.style = {
        _default: {
            size: 1,
            color: 0xff2222,
            alpha: 1
        },
        sensor: {
            size: 1,
            color: 0x22ff22,
            alpha: 1
        }
    };
};

gf.inherits(gf.debug.SpritesPanel, gf.debug.Panel, {
    createPanelElement: function() {
        var div = gf.debug.Panel.prototype.createPanelElement.call(this),
            col = document.createElement('div');

        // Show colliders
        gf.debug.ui.addClass(col, 'checkbox');
        gf.debug.ui.setHtml(col,
            '<input type="checkbox" value="None" id="gf_debug_toggleCollisions" class="gf_debug_toggleCollisions" name="check" />' +
            '<label for="gf_debug_toggleCollisions"></label>' +
            '<span>Show sprite colliders</span>'
        );
        gf.debug.ui.bindDelegate(col, 'click', 'gf_debug_toggleCollisions', this.toggleCollisions.bind(this), 'input');
        div.appendChild(col);

        return div;
    },
    toggleCollisions: function() {
        this.showing = !this.showing;

        if(this.showing) {
            this.game.world.addChild(this.gfx);
            this._drawPhysics();
        } else {
            if(this.gfx.parent)
                this.gfx.parent.removeChild(this.gfx);
        }
    },
    tick: function() {
        if(this.showing) {
            this._drawPhysics();
        }
    },
    _drawPhysics: function() {
        var self = this,
            g = this.gfx;

        this.gfx.clear();
        this.game.physics.space.eachShape(function(shape) {
            if(!shape.body) return;

            var body = shape.body,
                p = body.p,
                style = shape.sensor ? self.style.sensor : self.style._default;

            g.lineStyle(style.size, style.color, style.alpha);

            //circle
            if(shape.type === 'circle') {
                var cx = shape.bb_l + ((shape.bb_r - shape.bb_l) / 2),
                    cy = shape.bb_t + ((shape.bb_b - shape.bb_t) / 2);

                g.drawCircle(cx, cy, shape.r);
            }
            //polygon
            else {
                var sx = shape.verts[0],
                    sy = shape.verts[1];

                g.moveTo(p.x + sx, p.y + sy);

                for(var i = 2; i < shape.verts.length; i+=2) {
                    g.lineTo(
                        p.x + shape.verts[i],
                        p.y + shape.verts[i + 1]
                    );
                }

                g.lineTo(p.x + sx, p.y + sy);
            }
        });
    }
});
gf.debug.MapPanel = function (game) {
    gf.debug.Panel.call(this, game);

    this.name = 'map';
    this.title = 'Mini-Map';
};

gf.inherits(gf.debug.MapPanel, gf.debug.Panel, {
    createPanelElement: function() {
        var div = gf.debug.Panel.prototype.createPanelElement.call(this);

        this.minimap = new gf.debug.Minimap(div, this.game);

        return div;
    },
    tick: function() {
        this.minimap.render();
    }
});
gf.debug.Graph = function(container, width, height, dataStyles) {
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

gf.inherits(gf.debug.Graph, Object, {
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
gf.debug.Minimap = function(container, game) {
    this.canvas = document.createElement('canvas');
    this.prerenderCanvas = document.createElement('canvas');

    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.pctx = this.prerenderCanvas.getContext('2d');

    this.cachedpos = new gf.Point();
    this.mapimage = null;
    this.game = game;
    this.scale = 0.25;

    this.viewportRectColor = 'rgba(255, 0, 255, 1)';
};

gf.inherits(gf.debug.Minimap, Object, {
    render: function() {
        if(!this.game.world)
            return;

        var world = this.game.world;

        //if the world changes, prerender an image for it
        if(!this.cachedworld || this.cachedworld !== world) {
            this.cachedworld = world;

            this.canvas.width = this.prerenderCanvas.width = (world.size.x * world.tileSize.x * this.scale);
            this.canvas.height = this.prerenderCanvas.height = (world.size.y * world.tileSize.y * this.scale);

            this.prerender();
        }

        //only render when moving
        if(this.cachedpos && this.cachedpos.x === world.position.x && this.cachedpos === world.position.y)
            return;

        //update cached position
        this.cachedpos.x = world.position.x;
        this.cachedpos.y = world.position.y;

        //redraw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap();
        //this.drawObjects();
        //this.drawViewport();
    },
    drawMap: function() {
        //draw the prerendered map image
        this.ctx.drawImage(this.prerenderCanvas, 0, 0);

        //draw the viewport
        var w = this.game.world,
            p = w.position,
            c = this.game.camera,
            s = this.scale;

        this.ctx.strokeStyle = this.viewportRectColor;
        this.ctx.strokeRect(
            (-p.x * s) / w.scale.x,
            (-p.y * s) / w.scale.x,
            (c.size.x * s) / w.scale.x,
            (c.size.y * s) / w.scale.y
        );
    },
    prerender: function() {
        var world = this.game.world,
            size = world.size,
            tsx = world.tileSize.x * this.scale,
            tsy = world.tileSize.y * this.scale;

        for(var l = 0, ll = world.children.length; l < ll; ++l) {
            var layer = world.children[l];

            //if it is a TiledLayer
            if(layer.tileIds && layer.visible) {
                for(var x = 0, xl = size.x; x < xl; ++x) {
                    for(var y = 0, yl = size.y; y < yl; ++y) {
                        var id = (x + (y * size.x)),
                            tid = layer.tileIds[id],
                            set = world.getTileset(tid),
                            tx;

                        if(set) {
                            tx = set.getTileTexture(tid);
                            this.prerenderTile(tx, x * tsx, y * tsy);
                        }
                    }
                }
            }
        }
    },
    prerenderTile: function(tile, x, y) {
        var frame = tile.frame;

        //from pixi canvas renderer
        this.pctx.drawImage(
            tile.baseTexture.source,
            frame.x,
            frame.y,
            frame.width,
            frame.height,
            x,
            y,
            frame.width * this.scale,
            frame.height * this.scale
        );
    }
});
//Some general dom helpers
gf.debug.ui = {
    bindDelegate: function(dom, evt, cls, fn, name) {
        name = name ? name.toUpperCase() : 'DIV';

        dom.addEventListener(evt, function(e) {
            if(e.target && e.target.nodeName.toUpperCase() === name) {
                var classes = e.target.className.split(' ');

                if(classes && classes.indexOf(cls) !== -1) {
                    if(fn) fn(e);
                }
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
    }
};

})(window);