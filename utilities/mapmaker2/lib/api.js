var path = require('path'),
    fs = require('fs'),
    async = require('async'),
    //sio = require('socket.io'),
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
        //this.io = sio.listen(this.server);

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

    var self = this;

    console.log('Generating maps...');
    fs.readFile(file, function(err, data) {
        if(err) {
            console.log(err);
            if(cb) cb(err);
            return;
        }

        var maker = new MapMaker(),
            canvases,
            fns = [],
            base = path.basename(file).replace(path.extname(file), '');

        maker.setSpriteSheetSize(sheetsize);
        canvases = maker.parseMap(data, tilesize);

        ['-tilemap.png', '-tileset.png'].forEach(function(s) {
            fns.push(function(_cb) {
                var p = path.join(self.temp, base + s),
                    outStream = fs.createWriteStream(p),
                    pngStream = canvases.tilemap.pngStream();

                pngStream.pipe(outStream);
                pngStream.on('end', function() {
                    _cb(null, p)
                });
            });
        });

        async.parallel(fns, function(err, paths) {
            console.log('Done!');
            if(cb) cb(err);
        });
    });
};

Api.prototype._configure = function() {
    this.app.use(express.static('public'));
    this.app.use(express.bodyParser({ keepExtensions: true, uploadDir: this.temp }));
    //this.io.set('log level', this.config.sioLogLevel);
};

Api.prototype._setupRoutes = function() {
    var self = this;

    self.app.post('/makemap/:tilesize?/:sheetsize?', function(req, res) {
        if(!req.files.map) {
            res.send(400);
        } else {
            self.createMaps(req.files.map.path, req.params.tilesize, req.params.sheetsize, function(err) {
                res.json({
                    //urls for the generated files
                    tilemap: '/temp/' + path.basename(req.files.map.path) + '-tilemap.png',
                    tileset: '/temp/' + path.basename(req.files.map.path) + '-tileset.png'
                });
            });
        }
    });
};