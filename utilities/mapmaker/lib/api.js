var path = require('path'),
    fs = require('fs'),
    async = require('async'),
    sio = require('socket.io'),
    MapMaker = require('./mapmaker').MapMaker,
    express = require('express');

var Api = exports.Api = function(conf) {
    conf = conf || path.join(__dirname, '..', 'config.json');

    this.temp = path.join(__dirname, '..', 'public', 'temp');

    this.config = require(conf);

    this.app = express();
};

Api.prototype.start = function() {
    if(!this.server) {
        this.server = this.app.listen(this.config.server.port, this.config.server.host);
        this.io = sio.listen(this.server);
        console.log('Listening on', this.config.server.host + ':' + this.config.server.port)

        this._configure();
        this._setupRoutes();
    }
};

Api.prototype.createMaps = function(file, tilesize, sheetsize, cb) {
    if(typeof tilesize == 'function') {
        cb = tilesize;
        tilesize = 16;
    }

    if(typeof sheetsize == 'function') {
        cb = sheetsize;
        sheetsize = 1024;
    }

    tilesize = tilesize || 16;
    sheetsize = sheetsize || 1024;

    if(typeof tilesize == 'string') tilesize = parseInt(tilesize, 10);
    if(typeof sheetsize == 'string') sheetsize = parseInt(sheetsize, 10);

    var self = this;

    console.log('Generating maps...');
    fs.readFile(file, function(err, data) {
        if(err) {
            console.log('Read Error:', err);
            if(cb) cb(err);
            return;
        }

        var maker = new MapMaker(),
            canvases,
            fns = [],
            base = path.basename(file).replace(path.extname(file), ''),
            progress = 0;

        maker.on('progress', function(total) {
            progress++;

            //self.io.sockets.in(base).emit('progress', { complete: progress, total: total });
        });

        maker.setSpriteSheetSize(sheetsize);
        maker.parseMap(data, tilesize, function(err, canvases) {
            ['tilemap', 'tileset'].forEach(function(s) {
                fns.push(function(_cb) {
                    var p = path.join(self.temp, base + '-' + s + '.png'),
                        outStream = fs.createWriteStream(p),
                        pngStream = canvases[s].createPNGStream();

                    pngStream.pipe(outStream);
                    pngStream.on('end', function() {
                        _cb(null, p)
                    });
                    pngStream.on('error', function(err) {
                        _cb(err);
                    });
                });
            });

            async.parallel(fns, function(err, paths) {
                console.log('Done!');
                if(cb) cb(err, paths, canvases);
            });
        });
    });
};

Api.prototype._configure = function() {
    this.app.use(express.static('public'));
    this.app.use(express.bodyParser({ keepExtensions: true, uploadDir: this.temp }));
    this.io.set('log level', this.config.sioLogLevel);
};

Api.prototype._setupRoutes = function() {
    var self = this;

    self.app.post('/makemap/:tilesize?/:sheetsize?/:socketId?', function(req, res) {
        if(!req.files.map) {
            res.send(400);
        } else {
            var id = path.basename(req.files.map.path).replace(path.extname(req.files.map.path), '');
            
            if(req.params.socketId) {
                var rooms = self.io.sockets.manager.roomClients[req.params.socketId];

                for(var r in rooms) {
                    if(r) self.io.sockets.socket(req.params.socketId).leave(r);
                }

                self.io.sockets.socket(req.params.socketId).join(id);
            }

            res.send(id);

            self.createMaps(req.files.map.path, req.params.tilesize, req.params.sheetsize, function(err, paths) {
                self.io.sockets.in(id).emit('complete', {
                    //urls for the generated files
                    tilemap: '/temp/' + path.basename(paths[0]),
                    tileset: '/temp/' + path.basename(paths[1])
                });
            });
        }
    });

    self.app.post('/uploadmaps', function(req, res) {
        if(!req.files.upTilemap || !req.files.upTileset) {
            res.send(400);
        } else {
            res.json({
                tilemap: '/temp/' + path.basename(req.files.upTilemap.path),
                tileset: '/temp/' + path.basename(req.files.upTileset.path)
            });
        }
    });

    self.io.sockets.on('connection', function(socket) {
        socket.emit('id', socket.id);
        socket.on('subscribe', function(data) { socket.join(data); });
        socket.on('unsubscribe', function(data) { socket.leave(data); });
    });
};