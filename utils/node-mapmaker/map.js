var MapMaker = require('./mapmaker.js').MapMaker,
    argv = require('optimist').usage('Usage: $0 <map-file> [sprite-sheet-size] [tilesize]').argv,
    path = require('path'),
    fs = require('fs');

var maker = new MapMaker(),
    sheetSize = argv.s || argv._[1] || 1024,
    tileSize = argv.t || argv._[2] || 16;

maker.setSpriteSheetSize(sheetSize);

fs.readFile(path.resolve(argv._[0]), function(err, data) {
    if(err) {
        console.log(err);
        process.exit(1);
        return;
    }

    var parsed = maker.parseMap(data, tileSize);

    fs.writeFile('map-tilemap.png', parsed.tilemap);
    fs.writeFile('map-tileset.png', parsed.tileset);
});