define([
    'game/lib/bases/Emitter'
], function(Emitter) {
    var AssetLoader = Emitter.extend({
        init: function(types) {
            this.types = types;
        },
        loadResources: function(resources, cb) {
            var self = this,
                loaded = 0;

            resources.forEach(function(rsrc) {
                self.loadResource(rsrc, function(err, data) {
                    if(!err)
                        rsrc.data = data;
                    else
                        rsrc.data = null;

                    loaded++;
                    if(loaded === resources.length)
                        completed();
                });
            });

            function completed() {
                //all of the loaders finished
                var ret = {};

                for(var r in resources) {
                    ret[resources[r].name] = resources[r].data;
                }

                self.emit('complete', ret);
                if(cb) cb(ret);
            };
        },
        loadResource: function(resource, cb) {
            //massage type into the class name
            var self = this,
                type = resource.type[0].toUpperCase() + resource.type.substring(1);

            //special case
            if(type == 'Model') type = 'JSON';

            //console.log(type);
            //if loader exists in THREE then use it
            if(THREE[type + 'Loader']) {
                //load the resource
                var loader = new THREE[type + 'Loader']();

                loader.addEventListener('error', function(msg) {
                    if(cb) cb(msg);
                });

                loader.addEventListener('load', function(evt) {
                    if(cb) cb(null, evt.content);
                });

                loader.load(resource.src);
            }
            //otherwise manually load
            else {
                $.ajax({
                    url: resource.src,
                    context: this,
                    dataType: resource.type,
                    type: 'GET',
                    error: function(jqXHR, textStatus, errorThrown) {
                        if(cb) cb(errorThrown || textStatus);
                    },
                    success: function(data, textStatus, jqXHR) {
                        if(data && typeof data == 'object') {
                            data.type = this.types[data.type];
                        }

                        if(cb) cb(null, data);
                    }/*,
                    progress: function(e) {
                        //make sure we can compute the length usually
                        //this is false if Content-Length isn't set
                        if(e.lengthComputable) {
                            //calculate the percentage loaded
                            var pct = (e.loaded / e.total) * 100;

                            this.emit('progress', pct);
                        }
                    },
                    complete: function(jqXHR, textStatus) {}*/
                });
            }
        }
    });

    return AssetLoader;
});