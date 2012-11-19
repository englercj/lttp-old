//adapted from (https://github.com/cloudhead/eyes.js/blob/master/lib/eyes.js)
(function($, window, undefined) {
    var stack = [],
        classes = {
            //label: 'label', // Inspection labels, like 'array' in `array: [1, 2, 3]`
            //other: 'inverted', // Objects which don't have a literal representation, such as functions
            key: 'key', // The keys in object literals, like 'a' in `{a: 1}`
            special: 'null', // null, undefined...
            string: 'string',
            number: 'number',
            bool: 'bool', // true false
            regexp: 'regex', // /\d+/
            func: 'function',
            dt: 'date'
        },
        options = {
            pretty: true,
            hideFunctions: false,
            showHidden: false,
            maxLength: 2048
        };

    var stringify = window.pretify = function(obj) {
        var index, result;

        if((index = stack.indexOf(obj)) !== -1) {
            return new Array(stack.length - index + 1).join('.');
        }
        stack.push(obj);

        result = (function(obj) {
            switch(typeOf(obj)) {
                case "string" :
                    obj = stringifyString('"' + obj + '"');
                    return stylize(obj, 'string');

                case "regexp" : return stylize('/' + obj.source + '/', 'regexp');
                case "number" : return stylize(obj + '', 'number');
                case "function" : return stylize('[Function]', 'func');
                case "null" : return stylize('null', 'special');
                case "undefined": return stylize('undefined', 'special');
                case "boolean" : return stylize(obj + '', 'bool');
                case "date" : return stylize(obj.toUTCString(), 'dt');
                case "array" : return stringifyArray(obj, options, stack.length);
                case "object" : return stringifyObject(obj, options, stack.length);
            }
        })(obj);

        stack.pop();
        return result;
    }

    function stylize(str, type) {
        if(type && classes[type]) {
            return '<span class="' + classes[type] + '">' + str + '</span>';
        }

        return str;
    }

    // Escape invisible characters in a string
    function stringifyString (str, options) {
        return str.replace(/\\/g, '\\\\')
                  .replace(/\n/g, '\\n')
                  .replace(/[\u0001-\u001F]/g, function (match) {
                      return '\\0' + match[0].charCodeAt(0).toString(8);
                  });
    }

    // Convert an array to a string, such as [1, 2, 3].
    // This function calls stringify() for each of the elements
    // in the array.
    function stringifyArray(ary, options, level) {
        var out = [];
        var pretty = options.pretty && (ary.length > Infinity || ary.some(function (o) {
            return (o !== null && typeof(o) === 'object' && Object.keys(o).length > 0) ||
                   (Array.isArray(o) && o.length > 0);
        }));
        var ws = pretty ? '\n' + new(Array)(level * 4 + 1).join(' ') : '';

        for (var i = 0; i < ary.length; i++) {
            out.push(stringify(ary[i], options));
        }

        if (out.length === 0) {
            return '[]';
        } else {
            return '[' + ws
                       + out.join(',' + (pretty ? ws : ' '))
                       + (pretty ? ws.slice(0, -4) : ws) +
                   ']';
        }
    }

    // Convert an object to a string, such as {a: 1}.
    // This function calls stringify() for each of its values,
    // and does not output functions or prototype values.
    function stringifyObject(obj, options, level) {
        var out = [];
        var pretty = options.pretty && (Object.keys(obj).length > 2 ||
                                        Object.keys(obj).some(function (k) { return typeof(obj[k]) === 'object' }));
        var ws = pretty ? '\n' + new(Array)(level * 4 + 1).join(' ') : ' ';

        var keys = options.showHidden ? Object.keys(obj) : Object.getOwnPropertyNames(obj);
        keys.forEach(function (k) {
            if (Object.prototype.hasOwnProperty.call(obj, k)
              && !(obj[k] instanceof Function && options.hideFunctions)) {
                out.push(stylize('"' + k + '"', classes.key) + ': ' + stringify(obj[k], options));
            }
        });

        if (out.length === 0) {
            return '{}';
        } else {
            return "{" + ws
                       + out.join(',' + (pretty ? ws : ' '))
                       + (pretty ? ws.slice(0, -4) : ws) +
                   "}";
       }
    }

    function typeOf(value) {
        var s = typeof(value),
            types = [Object, Array, String, RegExp, Number, Function, Boolean, Date];

        if (s === 'object' || s === 'function') {
            if (value) {
                types.forEach(function (t) {
                    if (value instanceof t) { s = t.name.toLowerCase() }
                });
            } else { s = 'null' }
        }
        return s;
    }
})(jQuery, window);