define([
    'game/utility/storage',
    'game/data/constants',
    'game/states/State',
    'game/entities/Link',
    'game/gui/Hud'
], function(store, C, State, Link, Hud) {
    var Play = function(game) {
        State.call(this, 'play', game);

        //initialize HUD objects
        this.camera.addChild(new Hud());

        this.worlds = {};

        //bind some game related keys
        this.game.input.keyboard.on(gf.input.KEY.B, this.onToggleSaveMenu.bind(this));
        this.game.input.keyboard.on(gf.input.KEY.M, this.onToggleMap.bind(this));
        this.game.input.keyboard.on(gf.input.KEY.I, this.onToggleInventory.bind(this));

        this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.SELECT, this.onToggleSaveMenu.bind(this));
        this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_3, this.onToggleMap.bind(this));
        this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.START, this.onToggleInventory.bind(this));
    };

    gf.inherits(Play, State, {
        start: function(save) {
            State.prototype.start.call(this);

            this.lastLoad = save;

            //create link
            this.link = this.createLink();

            //set inventory
            for(var k in save.inventory) {
                this.link.inventory[k] = save.inventory[k];
            }

            //set health
            this.link.health = save.health;
            this.link.maxHealth = save.maxHealth;

            //set magic
            this.link.magic = save.magic;
            this.link.maxMagic = save.maxMagic;

            this.gotoWorld({
                name: save.world,
                properties: {
                    loc: save.position
                }
            });
        },
        activateWorld: function() {

        },
        save: function() {
            store.save(this.lastLoad.slot, this.lastLoad.name, this.lastExit.name, this.lastExit.properties.loc);
        },
        onToggleSaveMenu: function() {},
        onToggleMap: function() {},
        onToggleInventory: function() {},
        onToggleAudio: function() {
            if(this.audio._muted)
                this.audio.unmute();
            else
                this.audio.mute();
        },
        gotoWorld: function(exit, vec) {
            if(typeof exit === 'string')
                exit = { name: exit };

            var self = this;
            /*if(this.world) {
                this.camera.close('ellipse', 2000, this.link.position, function() {
                    self._doGotoWorld(exit, vec);
                });
            } else {*/
                this._doGotoWorld(exit, vec);
            //}
        },
        _doGotoWorld: function(exit, vec) {
            var self = this;

            //remove the player so he isn't destroyed by the world
            if(this.link.parent)
                this.link.parent.removeChild(this.link);

            if(this.world) {
                this.world.visible = false;
                this.world.despawnObjects();
            }

            this.firstZone = true;

            this.physics.nextTick(function() {
                self.physics.skip(2);
                //load the new world into the game
                if(self.worlds[exit.name]) {
                    self.world = self.worlds[exit.name];
                    self.world.visible = true;
                } else {
                    self.loadWorld(exit.name);
                    self.worlds[exit.name] = self.world;
                }

                self.addChild(self.link);
                self.lastExit = exit;

                if(self.music)
                    self.music.stop();

                //start music
                if(self.world.properties.music) {
                    self.music = gf.assetCache[self.world.properties.music];
                    self.music.volume = C.MUSIC_VOLUME;
                    self.music.loop = true;
                    self.audio.attach(self.music);

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
                    exit.properties.loc[0],
                    exit.properties.loc[1]
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
                    done: this._zoneReady.bind(this)
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