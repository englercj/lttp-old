define([
    'game/data/constants',
    'game/states/State',
    'game/entities/Link',
    'game/fonts/ReturnOfGanon',
    'game/fonts/Hud',
    'game/huditems'
], function(C, State, Link, ReturnOfGanonFont, HudFont, huditems) {
    var Play = function(game) {
        State.call(this, 'play', game);

        //initialize HUD objects
        this.camera.addChild(this.initHud());

        //bind some game related keys
        this.input.keyboard.on(gf.input.KEY.B, this.onToggleSaveMenu.bind(this));
        this.input.keyboard.on(gf.input.KEY.M, this.onToggleMap.bind(this));
        this.input.keyboard.on(gf.input.KEY.I, this.onToggleInventory.bind(this));
        this.input.keyboard.on(gf.input.KEY.P, this.onToggleAudio.bind(this));

        this.input.gamepad.buttons.on(gf.input.GP_BUTTON.SELECT, this.onToggleSaveMenu.bind(this));
        this.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_3, this.onToggleMap.bind(this));
        this.input.gamepad.buttons.on(gf.input.GP_BUTTON.START, this.onToggleInventory.bind(this));
        this.input.gamepad.buttons.on(gf.input.GP_BUTTON.RIGHT_SHOULDER, this.onToggleAudio.bind(this));
    };

    gf.inherits(Play, State, {
        start: function(world) {
            State.prototype.start.call(this);

            this.gotoWorld(world);
        },
        activateWorld: function() {

        },
        initHud: function() {
            var gui,
                retofganon = new ReturnOfGanonFont(),
                hudfnt = new HudFont();

            this.gui = gui = new gf.Gui();
            gui.scale.x = gui.scale.y = 1.5;
            gui.items = {};

            //Add magic meter
            gui.addChild(gui.items.magicMeter = new huditems.MagicMeter([40, 36], { value: 1 }));

            //Add equipted item
            gui.addChild(gui.items.equipted = new huditems.EquiptedItem([75, 42], { value: '' }));

            //Add inventory counters
            gui.addChild(gui.items.rupees = new huditems.InventoryCounter([135, 30], { value: 0, name: 'rupees', font: hudfnt.clone() }));
            gui.addChild(gui.items.bombs = new huditems.InventoryCounter([195, 30], { value: 0, name: 'bombs', font: hudfnt.clone() }));
            gui.addChild(gui.items.arrows = new huditems.InventoryCounter([245, 30], { value: 0, name: 'arrows', font: hudfnt.clone() }));

            //Add life hearts
            gui.addChild(gui.items.life = new huditems.LifeMeter([320, 35], { value: 3, font: retofganon.clone() }));

            return gui;
        },
        onToggleSaveMenu: function() {},
        onToggleMap: function() {},
        onToggleInventory: function() {},
        onToggleAudio: function() {},
        gotoWorld: function(exit, vec) {
            if(typeof exit === 'string')
                exit = { name: exit };

            //remove the player so he isn't destroyed by the world
            if(this.link) {
                this.world.removeChild(this.link);
                this.world.destroy();
            }
            else {
                this.link = this.createLink();
            }
            this.firstZone = true;

            var self = this;
            this.physics.nextTick(function() {
                self.physics.skip(2);
                //load the new world into the game
                self.loadWorld(exit.name);
                self.addChild(self.link);

                if(self.music)
                    self.music.stop();

                //start music
                if(self.world.properties.music) {
                    self.music = gf.assetCache[self.world.properties.music];
                    self.music.volume = C.MUSIC_VOLUME;
                    self.music.loop = true;

                    if(!self.music)
                        console.warn('Music not loaded! "' + self.world.properties.music + '"');
                    else
                        self.music.play();
                }

                //spawn exits & zones
                self.world.findLayer('exits').spawn();
                self.world.findLayer('zones').spawn();

                //set link position
                self.link.setPosition(
                    exit.properties ? exit.properties.loc[0] : 128,//2231, //in front of links house
                    exit.properties ? exit.properties.loc[1] : 128//2849
                );
                self.camera.follow(self.link, gf.Camera.FOLLOW.LOCKON);
                //self.link.reindex();
            });
        },
        gotoZone: function(zone, vec) {
            if(zone === this.activeZone)
                return;

            //transfer the zone stuff
            this.activeZone = zone;
            this.oldLayer = this.activeLayer;
            this.activeLayer = this.world.findLayer(zone.name);
            this.activeLayer.spawn();

            this.camera.unfollow();
            this.camera.unconstrain();
            if(!this.firstZone) {
                var p = vec.x ? 'x' : 'y',
                    last = 0,
                    self = this;

                $({v:0}).animate({v:this.camera.size[p]+10}, {
                    duration: 500,
                    easing: 'swing',
                    step: function(now, tween) {
                        var n = now - last;

                        self.camera.pan(
                            n * vec.x,
                            n * vec.y
                        );

                        last = now;
                    },
                    done: _zoneReady.bind(this)
                });
            } else {
                this._zoneReady();
            }
        },
        _zoneReady: function() {
            if(this.oldLayer)
                this.oldLayer.despawn();

            var zone = this.activeZone;

            this.firstZone = false;

            //set camera bounds
            if(!zone.bounds) {
                zone.bounds = zone.hitArea.clone();

                //all except polygon
                if(zone.bounds.x !== undefined) {
                    zone.bounds.x += zone.position.x;
                    zone.bounds.y += zone.position.y;
                }
                //polygon
                else {
                    for(var i = 0; i < zone.bounds.points.length; ++i) {
                        var p = zone.bounds.points[i];

                        p.x += zone.position.x;
                        p.y += zone.position.y;
                    }
                }
            }
            this.camera.constrain(zone.bounds.clone());
            this.camera.follow(this.link, gf.Camera.FOLLOW.LOCKON);
        },
        createLink: function(saveData) {
            if(this.link)
                return this.link;

            var l = new Link(gf.assetCache['sprite_link']);

            l.mass = 1;
            l.inertia = Infinity;
            l.friction = 0;
            l.hitArea = new gf.Polygon([
                7,8, //x,y relative to links top-left
                9,8,
                16,14,
                16,16,
                9,22,
                7,22,
                0,16,
                0,14
            ]);

            l.anchor.x = 0;
            l.anchor.y = 1;

            l.enablePhysics(this.physics);
            l.addAttackSensor(this.physics);

            return l;
        }
    });

    return Play;
});