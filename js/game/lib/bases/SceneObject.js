define([
    'game/lib/bases/Emitter'
], function(Emitter) {
    var SceneObject = Emitter.extend({
        init: function(engine) {
            //setup the emitter
            this._super({ wildcard: true, delimiter: '::', maxListeners: 10 });

            this.engine = engine;
            this.animationQueue = [];
        },
        addToScene: function(scene) {
            this.scene = scene;
            scene.add(this._mesh);
        },
        setPosition: function(x, y, z) {
            var zi = (z !== undefined ? z : (this.zindex ? this.zindex : 0));

            if(x instanceof THREE.Vector2)
                this._mesh.position.set(x.x, x.y, zi);
            else if(x instanceof THREE.Vector3)
                this._mesh.position.set(x.x, x.y, x.z);
            else
                this._mesh.position.set(x, y, zi);
        },
        update: function(delta) {
            //go backwards so we can splice off things without destroying the array iteration
            for(var i = this.animationQueue.length - 1; i >= 0 && this.animationQueue.length; --i) {
                var item = this.animationQueue[i], ms = delta * 1000;

                item.ms += ms;
                item.part = ms / item.duration;

                //custom animation function
                if(item.step && typeof item.step == 'function') {
                    item.step(item);
                }

                //do property animation
                for(var p in item.properties) {
                    var op = item.properties[p].match(/^(.=)[ ]*(\-?[\d]+)$/),
                        val = util.getObjectProperty(item.object, p);

                    if(op === null && !item.notified) {
                        item.notified = true;
                        console.error('Unable to determine operation for animation of property', p, item.properties);
                    } else {
                        switch(op[1]) {
                            case '+=': val += item.part * parseInt(op[2], 10); break;
                            case '-=': val -= item.part * parseInt(op[2], 10); break;
                            case '*=': val *= item.part * parseInt(op[2], 10); break;
                            case '/=': val /= item.part * parseInt(op[2], 10); break;
                        }

                        util.setObjectProperty(item.object, p, val);
                    }
                }

                //complete the animation
                if(item.ms >= item.duration) {
                    if(item.complete && typeof item.complete == 'function') {
                        item.complete(item);
                    }

                    this.animationQueue.splice(i, 1);
                }
            }
        },
        //object to aniamte, properties to animate, duration of animation, completed callback
        animate: function(obj, opts) {
            this.animationQueue.push({
                object: obj,
                properties: opts.props,
                duration: opts.duration,
                step: opts.step,
                complete: opts.complete,
                ms: 0
            });
        }
    });

    return SceneObject;
});