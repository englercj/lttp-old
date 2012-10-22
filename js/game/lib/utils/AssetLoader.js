define([], function() {
    var AssetLoader = Class.extend({
        init: function() {

        },
        loadResources: function(resources, opts, cb) {
            var self = this,
                monitor = new THREE.LoadingMonitor();

            if(typeof opts == 'function') {
                cb = opts;
                opts = {}
            }

            opts = opts || {};

            monitor.addEventListener('progress', function(loaded, total) {
                //one of the loaders finished
                if(opts.progress && typeof opts.progress == 'function')
                    opts.progress(loaded, total);
            });

            monitor.addEventListener('load', function() {
                //all of the loaders finished
                var ret = {};

                for(var r in resources) {
                    ret[resources[r].name] = resources[r].data;
                }

                if(cb && typeof cb == 'function')
                    cb(ret);
            });

            resources.forEach(function(rsrc) {
                var ldr = self.loadResource(rsrc, opts);

                if(ldr) monitor.add(ldr);
            });
        },
        loadResource: function(resource, opts, cb) {
            //try to guess type
            if(!resource.type) {
                if(resource.src.match(/(\.png|\.jpe?g|\.gif|\.bmp)$/) !== null)
                    resource.type = 'image';
                else if(resource.src.match(/(\.jso?n)$/))
                    resource.type = 'json';
                else if(resource.src.match(/(\.bin)$/))
                    resource.type = 'binary';
                else if(resource.src.match(/(\.scene)$/))
                    resource.type = 'scene';
                else if(resource.src.match(/(\.geo(metry)?)$/))
                    resource.type = 'geometry';
                else if(resource.src.match(/(\.tex(ture)?)$/))
                    resource.type = 'texture';
            }

            //massage type into the class name
            resource.type = resource.type[0].toUpperCase() + resource.type.substring(1);
            if(resource.type == 'Json')
                resource.type = 'JSON';

            //if loader doesn't exist then exit out
            if(!THREE[resource.type + 'Loader'] && cb)
                cb(null);

            //load the resource
            var loader = new THREE[resource.type + 'Loader']();
            loader.addEventListener('load', function(evt) {
                resource.data = evt.content;
                if(cb) cb(resource);
            });
            loader.load(resource.src);

            return loader;
        }
    });

    return AssetLoader;
});