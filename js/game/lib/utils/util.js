var util = {
    //utility to ensure an object is wrapped by jQuery
    jquerify: function(obj) {
        if(!obj.jquery)
            return $(obj);
        else
            return obj;
    },
    //Simple Point in Polygon test, casts a ray and counts the hits to determine if
    //a point is within a polygon specified by the vertices
    pointInPoly: function(vertices, point) {
        var x = 0, y = 1, c = false, len = vertices.length;

        if(point instanceof THREE.Vector2)
            point = [point.x, point.y];

        for(var i = 0, j = len - 1; i < len; j = i++) {
            if( ((vertices[i][y] > point[y]) != (vertices[j][y] > point[y])) &&
                (point[x] < (vertices[j][x] - vertices[i][x]) * (point[y] - vertices[i][y]) / (vertices[j][y] - vertices[i][y]) + vertices[i][x]) )
            {
                c = !c;
            }
        }

        return c;
    },
    //walks down an object using a dot-notation string and sets the value at that point
    //if parts of the dot-notation string are missing, it creates them.
    setObjectProperty: function(obj, prop, value) {
        var props = prop.split('.'),
            o = obj;

        for(var p = 0, pl = props.length - 1; p < pl; ++p) {
            if(o[props[p]] == undefined)
                o[props[p]] = {};

            o = o[props[p]];
        }

        return o[props[props.length - 1]] = value;
    },
    //walks down an object using a dot-notation string and returns the value at that property
    getObjectProperty: function(obj, prop) {
        var props = prop.split('.'),
            o = obj;

        for(var p = 0, pl = props.length; p < pl; ++p) {
            o = o[props[p]];
        }

        return o;
    },
    _isLittleEndian: null,
    isLittleEndian: function(imageData) {
        if(util._isLittleEndian !== null) return util._isLittleEndian;

        util._isLittleEndian = true;
        //determine whether Uint32 is little- or big-endian.
        imageData.data32[1] = 0x0a0b0c0d;

        if (imageData.buffer[4] === 0x0a && imageData.buffer[5] === 0x0b &&
            imageData.buffer[6] === 0x0c && imageData.buffer[7] === 0x0d)
        {
            util._isLittleEndian = false;
        }

        return util._isLittleEndian;
    },
    getImageData: function(image) {
        var canvas = document.createElement('canvas'),
            ctx, data;

        //setup width
        canvas.width = image.width;
        canvas.height = image.height;

        //get context
        ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        //get the data
        data = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //try to return typed array
        /*if(window.ArrayBuffer && window.Uint8ClampedArray && window.Uint32Array) {
            var buf = new ArrayBuffer(data.data.length),
                buf8 = new Uint8ClampedArray(buf),
                array = new Uint32Array(buf);

            return { imageData: data, buffer: buf, buffer8: buf8, data32: array };
        }*/
        
        //console.warn('Typed arrays not supported!');
        return data;
    },
    getImagePixel: function(imageData, x, y) {
        var rgba;

        //not typed array
        if(imageData.data) {
            var index = (y * imageData.width + x) * 4;

            rgba = {
                red: imageData.data[index],
                green: imageData.data[index + 1],
                blue: imageData.data[index + 2],
                alpha: imageData.data[index + 3]
            };
        }
        //typed arrays supported
        /*else {
            var px = imageData.data32[y * imageData.imageData.width + x],
                isLittleEndian = true,
                shifts = [0, 8, 16, 24]; //little Endian shifts for red, green, blue, alpha

            //if this is big endian, reverse our shifts
            if(!util.isLittleEndian(imageData)) shifts.reverse();

            rgba = {
                red: (px & (255 << shifts[0])) >> shifts[0],
                green: (px & (255 << shifts[1])) >> shifts[1],
                blue: (px & (255 << shifts[2])) >> shifts[2],
                alpha: (px & (255 << shifts[3])) >> shifts[3]
            };
        }*/

        return rgba;
    },
    setImagePixel: function(imageData, x, y, rgba) {
        //no typed array support
        if(imageData.data) {
            var index = (y * tilemapData.width + x) * 4;

            tilemapData.data[index] = pixel.red;
            tilemapData.data[index + 1] = pixel.green;
            tilemapData.data[index + 2] = pixel.blue;
            tilemapData.data[index + 3] = pixel.alpha;
        }
        //typed arrays supported
        /*else {
            var isLittleEndian = true,
                shifts = [0, 8, 16, 24]; //little Endian shifts for red, green, blue, alpha

            //if this is big endian, reverse our shifts
            if(!util.isLittleEndian(imageData)) shifts.reverse();

            imageData.data32[y * imageData.width + x] =
                (rgba.red   << shifts[0]) |
                (rgba.green << shifts[1]) |
                (rgba.blue  << shifts[2]) |
                (rgba.alpha << shifts[3]);

            imageData.imageData.data.set(imageData.buffer8);
        }*/
    },
    rgbaToHex: function(rgba) {
        return ((rgba.red << 32) | (rgba.green << 16) | (rgba.blue << 8) | (rgba.alpha)).toString(16);
    }
};

define(util);