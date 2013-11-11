define([
    'vendor/gf',
    'game/data/constants',
    'game/data/resources',
    'game/states/State',
    'game/entities/Link',
    'game/gui/Hud',
    'game/gui/Inventory',
    'game/gui/Dialog',
    'game/utility/saves/LinkSave',
    'game/utility/saves/ZoneSave',
    'game/fonts/ReturnOfGanon'
], function(gf, C, resources, State, Link, Hud, Inventory, Dialog, LinkSave, ZoneSave, ReturnOfGanonFont) {
    var Play = function(game) {
        State.call(this, game, 'play');

        this.maps = {};
        this.map = null;

        //bind some game related keys
        this.game.input.keyboard.on(gf.Keyboard.KEY.B, this._boundToggleSaveMenu = this.onToggleSaveMenu.bind(this));
        this.game.input.keyboard.on(gf.Keyboard.KEY.M, this._boundToggleMap = this.onToggleMap.bind(this));
        this.game.input.keyboard.on(gf.Keyboard.KEY.I, this._boundToggleInventory = this.onToggleInventory.bind(this));

        this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.SELECT, this._boundGpToggleSaveMenu = this.onToggleSaveMenu.bind(this));
        this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_3, this._boundGpToggleMap = this.onToggleMap.bind(this));
        this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.START, this._boundGpToggleInventory = this.onToggleInventory.bind(this));

        this._bgtx = new gf.RenderTexture(this.camera.size.x, this.camera.size.y);
        this._bgspr = new gf.Sprite(this._bgtx);
        this._bgspr.visible = false;

        this.loading = new ReturnOfGanonFont('Loading...');
        this.loading.setPosition(225, 300);
        this.loading.scale.set(3, 3);
        this.loading.hide();

        this.addChild(this.loading);
        this.camera.add.obj(this._bgspr);
    };

    gf.inherit(Play, State, {
        start: function(save) {
            State.prototype.start.call(this);

            this.linkSave = save;

            var data = this.lastLoad = save.data;

            //create link
            this.link = this.createLink();

            //bind events
            this.bindInput();

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
            this.camera.add.obj(this.hud = new Hud());
            this.camera.add.obj(this.inventory = new Inventory());
            this.camera.add.obj(this.dialog = new Dialog());

            this.hud.updateValues(this.link);
            this.inventory.updateValues(this.link);

            this.gotoMap({
                name: data.map,
                properties: {
                    loc: data.position,
                    transition: 'fade'
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
            this.game.input.gamepad.sticks.off(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_HOR, this._boundGpMoveHor);
            this.game.input.gamepad.sticks.off(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_VERT,  this._boundGpMoveVert);

            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.PAD_TOP, this._boundGpMoveUp);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.PAD_BOTTOM, this._boundGpMoveDown);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.PAD_LEFT, this._boundGpMoveLeft);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.PAD_RIGHT, this._boundGpMoveRight);

            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.FACE_1, this._boundGpUse);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.FACE_2, this._boundGpAttack);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.FACE_3, this._boundGpToggleMap);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.FACE_4, this._boundGpUseItem);

            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.SELECT, this._boundGpToggleSaveMenu);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.START, this._boundGpToggleInventory);

            this.game.input.keyboard.off(gf.Keyboard.KEY.SHIFT, this._boundROCKET);
            this.game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.LEFT_TRIGGER, this._boundGpROCKET);
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
            this.pause();
            this.dialog.setText(text);

            var self = this;
            this.dialog.show(function() {
                self.dialog.hide();
                self.resume();
            });
        },
        pause: function() {
            //render the current world onto a texture
            this.hud.visible = false;
            this._bgtx.render(this);
            this._bgspr.visible = true;

            //turn the camera back on
            this.hud.visible = true;

            //hides and stop updates to the world
            this.world.visible = false;

            //stop physics updates
            this.physics.pause();
        },
        resume: function() {
            this._bgspr.visible = false;
            this.world.visible = true;

            //restart physics simulation
            this.physics.resume();
        },
        _saveZoneState: function(zone) {
            //save zone state
            var zsv = new ZoneSave(this.lastLoad.slot, zone, this.lastExit.name);
            zsv.save();

            //update link save as well
            this.linkSave.save(this.link, this.lastExit.name, this.lastExit.properties.loc);
        },
        gotoMap: function(exit, vec) {
            if(typeof exit === 'string')
                exit = { name: exit };

            var self = this;
            if(this.map) {
                if(exit.properties.animation) {
                    this.link.once('complete', function() {
                        self._doMapTransition(exit, vec);
                        self.link.unlock();
                    });
                    this.link.lock();
                    this.link.goto(0, exit.properties.animation).play();

                    return;
                }
            }

            this._doMapTransition(exit, vec);
        },
        _doMapTransition: function(exit, vec) {
            var animTime = 250,
                self = this,
                fade;

            if(!this.map) {
                fade = this.camera.fade(0x000000, 1, 1, function() {
                    self._dogotoMap(exit, vec, function() {
                        self.camera.flash(0x000000, animTime * 3);
                        fade.stop();
                    });

                    return false;
                });

                return;
            }

            switch(exit.properties.transition) {
                case 'none':
                    this._dogotoMap(exit, vec);
                    break;

                case 'close':
                    this.camera.close('ellipse', animTime, this.link.position, function() {
                        self._dogotoMap(exit, vec);
                    });

                case 'fade':
                default:
                    fade = this.camera.fade(0x000000, animTime, 1, function() {
                        self._dogotoMap(exit, vec, function() {
                            self.camera.flash(0x000000, animTime);
                            fade.stop();
                        });

                        //do not remove fade when done
                        return false;
                    });
                    break;
            }
        },
        _dogotoMap: function(exit, vec, cb) {
            var self = this;

            //remove the player so he can be added to proper map
            if(this.link.parent)
                this.link.parent.removeChild(this.link);

            if(this.map) {
                this._saveZoneState(this.activeLayer);
                this.map.visible = false;
                this.map.despawnObjects();
                this.map.clearTiles();

                //this.world.removeChild(this.map);
            }

            //need to load the map
            if(!self.maps[exit.name]) {
                //load the map's resources
                resources[exit.name](this.game);
                this.loading.show();
                this.game.load.once('complete', function() {
                    self.maps[exit.name] = self.world.add.tilemap(exit.name, true);
                    self._dogotoMapLoaded(exit, vec, cb);
                    self.loading.hide();
                });
                this.game.load.start();
            } else {
                this._dogotoMapLoaded(exit, vec, cb);
            }
        },
        _dogotoMapLoaded: function(exit, vec, cb) {
            var self = this;

            this.firstZone = true;

            this.physics.nextTick(function() {
                self.physics.skip(2);

                //load the new world into the game
                /*if(!self.maps[exit.name]) {
                    self.maps[exit.name] = self.world.add.tilemap(exit.name, true);
                } else {
                    self.world.add.obj(self.maps[exit.name]);
                }*/

                self.map = self.maps[exit.name];
                self.map.visible = true;

                var player = self.map.findLayer('player');
                if(player)
                    player.addChild(self.link);
                else
                    self.map.addChild(self.link);

                self.lastExit = exit;

                //spawn exits & zones
                self.map.findLayer('exits').spawn();
                self.map.findLayer('zones').spawn();

                //set link position
                self.link.setPosition(
                    exit.properties.loc[0],
                    exit.properties.loc[1]
                );
                //self.camera.follow(self.link, gf.CAMERA_FOLLOW.LOCKON);

                //god this is dirty, but basically we give it a few frames to fix the camera onto
                //link for the new zone he is in, in the new world.
                self.game.once('tick', function() {
                    self.game.once('tick', function() {
                        self.game.once('tick', function() {
                            self.map.render();
                            if(cb) cb();
                        });
                    });
                });
            });
        },
        showMapOverlay: function() {
            var o = this.map.properties.overlay;

            if(!o) {
                this.overlay.stop().hide();
                return;
            }

            if(!this.overlay) {
                var spr = this.game.cache.getTextures('sprite_overlay');
                this.overlay = new gf.Sprite({
                    rain: {
                        frames: [spr['rain1.png'], spr['rain2.png'], spr['rain3.png']],
                        loop: true,
                        speed: 0.5
                    }
                });
            }

            this.overlay.goto(0, o).play();
        },
        gotoZone: function(zone, vec) {
            if(zone === this.activeZone)
                return;

            //save old actives
            this.oldZone = this.activeZone;
            this.oldLayer = this.activeLayer;
            this.oldLayerOverlay = this.activeLayerOverlay;

            //assign new actives
            this.activeZone = zone;
            this.activeLayer = this.map.findLayer(zone.name);
            this.activeLayerOverlay = this.map.findLayer(zone.name + '_overlay');

            //spawn layer objects
            this.activeLayer.spawn();

            //show overlay for layer or map
            if(this.activeLayerOverlay) {
                this.overlay.stop().hide();
                this.activeLayerOverlay.spawn();
            } else {
                this.showMapOverlay();
            }

            //load saved layer info
            var zsv = new ZoneSave(this.lastLoad.slot, this.activeLayer, this.lastExit.name);
            zsv.load();

            this.camera.unfollow();
            this.camera.unconstrain();
            if(!this.firstZone) {
                this._zoneTransition(zone, vec);
            } else {
                this._zoneReady();
            }
        },
        _zoneTransition: function(zone, vec) {
            var p = vec.x ? 'x' : 'y',
                last = 0,
                obj = { v: 0 },
                space = 24,
                animTime = 500,
                zone = this.activeZone,
                self = this;

            this.link.lock();

            switch(zone.properties.transition || this.oldZone.properties.transition) {
                case 'fade':
                    this.camera.fade(0x000000, animTime, 1, function() {
                        //pan camera
                        self.camera.pan(
                            (self.camera.size.x + space) * vec.x,
                            (self.camera.size.y + space) * vec.y
                        );
                        //set link position
                        self.link.position[p] += space * vec[p];
                        self.link.setPosition(
                            self.link.position.x,
                            self.link.position.y
                        );

                        //zone ready
                        self._zoneReady();
                    });
                    break;

                case 'none':
                    //pan camera
                    self.camera.pan(
                        (self.camera.size.x + space) * vec.x,
                        (self.camera.size.y + space) * vec.y
                    );
                    //set link position
                    self.link.position[p] += space * vec[p];
                    self.link.setPosition(
                        self.link.position.x,
                        self.link.position.y
                    );

                    //zone ready
                    self._zoneReady();
                    break;

                case 'slide':
                default:
                    TweenLite.to(obj, animTime / 1000, {
                        v: this.camera.size[p] + space,
                        ease: Linear.easeNone,
                        onUpdate: function() {
                            var n = obj.v - last;

                            self.camera.pan(
                                n * vec.x,
                                n * vec.y
                            );

                            self.link.position[p] += (n / (self.camera.size[p] + space)) * space * vec[p];
                            self.link.setPosition(
                                self.link.position.x,
                                self.link.position.y
                            );

                            last = obj.v;
                        },
                        onComplete: this._zoneReady.bind(this)
                    });
                    break;
            }
        },
        _zoneReady: function() {
            if(this.oldLayer) {
                this._saveZoneState(this.oldLayer);
                this.oldLayer.despawn();
                if(this.oldLayerOverlay)
                    this.oldLayerOverlay.despawn();
            }

            var zone = this.activeZone,
                scale = 3;

            this.firstZone = false;

            //set camera bounds
            if(!zone.bounds) {
                zone.bounds = zone.hitArea.clone();
                zone.bounds.x += zone.position.x;
                zone.bounds.y += zone.position.y;

                if(zone.bounds._shapetype = gf.SHAPE.RECTANGLE) {
                    zone.bounds.x *= scale;
                    zone.bounds.y *= scale;
                    zone.bounds.width *= scale;
                    zone.bounds.height *= scale;
                } else {
                    zone.bounds.scale.set(scale, scale);
                    zone.bounds.recalc();
                }
            }

            this.camera.constrain(zone.bounds.clone());
            this.camera.follow(this.link, gf.CAMERA_FOLLOW.LOCKON);
            this.camera.pan(1, 1);

            //play zone music, or the map music if there is no zone music
            this.setMusic(zone.properties.music || this.map.properties.music);

            this.link.unlock();
        },
        setMusic: function(key) {
            //no key or already playing
            if(!key || (this.music && this.music.key === key))
                return;

            //stop current music
            if(this.music)
                this.music.stop();

            //load new music
            this.music = this.audio.add(key, { volume: C.MUSIC_VOLUME, loop: true });

            //warn if we didn't load it
            if(!this.music)
                gf.utils.warn('Music not loaded! "' + zone.properties.music + '"');
            //play if we did
            else
                this.music.play();
        },
        createLink: function(saveData) {
            if(this.link)
                return this.link;

            var l = new Link(this.game.cache.getTextures('sprite_link')),
                self = this;

            l.hitArea = new gf.Polygon(0, 0, [
                7,8, //x,y relative to links top-left
                9,8,
                16,14,
                16,16,
                9,22,
                7,22,
                0,16,
                0,14
            ]);
            l.mass = 1;
            l.inertia = Infinity;
            l.friction = 0;

            l.anchor.x = 0;
            l.anchor.y = 1;

            l.enablePhysics(this.physics, function() {
                l.addAttackSensor(this);
            });

            l.on('updateHud', function() {
                self.hud.updateValues(l);
                self.inventory.updateValues(l);
            });

            l.on('zone', function(obj, vec) {
                self.gotoZone(obj, vec);
            });

            l.on('exit', function(obj, vec) {
                self.gotoMap(obj, vec);
            });

            l.on('readSign', function(sign) {
                self.showDialog(sign.properties.text);
            });

            return l;
        },
        bindInput: function() {
            //bind the keyboard
            this.game.input.keyboard.on(gf.Keyboard.KEY.W, this._boundMoveUp = this.onMove.bind(this, 'up'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.S, this._boundMoveDown = this.onMove.bind(this, 'down'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.A, this._boundMoveLeft = this.onMove.bind(this, 'left'));
            this.game.input.keyboard.on(gf.Keyboard.KEY.D, this._boundMoveRight = this.onMove.bind(this, 'right'));

            this.game.input.keyboard.on(gf.Keyboard.KEY.E, this._boundUse = this.onUse.bind(this));
            this.game.input.keyboard.on(gf.Keyboard.KEY.V, this._boundUseItem = this.onUseItem.bind(this));
            this.game.input.keyboard.on(gf.Keyboard.KEY.SPACE, this._boundAttack = this.onAttack.bind(this));

            //bind the gamepad
            this.game.input.gamepad.sticks.on(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_HOR, this._boundGpMoveHor = this.onGpMove.bind(this));
            this.game.input.gamepad.sticks.on(gf.GamepadSticks.AXIS.LEFT_ANALOGUE_VERT,  this._boundGpMoveVert = this.onGpMove.bind(this));
            this.game.input.gamepad.sticks.threshold = 0.35;

            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_TOP, this._boundGpMoveUp = this.onMove.bind(this, 'up'));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_BOTTOM, this._boundGpMoveDown = this.onMove.bind(this, 'down'));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_LEFT, this._boundGpMoveLeft = this.onMove.bind(this, 'left'));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.PAD_RIGHT, this._boundGpMoveRight = this.onMove.bind(this, 'right'));

            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_1, this._boundGpUse = this.onUse.bind(this));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_2, this._boundGpAttack = this.onAttack.bind(this));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_4, this._boundGpUseItem = this.onUseItem.bind(this));

            this.game.input.keyboard.on(gf.Keyboard.KEY.SHIFT, this._boundROCKET = this.onROCKET.bind(this));
            this.game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.LEFT_TRIGGER, this._boundGpROCKET = this.onROCKET.bind(this));
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
        },
        onROCKET: function(status) {
            if(status.down) {
                this.link.moveSpeed = 400;
            } else {
                this.link.moveSpeed = 87;
            }

            this.link._checkMovement();
        }
    });

    return Play;
});