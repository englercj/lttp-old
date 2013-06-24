define([
    'game/data/types'
], function(types) {
    var LttpEntity = function(game, pos, settings) {
        //can be lifted by another entity
        this.liftable = false;

        //can be effected by bombs
        this.explodable = true;

        //is cutable by a sword
        this.cutable = false;

        //is this sprite attacking?
        this.attacking = false;

        //is this sprite able to move?
        this.freeze = false;

        //will break the sprint of an entity that hits this one
        this.breakSprint = false;

        //maximum health of this entity
        this.maxHealth = 3;

        //current health of this entity
        this.health = 3;

        //maximum maxMagic of this entity
        this.maxMagic = 10;

        //current magic of this entity
        this.magic = 10;

        //current inventory of the entity
        this.inventory = {};

        //loot of the entity that is dropped when it dies
        this.loot = [];

        //speed the ent moves at
        this.speed = 50;

        gf.Entity.call(this, game, pos, settings);
    };

    gf.inherits(LttpEntity, gf.Entity, {
        _addDirectionalFrames: function(type, num, speed) {
            this._addFrames([
                type + '_left',
                type + '_right',
                type + '_down',
                type + '_up'
            ], num, speed);
        },
        _addFrames: function(types, num, speed) {
            if(!(types instanceof Array))
                types = [types];

            for(var t = 0, tl = types.length; t < tl; ++t) {
                var frames = [],
                    type = types[t];

                for(var f = 1; f <= num; ++f) {
                    frames.push(type + '/' + type + '_' + f + '.png');
                }
                this.addAnimation(type, frames, speed);
            }
        }
    });

    var Enemy = function(game, pos, settings) {
        settings = settings || {};

        //enemy type
        settings.type = gf.Entity.TYPE.ENEMY;

        LttpEntity.call(this, game, pos, settings);
    };

    gf.inherits(Enemy, LttpEntity);

    var Link = function(game, pos, settings) {
        settings = settings || {};

        //player type
        settings.type = gf.Entity.TYPE.PLAYER;

        //set name of Link
        settings.name = 'link';

        //size
        settings.width = 16;
        settings.height = 22;

        LttpEntity.call(this, game, pos, settings);

        this.bindKeys();
        this.bindGamepad();
        this.addAnimations();

        //make the camera track this entity
        window.link = this;
    };

    gf.inherits(Link, LttpEntity, {
        onWalk: function(dir, action, kpress) {
            if(this.freeze) return;

            var p = (dir === 'left' || dir === 'right' ? 'x' : 'y'),
                amt = (dir === 'right' || dir === 'down' ? this.speed : -this.speed),
                vec = new gf.Vector();

            if(kpress) {
                this.setActiveAnimation('walk_shield_' + dir, true);
                vec[p] = amt;
            } else {
                this.setActiveAnimation('idle_' + dir);
                vec[p] = 0;

                //this fixes an issue if you hold more than one at once and release one
                if(this.game.input.isActionActive('walk_left')) 
                    this.setActiveAnimation('walk_shield_left', true);
                else if(this.game.input.isActionActive('walk_right'))
                    this.setActiveAnimation('walk_shield_right', true);
                else if(this.game.input.isActionActive('walk_down'))
                    this.setActiveAnimation('walk_shield_down', true);
                else if(this.game.input.isActionActive('walk_up'))
                    this.setActiveAnimation('walk_shield_up', true);
            }

            this.setVelocity(vec);
        },
        bindKeys: function() {
            //bind the keyboard
            this.game.input.keyboard.bind(gf.input.KEY.W, 'walk_up', this.onWalk.bind(this, 'up'));
            this.game.input.keyboard.bind(gf.input.KEY.A, 'walk_left', this.onWalk.bind(this, 'left'));
            this.game.input.keyboard.bind(gf.input.KEY.S, 'walk_down', this.onWalk.bind(this, 'down'));
            this.game.input.keyboard.bind(gf.input.KEY.D, 'walk_right', this.onWalk.bind(this, 'right'));

            this.game.input.keyboard.bind(gf.input.KEY.E, 'use_item', this.onUseItem.bind(this));
            this.game.input.keyboard.bind(gf.input.KEY.SPACE, 'attack', this.onAttack.bind(this));
        },
        bindGamepad: function() {
            //bind the gamepad
            this.game.input.gamepad.bindStick(gf.input.GP_AXIS.LEFT_ANALOGUE_HOR, true, 'walk_left', this.onWalk.bind(this, 'left'));
            this.game.input.gamepad.bindStick(gf.input.GP_AXIS.LEFT_ANALOGUE_HOR, false, 'walk_right', this.onWalk.bind(this, 'right'));
            this.game.input.gamepad.bindStick(gf.input.GP_AXIS.LEFT_ANALOGUE_VERT, true, 'walk_up', this.onWalk.bind(this, 'up'));
            this.game.input.gamepad.bindStick(gf.input.GP_AXIS.LEFT_ANALOGUE_VERT, false, 'walk_down', this.onWalk.bind(this, 'down'));

            this.game.input.gamepad.bindButton(gf.input.GP_BUTTON.FACE_1, 'use_item', this.onUseItem.bind(this));
            this.game.input.gamepad.bindButton(gf.input.GP_BUTTON.FACE_2, 'attack', this.onAttack.bind(this));
        },
        addAnimations: function() {
            //add walking animations
            this._addDirectionalFrames('walk', 8, 0.23);

            //add idle animations
            this.addAnimation('idle_left', ['walk_shield_left/walk_shield_left_1.png']);
            this.addAnimation('idle_right', ['walk_shield_right/walk_shield_right_1.png']);
            this.addAnimation('idle_down', ['walk_shield_down/walk_shield_down_1.png']);
            this.addAnimation('idle_up', ['walk_shield_up/walk_shield_up_1.png']);
            //this._addDirectionalFrames('idle', 1);

            //add attack animations
            this._addDirectionalFrames('attack', 9, 0.6);

            //add bow attack animations
            this._addDirectionalFrames('attack_bow', 3, 0.23);

            //add spin attack animations
            this._addDirectionalFrames('attack_spin', 12, 0.23);

            //add attack tap animations
            this._addDirectionalFrames('attack_tap', 3, 0.23);

            //add fall in hole animations
            this._addFrames('fall_in_hole', 4, 0.23);

            //add lifting animations
            this._addDirectionalFrames('lift', 4, 0.23);

            //add lifting walking animations
            this._addFrames(['lift_walk_left', 'lift_walk_right'], 3, 0.23);
            this._addFrames(['lift_walk_down', 'lift_walk_up'], 6, 0.23);

            //add pulling animations
            this._addDirectionalFrames('pull', 5, 0.23);

            //add walking-attacking animations
            this._addFrames(['walk_attack_left', 'walk_attack_right'], 3, 0.23);
            this._addFrames(['walk_attack_down', 'walk_attack_up'], 6, 0.23);

            //add walking with shield animations
            this._addDirectionalFrames('walk_shield', 8, 0.23);

            //set active
            this.setActiveAnimation('idle_down');
        },
        //on collision
        onCollision: function(ent) {
            //console.log('Colliding with', ent);
        },
        //use equipted item
        onUseItem: function() {},
        //when attack key is pressed
        onAttack: function(action, kpress) {
            if(!kpress || this.currentAnim.name.indexOf('attack') !== -1)
                return;

            var name = this.currentAnim.name,
                oldVel = this.velocity.clone(),
                dir = name.split('_').pop(),
                self = this;

            this.velocity.set(0, 0);
            this.freeze = true;
            this.attacking = true;

            this.setActiveAnimation('attack_' + dir, function() {
                self.setActiveAnimation(name);
                self.velocity.copy(oldVel);
                self.freeze = false;
            });
        }
    });

    return {
        LttpEntity: LttpEntity,
        Enemy: Enemy,
        Link: Link
    };
});
