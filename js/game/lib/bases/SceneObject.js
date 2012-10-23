define([
    'game/lib/bases/Emitter'
], function(Emitter) {
    var SceneObject = Emitter.extend({
        init: function() {},
        addToScene: function(scene) {
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
        }
    });

    return SceneObject;
});