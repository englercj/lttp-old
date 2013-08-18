define([
    'game/data/constants',
    'game/states/State',
    'game/entities/Link',
    'game/gui/Hud',
    'game/gui/Inventory',
    'game/gui/Dialog',
    'game/utility/saves/LinkSave',
    'game/utility/saves/ZoneSave'
], function(C, State, Link, Hud, Inventory, Dialog, LinkSave, ZoneSave) {
    var Play = function(game) {
        State.call(this, 'play', game);

        this.worlds = {};

        //bind some game related keys
        this.game.input.keyboard.on(gf.input.KEY.B, this._boundToggleSaveMenu = this.onToggleSaveMenu.bind(this));
        this.game.input.keyboard.on(gf.input.KEY.M, this._boundToggleMap = this.onToggleMap.bind(this));
        this.game.input.keyboard.on(gf.input.KEY.I, this._boundToggleInventory = this.onToggleInventory.bind(this));

        this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.SELECT, this._boundGpToggleSaveMenu = this.onToggleSaveMenu.bind(this));
        this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_3, this._boundGpToggleMap = this.onToggleMap.bind(this));
        this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.START, this._boundGpToggleInventory = this.onToggleInventory.bind(this));

        this._bgtx = new PIXI.RenderTexture(this.camera.size.x, this.camera.size.y);
        this._bgspr = new gf.Sprite(this._bgtx);
        this._bgspr.visible = false;

        this.game.stage.addChildAt(this._bgspr, 0);
    };

    gf.inherits(Play, State, {
        start: function(save) {
            State.prototype.start.call(this);

            this.linkSave = save;

            var data = this.lastLoad = save.data;

            //create link
            this.link = this.createLink();

            //set inventory
            for(var k in data.inventory) {
                this.link.inventory[k] = data.inventory[k];
            }

            //set health
            this.link.health = data.health;
            this.link.maxHealth = data.maxHealth;

            //set magic
            this.link.magic = data.magic;
            this.link.maxMagic = data.maxMagic;

            //equipted item
            this.link.equipted = data.equipted;

            //initialize HUD objects
            this.addChild(this.hud = new Hud());
            this.addChild(this.inventory = new Inventory());
            this.addChild(this.dialog = new Dialog());

            this.hud.updateValues(this.link);
            this.inventory.updateValues(this.link);

            this.gotoWorld({
                name: data.world,
                properties: {
                    loc: data.position
                }
            });
        },
        stop: function() {
            //unbind the keyboard
            this.game.input.keyboard.off(gf.input.KEY.W, this._boundMoveUp);
            this.game.input.keyboard.off(gf.input.KEY.S, this._boundMoveDown);
            this.game.input.keyboard.off(gf.input.KEY.A, this._boundMoveLeft);
            this.game.input.keyboard.off(gf.input.KEY.D, this._boundMoveRight);

            this.game.input.keyboard.off(gf.input.KEY.E, this._boundUse);
            this.game.input.keyboard.on(gf.input.KEY.V, this._boundUseItem);
            this.game.input.keyboard.off(gf.input.KEY.M, this._boundToggleMap);
            this.game.input.keyboard.off(gf.input.KEY.SPACE, this._boundAttack);

            this.game.input.keyboard.off(gf.input.KEY.B, this._boundToggleSaveMenu);
            this.game.input.keyboard.off(gf.input.KEY.I, this._boundToggleInventory);

            //unbind the gamepad
            this.game.input.gamepad.sticks.off(gf.input.GP_AXIS.LEFT_ANALOGUE_HOR, this._boundGpMoveHor);
            this.game.input.gamepad.sticks.off(gf.input.GP_AXIS.LEFT_ANALOGUE_VERT,  this._boundGpMoveVert);

            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.PAD_TOP, this._boundGpMoveUp);
            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.PAD_BOTTOM, this._boundGpMoveDown);
            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.PAD_LEFT, this._boundGpMoveLeft);
            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.PAD_RIGHT, this._boundGpMoveRight);

            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_1, this._boundGpUse);
            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_2, this._boundGpAttack);
            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_3, this._boundGpToggleMap);
            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.FACE_4, this._boundGpUseItem);

            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.SELECT, this._boundGpToggleSaveMenu);
            this.game.input.gamepad.buttons.off(gf.input.GP_BUTTON.START, this._boundGpToggleInventory);
        },
        onToggleSaveMenu: function() {},
        onToggleMap: function() {},
        onToggleInventory: function(status) {
            if(status.down) return;

            if(this.inventory.visible) {
                var self = this,
                    v = this.inventory.grid[this.inventory.selected.x][this.inventory.selected.y];

                if(!this.inventory.empty) {
                    this.link.equipted = v.item.name;
                    this.hud.updateValues(this.link);
                }

                this.inventory.hide(function() {
                    self.resume();
                });
            } else {
                this.pause();
                this.inventory.show();
            }
        },
        onToggleAudio: function() {
            if(this.audio._muted)
                this.audio.unmute();
            else
                this.audio.mute();
        },
        showDialog: function(text) {
            this.dialog.setText(text);
            this.pause();

            var self = this;
            this.dialog.show(function() {
                self.dialog.hide();
                self.resume();
            });
        },
        pause: function() {
            //render the current world onto a texture (excluding camera)
            this.camera.visible = false;
            this._bgtx.render(this.game.stage);
            this._bgspr.visible = true;

            //turn the camera back on
            this.camera.visible = true;

            //stop physics updates
            this.physics.pause();
            //stop updates to the world
            this.world.visible = false;
        },
        resume: function() {
            this._bgspr.visible = false;
            this.physics.resume();
            this.world.visible = true;
        },
        _saveZoneState: function(zone) {
            //save zone state
            var zsv = new ZoneSave(this.lastLoad.slot, zone);
            zsv.save();

            //update link save as well
            this.linkSave.save(this.link, this.lastExit.name, this.lastExit.properties.loc);
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
                this._saveZoneState(this.activeLayer);
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

                var player = self.world.findLayer('player');
                if(player)
                    player.addChild(self.link);
                else
                    self.world.addChild(self.link);

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

            //load saved layer info
            var zsv = new ZoneSave(this.lastLoad.slot, this.activeLayer);
            zsv.load();

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
            if(this.oldLayer) {
                this._saveZoneState(this.oldLayer);
                this.oldLayer.despawn();
            }

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

            var l = new Link(gf.assetCache['sprite_link']),
                self = this;

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

            l.on('updateHud', function() {
                self.hud.updateValues(l);
                self.inventory.updateValues(l);
            });

            l.on('zone', function(obj, vec) {
                self.gotoZone(obj, vec);
            });

            l.on('exit', function(obj, vec) {
                self.gotoWorld(obj, vec);
            });

            l.on('readSign', function(sign) {
                self.showDialog(sign.properties.text);
            });

            //bind the keyboard
            this.game.input.keyboard.on(gf.input.KEY.W, this._boundMoveUp = this.onMove.bind(this, 'up'));
            this.game.input.keyboard.on(gf.input.KEY.S, this._boundMoveDown = this.onMove.bind(this, 'down'));
            this.game.input.keyboard.on(gf.input.KEY.A, this._boundMoveLeft = this.onMove.bind(this, 'left'));
            this.game.input.keyboard.on(gf.input.KEY.D, this._boundMoveRight = this.onMove.bind(this, 'right'));

            this.game.input.keyboard.on(gf.input.KEY.E, this._boundUse = this.onUse.bind(this));
            this.game.input.keyboard.on(gf.input.KEY.V, this._boundUseItem = this.onUseItem.bind(this));
            this.game.input.keyboard.on(gf.input.KEY.SPACE, this._boundAttack = this.onAttack.bind(this));

            //bind the gamepad
            this.game.input.gamepad.sticks.on(gf.input.GP_AXIS.LEFT_ANALOGUE_HOR, this._boundGpMoveHor = this.onGpMove.bind(this));
            this.game.input.gamepad.sticks.on(gf.input.GP_AXIS.LEFT_ANALOGUE_VERT,  this._boundGpMoveVert = this.onGpMove.bind(this));
            this.game.input.gamepad.sticks.threshold = 0.35;

            this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.PAD_TOP, this._boundGpMoveUp = this.onMove.bind(this, 'up'));
            this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.PAD_BOTTOM, this._boundGpMoveDown = this.onMove.bind(this, 'down'));
            this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.PAD_LEFT, this._boundGpMoveLeft = this.onMove.bind(this, 'left'));
            this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.PAD_RIGHT, this._boundGpMoveRight = this.onMove.bind(this, 'right'));

            this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_1, this._boundGpUse = this.onUse.bind(this));
            this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_2, this._boundGpAttack = this.onAttack.bind(this));
            this.game.input.gamepad.buttons.on(gf.input.GP_BUTTON.FACE_4, this._boundGpUseItem = this.onUseItem.bind(this));

            return l;
        },
        onMove: function(dir, status) {
            if(this.inventory.visible)
                this.inventory.onMove(dir, status);
            else
                this.link.onWalk(dir, status);
        },
        onGpMove: function(status) {
            if(this.inventory.visible)
                this.inventory.onGpMove(status);
            else
                this.link.onGpWalk(status);
        },
        onUse: function(status) {
            if(this.dialog.visible)
                this.dialog.onAdvance(status);
            else
                this.link.onUse(status);
        },
        onUseItem: function(status) {
            if(this.dialog.visible)
                this.dialog.onAdvance(status);
            else
                this.link.onUseItem(status);
        },
        onAttack: function(status) {
            if(this.dialog.visible)
                this.dialog.onAdvance(status);
            else
                this.link.onAttack(status);
        }
    });

    return Play;
});