/**
 * @license
 * GrapeFruit Game Engine - v0.0.2
 * Copyright (c) 2012, Chad Engler
 * https://github.com/englercj/grapefruit
 *
 * Compiled: 2013-04-07
 *
 * GrapeFruit Game Engine is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window, undefined) {
    document = window.document;

(function(f){"function"==typeof define?define(f):"function"==typeof YUI?YUI.add("es5-sham",f):f()})(function(){function f(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(c){}}var b=Function.prototype.call,g=Object.prototype,h=b.bind(g.hasOwnProperty),p,q,k,l,i;if(i=h(g,"__defineGetter__"))p=b.bind(g.__defineGetter__),q=b.bind(g.__defineSetter__),k=b.bind(g.__lookupGetter__),l=b.bind(g.__lookupSetter__);Object.getPrototypeOf||(Object.getPrototypeOf=function(a){return a.__proto__||
(a.constructor?a.constructor.prototype:g)});Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(a,c){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+a);if(h(a,c)){var d={enumerable:true,configurable:true};if(i){var b=a.__proto__;a.__proto__=g;var e=k(a,c),f=l(a,c);a.__proto__=b;if(e||f){if(e)d.get=e;if(f)d.set=f;return d}}d.value=a[c];return d}});Object.getOwnPropertyNames||(Object.getOwnPropertyNames=
function(a){return Object.keys(a)});if(!Object.create){var m;if(null===Object.prototype.__proto__||"undefined"==typeof document)m=function(){return{__proto__:null}};else{var r=function(){},b=document.createElement("iframe"),j=document.body||document.documentElement;b.style.display="none";j.appendChild(b);b.src="javascript:";var e=b.contentWindow.Object.prototype;j.removeChild(b);b=null;delete e.constructor;delete e.hasOwnProperty;delete e.propertyIsEnumerable;delete e.isPrototypeOf;delete e.toLocaleString;
delete e.toString;delete e.valueOf;e.__proto__=null;r.prototype=e;m=function(){return new r}}Object.create=function(a,c){function d(){}var b;if(a===null)b=m();else{if(typeof a!=="object"&&typeof a!=="function")throw new TypeError("Object prototype may only be an Object or null");d.prototype=a;b=new d;b.__proto__=a}c!==void 0&&Object.defineProperties(b,c);return b}}if(Object.defineProperty&&(b=f({}),j="undefined"==typeof document||f(document.createElement("div")),!b||!j))var n=Object.defineProperty,
o=Object.defineProperties;if(!Object.defineProperty||n)Object.defineProperty=function(a,c,d){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.defineProperty called on non-object: "+a);if(typeof d!="object"&&typeof d!="function"||d===null)throw new TypeError("Property description must be an object: "+d);if(n)try{return n.call(Object,a,c,d)}catch(b){}if(h(d,"value"))if(i&&(k(a,c)||l(a,c))){var e=a.__proto__;a.__proto__=g;delete a[c];a[c]=d.value;a.__proto__=e}else a[c]=
d.value;else{if(!i)throw new TypeError("getters & setters can not be defined on this javascript engine");h(d,"get")&&p(a,c,d.get);h(d,"set")&&q(a,c,d.set)}return a};if(!Object.defineProperties||o)Object.defineProperties=function(a,c){if(o)try{return o.call(Object,a,c)}catch(d){}for(var b in c)h(c,b)&&b!="__proto__"&&Object.defineProperty(a,b,c[b]);return a};Object.seal||(Object.seal=function(a){return a});Object.freeze||(Object.freeze=function(a){return a});try{Object.freeze(function(){})}catch(t){var s=
Object.freeze;Object.freeze=function(a){return typeof a=="function"?a:s(a)}}Object.preventExtensions||(Object.preventExtensions=function(a){return a});Object.isSealed||(Object.isSealed=function(){return false});Object.isFrozen||(Object.isFrozen=function(){return false});Object.isExtensible||(Object.isExtensible=function(a){if(Object(a)!==a)throw new TypeError;for(var c="";h(a,c);)c=c+"?";a[c]=true;var b=h(a,c);delete a[c];return b})});

(function(o){"function"==typeof define?define(o):"function"==typeof YUI?YUI.add("es5",o):o()})(function(){function o(){}function v(a){a=+a;a!==a?a=0:0!==a&&(a!==1/0&&a!==-(1/0))&&(a=(0<a||-1)*Math.floor(Math.abs(a)));return a}function s(a){var b=typeof a;return null===a||"undefined"===b||"boolean"===b||"number"===b||"string"===b}Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError("Function.prototype.bind called on incompatible "+b);
var d=q.call(arguments,1),c=function(){if(this instanceof c){var e=b.apply(this,d.concat(q.call(arguments)));return Object(e)===e?e:this}return b.apply(a,d.concat(q.call(arguments)))};b.prototype&&(o.prototype=b.prototype,c.prototype=new o,o.prototype=null);return c});var k=Function.prototype.call,p=Object.prototype,q=Array.prototype.slice,h=k.bind(p.toString),t=k.bind(p.hasOwnProperty);t(p,"__defineGetter__")&&(k.bind(p.__defineGetter__),k.bind(p.__defineSetter__),k.bind(p.__lookupGetter__),k.bind(p.__lookupSetter__));
if(2!=[1,2].splice(0).length){var y=Array.prototype.splice;Array.prototype.splice=function(a,b){return arguments.length?y.apply(this,[a===void 0?0:a,b===void 0?this.length-a:b].concat(q.call(arguments,2))):[]}}if(1!=[].unshift(0)){var z=Array.prototype.unshift;Array.prototype.unshift=function(){z.apply(this,arguments);return this.length}}Array.isArray||(Array.isArray=function(a){return h(a)=="[object Array]"});var k=Object("a"),l="a"!=k[0]||!(0 in k);Array.prototype.forEach||(Array.prototype.forEach=
function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=-1,f=c.length>>>0;if(h(a)!="[object Function]")throw new TypeError;for(;++e<f;)e in c&&a.call(b,c[e],e,d)});Array.prototype.map||(Array.prototype.map=function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=c.length>>>0,f=Array(e);if(h(a)!="[object Function]")throw new TypeError(a+" is not a function");for(var g=0;g<e;g++)g in c&&(f[g]=a.call(b,c[g],g,d));return f});Array.prototype.filter||(Array.prototype.filter=
function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=c.length>>>0,f=[],g;if(h(a)!="[object Function]")throw new TypeError(a+" is not a function");for(var i=0;i<e;i++)if(i in c){g=c[i];a.call(b,g,i,d)&&f.push(g)}return f});Array.prototype.every||(Array.prototype.every=function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=c.length>>>0;if(h(a)!="[object Function]")throw new TypeError(a+" is not a function");for(var f=0;f<e;f++)if(f in c&&!a.call(b,c[f],
f,d))return false;return true});Array.prototype.some||(Array.prototype.some=function(a,b){var d=n(this),c=l&&h(this)=="[object String]"?this.split(""):d,e=c.length>>>0;if(h(a)!="[object Function]")throw new TypeError(a+" is not a function");for(var f=0;f<e;f++)if(f in c&&a.call(b,c[f],f,d))return true;return false});Array.prototype.reduce||(Array.prototype.reduce=function(a){var b=n(this),d=l&&h(this)=="[object String]"?this.split(""):b,c=d.length>>>0;if(h(a)!="[object Function]")throw new TypeError(a+
" is not a function");if(!c&&arguments.length==1)throw new TypeError("reduce of empty array with no initial value");var e=0,f;if(arguments.length>=2)f=arguments[1];else{do{if(e in d){f=d[e++];break}if(++e>=c)throw new TypeError("reduce of empty array with no initial value");}while(1)}for(;e<c;e++)e in d&&(f=a.call(void 0,f,d[e],e,b));return f});Array.prototype.reduceRight||(Array.prototype.reduceRight=function(a){var b=n(this),d=l&&h(this)=="[object String]"?this.split(""):b,c=d.length>>>0;if(h(a)!=
"[object Function]")throw new TypeError(a+" is not a function");if(!c&&arguments.length==1)throw new TypeError("reduceRight of empty array with no initial value");var e,c=c-1;if(arguments.length>=2)e=arguments[1];else{do{if(c in d){e=d[c--];break}if(--c<0)throw new TypeError("reduceRight of empty array with no initial value");}while(1)}do c in this&&(e=a.call(void 0,e,d[c],c,b));while(c--);return e});if(!Array.prototype.indexOf||-1!=[0,1].indexOf(1,2))Array.prototype.indexOf=function(a){var b=l&&
h(this)=="[object String]"?this.split(""):n(this),d=b.length>>>0;if(!d)return-1;var c=0;arguments.length>1&&(c=v(arguments[1]));for(c=c>=0?c:Math.max(0,d+c);c<d;c++)if(c in b&&b[c]===a)return c;return-1};if(!Array.prototype.lastIndexOf||-1!=[0,1].lastIndexOf(0,-3))Array.prototype.lastIndexOf=function(a){var b=l&&h(this)=="[object String]"?this.split(""):n(this),d=b.length>>>0;if(!d)return-1;var c=d-1;arguments.length>1&&(c=Math.min(c,v(arguments[1])));for(c=c>=0?c:d-Math.abs(c);c>=0;c--)if(c in b&&
a===b[c])return c;return-1};if(!Object.keys){var w=!0,x="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),A=x.length,r;for(r in{toString:null})w=!1;Object.keys=function(a){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.keys called on a non-object");var b=[],d;for(d in a)t(a,d)&&b.push(d);if(w)for(d=0;d<A;d++){var c=x[d];t(a,c)&&b.push(c)}return b}}if(!Date.prototype.toISOString||-1===(new Date(-621987552E5)).toISOString().indexOf("-000001"))Date.prototype.toISOString=
function(){var a,b,d,c;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");c=this.getUTCFullYear();a=this.getUTCMonth();c=c+Math.floor(a/12);a=[(a%12+12)%12+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];c=(c<0?"-":c>9999?"+":"")+("00000"+Math.abs(c)).slice(0<=c&&c<=9999?-4:-6);for(b=a.length;b--;){d=a[b];d<10&&(a[b]="0"+d)}return c+"-"+a.slice(0,2).join("-")+"T"+a.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+
"Z"};r=!1;try{r=Date.prototype.toJSON&&null===(new Date(NaN)).toJSON()&&-1!==(new Date(-621987552E5)).toJSON().indexOf("-000001")&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(H){}r||(Date.prototype.toJSON=function(){var a=Object(this),b;a:if(s(a))b=a;else{b=a.valueOf;if(typeof b==="function"){b=b.call(a);if(s(b))break a}b=a.toString;if(typeof b==="function"){b=b.call(a);if(s(b))break a}throw new TypeError;}if(typeof b==="number"&&!isFinite(b))return null;b=a.toISOString;
if(typeof b!="function")throw new TypeError("toISOString property is not callable");return b.call(a)});var g=Date,m=function(a,b,d,c,e,f,h){var i=arguments.length;if(this instanceof g){i=i==1&&String(a)===a?new g(m.parse(a)):i>=7?new g(a,b,d,c,e,f,h):i>=6?new g(a,b,d,c,e,f):i>=5?new g(a,b,d,c,e):i>=4?new g(a,b,d,c):i>=3?new g(a,b,d):i>=2?new g(a,b):i>=1?new g(a):new g;i.constructor=m;return i}return g.apply(this,arguments)},u=function(a,b){var d=b>1?1:0;return B[b]+Math.floor((a-1969+d)/4)-Math.floor((a-
1901+d)/100)+Math.floor((a-1601+d)/400)+365*(a-1970)},C=RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),B=[0,31,59,90,120,151,181,212,243,273,304,334,365],j;for(j in g)m[j]=g[j];m.now=g.now;m.UTC=g.UTC;m.prototype=g.prototype;m.prototype.constructor=m;m.parse=function(a){var b=C.exec(a);if(b){var d=Number(b[1]),c=Number(b[2]||1)-1,e=Number(b[3]||1)-1,f=Number(b[4]||0),h=Number(b[5]||0),i=Number(b[6]||
0),j=Number(b[7]||0),m=!b[4]||b[8]?0:Number(new g(1970,0)),k=b[9]==="-"?1:-1,l=Number(b[10]||0),b=Number(b[11]||0);if(f<(h>0||i>0||j>0?24:25)&&h<60&&i<60&&j<1E3&&c>-1&&c<12&&l<24&&b<60&&e>-1&&e<u(d,c+1)-u(d,c)){d=((u(d,c)+e)*24+f+l*k)*60;d=((d+h+b*k)*60+i)*1E3+j+m;if(-864E13<=d&&d<=864E13)return d}return NaN}return g.parse.apply(this,arguments)};Date=m;Date.now||(Date.now=function(){return(new Date).getTime()});if("0".split(void 0,0).length){var D=String.prototype.split;String.prototype.split=function(a,
b){return a===void 0&&b===0?[]:D.apply(this,arguments)}}if("".substr&&"b"!=="0b".substr(-1)){var E=String.prototype.substr;String.prototype.substr=function(a,b){return E.call(this,a<0?(a=this.length+a)<0?0:a:a,b)}}j="\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";if(!String.prototype.trim||j.trim()){j="["+j+"]";var F=RegExp("^"+j+j+"*"),G=RegExp(j+j+"*$");String.prototype.trim=function(){if(this===void 0||this===
null)throw new TypeError("can't convert "+this+" to object");return String(this).replace(F,"").replace(G,"")}}var n=function(a){if(a==null)throw new TypeError("can't convert "+a+" to object");return Object(a)}});

/**
 * @license
 * Pixi.JS - v1.0.0
 * Copyright (c) 2012, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2013-04-05
 *
 * Pixi.JS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
@module PIXI
 */
var PIXI = PIXI || {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @class Point
 * @constructor 
 * @param x {Number} position of the point
 * @param y {Number} position of the point
 */
PIXI.Point = function(x, y)
{
	/**
	 * @property x 
	 * @type Number
	 * @default 0
	 */
	this.x = x || 0;
	
	/**
	 * @property y
	 * @type Number
	 * @default 0
	 */
	this.y = y || 0;
}

/** 
 * @method clone
 * @return a copy of the point
 */
PIXI.Point.clone = function()
{
	return new PIXI.Point(this.x, this.y);
}

// constructor
PIXI.Point.constructor = PIXI.Point;


/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * the Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
 * @class Rectangle
 * @constructor 
 * @param x {Number} position of the rectangle
 * @param y {Number} position of the rectangle
 * @param width {Number} of the rectangle
 * @param height {Number} of the rectangle
 */
PIXI.Rectangle = function(x, y, width, height)
{
	/**
	 * @property x
	 * @type Number
	 * @default 0
	 */
	this.x = x || 0;
	
	/**
	 * @property y
	 * @type Number
	 * @default 0
	 */
	this.y = y || 0;
	
	/**
	 * @property width
	 * @type Number
	 * @default 0
	 */
	this.width = width || 0;
	
	/**
	 * @property height
	 * @type Number
	 * @default 0
	 */
	this.height = height || 0;
}

/** 
 * @method clone
 * @return a copy of the rectangle
 */
PIXI.Rectangle.clone = function()
{
	return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
}

// constructor
PIXI.Rectangle.constructor = PIXI.Rectangle;


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * this is the base class for all objects that are rendered on the screen.
 * @class DisplayObject
 * @constructor
 */
PIXI.DisplayObject = function()
{
	/**
	 * The coordinate of the object relative to the local coordinates of the parent.
	 * @property position
	 * @type Point
	 */
	this.position = new PIXI.Point();
	
	/**
	 * The scale factor of the object.
	 * @property scale
	 * @type Point
	 */
	this.scale = new PIXI.Point(1,1);//{x:1, y:1};
	
	/**
	 * The rotation of the object in radians.
	 * @property rotation
	 * @type Number
	 */
	this.rotation = 0;
	
	/**
	 * The opacity of the object.
	 * @property alpha
	 * @type Number
	 */	
	this.alpha = 1;
	
	/**
	 * The visibility of the object.
	 * @property visible
	 * @type Boolean
	 */	
	this.visible = true;
	this.cacheVisible = false;
	
	/**
	 * [read-only] The display object container that contains this display object.
	 * @property parent
	 * @type DisplayObjectContainer
	 */	
	this.parent = null;
	
	/**
	 * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
	 * @property stage
	 * @type Stage
	 */	
	this.stage = null;
	
	this.worldAlpha = 1;
	this.color = [];
	
	this.worldTransform = PIXI.mat3.create()//mat3.identity();
	this.localTransform = PIXI.mat3.create()//mat3.identity();
	
	this.dynamic = true;
	// chach that puppy!
	this._sr = 0;
	this._cr = 1;
	
	this.renderable = false;
	
	// NOT YET :/ This only applies to children within the container..
	this.interactive = true;
}

// constructor
PIXI.DisplayObject.constructor = PIXI.DisplayObject;

/**
 * @private
 */
PIXI.DisplayObject.prototype.updateTransform = function()
{
	// TODO OPTIMIZE THIS!! with dirty
	if(this.rotation != this.rotationCache)
	{
		this.rotationCache = this.rotation;
		this._sr =  Math.sin(this.rotation);
		this._cr =  Math.cos(this.rotation);
	}	
	
	var localTransform = this.localTransform;
	var parentTransform = this.parent.worldTransform;
	var worldTransform = this.worldTransform;
	//console.log(localTransform)
	localTransform[0] = this._cr * this.scale.x;
	localTransform[1] = -this._sr * this.scale.y
	localTransform[3] = this._sr * this.scale.x;
	localTransform[4] = this._cr * this.scale.y;
	
	///AAARR GETTER SETTTER!
	localTransform[2] = this.position.x;
	localTransform[5] = this.position.y;
	
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = localTransform[0], a01 = localTransform[1], a02 = localTransform[2],
        a10 = localTransform[3], a11 = localTransform[4], a12 = localTransform[5],

        b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2],
        b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];

    worldTransform[0] = b00 * a00 + b01 * a10;
    worldTransform[1] = b00 * a01 + b01 * a11;
    worldTransform[2] = b00 * a02 + b01 * a12 + b02;

    worldTransform[3] = b10 * a00 + b11 * a10;
    worldTransform[4] = b10 * a01 + b11 * a11;
    worldTransform[5] = b10 * a02 + b11 * a12 + b12;

	// because we are using affine transformation, we can optimise the matrix concatenation process.. wooo!
	// mat3.multiply(this.localTransform, this.parent.worldTransform, this.worldTransform);
	this.worldAlpha = this.alpha * this.parent.worldAlpha;		
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A DisplayObjectContainer represents a collection of display objects. It is the base class of all display objects that act as a container for other objects.
 * @class DisplayObjectContainer 
 * @extends DisplayObject
 * @constructor
 */
PIXI.DisplayObjectContainer = function()
{
	PIXI.DisplayObject.call( this );
	
	/**
	 * [read-only] The of children of this container.
	 * @property children {Array}
	 */	
	this.children = [];
	//s
	this.renderable = false;
}

// constructor
PIXI.DisplayObjectContainer.constructor = PIXI.DisplayObjectContainer;
PIXI.DisplayObjectContainer.prototype = Object.create( PIXI.DisplayObject.prototype );

/**
 * Adds a child to the container.
 * @method addChild
 * @param  DisplayObject {DisplayObject}
 */
PIXI.DisplayObjectContainer.prototype.addChild = function(child)
{
	if(child.parent != undefined)
	{
		child.parent.removeChild(child)
	}
	
	child.parent = this;
	child.childIndex = this.children.length;
	
	this.children.push(child);	
	if(this.stage)
	{
		this.stage.__addChild(child);
	}
}

/**
 * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
 * @method addChildAt
 * @param DisplayObject {DisplayObject}
 * @param index {Number}
 */
PIXI.DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
	if(index >= 0 && index <= this.children.length)
	{
		if(child.parent != undefined)
		{
			child.parent.removeChild(child);
		}
	
		if (index == this.children.length)
		{
		  	this.children.push(child);
		}	
		else 
		{
			this.children.splice(index, 0, child);
		}

		child.parent = this;
		child.childIndex = index;
		
		var length = this.children.length;
		for (var i=index; i < length; i++) 
		{
		  this.children[i].childIndex = i;
		}
		
		if(this.stage)
		{
			this.stage.__addChild(child);
		}
	}
	else
	{
		// error!
		
		throw new Error(child + " The index "+ index +" supplied is out of bounds " + this.children.length);
	}
}

/**
 * Removes a child from the container.
 * @method removeChild
 * @param  DisplayObject {DisplayObject}
 */
PIXI.DisplayObjectContainer.prototype.removeChild = function(child)
{
	var index = this.children.indexOf( child );

	if ( index !== -1 ) 
	{
		if(this.stage)this.stage.__removeChild(child);
		child.parent = undefined;
		//child.childIndex = 0
		this.children.splice( index, 1 );
	
		// update in dexs!
		for(var i=index,j=this.children.length; i<j; i++)
		{
			this.children[i].childIndex -= 1;
		}
	}
	else
	{
		throw new Error(child + " The supplied DisplayObject must be a child of the caller " + this);
	}
}


/**
 * @private
 */
PIXI.DisplayObjectContainer.prototype.updateTransform = function()
{
	if(!this.visible)return;
	
	PIXI.DisplayObject.prototype.updateTransform.call( this );
	
	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();	
	}
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.blendModes = {};
PIXI.blendModes.NORMAL = 0;
PIXI.blendModes.SCREEN = 1;


/**
@class Sprite
@extends DisplayObjectContainer
@constructor
@param texture {Texture}
@type String
*/
PIXI.Sprite = function(texture)
{
	PIXI.DisplayObjectContainer.call( this );
	
	 /**
	 * The anchor sets the origin point of the texture.
	 * The default is 0,0 this means the textures origin is the top left 
	 * Setting than anchor to 0.5,0.5 means the textures origin is centered
	 * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right
     * @property anchor
     * @type Point
     */
	this.anchor = new PIXI.Point();
	
	/**
	 * The texture that the sprite is using
	 * @property texture
	 * @type Texture
	 */
	this.texture = texture;
	
	/**
	 * The blend mode of sprite.
	 * currently supports PIXI.blendModes.NORMAL and PIXI.blendModes.SCREEN
	 * @property blendMode
	 * @type uint
	 */
	this.blendMode = PIXI.blendModes.NORMAL;
	
	/**
	 * The width of the sprite (this is initially set by the texture)
	 * @property width
	 * @type #Number
	 */
	this.width = 1;
	
	/**
	 * The height of the sprite (this is initially set by the texture)
	 * @property height
	 * @type #Number
	 */
	this.height = 1;
	
	if(texture.baseTexture.hasLoaded)
	{
		this.width   = this.texture.frame.width;
		this.height  = this.texture.frame.height;
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}
	
	this.renderable = true;
	
	
	
	// [readonly] best not to toggle directly! use setInteractive()
	this.interactive = false;
	
	
	// thi next bit is here for the docs...
	
	/*
	 * MOUSE Callbacks
	 */
	
	/**
	 * A callback that is used when the users clicks on the sprite with thier mouse
	 * @method click
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the user clicks the mouse down over the sprite
	 * @method mousedown
	 * @param interactionData {InteractionData}
	 */
	 
	/**
	 * A callback that is used when the user releases the mouse that was over the sprite
	 * for this callback to be fired the mouse must have been pressed down over the sprite
	 * @method mouseup
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the users mouse rolls over the sprite
	 * @method mouseover
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the users mouse leaves the sprite
	 * @method mouseout
	 * @param interactionData {InteractionData}
	 */
	
	/*
	 * TOUCH Callbacks
	 */
	
	/**
	 * A callback that is used when the users taps on the sprite with thier finger
	 * basically a touch version of click
	 * @method tap
	 * @param interactionData {InteractionData}
	 */
	
	/**
	 * A callback that is used when the user touch's over the sprite
	 * @method touchstart
	 * @param interactionData {InteractionData}
	 */
	 
	/**
	 * A callback that is used when the user releases the touch that was over the sprite
	 * for this callback to be fired. The touch must have started over the sprite
	 * @method touchend
	 * @param interactionData {InteractionData}
	 */
}

// constructor
PIXI.Sprite.constructor = PIXI.Sprite;
PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

/**
@method setTexture
@param texture {Texture} The PIXI texture that is displayed by the sprite
*/
PIXI.Sprite.prototype.setTexture = function(texture)
{
	// stop current texture;
	if(this.texture.baseTexture != texture.baseTexture)
	{
		this.textureChange = true;	
	}
	
	this.texture = texture;
	this.width   = texture.frame.width;
	this.height  = texture.frame.height;
	this.updateFrame = true;
}

/**
 * Indicates if the sprite will have touch and mouse interactivity. It is false by default
 * @method setInteractive
 * @param interactive {Boolean}
 */
PIXI.Sprite.prototype.setInteractive = function(interactive)
{
	this.interactive = interactive;
	// TODO more to be done here..
	// need to sort out a re-crawl!
	if(this.stage)this.stage.dirty = true;
}

/**
 * @private
 */
PIXI.Sprite.prototype.onTextureUpdate = function(event)
{
	this.width   = this.texture.frame.width;
	this.height  = this.texture.frame.height;
	this.updateFrame = true;
}

// some helper functions..

/**
 * 
 * Helper function that creates a sprite that will contain a texture from the TextureCache based on the frameId
 * The frame ids are created when a Texture packer file has been loaded
 * @method fromFrame
 * @static
 * @param frameId {String} The frame Id of the texture in the cache
 * @return {Sprite} A new Sprite using a texture from the texture cache matching the frameId
 */
PIXI.Sprite.fromFrame = function(frameId)
{
	var texture = PIXI.TextureCache[frameId];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache" + this);
	return new PIXI.Sprite(texture);
}

/**
 * 
 * Helper function that creates a sprite that will contain a texture based on an image url
 * If the image is not in the texture cache it will be loaded
 * @method fromImage
 * @static
 * @param The image url of the texture
 * @return {Sprite} A new Sprite using a texture from the texture cache matching the image id
 */
PIXI.Sprite.fromImage = function(imageId)
{
	var texture = PIXI.Texture.fromImage(imageId);
	return new PIXI.Sprite(texture);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A MovieClip is a simple way to display an animation depicted by a list of textures.
 * @class MovieClip
 * @extends Sprite
 * @constructor
 * @param textures {Array} an array of {Texture} objects that make up the animation
 */
PIXI.MovieClip = function(textures)
{
	PIXI.Sprite.call( this, textures[0]);
	
	/**
	 * The array of textures that make up the animation
	 * @property textures
	 * @type Array
	 */
	this.textures = textures;
	
	/**
	 * [read only] The index MovieClips current frame (this may not have to be a whole number)
	 * @property currentFrame
	 * @type Number
	 */
	this.currentFrame = 0; 
	
	/**
	 * The speed that the MovieClip will play at. Higher is faster, lower is slower
	 * @property animationSpeed
	 * @type Number
	 */
	this.animationSpeed = 1;
	
	/**
	 * [read only] indicates if the MovieClip is currently playing
	 * @property playing
	 * @type Boolean
	 */
	this.playing;
}

// constructor
PIXI.MovieClip.constructor = PIXI.MovieClip;
PIXI.MovieClip.prototype = Object.create( PIXI.Sprite.prototype );

/**
 * Stops the MovieClip
 * @method stop
 */
PIXI.MovieClip.prototype.stop = function()
{
	this.playing = false;
}

/**
 * Plays the MovieClip
 * @method play
 */
PIXI.MovieClip.prototype.play = function()
{
	this.playing = true;
}

/**
 * Stops the MovieClip and goes to a specific frame
 * @method gotoAndStop
 * @param frameNumber {Number} frame index to stop at
 */
PIXI.MovieClip.prototype.gotoAndStop = function(frameNumber)
{
	this.playing = false;
	this.currentFrame = frameNumber;
	var round = (this.currentFrame + 0.5) | 0;
	this.setTexture(this.textures[round % this.textures.length]);
}

/**
 * Goes to a specific frame and begins playing the MovieClip
 * @method gotoAndPlay
 * @param frameNumber {Number} frame index to start at
 */
PIXI.MovieClip.prototype.gotoAndPlay = function(frameNumber)
{
	this.currentFrame = frameNumber;
	this.playing = true;
}

PIXI.MovieClip.prototype.updateTransform = function()
{
	PIXI.Sprite.prototype.updateTransform.call(this);
	
	if(!this.playing)return;
	
	this.currentFrame += this.animationSpeed;
	var round = (this.currentFrame + 0.5) | 0;
	this.setTexture(this.textures[round % this.textures.length]);
}
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */



/**
The interaction manager deals with mouse and touch events. At this moment only Sprite's can be interactive.
This manager also supports multitouch.
@class InteractionManager
@constructor
@param stage {Stage}
@type Stage
*/
PIXI.InteractionManager = function(stage)
{
	/**
	 * a refference to the stage
	 * @property stage
	 * @type Stage
	 */
	this.stage = stage;

	// helpers
	this.tempPoint = new PIXI.Point();
	//this.tempMatrix =  mat3.create();
	
	this.mouseoverEnabled = true;
	
	/**
	 * the mouse data 
	 * @property mouse
	 * @type InteractionData
	 */
	this.mouse = new PIXI.InteractionData();
	
	/**
	 * an object that stores current touches (InteractionData) by id reference 
	 * @property touchs
	 * @type Object
	 */
	this.touchs = {};
	
	//tiny little interactiveData pool!
	this.pool = [];
	
	this.interactiveItems = [];
}

// constructor
PIXI.InteractionManager.constructor = PIXI.InteractionManager;

/**
 * This method will disable rollover/rollout for ALL interactive items
 * You may wish to use this an optimization if your app does not require rollover/rollout funcitonality
 * @method disableMouseOver
 */
PIXI.InteractionManager.prototype.disableMouseOver = function()
{
	if(!this.mouseoverEnabled)return;
	
	this.mouseoverEnabled = false;
	if(this.target)this.target.view.removeEventListener('mousemove',  this.onMouseMove.bind(this));
}

/**
 * This method will enable rollover/rollout for ALL interactive items
 * It is enabled by default
 * @method enableMouseOver
 */
PIXI.InteractionManager.prototype.enableMouseOver = function()
{
	if(this.mouseoverEnabled)return;
	
	this.mouseoverEnabled = false;
	if(this.target)this.target.view.addEventListener('mousemove',  this.onMouseMove.bind(this));
}

PIXI.InteractionManager.prototype.collectInteractiveSprite = function(displayObject)
{
	var children = displayObject.children;
	var length = children.length;
	
	for (var i = length - 1; i >= 0; i--)
	{
		var child = children[i];
		
		// only sprite's right now...
		if(child instanceof PIXI.Sprite)
		{
			if(child.interactive)this.interactiveItems.push(child);
		}
		else
		{
			// use this to optimize..
			if(!child.interactive)continue;
		}
		
		if(child.children.length > 0)
		{
			this.collectInteractiveSprite(child);
		}
	}
}

PIXI.InteractionManager.prototype.setTarget = function(target)
{
	this.target = target;
	if(this.mouseoverEnabled)target.view.addEventListener('mousemove',  this.onMouseMove.bind(this), true);
	target.view.addEventListener('mousedown',  this.onMouseDown.bind(this), true);
 	target.view.addEventListener('mouseup', 	this.onMouseUp.bind(this), true);
 	target.view.addEventListener('mouseout', 	this.onMouseUp.bind(this), true);
	
	// aint no multi touch just yet!
	target.view.addEventListener("touchstart", this.onTouchStart.bind(this), true);
	target.view.addEventListener("touchend", this.onTouchEnd.bind(this), true);
	target.view.addEventListener("touchmove", this.onTouchMove.bind(this), true);
}

PIXI.InteractionManager.prototype.hitTest = function(interactionData)
{
	if(this.dirty)
	{
		this.dirty = false;
		this.interactiveItems = [];
		// go through and collect all the objects that are interactive..
		this.collectInteractiveSprite(this.stage);
	}
	
	var tempPoint = this.tempPoint;
	var tempMatrix = this.tempMatrix;
	var global = interactionData.global;
	
	var length = this.interactiveItems.length;
	
	for (var i = 0; i < length; i++)
	{
		var item = this.interactiveItems[i];
		if(!item.visible)continue;
		
		// TODO this could do with some optimizing!
		// maybe store the inverse?
		// or do a lazy check first?
		//mat3.inverse(item.worldTransform, tempMatrix);
		//tempPoint.x = tempMatrix[0] * global.x + tempMatrix[1] * global.y + tempMatrix[2]; 
		//tempPoint.y = tempMatrix[4] * global.y + tempMatrix[3] * global.x + tempMatrix[5];
	
		// OPTIMIZED! assuming the matrix transform is affine.. which it totally shold be!
		
		var worldTransform = item.worldTransform;
		
		var a00 = worldTransform[0], a01 = worldTransform[1], a02 = worldTransform[2],
            a10 = worldTransform[3], a11 = worldTransform[4], a12 = worldTransform[5],
            id = 1 / (a00 * a11 + a01 * -a10);
		
		tempPoint.x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id; 
		tempPoint.y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;
		
			
		var x1 = -item.width * item.anchor.x;
		
		if(tempPoint.x > x1 && tempPoint.x < x1 + item.width)
		{
			var y1 = -item.height * item.anchor.y;
			
			if(tempPoint.y > y1 && tempPoint.y < y1 + item.height)
			{
				interactionData.local.x = tempPoint.x;
				interactionData.local.y = tempPoint.y;
				
				return item;
			}
		}
	}
		
	return null;	
}

PIXI.InteractionManager.prototype.onMouseMove = function(event)
{
	event.preventDefault();
	
	// TODO optimize by not check EVERY TIME! maybe half as often? //
	var rect = this.target.view.getBoundingClientRect();
	
	this.mouse.global.x = (event.clientX - rect.left) * (this.target.width / rect.width);
	this.mouse.global.y = (event.clientY - rect.top) * ( this.target.height / rect.height);
	
	var item = this.hitTest(this.mouse);
	
	if(this.currentOver != item)
	{
		if(this.currentOver)
		{
			this.mouse.target = this.currentOver;
			if(this.currentOver.mouseout)this.currentOver.mouseout(this.mouse);
			this.currentOver = null;
		}
		
		this.target.view.style.cursor = "default";
	}
		
	if(item)
	{
		
		if(this.currentOver == item)return;
		
		this.currentOver = item;
		this.target.view.style.cursor = "pointer";
		this.mouse.target = item;
		if(item.mouseover)item.mouseover(this.mouse);
	}
}

PIXI.InteractionManager.prototype.onMouseDown = function(event)
{
	var rect = this.target.view.getBoundingClientRect();
	this.mouse.global.x = (event.clientX - rect.left) * (this.target.width / rect.width);
	this.mouse.global.y = (event.clientY - rect.top) * (this.target.height / rect.height);
	
	var item = this.hitTest(this.mouse);
	if(item)
	{
		this.currentDown = item;
		this.mouse.target = item;
		if(item.mousedown)item.mousedown(this.mouse);
	}
}

PIXI.InteractionManager.prototype.onMouseUp = function(event)
{
	if(this.currentOver)
	{
		this.mouse.target = this.currentOver;
		if(this.currentOver.mouseup)this.currentOver.mouseup(this.mouse);	
	}
	
	if(this.currentDown)
	{
		this.mouse.target = this.currentDown;
		// click!
		if(this.currentOver == this.currentDown)if(this.currentDown.click)this.currentDown.click(this.mouse);
		
	
		this.currentDown = null;
	}
}


PIXI.InteractionManager.prototype.onTouchMove = function(event)
{
	event.preventDefault();
	
	var rect = this.target.view.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		
		var touchData = this.touchs[touchEvent.identifier];
		
		// update the touch position
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
	}
}

PIXI.InteractionManager.prototype.onTouchStart = function(event)
{
	event.preventDefault();
	var rect = this.target.view.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		
		var touchData = this.pool.pop();
		if(!touchData)touchData = new PIXI.InteractionData();
		
		this.touchs[touchEvent.identifier] = touchData;
		
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
		
		var item = this.hitTest(touchData);
		if(item)
		{
			touchData.currentDown = item;
			touchData.target = item;
			if(item.touchstart)item.touchstart(touchData);
		}
	}
}

PIXI.InteractionManager.prototype.onTouchEnd = function(event)
{
	event.preventDefault();
	
	var rect = this.target.view.getBoundingClientRect();
	var changedTouches = event.changedTouches;
	
	for (var i=0; i < changedTouches.length; i++) 
	{
		var touchEvent = changedTouches[i];
		var touchData = this.touchs[touchEvent.identifier];
		
		touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
		touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
		
		if(touchData.currentDown)
		{
			if(touchData.currentDown.touchend)touchData.currentDown.touchend(touchData);
			
			var item = this.hitTest(touchData);
			if(item == touchData.currentDown)
			{
				if(touchData.currentDown.tap)touchData.currentDown.tap(touchData);	
			}
			touchData.currentDown = null;
		}
		
		// remove the touch..
		this.pool.push(touchData);
		this.touchs[touchEvent.identifier] = null;
	}
}

/**
@class InteractionData
@constructor
*/
PIXI.InteractionData = function()
{
	/**
	 * This point stores the global coords of where the touch/mouse event happened
	 * @property global 
	 * @type Point
	 */
	this.global = new PIXI.Point();
	
	/**
	 * This point stores the local coords of where the touch/mouse event happened
	 * @property local 
	 * @type Point
	 */
	this.local = new PIXI.Point();

	/**
	 * The target Sprite that was interacted with
	 * @property target
	 * @type Sprite
	 */
	this.target;
}

// constructor
PIXI.InteractionData.constructor = PIXI.InteractionData;



/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
A Stage represents the root of the display tree. Everything connected to the stage is rendered
@class Stage
@extends DisplayObjectContainer
@constructor
@param backgroundColor {Number} the background color of the stage
@param interactive {Boolean} enable / disable interaction (default is false)
*/
PIXI.Stage = function(backgroundColor, interactive)
{
	
	PIXI.DisplayObjectContainer.call( this );
	this.worldTransform = PIXI.mat3.create()//.//identity();
	this.__childrenAdded = [];
	this.__childrenRemoved = [];
	this.childIndex = 0;
	this.stage=  this;
	
	// interaction!
	this.interactive = !!interactive;
	this.interactionManager = new PIXI.InteractionManager(this);
	
	this.setBackgroundColor(backgroundColor);
}

// constructor
PIXI.Stage.constructor = PIXI.Stage;

PIXI.Stage.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

/**
@method updateTransform
@internal
*/
PIXI.Stage.prototype.updateTransform = function()
{
	this.worldAlpha = 1;		
	
	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();	
	}
	
	if(this.dirty)
	{
		this.dirty = false;
		
		// update interactive!
		this.interactionManager.dirty = true;
		
		
	}
}

/**
 * @method setBackgroundColor
 * @param backgroundColor {Number}
 */
PIXI.Stage.prototype.setBackgroundColor = function(backgroundColor)
{
	this.backgroundColor = backgroundColor || 0x000000;
	this.backgroundColorSplit = HEXtoRGB(this.backgroundColor);
	this.backgroundColorString =  "#" + this.backgroundColor.toString(16);
}

PIXI.Stage.prototype.__addChild = function(child)
{
	if(child.interactive)this.dirty = true;
	
	child.stage = this;
	
	if(child.children)
	{
		for (var i=0; i < child.children.length; i++) 
		{
		  	this.__addChild(child.children[i]);
		};
	}
	
}


PIXI.Stage.prototype.__removeChild = function(child)
{
	if(child.interactive)this.dirty = true;
	
	this.__childrenRemoved.push(child);

	child.stage = undefined;
	
	if(child.children)
	{
		for(var i=0,j=child.children.length; i<j; i++)
		{
		  	this.__removeChild(child.children[i])
		}
	}
}

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
})();

function HEXtoRGB(hex) {
	return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
}

/**
 * Provides bind in a cross browser way.
 */
if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = (function () {
    var slice = Array.prototype.slice;
    return function (thisArg) {
      var target = this, boundArgs = slice.call(arguments, 1);
 
      if (typeof target != 'function') throw new TypeError();
 
      function bound() {
	var args = boundArgs.concat(slice.call(arguments));
	target.apply(this instanceof bound ? this : thisArg, args);
      }
 
      bound.prototype = (function F(proto) {
          proto && (F.prototype = proto);
          if (!(this instanceof F)) return new F;          
	})(target.prototype);
 
      return bound;
    };
  })();
}

var AjaxRequest = function()
{
	var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
	
	if (window.ActiveXObject)
	{ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		for (var i=0; i<activexmodes.length; i++)
		{
			try{
				return new ActiveXObject(activexmodes[i])
			}
   			catch(e){
    			//suppress error
   			}
		}
	}
	else if (window.XMLHttpRequest) // if Mozilla, Safari etc
  	{
  		return new XMLHttpRequest()
 	}
 	else
 	{
		return false;
 	}
}








/**
 * https://github.com/mrdoob/eventtarget.js/
 * THankS mr DOob!
 */

PIXI.EventTarget = function () {

	var listeners = {};
	
	this.addEventListener = this.on = function ( type, listener ) {
		
		
		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];
			
		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );
		}

	};

	this.dispatchEvent = this.emit = function ( event ) {
		
		for ( var listener in listeners[ event.type ] ) {

			listeners[ event.type ][ listener ]( event );
			
		}

	};

	this.removeEventListener = this.off = function ( type, listener ) {

		var index = listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

			listeners[ type ].splice( index, 1 );

		}

	};

};



/*
 * A lighter version of the rad gl-matrix created by Brandon Jones, Colin MacKenzie IV
 * you both rock!
 */

function determineMatrixArrayType() {
    PIXI.Matrix = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
    return PIXI.Matrix;
}

determineMatrixArrayType();

PIXI.mat3 = {};

PIXI.mat3.create = function()
{
	var matrix = new PIXI.Matrix(9);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 1;
	matrix[5] = 0;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 1;
	
	return matrix;
}

PIXI.mat4 = {};

PIXI.mat4.create = function()
{
	var matrix = new PIXI.Matrix(16);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	
	return matrix;
}

PIXI.mat3.multiply = function (mat, mat2, dest) 
{
	if (!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2],
	    a10 = mat[3], a11 = mat[4], a12 = mat[5],
	    a20 = mat[6], a21 = mat[7], a22 = mat[8],
	
	    b00 = mat2[0], b01 = mat2[1], b02 = mat2[2],
	    b10 = mat2[3], b11 = mat2[4], b12 = mat2[5],
	    b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];
	
	dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
	dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
	dest[2] = b00 * a02 + b01 * a12 + b02 * a22;
	
	dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
	dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
	dest[5] = b10 * a02 + b11 * a12 + b12 * a22;
	
	dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
	dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
	dest[8] = b20 * a02 + b21 * a12 + b22 * a22;
	
	return dest;
}


PIXI.mat3.toMat4 = function (mat, dest) 
{
	if (!dest) { dest = PIXI.mat4.create(); }
	
	dest[15] = 1;
	dest[14] = 0;
	dest[13] = 0;
	dest[12] = 0;
	
	dest[11] = 0;
	dest[10] = mat[8];
	dest[9] = mat[7];
	dest[8] = mat[6];
	
	dest[7] = 0;
	dest[6] = mat[5];
	dest[5] = mat[4];
	dest[4] = mat[3];
	
	dest[3] = 0;
	dest[2] = mat[2];
	dest[1] = mat[1];
	dest[0] = mat[0];
	
	return dest;
}


/////


PIXI.mat4.create = function()
{
	var matrix = new PIXI.Matrix(16);

	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	
	return matrix;
}

PIXI.mat4.transpose = function (mat, dest) 
{
	// If we are transposing ourselves we can skip a few steps but have to cache some values
	if (!dest || mat === dest) 
	{
	    var a01 = mat[1], a02 = mat[2], a03 = mat[3],
	        a12 = mat[6], a13 = mat[7],
	        a23 = mat[11];
	
	    mat[1] = mat[4];
	    mat[2] = mat[8];
	    mat[3] = mat[12];
	    mat[4] = a01;
	    mat[6] = mat[9];
	    mat[7] = mat[13];
	    mat[8] = a02;
	    mat[9] = a12;
	    mat[11] = mat[14];
	    mat[12] = a03;
	    mat[13] = a13;
	    mat[14] = a23;
	    return mat;
	}
	
	dest[0] = mat[0];
	dest[1] = mat[4];
	dest[2] = mat[8];
	dest[3] = mat[12];
	dest[4] = mat[1];
	dest[5] = mat[5];
	dest[6] = mat[9];
	dest[7] = mat[13];
	dest[8] = mat[2];
	dest[9] = mat[6];
	dest[10] = mat[10];
	dest[11] = mat[14];
	dest[12] = mat[3];
	dest[13] = mat[7];
	dest[14] = mat[11];
	dest[15] = mat[15];
	return dest;
}

PIXI.mat4.multiply = function (mat, mat2, dest) 
{
	if (!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[ 0], a01 = mat[ 1], a02 = mat[ 2], a03 = mat[3];
	var a10 = mat[ 4], a11 = mat[ 5], a12 = mat[ 6], a13 = mat[7];
	var a20 = mat[ 8], a21 = mat[ 9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
	// Cache only the current line of the second matrix
    var b0  = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];  
    dest[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[4];
    b1 = mat2[5];
    b2 = mat2[6];
    b3 = mat2[7];
    dest[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[8];
    b1 = mat2[9];
    b2 = mat2[10];
    b3 = mat2[11];
    dest[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = mat2[12];
    b1 = mat2[13];
    b2 = mat2[14];
    b3 = mat2[15];
    dest[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    dest[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    dest[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    dest[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    return dest;
}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This helper function will automatically detect which renderer you should be using.
 * WebGL is the preferred renderer as it is a lot fastest. If webGL is not supported by the browser then this function will return a canvas renderer
 * @method autoDetectRenderer
 * @static
 * @param width {Number} the width of the renderers view
 * @param height {Number} the height of the renderers view
 * @param view {Canvas} the canvas to use as a view, optional
 */
PIXI.autoDetectRenderer = function(width, height, view)
{
	if(!width)width = 800;
	if(!height)height = 600;

	// BORROWED from Mr Doob (mrdoob.com)
	var webgl = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();

	//console.log(webgl);
	if( webgl )
	{
		return new PIXI.WebGLRenderer(width, height, view);
	}

	return	new PIXI.CanvasRenderer(width, height, view);
};




/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */
	
PIXI.shaderFragmentSrc = [	"precision mediump float;",
					  		"varying vec2 vTextureCoord;",
					  		"varying float vColor;",
					  		"uniform sampler2D uSampler;",
					  		"void main(void) {",
					  		"gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
					  		"gl_FragColor = gl_FragColor * vColor;",
					  		"}"];

PIXI.shaderVertexSrc = [	"attribute vec2 aVertexPosition;",
	    					"attribute vec2 aTextureCoord;",
	    					"attribute float aColor;",
	  						"uniform mat4 uMVMatrix;",
							"varying vec2 vTextureCoord;",
							"varying float vColor;",
							"void main(void) {",
							"gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0);",
							"vTextureCoord = aTextureCoord;",
							"vColor = aColor;",
	   					 	"}"]

PIXI.CompileVertexShader = function(gl, shaderSrc)
{
	var src = "";
	
	for (var i=0; i < shaderSrc.length; i++) {
	  src += shaderSrc[i];
	};
	
	var shader;
    shader = gl.createShader(gl.VERTEX_SHADER);
       
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    
    return shader;
}

PIXI.CompileFragmentShader = function(gl, shaderSrc)
{
	var src = "";
	
	for (var i=0; i < shaderSrc.length; i++) {
	  src += shaderSrc[i];
	};
	
	var shader;
    shader = gl.createShader(gl.FRAGMENT_SHADER);
        
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
	
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    
    return shader;
}
/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._defaultFrame = new PIXI.Rectangle(0,0,1,1);

/**
 * the WebGLRenderer is draws the stage and all its content onto a webGL enabled canvas. This renderer should be used for browsers support webGL. This Render works by automatically managing webGLBatchs. So no need for Sprite Batch's or Sprite Cloud's
 * Dont forget to add the view to your DOM or you will not see anything :)
 * @class WebGLRenderer
 * @constructor
 * @param width {Number} the width of the canvas view
 * @default 0
 * @param height {Number} the height of the canvas view
 * @default 0
 * @param view {Canvas} the canvas to use as a view, optional
 */
PIXI.WebGLRenderer = function(width, height, view)
{
	this.width = width || 800;
	this.height = height || 600;
	
	this.view = view || document.createElement( 'canvas' ); 
    this.view.width = this.width;
	this.view.height = this.height;  
	this.view.background = "#FF0000";
	
	// deal with losing context..	
    var scope = this;
	this.view.addEventListener('webglcontextlost', function(event) { scope.handleContextLost(event); }, false)
	this.view.addEventListener('webglcontextrestored', function(event) { scope.handleContextRestored(event); }, false)

	this.batchs = [];
	
	try 
 	{
        this.gl = this.view.getContext("experimental-webgl",  {  	
    		 alpha: false
        });
    } 
    catch (e) 
    {
    	throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this);
    }
    
    this.initShaders();
    
    
    var gl = this.gl;
    
    this.batch = new PIXI.WebGLBatch(gl);
   	gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.colorMask(true, true, true, false); 
    
    this.projectionMatrix =  PIXI.mat4.create();
    this.resize(this.width, this.height)
    this.contextLost = false;
}

// constructor
PIXI.WebGLRenderer.constructor = PIXI.WebGLRenderer;

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.initShaders = function() 
{
	var gl = this.gl;
	var fragmentShader = PIXI.CompileFragmentShader(gl, PIXI.shaderFragmentSrc);
	var vertexShader = PIXI.CompileVertexShader(gl, PIXI.shaderVertexSrc);
	
	this.shaderProgram = gl.createProgram();
	
	var shaderProgram = this.shaderProgram;
	
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
	
	shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
    gl.enableVertexAttribArray(shaderProgram.colorAttribute);


    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
	
	PIXI.shaderProgram = this.shaderProgram;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.checkVisibility = function(displayObject, globalVisible)
{
	var children = displayObject.children;
	
	
	for (var i=0; i < children.length; i++) 
	{
		var child = children[i];
		
		// TODO optimize... shouldt need to loop through everything all the time
		var actualVisibility = child.visible && globalVisible;
		
		// everything should have a batch!
		// time to see whats new!
		if(child.textureChange)
		{
			child.textureChange = false;
			if(actualVisibility)
			{
				this.removeDisplayObject(child)
				this.addDisplayObject(child)
			}
			// update texture!!
		}
		
		if(child.cacheVisible != actualVisibility)
		{
			child.cacheVisible = actualVisibility;
			
			if(child.cacheVisible)
			{
				this.addDisplayObject(child);
			}
			else
			{
				this.removeDisplayObject(child);
			}
		}
		
		if(child.children.length > 0)
		{
			this.checkVisibility(child, actualVisibility);
		}
	};
}


/**
 * Renders the stage to its webGL view
 * @method render
 * @param stage {Stage} the PIXI.Stage element to be rendered
 */
PIXI.WebGLRenderer.prototype.render = function(stage)
{
	if(this.contextLost)return;
	
	// update children if need be
	// best to remove first!
	for (var i=0; i < stage.__childrenRemoved.length; i++)
	{
		this.removeDisplayObject(stage.__childrenRemoved[i]);
	}


	// update any textures	
	for (var i=0; i < PIXI.texturesToUpdate.length; i++) this.updateTexture(PIXI.texturesToUpdate[i]);
	
	// empty out the arrays
	stage.__childrenRemoved = [];
	stage.__childrenAdded = [];
	PIXI.texturesToUpdate = [];
	
	// recursivly loop through all items!
	this.checkVisibility(stage, true);
	
	// update the scene graph	
	stage.updateTransform();
	
	var gl = this.gl;
	
	gl.clear(gl.COLOR_BUFFER_BIT)

	gl.clearColor(stage.backgroundColorSplit[0], stage.backgroundColorSplit[1], stage.backgroundColorSplit[2], 1.0);     
	
	// set the correct blend mode!
 	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.projectionMatrix);
   
	// render all the batchs!	
	
	
	var renderable;
	for (var i=0; i < this.batchs.length; i++) 
	{
		renderable = this.batchs[i];
		if(renderable instanceof PIXI.WebGLBatch)
		{
			this.batchs[i].render();
		}
		else if(renderable instanceof PIXI.Strip)
		{
			if(renderable.visible)this.renderStrip(renderable);
		}
	}
	
	// interaction
	// run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.updateTexture = function(texture)
{
	var gl = this.gl;
	
	if(!texture._glTexture)
	{
		texture._glTexture = gl.createTexture();
	}
	
	if(texture.hasLoaded)
	{
		gl.bindTexture(gl.TEXTURE_2D, texture._glTexture);
	 	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	//	gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	
	this.refreshBatchs = true;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.addDisplayObject = function(displayObject)
{
	
	if(!displayObject.stage)return; // means it was removed 
	if(displayObject.__inWebGL)return; //means it is already in webgL
	
	//displayObject.cacheVisible = displayObject.visible;
	
	// TODO if objects parent is not visible then dont add to stage!!!!
	//if(!displayObject.visible)return;

	
	displayObject.batch = null;
	
	//displayObject.cacheVisible = true;
	if(!displayObject.renderable)return;

	// while looping below THE OBJECT MAY NOT HAVE BEEN ADDED
	displayObject.__inWebGL = true;

	/*
	 *  LOOK FOR THE PREVIOUS SPRITE
	 *  This part looks for the closest previous sprite that can go into a batch
	 *  It keeps going back until it finds a sprite or the stage
	 */
	var previousSprite = displayObject;
	do
	{
		if(previousSprite.childIndex == 0)
		{
			previousSprite = previousSprite.parent;
			
		}
		else
		{
			previousSprite = previousSprite.parent.children[previousSprite.childIndex-1];
			// what if the bloop has children???
			while(previousSprite.children.length != 0)
			{
				// keep diggin till we get to the last child
				previousSprite = previousSprite.children[previousSprite.children.length-1];
			}
		}
		
		if(previousSprite == displayObject.stage)break;
	}
	while(!previousSprite.renderable || !previousSprite.__inWebGL)
	//while(!(previousSprite instanceof PIXI.Sprite))

	/*
	 *  LOOK FOR THE NEXT SPRITE
	 *  This part looks for the closest next sprite that can go into a batch
	 *  it keeps looking until it finds a sprite or gets to the end of the display
	 *  scene graph
	 * 
	 *  These look a lot scarier than the actually are...
	 */
	var nextSprite = displayObject;
	do
	{
		// moving forward!
		// if it has no children.. 
		if(nextSprite.children.length == 0)
		{
			// go along to the parent..
			while(nextSprite.childIndex == nextSprite.parent.children.length-1)
			{
				nextSprite = nextSprite.parent;
				if(nextSprite == displayObject.stage)
				{
					nextSprite = null
					break;
				}
			}
			
			if(nextSprite)nextSprite = nextSprite.parent.children[nextSprite.childIndex+1];
			
		}
		else
		{
			nextSprite = nextSprite.children[0];
		}

		if(!nextSprite)break;
	}
	while(!nextSprite.renderable || !nextSprite.__inWebGL)
	
	/*
	 * so now we have the next renderable and the previous renderable
	 * 
	 */
	
	if(displayObject instanceof PIXI.Sprite)
	{
		var previousBatch
		var nextBatch
		
		if(previousSprite instanceof PIXI.Sprite)
		{
			previousBatch = previousSprite.batch;
			
			if(previousBatch)
			{
				if(previousBatch.texture == displayObject.texture.baseTexture && previousBatch.blendMode == displayObject.blendMode)
				{
					previousBatch.insertAfter(displayObject, previousSprite);
					return;
				}
			}
		}
		else
		{
			// TODO reword!
			previousBatch = previousSprite;
		}
	
		if(nextSprite)
		{
			if(nextSprite instanceof PIXI.Sprite)
			{
				nextBatch = nextSprite.batch;
			
				//batch may not exist if item was added to the display list but not to the webGL
				if(nextBatch)
				{
					if(nextBatch.texture == displayObject.texture.baseTexture && nextBatch.blendMode == displayObject.blendMode)
					{
						nextBatch.insertBefore(displayObject, nextSprite);
						return;
					}
					else
					{
						if(nextBatch == previousBatch)
						{
							// THERE IS A SPLIT IN THIS BATCH! //
							var splitBatch = previousBatch.split(nextSprite);
							// COOL!
							// add it back into the array	
							/*
							 * OOPS!
							 * seems the new sprite is in the middle of a batch
							 * lets split it.. 
							 */
							var batch = PIXI._getBatch(this.gl);

							var index = this.batchs.indexOf( previousBatch );
							batch.init(displayObject);
							this.batchs.splice(index+1, 0, batch, splitBatch);
							
							return;
						}
					}
				}
			}
			else
			{
				// TODO re-word!
				nextBatch = nextSprite;
			}
		}
		
		/*
		 * looks like it does not belong to any batch!
		 * but is also not intersecting one..
		 * time to create anew one!
		 */
		
		var batch = PIXI._getBatch(this.gl);
		batch.init(displayObject);

		if(previousBatch) // if this is invalid it means 
		{
			var index = this.batchs.indexOf( previousBatch );
			this.batchs.splice(index+1, 0, batch);
		}
		else
		{
			this.batchs.push(batch);
		}
	
	}
	else if(displayObject instanceof PIXI.Strip)
	{
		// add to a batch!!
		this.initStrip(displayObject);
		this.batchs.push(displayObject);
		
	}

	// if its somthing else... then custom codes!
	this.batchUpdate = true;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.removeDisplayObject = function(displayObject)
{
	//if(displayObject.stage)return;
	displayObject.cacheVisible = false;//displayObject.visible;
	
	if(!displayObject.renderable)return;
	
	displayObject.__inWebGL = false;
		
	/*
	 * removing is a lot quicker..
	 * 
	 */
	var batchToRemove;
	
	if(displayObject instanceof PIXI.Sprite)
	{
		// should always have a batch!
		var batch = displayObject.batch;
		if(!batch)return; // this means the display list has been altered befre rendering
		
		batch.remove(displayObject);
		
		
		if(batch.size==0)
		{
			batchToRemove = batch
		}
	}
	else
	{
		batchToRemove = displayObject;
	}
	
	/*
	 * Looks like there is somthing that needs removing!
	 */
	if(batchToRemove)	
	{
		var index = this.batchs.indexOf( batchToRemove );
		if(index == -1)return;// this means it was added then removed before rendered
		
		// ok so.. check to see if you adjacent batchs should be joined.
		// TODO may optimise?
		if(index == 0 || index == this.batchs.length-1)
		{
			// wha - eva! just get of the empty batch!
			this.batchs.splice(index, 1);
			if(batchToRemove instanceof PIXI.WebGLBatch)PIXI._returnBatch(batchToRemove);
		
			return;
		}
		
		if(this.batchs[index-1] instanceof PIXI.WebGLBatch && this.batchs[index+1] instanceof PIXI.WebGLBatch)
		{
			if(this.batchs[index-1].texture == this.batchs[index+1].texture && this.batchs[index-1].blendMode == this.batchs[index+1].blendMode)
			{
				//console.log("MERGE")
				this.batchs[index-1].merge(this.batchs[index+1]);
				
				if(batchToRemove instanceof PIXI.WebGLBatch)PIXI._returnBatch(batchToRemove);
				PIXI._returnBatch(this.batchs[index+1]);
				this.batchs.splice(index, 2);
				return;
			}
		}
		
		
		this.batchs.splice(index, 1);
		if(batchToRemove instanceof PIXI.WebGLBatch)PIXI._returnBatch(batchToRemove);
	}
	
	
}

/**
 * resizes the webGL view to the specified width and height
 * @method resize
 * @param width {Number} the new width of the webGL view
 * @param height {Number} the new height of the webGL view
 */
PIXI.WebGLRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;
	
	this.view.width = width;
	this.view.height = height;
	
	this.gl.viewport(0, 0, this.width, this.height);	
	
	var projectionMatrix = this.projectionMatrix;
	
	projectionMatrix[0] = 2/this.width;
	projectionMatrix[5] = -2/this.height;
	projectionMatrix[12] = -1;
	projectionMatrix[13] = 1;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.initStrip = function(strip)
{
	// build the strip!
	var gl = this.gl;
	var shaderProgram = this.shaderProgram;
	
	strip._vertexBuffer = gl.createBuffer();
	strip._indexBuffer = gl.createBuffer();
	strip._uvBuffer = gl.createBuffer();
	strip._colorBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.DYNAMIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  strip.uvs, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW);

	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.renderStrip = function(strip)
{
	var gl = this.gl;
	var shaderProgram = this.shaderProgram;
//	mat
	var mat4Real = PIXI.mat3.toMat4(strip.worldTransform);
	PIXI.mat4.transpose(mat4Real);
	PIXI.mat4.multiply(this.projectionMatrix, mat4Real, mat4Real )

	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mat4Real);
  
	if(strip.blendMode == PIXI.blendModes.NORMAL)
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	}
	else
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
	}
	
	if(!strip.dirty)
	{
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, strip.verticies)
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
		
		// update the uvs
	   	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
	    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
			
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
	    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
		
		// dont need to upload!
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
    
	
	}
	else
	{
		strip.dirty = false;
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, strip.verticies, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
		
		// update the uvs
	   	gl.bindBuffer(gl.ARRAY_BUFFER, strip._uvBuffer);
	   	gl.bufferData(gl.ARRAY_BUFFER, strip.uvs, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
			
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, strip.texture.baseTexture._glTexture);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, strip._colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, strip.colors, gl.STATIC_DRAW)
	    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
		
		// dont need to upload!
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, strip._indexBuffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, strip.indices, gl.STATIC_DRAW);
	    
	}
	
	gl.drawElements(gl.TRIANGLE_STRIP, strip.indices.length, gl.UNSIGNED_SHORT, 0);
    
    gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.projectionMatrix);
  
  //  console.log("!!!")
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextLost = function(event)
{
	event.preventDefault();
	this.contextLost = true;
}

/**
 * @private
 */
PIXI.WebGLRenderer.prototype.handleContextRestored = function(event)
{
	this.gl = this.view.getContext("experimental-webgl",  {  	
		alpha: true
    });
        
	this.initShaders();	
	
	for (var i=0; i < PIXI.TextureCache.length; i++) 
	{
		this.updateTexture(PIXI.TextureCache[i]);
	};
	
	for (var i=0; i <  this.batchs.length; i++) 
	{
		this.batchs[i].restoreLostContext(this.gl)//
		this.batchs[i].dirty = true;
	};
	
	PIXI._restoreBatchs(this.gl);
	
	this.contextLost = false;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI._batchs = [];

/**
 * @private
 */
PIXI._getBatch = function(gl)
{
	if(PIXI._batchs.length == 0)
	{
		return new PIXI.WebGLBatch(gl);
	}
	else
	{
		return PIXI._batchs.pop();
	}
}

/**
 * @private
 */
PIXI._returnBatch = function(batch)
{
	batch.clean();	
	PIXI._batchs.push(batch);
}

/**
 * @private
 */
PIXI._restoreBatchs = function(gl)
{
	for (var i=0; i < PIXI._batchs.length; i++) 
	{
	  PIXI._batchs[i].restoreLostContext(gl);
	};
}

/**
 * A WebGLBatch Enables a group of sprites to be drawn using the same settings.
 * if a group of sprites all have the same baseTexture and blendMode then they can be grouped into a batch. All the sprites in a batch can then be drawn in one go by the GPU which is hugely efficient. ALL sprites in the webGL renderer are added to a batch even if the batch only contains one sprite. Batching is handled automatically by the webGL renderer. A good tip is: the smaller the number of batchs there are, the faster the webGL renderer will run. 
 * @class WebGLBatch
 * @param an instance of the webGL context
 * @return {PIXI.renderers.WebGLBatch} WebGLBatch {@link PIXI.renderers.WebGLBatch}
 */
PIXI.WebGLBatch = function(gl)
{
	this.gl = gl;
	
	this.size = 0;

	this.vertexBuffer =  gl.createBuffer();
	this.indexBuffer =  gl.createBuffer();
	this.uvBuffer =  gl.createBuffer();
	this.colorBuffer =  gl.createBuffer();
	this.blendMode = PIXI.blendModes.NORMAL;
	this.dynamicSize = 1;
}


// constructor
PIXI.WebGLBatch.constructor = PIXI.WebGLBatch;

/**
 * Cleans the batch so that is can be returned to an object pool and reused
 */
PIXI.WebGLBatch.prototype.clean = function()
{
	this.verticies = [];
	this.uvs = [];
	this.indices = [];
	this.colors = [];
	//this.sprites = [];
	this.dynamicSize = 1;
	this.texture = null;
	this.last = null;
	this.size = 0;
	
	this.head;
	this.tail;
}

/*
 * recreates the buffers in the event of a context loss
 */
PIXI.WebGLBatch.prototype.restoreLostContext = function(gl)
{
	this.gl = gl;
	this.vertexBuffer =  gl.createBuffer();
	this.indexBuffer =  gl.createBuffer();
	this.uvBuffer =  gl.createBuffer();
	this.colorBuffer =  gl.createBuffer();
}

/**
 * inits the batch's texture and blend mode based if the supplied sprite
 * @method init
 * @param sprite {Sprite} the first sprite to be added to the batch. Only sprites with the same base texture and blend mode will be allowed to be added to this batch
 */	
PIXI.WebGLBatch.prototype.init = function(sprite)
{
	sprite.batch = this;
	this.dirty = true;
	this.blendMode = sprite.blendMode;
	this.texture = sprite.texture.baseTexture;
//	this.sprites.push(sprite);
	this.head = sprite;
	this.tail = sprite;
	this.size = 1;
	
	this.growBatch();
}

/**
 * inserts a sprite before the specified sprite
 * @method insertBefore
 * @param sprite {Sprite} the sprite to be added
 * @param nextSprite {nextSprite} the first sprite will be inserted before this sprite
 */	
PIXI.WebGLBatch.prototype.insertBefore = function(sprite, nextSprite)
{
	this.size++;
	
	sprite.batch = this;
	this.dirty = true;
	var tempPrev = nextSprite.__prev;
	nextSprite.__prev = sprite;
	sprite.__next = nextSprite;
	
	if(tempPrev)
	{
		sprite.__prev = tempPrev;
		tempPrev.__next = sprite;
	}
	else
	{
		this.head = sprite;
		//this.head.__prev = null
	}
}

/**
 * inserts a sprite after the specified sprite
 * @method insertAfter
 * @param sprite {Sprite} the sprite to be added
 * @param  previousSprite {Sprite} the first sprite will be inserted after this sprite
 */	
PIXI.WebGLBatch.prototype.insertAfter = function(sprite, previousSprite)
{
	this.size++;
	
	
	sprite.batch = this;
	this.dirty = true;
	
	var tempNext = previousSprite.__next;
	previousSprite.__next = sprite;
	sprite.__prev = previousSprite;
	
	if(tempNext)
	{
		sprite.__next = tempNext;
		tempNext.__prev = sprite;
	}
	else
	{
		this.tail = sprite
	}
	
}

/**
 * removes a sprite from the batch
 * @method remove
 * @param sprite {Sprite} the sprite to be removed
 */	
PIXI.WebGLBatch.prototype.remove = function(sprite)
{
	this.size--;
	
	if(this.size == 0)
	{
		sprite.batch = null;
		sprite.__prev = null;
		sprite.__next = null;
		return;
	}
	
	if(sprite.__prev)
	{
		sprite.__prev.__next = sprite.__next;
	}
	else
	{
		this.head = sprite.__next;
		this.head.__prev = null;
	}
	
	if(sprite.__next)
	{
		sprite.__next.__prev = sprite.__prev;
	}
	else
	{
		this.tail = sprite.__prev;
		this.tail.__next = null
	}
	
	sprite.batch = null;
	sprite.__next = null;
	sprite.__prev = null;
	this.dirty = true;
}

/**
 * Splits the batch into two with the specified sprite being the start of the new batch.
 * @method split
 * @param sprite {Sprite} the sprite that indicates where the batch should be split
 * @return {WebGLBatch} the new batch
 */
PIXI.WebGLBatch.prototype.split = function(sprite)
{
	
	//console.log("Splitting batch :" + this.size)
//	console.log(sprite)
//	console.log("-------")
	this.dirty = true;
	
	//var val = (this.tail == this.head)
	//console.log(val + " SAME?");
	var batch = new PIXI.WebGLBatch(this.gl)//PIXI._getBatch(this.gl);
	batch.init(sprite);
	batch.tail = this.tail;
	//console.log("id is " +batcheee.id)
	
	this.tail = sprite.__prev;
	this.tail.__next = null;
	
	sprite.__prev = null;
	// return a splite batch!
	//sprite.__prev.__next = null;
	//sprite.__prev = null;
	
	
	// TODO this size is wrong!
	// need to recalculate :/ problem with a linked list!
	// unless it gets calculated in the "clean"?
	
	// need to loop through items as there is no way to know the length on a linked list :/
	var tempSize = 0;
	while(sprite)
	{
		tempSize++;
		sprite.batch = batch;
		sprite = sprite.__next;
	}
	
	batch.size = tempSize;
	this.size -= tempSize;
	
	return batch;
}

/**
 * Merges two batchs together
 * @method merge
 * @param batch {WebGLBatch} the batch that will be merged 
 */
PIXI.WebGLBatch.prototype.merge = function(batch)
{
	this.dirty = true;
	
	this.tail.__next = batch.head;
	batch.head.__prev = this.tail;
	
	this.size += batch.size;
			
	this.tail = batch.tail;
	
	var sprite = batch.head;
	while(sprite)
	{
		sprite.batch = this;
		sprite = sprite.__next;
	}
	
}

/**
 * Grows the size of the batch. As the elements in the batch cannot have a dynamic size this function is used to increase the size of the batch. It also creates a little extra room so that the batch does not need to be resized every time a sprite is added
 * @methos growBatch
 */
PIXI.WebGLBatch.prototype.growBatch = function()
{
	var gl = this.gl;
	if( this.size == 1)
	{
		this.dynamicSize = 1;
	}
	else
	{
		this.dynamicSize = this.size * 1.5
	}
	// grow verts
	this.verticies = new Float32Array(this.dynamicSize * 8);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,this.verticies , gl.DYNAMIC_DRAW);
	
	this.uvs  = new Float32Array( this.dynamicSize * 8 )  
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.uvs , gl.DYNAMIC_DRAW);
	
	this.dirtyUVS = true;
	
	this.colors  = new Float32Array( this.dynamicSize * 4 )  
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.colors , gl.DYNAMIC_DRAW);
	
	this.dirtyColors = true;
	
	this.indices = new Uint16Array(this.dynamicSize * 6); 
	var length = this.indices.length/6;
	
	for (var i=0; i < length; i++) 
	{
	    var index2 = i * 6;
	    var index3 = i * 4;
		this.indices[index2 + 0] = index3 + 0;
		this.indices[index2 + 1] = index3 + 1;
		this.indices[index2 + 2] = index3 + 2;
		this.indices[index2 + 3] = index3 + 0;
		this.indices[index2 + 4] = index3 + 2;
		this.indices[index2 + 5] = index3 + 3;
	};
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
	
}

/**
 * Refresh's all the data in the batch and sync's it with the webGL buffers
 * @method refresh
 */
PIXI.WebGLBatch.prototype.refresh = function()
{
	var gl = this.gl;
	
	if (this.dynamicSize < this.size)
	{
		this.growBatch();
	}

	var indexRun = 0;
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index
	var a, b, c, d, tx, ty
	
	var displayObject = this.head

	while(displayObject)
	{
		index = indexRun * 8;
		
		var texture = displayObject.texture;
			
		var frame = texture.frame;
		var tw = texture.baseTexture.width;
		var th = texture.baseTexture.height;
		
		this.uvs[index + 0] = frame.x / tw;
		this.uvs[index +1] = frame.y / th;
		
		this.uvs[index +2] = (frame.x + frame.width) / tw;
		this.uvs[index +3] = frame.y / th;
		
		this.uvs[index +4] = (frame.x + frame.width) / tw;
		this.uvs[index +5] = (frame.y + frame.height) / th; 
		
		this.uvs[index +6] = frame.x / tw;
		this.uvs[index +7] = (frame.y + frame.height) / th;
		
		displayObject.updateFrame = false;
		
		colorIndex = indexRun * 4;
		this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;
		
		displayObject = displayObject.__next;
		
		indexRun ++;
	}
	
	this.dirtyUVS = true;
	this.dirtyColors = true;
}

/**
 * Updates all the relevant geometry and uploads the data to the GPU
 * @method update
 */
PIXI.WebGLBatch.prototype.update = function()
{
	var gl = this.gl;
	var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index, index2, index3
	
	var a, b, c, d, tx, ty;
	
	var indexRun = 0;
	
	var displayObject = this.head;
	
	while(displayObject)
	{
		width = displayObject.width;
		height = displayObject.height;
		
		aX = displayObject.anchor.x - displayObject.texture.trim.x
		aY = displayObject.anchor.y - displayObject.texture.trim.y
		w0 = width * (1-aX);
		w1 = width * -aX;
		 
		h0 = height * (1-aY);
		h1 = height * -aY;
		 
		index = indexRun * 8;

		worldTransform = displayObject.worldTransform;
	
		a = worldTransform[0];
		b = worldTransform[3];
		c = worldTransform[1];
		d = worldTransform[4];
		tx = worldTransform[2];
		ty = worldTransform[5];
		
		this.verticies[index + 0 ] = a * w1 + c * h1 + tx; 
		this.verticies[index + 1 ] = d * h1 + b * w1 + ty;
		 
		this.verticies[index + 2 ] = a * w0 + c * h1 + tx; 
		this.verticies[index + 3 ] = d * h1 + b * w0 + ty; 
		
		this.verticies[index + 4 ] = a * w0 + c * h0 + tx; 
		this.verticies[index + 5 ] = d * h0 + b * w0 + ty; 
		
		this.verticies[index + 6] =  a * w1 + c * h0 + tx; 
		this.verticies[index + 7] =  d * h0 + b * w1 + ty; 
		
		if(displayObject.updateFrame)
		{
			this.dirtyUVS = true;
			
			var texture = displayObject.texture;
			
			var frame = texture.frame;
			var tw = texture.baseTexture.width;
			var th = texture.baseTexture.height;
			
			this.uvs[index + 0] = frame.x / tw;
			this.uvs[index +1] = frame.y / th;
			
			this.uvs[index +2] = (frame.x + frame.width) / tw;
			this.uvs[index +3] = frame.y / th;
			
			this.uvs[index +4] = (frame.x + frame.width) / tw;
			this.uvs[index +5] = (frame.y + frame.height) / th; 
			
			this.uvs[index +6] = frame.x / tw;
			this.uvs[index +7] = (frame.y + frame.height) / th;
			
			displayObject.updateFrame = false;
		}
		
		// TODO this probably could do with some optimisation....
		if(displayObject.cacheAlpha != displayObject.worldAlpha)
		{
			displayObject.cacheAlpha = displayObject.worldAlpha;
			
			var colorIndex = indexRun * 4;
			this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;
			this.dirtyColors = true;
		}
		
		indexRun++;
		displayObject = displayObject.__next;
   }
}

/**
 * Draws the batch to the frame buffer
 * @method render
 */
PIXI.WebGLBatch.prototype.render = function()
{
	if(this.dirty)
	{
		this.refresh();
		this.dirty = false;
	}
	
	if (this.size == 0)return;
	
	this.update();
	var gl = this.gl;
	
	//TODO optimize this!
	if(this.blendMode == PIXI.blendModes.NORMAL)
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	}
	else
	{
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
	}
	
	var shaderProgram = PIXI.shaderProgram;
	
	// update the verts..
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	// ok..
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.verticies)
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
	
	// update the uvs
   	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);

    if(this.dirtyUVS)
    {
    	this.dirtyUVS = false;
    	gl.bufferSubData(gl.ARRAY_BUFFER,  0, this.uvs);
    }
    
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture._glTexture);
	
	// update color!
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

	if(this.dirtyColors)
    {
    	this.dirtyColors = false;
    	gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.colors);
	}
	
    gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);
	
	// dont need to upload!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	    
    // DRAW THAT this!
    gl.drawElements(gl.TRIANGLES, this.size * 6, gl.UNSIGNED_SHORT, 0);
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * the CanvasRenderer draws the stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
 * Dont forget to add the view to your DOM or you will not see anything :)
 * @class CanvasRenderer
 * @param width {Number} the width of the canvas view
 * @param height {Number} the height of the canvas view
 * @param view {Canvas} the canvas to use as a view, optional
 */
PIXI.CanvasRenderer = function(width, height, view)
{
	/**
	 * The width of the canvas view
	 * @property width
	 * @type Number
	 * @default 800
	 */
	this.width = width || 800;
	/**
	 * The height of the canvas view
	 * @property height
	 * @type Number
	 * @default 600
	 */
	this.height = height || 600;
	
	this.refresh = true;
	
	/**
	 * The canvas element that the everything is drawn to
	 * @property view
	 * @type Canvas
	 */
	this.view = view || document.createElement( 'canvas' ); 
	
	// hack to enable some hardware acceleration!
	//this.view.style["transform"] = "translatez(0)";
	
    this.view.width = this.width;
	this.view.height = this.height;  
	this.count = 0;
	
	/**
	 * The canvas context that the everything is drawn to
	 * @property context
	 * @type Canvas 2d Context
	 */
	this.context = this.view.getContext("2d");
}

// constructor
PIXI.CanvasRenderer.constructor = PIXI.CanvasRenderer;

/**
 * Renders the stage to its canvas view
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
PIXI.CanvasRenderer.prototype.render = function(stage)
{
	// update children if need be
	
	stage.__childrenAdded = [];
	stage.__childrenRemoved = [];
	
	// update textures if need be
	PIXI.texturesToUpdate = [];
	
	this.context.setTransform(1,0,0,1,0,0); 
	stage.updateTransform();
	  
	this.context.setTransform(1,0,0,1,0,0); 
	
	// update the background color
	if(this.view.style.backgroundColor!=stage.backgroundColorString)this.view.style.backgroundColor = stage.backgroundColorString;

	this.context.clearRect(0, 0, this.width, this.height)
    this.renderDisplayObject(stage);
    //as
   
    // run interaction!
	if(stage.interactive)
	{
		//need to add some events!
		if(!stage._interactiveEventsAdded)
		{
			stage._interactiveEventsAdded = true;
			stage.interactionManager.setTarget(this);
		}
	}
}

/**
 * resizes the canvas view to the specified width and height
 * @param the new width of the canvas view
 * @param the new height of the canvas view
 */
PIXI.CanvasRenderer.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;
	
	this.view.width = width;
	this.view.height = height;
}

/**
 * @private
 */
PIXI.CanvasRenderer.prototype.renderDisplayObject = function(displayObject)
{
	var transform = displayObject.worldTransform;
	var context = this.context;
	context.globalCompositeOperation = "source-over"
	var blit = false;
	
	if(!displayObject.visible)return;
		
	if(displayObject instanceof PIXI.Sprite)
	{
		var frame = displayObject.texture.frame;
		
		if(frame)
		{
			context.globalAlpha = displayObject.worldAlpha;
			
			// BLITZ!!!
			/*
			 * if the rotation is 0 then we can blitz it
			 * meaning we dont need to do a transform and also we
			 * can round to the nearest round number for a little extra speed!
			 */
			/*if(displayObject.rotation == 0)
			{
				if(!blit)this.context.setTransform(1,0,0,1,0,0); 
				blit = true;
				context.drawImage(displayObject.texture.baseTexture.image, 
								   frame.x,
								   frame.y,
								   frame.width,
								   frame.height,
								   (transform[2]+ ((displayObject.anchor.x - displayObject.texture.trim.x) * -frame.width) * transform[0]),
								   (transform[5]+ ((displayObject.anchor.y - displayObject.texture.trim.y) * -frame.height)* transform[4]),
								   (displayObject.width * transform[0]),
								   (displayObject.height * transform[4]));
				
			}	
			else
			{*/
				blit = false;
				context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
				context.drawImage(displayObject.texture.baseTexture.source, 
								   frame.x,
								   frame.y,
								   frame.width,
								   frame.height,
								   (displayObject.anchor.x - displayObject.texture.trim.x) * -frame.width, 
								   (displayObject.anchor.y - displayObject.texture.trim.y) * -frame.height,
								   displayObject.width,
								   displayObject.height);
			//}
		}					   
   	}
   	else if(displayObject instanceof PIXI.Strip)
	{
		context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
		this.renderStrip(displayObject);
	}
	
	// render!
	for (var i=0; i < displayObject.children.length; i++) 
	{
		this.renderDisplayObject(displayObject.children[i]);
	}
}

/**
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStripFlat = function(strip)
{
	var context = this.context;
	var verticies = strip.verticies;
	var uvs = strip.uvs;
	
	var length = verticies.length/2;
	this.count++;
	
	context.beginPath();
	for (var i=1; i < length-2; i++) 
	{
		
		// draw some triangles!
		var index = i*2;
		
		 var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
 		 var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];
 		 
		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.lineTo(x2, y2);
		
	};	
	
//	context.globalCompositeOperation = 'lighter';
	context.fillStyle = "#FF0000";
	context.fill();
	context.closePath();
	//context.globalCompositeOperation = 'source-over';	
}

/**
 * @private
 */
PIXI.CanvasRenderer.prototype.renderStrip = function(strip)
{
	var context = this.context;
	//context.globalCompositeOperation = 'lighter';
	// draw triangles!!
	var verticies = strip.verticies;
	var uvs = strip.uvs;
	
	var length = verticies.length/2;
	this.count++;
	for (var i=1; i < length-2; i++) 
	{
		
		// draw some triangles!
		var index = i*2;
		
		 var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
 		 var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];
 		 
  		 var u0 = uvs[index] * strip.texture.width,   u1 = uvs[index+2]* strip.texture.width, u2 = uvs[index+4]* strip.texture.width;
   		 var v0 = uvs[index+1]* strip.texture.height, v1 = uvs[index+3]* strip.texture.height, v2 = uvs[index+5]* strip.texture.height;


		context.save();
		context.beginPath();
		context.moveTo(x0, y0);
		context.lineTo(x1, y1);
		context.lineTo(x2, y2);
		context.closePath();
		
	//	context.fillStyle = "white"//rgb(1, 1, 1,1));
	//	context.fill();
		context.clip();
		
		
        // Compute matrix transform
        var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
        var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
        var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
        var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
        var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
        var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
        var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;
		
		
		
		    
        context.transform(delta_a/delta, delta_d/delta,
                      delta_b/delta, delta_e/delta,
                      delta_c/delta, delta_f/delta);
                 
		context.drawImage(strip.texture.baseTexture.source, 0, 0);
	  	context.restore();
	};
	
//	context.globalCompositeOperation = 'source-over';	
}









/**
 * @author Mat Groves http://matgroves.com/
 */

PIXI.Strip = function(texture, width, height)
{
	PIXI.DisplayObjectContainer.call( this );
	this.texture = texture;
	this.blendMode = PIXI.blendModes.NORMAL;
	
	try
	{
		this.uvs = new Float32Array([0, 1,
				1, 1,
				1, 0, 0,1]);
	
		this.verticies = new Float32Array([0, 0,
						  0,0,
						  0,0, 0,
						  0, 0]);
						  
		this.colors = new Float32Array([1, 1, 1, 1]);
		
		this.indices = new Uint16Array([0, 1, 2, 3]);
	}
	catch(error)
	{
		this.uvs = [0, 1,
				1, 1,
				1, 0, 0,1];
	
		this.verticies = [0, 0,
						  0,0,
						  0,0, 0,
						  0, 0];
						  
		this.colors = [1, 1, 1, 1];
		
		this.indices = [0, 1, 2, 3];
	}
	
	
	/*
	this.uvs = new Float32Array()
	this.verticies = new Float32Array()
	this.colors = new Float32Array()
	this.indices = new Uint16Array()
*/
	this.width = width;
	this.height = height;
	
	// load the texture!
	if(texture.baseTexture.hasLoaded)
	{
		this.width   = this.texture.frame.width;
		this.height  = this.texture.frame.height;
		this.updateFrame = true;
	}
	else
	{
		this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
		this.texture.addEventListener( 'update', this.onTextureUpdateBind );
	}
	
	this.renderable = true;
}

// constructor
PIXI.Strip.constructor = PIXI.Strip;
PIXI.Strip.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

PIXI.Strip.prototype.setTexture = function(texture)
{
	//TODO SET THE TEXTURES
	//TODO VISIBILITY
	
	// stop current texture 
	this.texture = texture;
	this.width   = texture.frame.width;
	this.height  = texture.frame.height;
	this.updateFrame = true;
}

PIXI.Strip.prototype.onTextureUpdate = function(event)
{
	this.updateFrame = true;
}
// some helper functions..


/**
 * @author Mat Groves http://matgroves.com/
 */


PIXI.Rope = function(texture, points)
{
	PIXI.Strip.call( this, texture );
	this.points = points;
	
	try
	{
		this.verticies = new Float32Array( points.length * 4);
		this.uvs = new Float32Array( points.length * 4);
		this.colors = new Float32Array(  points.length * 2);
		this.indices = new Uint16Array( points.length * 2);
	}
	catch(error)
	{
		this.verticies = verticies
		
		this.uvs = uvs
		this.colors = colors
		this.indices = indices
	}
	
	this.refresh();
}


// constructor
PIXI.Rope.constructor = PIXI.Rope;
PIXI.Rope.prototype = Object.create( PIXI.Strip.prototype );

PIXI.Rope.prototype.refresh = function()
{
	var points = this.points;
	if(points.length < 1)return;
	
	var uvs = this.uvs
	var indices = this.indices;
	var colors = this.colors;
	
	var lastPoint = points[0];
	var nextPoint;
	var perp = {x:0, y:0};
	var point = points[0];
	
	this.count-=0.2;
	
	
	uvs[0] = 0
	uvs[1] = 1
	uvs[2] = 0
	uvs[3] = 1
	
	colors[0] = 1;
	colors[1] = 1;
	
	indices[0] = 0;
	indices[1] = 1;
	
	var total = points.length;
		
	for (var i =  1; i < total; i++) 
	{
		
		var point = points[i];
		var index = i * 4;
		// time to do some smart drawing!
		var amount = i/(total-1)
		
		if(i%2)
		{
			uvs[index] = amount;
			uvs[index+1] = 0;
			
			uvs[index+2] = amount
			uvs[index+3] = 1
		
		}
		else
		{
			uvs[index] = amount
			uvs[index+1] = 0
			
			uvs[index+2] = amount
			uvs[index+3] = 1
		}
		
		index = i * 2;
		colors[index] = 1;
		colors[index+1] = 1;
		
		index = i * 2;
		indices[index] = index;
		indices[index + 1] = index + 1;
		
		lastPoint = point;
	}
}

PIXI.Rope.prototype.updateTransform = function()
{
	
	var points = this.points;
	if(points.length < 1)return;
	
	var verticies = this.verticies 
	
	var lastPoint = points[0];
	var nextPoint;
	var perp = {x:0, y:0};
	var point = points[0];
	
	this.count-=0.2;
	
	verticies[0] = point.x + perp.x 
	verticies[1] = point.y + perp.y //+ 200
	verticies[2] = point.x - perp.x 
	verticies[3] = point.y - perp.y//+200
	// time to do some smart drawing!
	
	var total = points.length;
		
	for (var i =  1; i < total; i++) 
	{
		
		var point = points[i];
		var index = i * 4;
		
		if(i < points.length-1)
		{
			nextPoint = points[i+1];
		}
		else
		{
			nextPoint = point
		}
		
		perp.y = -(nextPoint.x - lastPoint.x);
		perp.x = nextPoint.y - lastPoint.y;
		
		var ratio = (1 - (i / (total-1))) * 10;
				if(ratio > 1)ratio = 1;
				
		var perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
		var num = this.texture.height/2//(20 + Math.abs(Math.sin((i + this.count) * 0.3) * 50) )* ratio;
		perp.x /= perpLength;
		perp.y /= perpLength;
	
		perp.x *= num;
		perp.y *= num;
		
		verticies[index] = point.x + perp.x 
		verticies[index+1] = point.y + perp.y
		verticies[index+2] = point.x - perp.x 
		verticies[index+3] = point.y - perp.y

		lastPoint = point;
	}
	
	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

PIXI.Rope.prototype.setTexture = function(texture)
{
	// stop current texture 
	this.texture = texture;
	this.updateFrame = true;
}





/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.BaseTextureCache = {};
PIXI.texturesToUpdate = [];

/**
 * A texture stores the information that represents an image. All textures have a base texture
 * @class BaseTexture
 * @extends EventTarget
 * @constructor
 * @param source {String} the source object (image or canvas)
 */
PIXI.BaseTexture = function(source)
{
	PIXI.EventTarget.call( this );
	
	/*
	 * The url of the texture
	 * @property imageUrl
	 * @type String
	 */
	//this.imageUrl = source.src;
	
	/**
	 * [read only] The width of the base texture set when the image has loaded
	 * @property width
	 * @type Number
	 */
	this.width = 100;
	/**
	 * [read only] The height of the base texture set when the image has loaded
	 * @property height
	 * @type Number
	 */
	this.height = 100;
	
	/**
	 * The source that is loaded to create the texture
	 * @property source
	 * @type Image
	 */
	this.source = source//new Image();
	
	if(this.source instanceof Image)
	{
		if(this.source.complete)
		{
			this.hasLoaded = true;
			this.width = this.source.width;
			this.height = this.source.height;
			
			PIXI.texturesToUpdate.push(this);
		}
		else
		{
			
			var scope = this;
			this.source.onload = function(){
				
				scope.hasLoaded = true;
				scope.width = scope.source.width;
				scope.height = scope.source.height;
			
				// add it to somewhere...
				PIXI.texturesToUpdate.push(scope);
				scope.dispatchEvent( { type: 'loaded', content: scope } );
			}
			//	this.image.src = imageUrl;
		}
	}
	else
	{
		this.hasLoaded = true;
		this.width = this.source.width;
		this.height = this.source.height;
			
		//console.log(">!!",this.width)
		PIXI.texturesToUpdate.push(this);
	}
	
	
	
}

PIXI.BaseTexture.constructor = PIXI.BaseTexture;

PIXI.BaseTexture.prototype.fromImage = function(imageUrl)
{

}

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

PIXI.TextureCache = {};
PIXI.FrameCache = {};

/**
 * A texture stores the information that represents an image or part of an image. It cannot be added to the display list directly. To do this use PIXI.Sprite. If no frame is provided then the whole image is used
 * @class Texture
 * @extends EventTarget
 * @constructor
 * @param baseTexture {BaseTexture}
 * @param frmae {Rectangle}
 */
PIXI.Texture = function(baseTexture, frame)
{
	PIXI.EventTarget.call( this );
	
	if(!frame)
	{
		this.noFrame = true;
		frame = new PIXI.Rectangle(0,0,1,1);
	}
	
	this.trim = new PIXI.Point();
	
	/**
	 * The base texture of this texture
	 * @property baseTexture
	 * @type BaseTexture
	 */
	this.baseTexture = baseTexture;
	
	
	
	/**
	 * The frame specifies the region of the base texture that this texture uses
	 * @property frame
	 * @type #Rectangle
	 */
	this.frame = frame;
	
	this.scope = this;
	
	if(baseTexture.hasLoaded)
	{
		if(this.noFrame)frame = new PIXI.Rectangle(0,0, baseTexture.width, baseTexture.height);
		//console.log(frame)
		
		this.setFrame(frame);
	}
	else
	{
		var scope = this;
		baseTexture.addEventListener( 'loaded', function(){ scope.onBaseTextureLoaded()} );
	}
}

PIXI.Texture.constructor = PIXI.Texture;

PIXI.Texture.prototype.onBaseTextureLoaded = function(event)
{
	var baseTexture = this.baseTexture;
	baseTexture.removeEventListener( 'loaded', this.onLoaded );
	
	if(this.noFrame)this.frame = new PIXI.Rectangle(0,0, baseTexture.width, baseTexture.height);
	this.noFrame = false;
	this.width = this.frame.width;
	this.height = this.frame.height;
	
	this.scope.dispatchEvent( { type: 'update', content: this } );
}

/**
 * Specifies the rectangle region of the baseTexture
 * @method setFrame
 * @param frame {Rectangle}
 */
PIXI.Texture.prototype.setFrame = function(frame)
{
	this.frame = frame;
	this.width = frame.width;
	this.height = frame.height;
	
	if(frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height)
	{
		throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
	}
	//this.updateFrame = true;
}

/**
 * 
 * Helper function that returns a texture based on an image url
 * If the image is not in the texture cache it will be  created and loaded
 * @static
 * @method fromImage
 * @param imageUrl {String} The image url of the texture
 * @return Texture
 */
PIXI.Texture.fromImage = function(imageUrl, crossorigin)
{
	var texture = PIXI.TextureCache[imageUrl];
	
	if(!texture)
	{
		var baseTexture = PIXI.BaseTextureCache[imageUrl];
		if(!baseTexture) 
		{
			var image = new Image();//new Image();
			if (crossorigin)
			{
				image.crossOrigin = '';
			}
			image.src = imageUrl;
			baseTexture = new PIXI.BaseTexture(image);
			PIXI.BaseTextureCache[imageUrl] = baseTexture;
		}
		texture = new PIXI.Texture(baseTexture);
		
		
		PIXI.TextureCache[imageUrl] = texture;
		
		
	}
	
	return texture;
}

/**
 * 
 * Helper function that returns a texture based on a frame id
 * If the frame id is not in the texture cache an error will be thrown
 * @method fromFrame
 * @param frameId {String} The frame id of the texture
 * @return Texture
 */
PIXI.Texture.fromFrame = function(frameId)
{
	var texture = PIXI.TextureCache[frameId];
	if(!texture)throw new Error("The frameId '"+ frameId +"' does not exist in the texture cache " + this);
	return texture;
}

/**
 * 
 * Helper function that returns a texture based on a canvas element
 * If the canvas is not in the texture cache it will be  created and loaded
 * @static
 * @method fromCanvas
 * @param canvas {Canvas} The canvas element source of the texture
 * @return Texture
 */
PIXI.Texture.fromCanvas = function(canvas)
{
	// create a canvas id??
	var texture = PIXI.TextureCache[canvas];
	
	if(!texture)
	{
		var baseTexture = PIXI.BaseTextureCache[canvas];
		if(!baseTexture) 
		{
			baseTexture = new PIXI.BaseTexture(canvas);
			PIXI.BaseTextureCache[canvas] = baseTexture;
		}
		texture = new PIXI.Texture(baseTexture);
		
		PIXI.TextureCache[canvas] = texture;
	}
	
	return texture;
}


/**
 * 
 * Adds a texture to the textureCache. 
 * @method addTextureToCache
 * @param texture {Texture}
 * @param id {String} the id that the texture will be stored against.
 */
PIXI.Texture.addTextureToCache = function(texture, id)
{
	PIXI.TextureCache[id] = texture;
}

/**
 * 
 * Remove a texture from the textureCache. 
 * @method removeTextureFromCache
 * @param id {String} the id of the texture to be removed
 * @return {Texture} the texture that was removed
 */
PIXI.Texture.removeTextureFromCache = function(id)
{
	var texture = PIXI.TextureCache[id]
	PIXI.TextureCache[id] = null;
	return texture;
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The sprite sheet loader is used to load in JSON sprite sheet data
 * To generate the data you can use http://www.codeandweb.com/texturepacker and publish the "JSON" format
 * There is a free version so thats nice, although the paid version is great value for money.
 * It is highly recommended to use Sprite sheets (also know as texture atlas') as it means sprite's can be batched and drawn together for highly increased rendering speed.
 * Once the data has been loaded the frames are stored in the PIXI texture cache and can be accessed though PIXI.Texture.fromFrameId() and PIXI.Sprite.fromFromeId()
 * This loader will also load the image file that the Spritesheet points to as well as the data.
 * When loaded this class will dispatch a 'loaded' event
 * @class SpriteSheetLoader
 * @extends EventTarget
 * @constructor
 * @param url {String} the url of the sprite sheet JSON file
 */

PIXI.SpriteSheetLoader = function(url)
{
	/*
	 * i use texture packer to load the assets..
	 * http://www.codeandweb.com/texturepacker
	 * make sure to set the format as "JSON"
	 */
	PIXI.EventTarget.call( this );
	this.url = url;
	this.baseUrl = url.replace(/[^\/]*$/, '');
	this.texture;
	this.frames = {};
	this.crossorigin = false;
}

// constructor
PIXI.SpriteSheetLoader.constructor = PIXI.SpriteSheetLoader;

/**
 * This will begin loading the JSON file
 */
PIXI.SpriteSheetLoader.prototype.load = function()
{
	this.ajaxRequest = new AjaxRequest();
	var scope = this;
	this.ajaxRequest.onreadystatechange=function()
	{
		scope.onLoaded();
	}
		
	this.ajaxRequest.open("GET", this.url, true)
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/json");
	this.ajaxRequest.send(null)
}

PIXI.SpriteSheetLoader.prototype.onLoaded = function()
{
	if (this.ajaxRequest.readyState==4)
	{
		 if (this.ajaxRequest.status==200 || window.location.href.indexOf("http")==-1)
	 	{
			var jsondata = eval("("+this.ajaxRequest.responseText+")");
			
			var textureUrl = this.baseUrl + jsondata.meta.image;
			
			this.texture = PIXI.Texture.fromImage(textureUrl, this.crossorigin).baseTexture;
			
		//	if(!this.texture)this.texture = new PIXI.Texture(textureUrl);
			
			var frameData = jsondata.frames;
			for (var i in frameData) 
			{
				var rect = frameData[i].frame;
				PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {x:rect.x, y:rect.y, width:rect.w, height:rect.h});
				
				if(frameData[i].trimmed)
				{
					//var realSize = frameData[i].spriteSourceSize;
					PIXI.TextureCache[i].realSize = frameData[i].spriteSourceSize;
					PIXI.TextureCache[i].trim.x = 0// (realSize.x / rect.w)
					// calculate the offset!
				}
//				this.frames[i] = ;
   			}
			
			if(this.texture.hasLoaded)
			{
				this.dispatchEvent( { type: 'loaded', content: this } );
			}
			else
			{
				var scope = this;
				// wait for the texture to load..
				this.texture.addEventListener('loaded', function(){
					
					scope.dispatchEvent( { type: 'loaded', content: scope } );
					
				});
			}
	 	}
	}
	
}


/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A Class that loads a bunch of images / sprite sheet files. Once the assets have been loaded they are added to the PIXI Texture cache and can be accessed easily through PIXI.Texture.fromFrame(), PIXI.Texture.fromImage() and PIXI.Sprite.fromImage(), PIXI.Sprite.fromFromeId()
 * When all items have been loaded this class will dispatch a 'loaded' event
 * As each individual item is loaded this class will dispatch a 'progress' event
 * @class AssetLoader
 * @constructor
 * @extends EventTarget
 * @param assetURLs {Array} an array of image/sprite sheet urls that you would like loaded supported. Supported image formats include "jpeg", "jpg", "png", "gif". Supported sprite sheet data formats only include "JSON" at this time
 */
PIXI.AssetLoader = function(assetURLs)
{
	PIXI.EventTarget.call( this );
	
	/**
	 * The array of asset URLs that are going to be loaded
	 * @property assetURLs
	 * @type Array
	 */
	this.assetURLs = assetURLs;
	
	this.assets = [];

	this.crossorigin = false;
}

/**
Fired when an item has loaded
@event onProgress
**/

/**
Fired when all the assets have loaded
@event onComplete 
**/

// constructor
PIXI.AssetLoader.constructor = PIXI.AssetLoader;

/**
 * This will begin loading the assets sequentially
 */
PIXI.AssetLoader.prototype.load = function()
{
	this.loadCount = this.assetURLs.length;
	var imageTypes = ["jpeg", "jpg", "png", "gif"];
	
	var spriteSheetTypes = ["json"];
	
	for (var i=0; i < this.assetURLs.length; i++) 
	{
		var filename = this.assetURLs[i];
		var fileType = filename.split('.').pop().toLowerCase();
		// what are we loading?
		var type = null;
		
		for (var j=0; j < imageTypes.length; j++) 
		{
			if(fileType == imageTypes[j])
			{
				type = "img";
				break;
			}
		}
		
		if(type != "img")
		{
			for (var j=0; j < spriteSheetTypes.length; j++) 
			{
				if(fileType == spriteSheetTypes[j])
				{
					type = "atlas";
					break;
				}
			}
		}
		
		if(type == "img")
		{
			
			var texture = PIXI.Texture.fromImage(filename, this.crossorigin);
			if(!texture.baseTexture.hasLoaded)
			{
				
				var scope = this;
				texture.baseTexture.addEventListener( 'loaded', function ( event ) 
				{
					scope.onAssetLoaded();
				});
	
				this.assets.push(texture);
			}
			else
			{
				
				// already loaded!
				this.loadCount--;
				// if this hits zero here.. then everything was cached!
				if(this.loadCount == 0)
				{
					this.dispatchEvent( { type: 'onComplete', content: this } );
					if(this.onComplete)this.onComplete();
				}
			}
			
		}
		else if(type == "atlas")
		{
			var spriteSheetLoader = new PIXI.SpriteSheetLoader(filename);
			spriteSheetLoader.crossorigin = this.crossorigin;
			this.assets.push(spriteSheetLoader);
			
			var scope = this;
			spriteSheetLoader.addEventListener( 'loaded', function ( event ) 
			{
				scope.onAssetLoaded();
			});
			
			spriteSheetLoader.load();
		}
		else
		{
			// dont know what the file is! :/
			//this.loadCount--;
			throw new Error(filename + " is an unsupported file type " + this);
		}
		
		//this.assets[i].load();
	};
}

PIXI.AssetLoader.prototype.onAssetLoaded = function()
{
	this.loadCount--;
	this.dispatchEvent( { type: 'onProgress', content: this } );
	if(this.onProgress)this.onProgress();
	
	if(this.loadCount == 0)
	{
		this.dispatchEvent( { type: 'onComplete', content: this } );
		if(this.onComplete)this.onComplete();
	}
}


/**
* @license GrapeFruit Game Engine
* Copyright (c) 2012, Chad Engler
*
* GrapeFruit is licensed under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
*
* Known Limiting Features:
*   - Canvas
*       - IE 9+
*       - FF 2+
*       - Chrome 4+
*       - Safari 3.1+
*       - Opera 9+
*
*   - WebGL
*       - IE 11+
*       - FF 4+
*       - Chrome 8+
*       - Safari 6+
*       - Opera 12+
*
*   - Object.create
*       - IE 9+
*       - FF 4+
*       - Chrome 7+
*       - Safari 5+
*       - Opera 12+
*/

/**
 * The base grapefruit object
 *
 * @module gf
 * @main gf
 */
window.gf = window.gf || {};

/**
 * Point object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Point.html">PIXI.Point</a>
 *
 * @module gf
 * @class Point
 */
gf.Point = PIXI.Point;

/**
 * Texture object, please see <a href="http://www.goodboydigital.com/pixijs/docs/classes/Texture.html">PIXI.Texture</a>
 *
 * @module gf
 * @class Point
 */
gf.Texture = PIXI.Texture;


/**
 * The current grapefruit version
 *
 * @module gf
 * @property version
 * @type String
 */
gf.version = '0.0.2';

/**
 * The cached assets loaded by any loader
 *
 * @module gf
 * @property assetCache
 * @type Object
 */
gf.assetCache = {};

/**
 * Constant types for easy use in code
 *
 * @module gf
 * @class types
 */
gf.types = {
    /**
     * Entity types
     *
     * @property ENTITY
     * @type Object
     */
    ENTITY: {
        PLAYER: 'player',
        ENEMY: 'enemy',
        FRIENDLY: 'friendly',
        NEUTRAL: 'neutral',
        COLLECTABLE: 'collectable'
    },
    /**
     * Layer types
     *
     * @property LAYER
     * @type Object
     */
    LAYER: {
        TILE_LAYER: 'tilelayer',
        OBJECT_GROUP: 'objectgroup' // each zone is defined as an object group
    },
    /**
     * Tile collision types
     *
     * @property COLLISION
     * @type Object
     */
    COLLISION: {
        NONE: 'none',
        SOLID: 'solid',
        CLIFF: 'cliff',
        LADDER: 'ladder',
        WATER: 'water',
        DEEP_WATER: 'deep_water'
    },
    /**
     * Event definitions
     *
     * @property EVENT
     * @type Object
     * @deprecated
     */
    EVENT: {
        ENTITY_MOVE: 'gf.entity.move',
        LOADER_START: 'gf.loader.start',
        LOADER_ERROR: 'gf.loader.error',
        LOADER_PROGRESS: 'gf.loader.progress',
        LOADER_LOAD: 'gf.loader.load',
        LOADER_COMPLETE: 'gf.loader.complete'
    },
    /**
     * Resource types
     *
     * @property RESOURCE
     * @type Object
     * @deprecated
     */
    RESOURCE: {
        AUDIO: 'audio',
        SOUND: 'sound',
        MUSIC: 'music',
        JSON: 'json',
        XML: 'xml',
        WORLD: 'world',
        TEXTURE: 'texture',
        SPRITE: 'sprite',
        IMAGE: 'image'
    },
    /**
     * Bindable keycodes
     *
     * @property KEY
     * @type Object
     */
    KEY: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        DELETE: 46,
        NUM0: 48,
        NUM1: 49,
        NUM2: 50,
        NUM3: 51,
        NUM4: 52,
        NUM5: 53,
        NUM6: 54,
        NUM7: 55,
        NUM8: 56,
        NUM9: 57,
        PLUS: 61,
        A : 65,
        B : 66,
        C : 67,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        H : 72,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        M : 77,
        N : 78,
        O : 79,
        P : 80,
        Q : 81,
        R : 82,
        S : 83,
        T : 84,
        U : 85,
        V : 86,
        W : 87,
        X : 88,
        Y : 89,
        Z : 90,
        NUMPAD0: 96,
        NUMPAD1: 97,
        NUMPAD2: 98,
        NUMPAD3: 99,
        NUMPAD4: 100,
        NUMPAD5: 101,
        NUMPAD6: 102,
        NUMPAD7: 103,
        NUMPAD8: 104,
        NUMPAD9: 105,
        NUMPAD_STAR: 106,
        NUMPAD_PLUS: 107,
        NUMPAD_MINUS: 109,
        NUMPAD_DOT: 110,
        NUMPAD_SLASH: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        MINUS: 173,
        TILDE: 192
    },
    /**
     * Bindable Mouse Events
     *
     * @property MOUSE
     * @type Object
     */
    MOUSE: {
        WHEEL: 'mousewheel',
        MOVE: 'mousemove',
        DOWN: 'mousedown',
        UP: 'mouseup',
        CLICK: 'click',
        DBLCLICK: 'dblclick',
        RCLICK: 'contextmenu',
        CONTEXTMENU: 'contextmenu'
    },
    /**
     * Bindable Touch Events
     *
     * @property TOUCH
     * @type Object
     */
    TOUCH: {
        //WHEEL: undefined,
        MOVE: 'touchmove',
        START: 'touchstart',
        END: 'touchend',
        TAP: 'tap',
        DBLTAP: 'dbltap'
        //RCLICK: undefined,
        //CONTEXTMENU: undefined
    },
    /**
     * Bindable Gamepad Buttons
     *
     * @property GP_BUTTONS
     * @type Object
     */
    GP_BUTTONS: {
        FACE_1: 0, // Face (main) buttons
        FACE_2: 1,
        FACE_3: 2,
        FACE_4: 3,
        LEFT_SHOULDER: 4, // Top shoulder buttons
        RIGHT_SHOULDER: 5,
        LEFT_TRIGGER: 6, // Bottom shoulder buttons
        RIGHT_TRIGGER: 7,
        SELECT: 8,
        START: 9,
        LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
        RIGHT_ANALOGUE_STICK: 11,
        PAD_TOP: 12, // Directional (discrete) pad
        PAD_BOTTOM: 13,
        PAD_LEFT: 14,
        PAD_RIGHT: 15
    },
    getGpButtonName: function(i) {
        for(var k in gf.types.GP_BUTTONS) {
            if(gf.types.GP_BUTTONS[k] === i) {
                return k;
            }
        }

        return '';
    },
    /**
     * Bindable Gamepad Axes
     *
     * @property GP_AXES
     * @type Object
     */
    GP_AXES: {
        LEFT_ANALOGUE_HOR: 0,
        LEFT_ANALOGUE_VERT: 1,
        RIGHT_ANALOGUE_HOR: 2,
        RIGHT_ANALOGUE_VERT: 3
    },
    getGpAxisName: function(i) {
        for(var k in gf.types.GP_AXES) {
            if(gf.types.GP_AXES[k] === i) {
                return k;
            }
        }

        return '';
    }
};

/**
 * Feature detection so we cans witch between renderers, play audio correctly, and other things.
 *
 * @module gf
 * @class support
 */
gf.support = {
    /**
     * The current user agent string
     *
     * @property ua
     * @type String
     */
    ua: navigator.userAgent.toLowerCase(),

    /**
     * Whether or not canvas is supported
     *
     * @property canvas
     * @type bool
     */
    canvas: !!window.CanvasRenderingContext2D,

    /**
     * Whether or not webgl is supported
     *
     * @property webgl
     * @type bool
     */
    webgl: (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch(e) { return false; } })(),

    /**
     * Whether or not web workers are supported
     *
     * @property workers
     * @type bool
     */
    workers: !!window.Worker,

    /**
     * Whether or not the filesystem API is supported
     *
     * @property fileapi
     * @type bool
     */
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    /**
     * Whether or not the audio elements are supported, and if so which types
     *
     * @property audio
     * @type Object
     */
    audio: {
        play: !!document.createElement('audio').canPlayType,
        m4a: false,
        mp3: false,
        ogg: false,
        wav: false
    },

    /**
     * Whether or not local storage is supported
     *
     * @property localStorage
     * @type bool
     */
    localStorage: !!window.localStorage,

    /**
     * Whether or not touch is supported
     *
     * @property touch
     * @type bool
     */
    touch: ('createTouch' in document) || ('ontouchstart' in window) || (navigator.isCocoonJS),

    /**
     * Whether or not the gamepad API is supported
     *
     * @property gamepad
     * @type bool
     */
    gamepad: !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf('Firefox/') !== -1)
};

//additional audio support checks
if(gf.support.audio.play) {
    var a = document.createElement('audio');

    gf.support.audio.m4a = !!a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, '');
    gf.support.audio.mp3 = !!a.canPlayType('audio/mpeg').replace(/no/, '');
    gf.support.audio.ogg = !!a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '');
    gf.support.audio.wav = !!a.canPlayType('audio/wav; codecs="1"').replace(/no/, '');

    //check for specific platforms
    if(gf.support.ua.search('iphone') > -1 || gf.support.ua.search('ipod') > -1 ||
        gf.support.ua.search('ipad') > -1 || gf.support.ua.search('android') > -1) {

        //if on mobile device, without a specific HTML5 acceleration framework
        if(!navigator.isCocoonJS) {
            gf.support.audio.play = false;
        }
    }
}

/**
 * Compares version numbers, useful for plugins to specify a required gf version
 *
 * @module gf
 * @method checkVersion
 * @param first {String} The first version
 * @param second {String} The second version
 * @return {Number}
 *      returns a number representing how far off a version is.
 *
 *      will return a negative value if the first version is behind the second,
 *      the negative number will show how many versions behind it is on largest version
 *      point.
 *      That is: '1.0' compared with '1.1' will yield -1
 *      and    : '1.2.3' compared with '1.2.1' will yield -2
 *
 *      0 is returned if the versions match, and a positive number is returned if
 *      the first version is larger than the second.
 */
gf.checkVersion = function(first, second) {
    second = second || gf.version;

    var a = first.split('.'),
        b = second.split('.'),
        len = Math.min(a.length, b.length),
        result = 0;

    for(var i = 0; i < len; ++i) {
        result = +a[i] - +b[i];
        if(result) break;
    }

    return result ? result : a.length - b.length;
};

/**
 * Inherits the prototype of a parent object.
 * from: https://github.com/isaacs/inherits/blob/master/inherits.js
 *
 * @module gf
 * @method inherits
 * @param child {Object} The Child to inherit the prototype
 * @param parent {Object} The Parent to inherit from
 * @param proto {Object} The prototype
 */
gf.inherits = function(c, p, proto) {
  proto = proto || {};
  var e = {};
  [c.prototype, proto].forEach(function (s) {
    Object.getOwnPropertyNames(s).forEach(function (k) {
      e[k] = Object.getOwnPropertyDescriptor(s, k);
    });
  });
  c.prototype = Object.create(p.prototype, e);
  c['super'] = p;
};

/**
 * High performance clock, from mrdoob's Three.js
 * https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
 *
 * @module gf
 * @class Clock
 * @constructor
 * @param autoStart {Boolean} Automatically start the counter or not
 * @example
 *      var clock = new gf.Clock(false);
 *      //... some code ...
 *      clock.start();
 *      //... some long code ...
 *      var delta = clock.getDelta();
 */
gf.Clock = function(autoStart) {
    this.autoStart = (autoStart !== undefined) ? autoStart : true;

    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;

    this.running = false;
};

gf.inherits(gf.Clock, Object, {
    /**
     * Starts the timer
     *
     * @method start
     * @example
     *      clock.start();
     */
    start: function() {
        this.startTime = window.performance !== undefined && window.performance.now !== undefined ?
                            window.performance.now() : Date.now();

        this.oldTime = this.startTime;
        this.running = true;
    },
    /**
     * Stops the timer
     *
     * @method stop
     * @example
     *      clock.stop();
     */
    stop: function() {
        this.getElapsedTime();
        this.running = false;
    },
    /**
     * Gets the total time that the timer has been running
     *
     * @method getElapsedTime
     * @return {Number} Total ellapsed time in ms
     * @example
     *      clock.getElapsedTime();
     */
    getElapsedTime: function() {
        this.getDelta();

        return this.elapsedTime;
    },
    /**
     * Gets the difference in time since getDelta() was called last
     *
     * @method getDelta
     * @return {Number} Ellapsed time since last call in seconds
     * @example
     *      clock.getDelta();
     */
    getDelta: function() {
        var diff = 0;

        if(this.autoStart && !this.running) {
            this.start();
        }

        if(this.running) {
            var newTime = window.performance !== undefined && window.performance.now !== undefined ?
                                window.performance.now() : Date.now();

            diff = 0.001 * (newTime - this.oldTime);
            this.oldTime = newTime;

            this.elapsedTime += diff;
        }

        return diff;
    }
});

/**
 * Main game object, controls the entire instance of the game
 *
 * @module gf
 * @class game
 */
gf.game = {
    /**
     * Maximum Z value
     *
     * @property MAX_Z
     * @type {Number}
     * @default 500
     * @private
     * @readOnly
     */
    MAX_Z: 500,

    /**
     * Raw PIXI.stage instance
     *
     * @property _stage
     * @type {PIXI.Stage}
     * @private
     * @readOnly
     */
    _stage: new PIXI.Stage(),

    /**
     * Raw gf.Clock instance for internal timing
     *
     * @property _clock
     * @type {gf.Clock}
     * @private
     * @readOnly
     */
    _clock: new gf.Clock(false),

    /**
     * Raw rendering engine
     *
     * @property _renderer
     * @type {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
     * @private
     * @readOnly
     */
    _renderer: null,

    /**
     * Internal ID counter for object IDs
     *
     * @property _nextId
     * @type {Number}
     * @private
     */
    _nextId: Date.now(),

    /**
     * The domElement that we are rendering into (the container)
     *
     * @property _cont
     * @type {DOMELement}
     * @private
     */
    _cont: null,

    /**
     * Tracker to see if the game has been initialized yet
     *
     * @property _initialized
     * @type {Boolean}
     * @private
     */
    _initialized: false,

    /**
     * Initializes a new game instance, only one allowed
     *
     * @method init
     * @param contId {String} The container for the new canvas we will create for the game
     * @param opts {Object} Options such as gravity, friction, and renderMethod
     * @example gf.game.init('myDiv', { renderMethod: 'webgl' });
     * @return {game} Returns itself for chainability
     */
    init: function(contId, opts) {
        if(gf.game._initialized) return;

        opts = opts || {};

        gf.game.gravity = (opts.gravity !== undefined ? opts.gravity : 0.98);
        gf.game.friction = gf.utils.ensureVector(opts.friction);

        var renderMethod = opts.renderMethod;
        //if they speciy a method, check if it is available
        if(renderMethod) {
            if(!gf.support[renderMethod]) {
                throw 'Render method ' + renderMethod + ' is not supported by this browser!';
            }
        }
        //if they don't specify a method, guess the best to use
        else {
            if(gf.support.webgl) renderMethod = 'webgl';
            else if(gf.support.canvas) renderMethod = 'canvas';
            else {
                throw 'Neither WebGL nor Canvas is supported by this browser!';
            }
        }

        //cache the container object
        gf.game._cont = document.getElementById(contId);

        var w = opts.width || gf.utils.getStyle(gf.game._cont, 'width'),
            h = opts.height || gf.utils.getStyle(gf.game._cont, 'height');

        //initialize the correct renderer
        if(renderMethod === 'webgl') {
            gf.game._renderer = new PIXI.WebGLRenderer(w, h);
        } else if(renderMethod === 'canvas') {
            gf.game._renderer = new PIXI.CanvasRenderer(w, h);
        }

        //save rendering method string
        gf.game._renderMethod = renderMethod;

        //initialize the renderer
        gf.game._renderer.view.style['z-index'] = opts.zIndex || 5;
        gf.game._cont.appendChild(gf.game._renderer.view);

        //initialize the controls
        gf.controls.init();

        //initialize the audio player
        gf.audio.init();

        //initialize the GUI (HUD, menus, etc)
        gf.gui.init();

        //initialize gamepad support
        gf.gamepad.init();

        //fps counter
        if(gf.debug.showFps) {
            gf.debug._fpsCounter = new gf.debug.FpsCounter();
            for(var s in gf.debug.fpsStyle) {
                gf.debug._fpsCounter.domElement.style[s] = gf.debug.fpsStyle[s];
            }
            document.body.appendChild(gf.debug._fpsCounter.domElement);
        }

        //debug info
        if(gf.debug._info) {
            gf.debug._info = new gf.debug.Info();
            for(var s2 in gf.debug.infoStyle) {
                gf.debug._info.domElement.style[s2] = gf.debug.infoStyle[s2];
            }
            document.body.appendChild(gf.debug._info.domElement);
        }

        gf.game._initialized = true;

        return this;
    },
    /**
     * Allows you to resize the game area
     *
     * @method resize
     * @param width {Number} Width to resize to
     * @param height {Number} Height to resize to
     */
    resize: function(w, h) {
        if(!gf.game._initialized) return;

        gf.game._renderer.view.style.width = w;
        gf.game._renderer.view.style.height = h;
        gf.game._renderer.resize(w, h);

        for(var i = 0, il = gf.game._stage.children.length; i < il; ++i) {
            var o = gf.game._stage.children[i];

            if(o.visible && o.resize)
                o.resize();
        }
    },
    /**
     * Adds an object to the current stage
     *
     * @method addObject
     * @param obj {Sprite} The sprite to the stage
     * @return {game} Returns itself for chainability
     */
    addObject: function(obj) {
        if(obj) {
            gf.game._stage.addChild(obj);

            if(obj.onAddedToStage)
                obj.onAddedToStage(gf.game._stage);
        }

        return this;
    },
    /**
     * Removes a sprite from the stage
     *
     * @method removeObject
     * @param obj {Sprite} The sprite to the stage
     * @return {game} Returns itself for chainability
     */
    removeObject: function(obj) {
        if(obj) {
            gf.game._stage.removeChild(obj);

            if(obj.onRemovedFromStage)
                obj.onRemovedFromStage(gf.game._stage);
        }

        return this;
    },
    loadWorld: function(world) {
        if(typeof world === 'string'){
            if(gf.assetCache[world]) world = gf.assetCache[world];
            else {
                throw 'World not found in assetCache!';
            }
        }

        gf.game.world = new gf.TiledMap(world);
        gf.game.addObject(gf.game.world);

        if(gf.game.world.properties.music) {
            gf.audio.play(gf.game.world.properties.music, { loop: gf.game.world.properties.music_loop === 'true' });
        }

        return this;
    },
    /**
     * Begins the render loop
     *
     * @method render
     * @return {game} Returns itself for chainability
     */
    render: function() {
        gf.game._clock.start();
        gf.game._tick();

        return this;
    },
    /**
     * Check if passed entity collides with any others
     *
     * @method checkCollisions
     * @param obj {Entity} The sprite to the stage
     * @return {Array} Returns an array of colliders
     */
    checkCollisions: function(ent) {
        var colliders = [];

        if(!ent.isCollidable) return colliders;

        for(var i = 0, il = gf.game._stage.children; i < il; ++i) {
            var o = gf.game._stage.children[i];

            //check if this object collides with any others
            if(o.visible && o.collidable && o.entity && (o !== ent)) {
                var collisionVector = o.checkCollision(ent);
                if(collisionVector.x !== 0 || collisionVector.y !== 0) {
                    colliders.push({
                        entity: o,
                        vector: collisionVector
                    });
                    o.onCollision(ent);
                }
            }
        }

        return colliders;
    },
    /**
     * locks the camera on an entity
     *
     * @method cameraTrack
     * @param ent {Entity} The sprite to the stage
     * @return {game} Returns itself for chainability
     */
    cameraTrack: function(ent) {
        if(ent.entity) {
            return this;
            //TODO
            //see: https://github.com/GoodBoyDigital/pixi.js/issues/48#issuecomment-15962276
        }

        return this;
    },
    /**
     * The looping render tick
     *
     * @method _tick
     * @private
     */
    _tick: function() {
        //start render loop
        window.requestAnimFrame(gf.game._tick);

        //get clock delta
        gf.game._delta = gf.game._clock.getDelta();

        //update fps box
        if(gf.debug._fpsCounter) gf.debug._fpsCounter.update();

        //update debug info
        if(gf.debug._info) gf.debug._info.update();

        //update the HUD
        if(gf.HUD.initialized) gf.HUD.update();

        //update the gamepad poller
        gf.gamepad.update();

        //update each object
        for(var i = 0, il = gf.game._stage.children.length; i < il; ++i) {
            var o = gf.game._stage.children[i];

            if(o.visible && o.update)
                o.update();
        }

        //render scene
        gf.game._renderer.render(gf.game._stage);
    }
};
/**
 * The base display object, that anything being put on the screen inherits from
 *
 * @module gf
 * @class DisplayObject
 * @extends PIXI.DisplayObjectContainer
 * @constructor
 */
gf.DisplayObject = function() {
    PIXI.DisplayObjectContainer.call(this);
};

gf.inherits(gf.DisplayObject, PIXI.DisplayObjectContainer, {
    update: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.update)
                o.update();
        }
    },
    resize: function() {
        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o.visible && o.resize)
                o.resize();
        }
    },
    removeAllChildren: function() {
        //remove each from the stage
        for(var i = 0, il = this.children.length; i < il; ++i) {
            if(this.stage) this.stage.__removeChild(this.children[i]);
        }

        //clear the list and let the GC clean up
        this.children = [];
    }
});
/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @module gf
 * @class utils
 */
 gf.utils = {
    _arrayDelim: '|',
    /**
     * Ensures that some input is a vector, converts strings and arrays into vector objects
     *
     * @method ensureVector
     * @param vec {Array|String|Vector} The object to ensure becomes a vector
     * @return {Vector} The vector created with the passed values, if the values can't be made
     *      into a Vector, then a new Vector with 0,0 is returned
     */
    ensureVector: function(vec) {
        if(vec instanceof gf.Vector)
            return vec;

        var a = vec;
        if(typeof vec === 'string')
            a = vec.split(gf.utils._arrayDelim);

        if(a instanceof Array) {
            switch(a.length) {
                case 1: return new gf.Vector(parseInt(a[0], 10) || 0, parseInt(a[0], 10) || 0);
                case 2: return new gf.Vector(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
            }
        }
        else {
            return new gf.Vector();
        }
    },
    /**
     * An empty function that performs no action
     *
     * @method noop
     */
    noop: function() {},
    /**
     * Performs an ajax request, and manages the callbacks passed in
     *
     * @method ajax
     * @param settings {Object} The settings of the ajax request, similar to jQuery's ajax function
     * @return {AjaxRequest} An XHR object
     */
    ajax: function(sets) {
        //base settings
        sets = sets || {};
        sets.method = sets.method || 'GET';
        sets.dataType = sets.dataType || 'text';

        //callbacks
        sets.progress = sets.progress || gf.utils.noop;
        sets.load = sets.load || gf.utils.noop;
        sets.error = sets.error || gf.utils.noop;
        sets.abort = sets.abort || gf.utils.noop;
        sets.complete = sets.complete || gf.utils.noop;

        var xhr = new gf.utils.AjaxRequest();

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                var res = xhr.responseText,
                    err = null;

                if(sets.dataType === 'json') {
                    try { res = JSON.parse(res); }
                    catch(e) { err = e; }
                }

                if(xhr.status !== 200)
                    err = 'Non-200 status code returned: ' + xhr.status;

                if(err) {
                    if(sets.error) sets.error.call(xhr, err);
                } else {
                    if(sets.load) sets.load.call(xhr, res);
                }
            }
        };

        xhr.open(sets.method, sets.url, true);
        xhr.send();

        return xhr;
    },
    /**
     * Wraps XMLHttpRequest in a cross-browser way.
     *
     * @method AjaxRequest
     * @return {ActiveXObject|XMLHttpRequest}
     */
    //from pixi.js
    AjaxRequest: function() {
        //activeX versions to check for in IE
        var activexmodes = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];

        //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
        if(window.ActiveXObject) {
            for(var i=0; i<activexmodes.length; i++) {
                try {
                    return new window.ActiveXObject(activexmodes[i]);
                }
                catch(e) {
                    //suppress error
                }
            }
        }
        // if Mozilla, Safari etc
        else if(window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        else {
            return false;
        }
    },
    /**
     * This will take values and override the passed obj's properties with those values.
     * The difference from a normal object extend is that this will try to massage the passed
     * value into the same type as the object's property. Also if the key for the value is not
     * in the original object, it is not copied.
     *
     * @method setValues
     * @param obj {Object} The object to extend the values into
     * @param values {Object} The values to put into the object
     * @return {Object} returns the updated object
     * @example
     *      var obj = { vec: new gf.Vector(), arr: [] },
     *          vals = { vec: '2|5', arr: '5|10|11' };
     *      gf.setValues(obj, vals);
     *      //now obj is:
     *      // { vec: gf.Vector(2, 5), arr: [5, 10, 11] }
     *      
     */
    //similar to https://github.com/mrdoob/three.js/blob/master/src/materials/Material.js#L42
    setValues: function(obj, values) {
        if(!values) return;

        for(var key in values) {
            var newVal = values[key];

            if(newVal === undefined) {
                //console.warn('Object parameter '' + key + '' is undefined.');
                continue;
            }
            if(key in obj) {
                var curVal = obj[key];

                //massage strings into numbers
                if(typeof curVal === 'number' && typeof newVal === 'string') {
                    var n;
                    if(newVal.indexOf('0x') === 0) n = parseInt(newVal, 16);
                    else n = parseInt(newVal, 10);

                    if(!isNaN(n))
                        obj[key] = n;
                    /*else
                        console.warn('Object parameter '' + key + '' evaluated to NaN, using default. Value passed: ' + newVal);*/

                }
                //massage vectors
                else if(curVal instanceof gf.Vector && newVal instanceof Array) {
                    curVal.set(parseInt(newVal[0], 10) || 0, parseInt(newVal[1], 10) || parseInt(newVal[0], 10) || 0);
                } else if(curVal instanceof gf.Vector && typeof newVal === 'string') {
                    var a = newVal.split(gf.utils._arrayDelim, 2);
                    curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || parseInt(a[0], 10) || 0);
                } else if(curVal instanceof gf.Vector && typeof newVal === 'number') {
                    curVal.set(newVal, newVal);
                }
                //massage points
                else if(curVal instanceof gf.Point && newVal instanceof Array) {
                    curVal.x = parseInt(newVal[0], 10) || 0;
                    curVal.y = parseInt(newVal[1], 10) || parseInt(newVal[0], 10) || 0;
                } else if(curVal instanceof gf.Point && typeof newVal === 'string') {
                    var a2 = newVal.split(gf.utils._arrayDelim, 2);
                    curVal.x = parseInt(a2[0], 10) || 0;
                    curVal.y = parseInt(a2[1], 10) || parseInt(a2[0], 10) || 0;
                } else if(curVal instanceof gf.Point && typeof newVal === 'number') {
                    curVal.x = newVal;
                    curVal.y = newVal;
                }
                //massage arrays
                else if(curVal instanceof Array && typeof newVal === 'string') {
                    obj[key] = newVal.split(gf.utils._arrayDelim);
                    for(var i = 0, il = obj[key].length; i < il; ++i) {
                        var val = obj[key][i];
                        if(!isNaN(val)) obj[key][i] = parseInt(val, 10);
                    }
                } else {
                    obj[key] = newVal;
                }
            }
        }

        return obj;
    },
    /**
     * Clamps a number between two values.
     *
     * @method clamp
     * @param num {Number} The number to clamp
     * @param min {Number} The minimum value the number is allowed to be
     * @param max {Number} The maximum value the number is allowed to be
     * @return {Number} The clamped value
     */
    clamp: function(n, min, max) {
        return Math.max(min, Math.min(max, n));
    },
    ////////////////////////////////////////////////////////////////////////////////
    // DOM Manipulation stuff will be removed with the GUI rewrite
    getPosition: function(o) {
        var l = o.offsetLeft,
            t = o.offsetTop;

        while(!!(o = o.offsetParent)) {
            l += o.offsetLeft;
            t += o.offsetTop;
        }

        return {
            top: t,
            left: l
        };
    },
    getStyle: function(elm, prop) {
        var style = window.getComputedStyle(elm),
            val = style.getPropertyValue(prop).replace(/px|em|%|pt/, '');

        if(!isNaN(val))
            val = parseInt(val, 10);

        return val;
    },
    setStyle: function(elm, prop, value) {
        var style = window.getComputedStyle(elm);

        return style.setPropertyValue(prop, value);
    },
    //Some things stolen from jQuery
    getOffset: function(elem) {
        var doc = elem && elem.ownerDocument,
            docElem = doc.documentElement,
            box;

        try {
            box = elem.getBoundingClientRect();
        } catch(e) {}

        // Make sure we're not dealing with a disconnected DOM node
        if (!box || !(docElem !== elem && (docElem.contains ? docElem.contains(elem) : true))) {  //(!box || !jQuery.contains(docElem, elem)) {
            return box ? {
                top: box.top,
                left: box.left
            } : {
                top: 0,
                left: 0
            };
        }

        var body = doc.body,
            win = window,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
            top = box.top + scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left
        };
    }
    /////////////////////////////////////////////////////////////////////////////
};

/**
 * A 2d Vector implementation stolen directly from mrdoob's THREE.js
 * thanks mrdoob: https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js
 *
 * @module gf
 * @class Vector
 * @constructor
 * @param x {Number} The x component of the vector
 * @param y {Number} The y component of the vector
 */
gf.Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

gf.inherits(gf.Vector, Object, {
    /**
     * Sets the value of the vector
     *
     * @method set
     * @param x {Number} The x component of the vector
     * @param y {Number} The y component of the vector
     * @return {Vector} Returns itself
     */
    set: function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    },
    /**
     * Sets the X value of the vector
     *
     * @method setX
     * @param x {Number} The x component of the vector
     * @return {Vector} Returns itself
     */
    setX: function(x) {
        this.x = x;

        return this;
    },
    /**
     * Sets the Y value of the vector
     *
     * @method setY
     * @param y {Number} The y component of the vector
     * @return {Vector} Returns itself
     */
    setY: function(y) {
        this.y = y;

        return this;
    },
    /**
     * Sets a component value of the vector
     *
     * @method setComponent
     * @param index {Number} The index of the component to set (0 = x, 1 = y)
     * @param value {Number} The value to set the component to
     * @return {Vector} Returns itself
     */
    setComponent: function(index, value) {
        switch(index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('index is out of range: ' + index);
        }

        return this;
    },
    /**
     * Gets a component value of the vector
     *
     * @method getComponent
     * @param index {Number} The index of the component to set (0 = x, 1 = y)
     * @return {Number} Returns the component value
     */
    getComponent: function(index) {
        switch(index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);
        }
    },
    /**
     * Copies the passed vector's components to this vector
     *
     * @method copy
     * @param vector {Vector} The vector to copy the values from
     * @return {Vector} Returns itself
     */
    copy: function(v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    },
    /**
     * Adds a vector to this one
     *
     * @method add
     * @param vector {Vector} The vector to add to this one
     * @return {Vector} Returns itself
     */
    add: function(v) {
        this.x += v.x;
        this.y += v.y;

        return this;
    },
    /**
     * Adds two vectors to each other and stores the result in this vector
     *
     * @method addVectors
     * @param vector1 {Vector}
     * @param vector2 {Vector}
     * @return {Vector} Returns itself
     */
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;
    },
    /**
     * Adds a scalar value to the x and y components of this vector
     *
     * @method addScalar
     * @param scalar {Number} The scalar value to add
     * @return {Vector} Returns itself
     */
    addScalar: function(s) {
        this.x += s;
        this.y += s;

        return this;
    },
    /**
     * Subtracts a vector from this one
     *
     * @method sub
     * @param vector {Vector} The vector to subtract from this one
     * @return {Vector} Returns itself
     */
    sub: function(v) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    },
    /**
     * Subtracts two vectors from each other and stores the result in this vector
     *
     * @method subVectors
     * @param vector1 {Vector}
     * @param vector2 {Vector}
     * @return {Vector} Returns itself
     */
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    },
    /**
     * Multiplies the x and y components of this vector by a scalar value
     *
     * @method multiplyScalar
     * @param scalar {Number} The value to multiply by
     * @return {Vector} Returns itself
     */
    multiplyScalar: function(s) {
        this.x *= s;
        this.y *= s;

        return this;
    },
    /**
     * Divides the x and y components of this vector by a scalar value
     *
     * @method divideScalar
     * @param scalar {Number} The value to divide by
     * @return {Vector} Returns itself
     */
    divideScalar: function(s) {
        if(s !== 0) {
            this.x /= s;
            this.y /= s;
        } else {
            this.set(0, 0);
        }

        return this;
    },
    /**
     * Sets this vector components to the minimum value when compared to the passed vector's components
     *
     * @method min
     * @param vector {Vector} The vector to compare to
     * @return {Vector} Returns itself
     */
    min: function(v) {
        if(this.x > v.x) {
            this.x = v.x;
        }

        if(this.y > v.y) {
            this.y = v.y;
        }

        return this;
    },
    /**
     * Sets this vector components to the maximum value when compared to the passed vector's components
     *
     * @method max
     * @param vector {Vector} The vector to compare to
     * @return {Vector} Returns itself
     */
    max: function(v) {
        if(this.x < v.x) {
            this.x = v.x;
        }

        if(this.y < v.y) {
            this.y = v.y;
        }

        return this;
    },
    /**
     * Clamps the vectors components to be between min and max
     *
     * @method max
     * @param min {Number} The minimum value a component can be
     * @param max {Number} The maximum value a component can be
     * @return {Vector} Returns itself
     */
    clamp: function(min, max) {
        // This function assumes min < max, if this assumption
        //isn't true it will not operate correctly
        if(this.x < min.x) {
            this.x = min.x;
        } else if(this.x > max.x) {
            this.x = max.x;
        }

        if(this.y < min.y) {
            this.y = min.y;
        } else if(this.y > max.y) {
            this.y = max.y;
        }

        return this;
    },
    /**
     * Negates this vector (multiplies by -1)
     *
     * @method negate
     * @return {Vector} Returns itself
     */
    negate: function() {
        return this.multiplyScalar(-1);
    },
    /**
     * Performs the dot product between this vector and the passed one and returns the result
     *
     * @method dot
     * @param vector {Vector}
     * @return {Number} Returns the dot product
     */
    dot: function(v) {
        return this.x * v.x + this.y * v.y;
    },
    /**
     * Calculates the square length of the vector
     *
     * @method lengthSq
     * @return {Number} Returns the square length of the vector
     */
    lengthSq: function() {
        return this.x * this.x + this.y * this.y;
    },
    /**
     * Calculates the length of the vector
     *
     * @method length
     * @return {Number} Returns the length of the vector
     */
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    /**
     * Normalizes this vector (divides by its length)
     *
     * @method normalize
     * @return {Vector} Returns the normalized vector
     */
    normalize: function() {
        return this.divideScalar(this.length());
    },
    /**
     * Calculates the distance to the passed vector
     *
     * @method distanceTo
     * @param vector {Vector}
     * @return {Number} The distance
     */
    distanceTo: function(v) {
        return Math.sqrt(this.distanceToSquared(v));
    },
    /**
     * Calculates the square distance to the passed vector
     *
     * @method distanceToSquared
     * @param vector {Vector}
     * @return {Number} The square distance
     */
    distanceToSquared: function(v) {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    },
    /**
     * Sets the length of the vector
     *
     * @method setLength
     * @param length {Number}
     * @return {Vector} Returns itself
     */
    setLength: function(l) {
        var oldLength = this.length();

        if(oldLength !== 0 && l !== oldLength) {
            this.multiplyScalar(l / oldLength);
        }

        return this;
    },
    /**
     * Performs a linear interpolation between this vector and the passed vector
     *
     * @method lerp
     * @param vector {Vector}
     * @param alpha {Number}
     * @return {Vector} Returns itself
     */
    lerp: function(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;

        return this;
    },
    /**
     * Checks if this vector is equal to another
     *
     * @method equals
     * @param vector {Vector} The vector to compare with
     * @return {Vector} Returns itself
     */
    equals: function(v) {
        return ((v.x === this.x) && (v.y === this.y));
    },
    /**
     * Returns an array with the components of this vector as the elements
     *
     * @method toArray
     * @return {Vector} Returns an array of [x,y] form
     */
    toArray: function () {
        return [this.x, this.y];
    },
    /**
     * Creates a new instance of Vector, with the same components as this vector
     *
     * @method clone
     * @return {Vector} Returns a new Vector with the same values
     */
    clone: function () {
        return new gf.Vector(this.x, this.y);
    }
});

(function() {
    //the list of audio channels
    var playing = {},
        resetTime = 0,
        settings = {
            loop: false,
            volume: 1.0
        };

    function getOpen(id) {
        var chans = playing[id];

        //find an open channel
        for(var i = 0, il = chans.length; i < il; ++i) {
            var clip = chans[i++];
            if(clip.ended || !clip.currentTime) {
                clip.currentTime = resetTime;
                return clip;
            }
        }

        //create a new channel
        var sound = new Audio(chans[0].src);
        sound.preload = 'auto';
        sound.load();
        sound.channel = chans.length;
        chans.push(sound);

        return chans[chans.length - 1];
    }

    /**
     * Grapefruit Audio API, provides an easy interface to use HTML5 Audio
     *
     * @module gf
     * @class audio
     */
    gf.audio = {
        //have we initialized the audio already?
        _initialized: false,

        /**
         * Initializes the audio component
         *
         * @method init
         * @private
         */
        init: function() {
            if(gf.audio._initialized) return;

            gf.audio._initialized = true;
        },
        /**
         * Plays a loaded audio clip
         *
         * @method play
         * @param id {String|Object} The id of the sound clip to play. You can also pass the object returned from a previous play
         * @param options {Object} The options object you can pass properties like "loop," "volume," "channel"
         * @param callback {Function} The callback to call after the sound finishes playing
         * @return {Object} The object returned can be passed to any audio function in the
         *      first parameter to control that audio clip
         */
        play: function(id, opts, cb) {
            if(!gf.assetCache[id]) {
                throw 'Tried to play unloaded audio: ' + id;
            }

            if(typeof opts === 'function') {
                cb = opts;
                opts = null;
            }

            if(typeof id === 'object') {
                opts = id;
                id = opts.id;
            }

            opts = opts || {};

            opts.id = id;
            opts.loop = opts.loop || settings.loop;
            opts.volume = opts.volume || settings.volume;

            //resume a paused channel
            if(opts.channel !== undefined && playing[id]) {
                playing[id][opts.channel].play();
                return opts;
            }

            //we haven't played this sound yet, create a new channel list
            if(!playing[id]) {
                playing[id] = [gf.assetCache[id]];
                playing[id][0].channel = 0;
            }

            var sound = getOpen(id);
            sound.loop = opts.loop;
            sound.volume = opts.volume;
            sound.play();

            opts.channel = sound.channel;

            if(!opts.loop) {
                var ended = function() {
                    sound.removeEventListener('ended', ended, false);
                    gf.audio.stop(opts);
                    if(cb) cb();
                };
                sound.addEventListener('ended', ended, false);
            }

            return opts;
        },
        /**
         * Stops a playing audio clip
         *
         * @method stop
         * @param id {String|Object} The id of the sound clip to stop. You can also pass the object returned from a previous play
         * @param channel {Number} The channel that the clip is playing on (not needed if you pass the clip object as the first parameter)
         */
        stop: function(id, channel) {
            if(typeof id === 'object') {
                channel = id.channel;
                id = id.id;
            }

            if(!playing[id]) return;
            if(!playing[id][channel]) return;

            playing[id][channel].pause();
            playing[id][channel].currentTime = resetTime;
            playing[id][channel].ended = true;
        },
        /**
         * Pauses a playing audio clip
         *
         * @method stop
         * @param id {String|Object} The id of the sound clip to pause. You can also pass the object returned from a previous play
         * @param channel {Number} The channel that the clip is playing on (not needed if you pass the clip object as the first parameter)
         */
        pause: function(id, channel) {
            if(typeof id === 'object') {
                channel = id.channel;
                id = id.id;
            }

            if(!playing[id]) return;
            if(!playing[id][channel]) return;

            playing[id][channel].pause();
        },
        /**
         * Plays all currently paused or stopped audio clips (only ones that have previously been started with gf.play)
         *
         * @method playAll
         */
        playAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.play({ id: sid, channel: i });
            }
        },
        /**
         * Stops all currently paused or playing audio clips
         *
         * @method stopAll
         */
        stopAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.stop(sid, i);
            }
        },
        /**
         * Pauses all currently playing audio clips
         *
         * @method pauseAll
         */
        pauseAll: function() {
            for(var sid in playing) {
                var chans = playing[sid];

                for(var i = 0, il = chans.length; i < il; ++i)
                    gf.audio.pause(sid, i);
            }
        }
    };
})();
(function() {
    gf.controls = {
        key: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many keys an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {}
        },
        mouse: {
            //maps a mouse event to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many keys an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //the current screen touches
            touches: [{ x: 0, y: 0 }],
            //the position of the mouse
            position: new gf.Vector(0, 0),
            //the offset of the mouse
            offset: null
        },
        gpButton: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many buttons an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //track the status of each button
            buttons: {}
        },
        gpStick: {
            //maps a keycode to an action
            binds: {},
            //maps an action to callbacks
            callbacks: {},
            //count of how many buttons an action is bound to
            bindCount: {},
            //tracks the status of each action
            status: {},
            //track the status of the axes
            axes: {}
        },

        //have we initialized the controls already?
        _initialized: false,

        init: function() {
            if(gf.controls._initialized) return;

            gf.controls.mouse.offset = gf.utils.getOffset(gf.game._renderer.view);

            document.addEventListener('keydown', gf.controls.onKeyDown, false);
            document.addEventListener('keyup', gf.controls.onKeyUp, false);

            //bind all the mouse/touch events
            if(gf.support.touch) {
                gf.game._cont.addEventListener('touchmove', gf.controls.onMouseMove, false);
                for(var k in gf.types.TOUCH) {
                    if(gf.types.TOUCH[k] === 'touchmove') return;
                    gf.game._cont.addEventListener(gf.types.TOUCH[k], gf.controls.onTouch, false);
                }
            } else {
                gf.game._cont.addEventListener('mousemove', gf.controls.onMouseMove, false);
                document.addEventListener('mousewheel', gf.controls.onMouseWheel, false);
                for(var k2 in gf.types.MOUSE) {
                    var v = gf.types.MOUSE[k2];
                    if(v === 'mousemove'|| v === 'mousewheel') return;
                    gf.game._cont.addEventListener(v, gf.controls.onMouse, false);
                }
            }

            gf.controls._initialized = true;
        },
        //binds an action to a keycode
        bindKey: function(keycode, action, fn) {
            return gf.controls._doBind('key', keycode, action, fn);
        },
        //binds an action to mouse event
        bindMouse: function(evt, action, fn) {
            return gf.controls._doBind('mouse', evt, action, fn);
        },
        //binds an action to a gamepad button
        bindGamepadButton: function(code, action, fn) {
            return gf.controls._doBind('gpButton', code, action, fn);
        },
        //bind an action to a stick movement
        bindGamepadStick: function(code, negative, action, fn) {
            negative = !!negative; //I want negative to be true/false, not truthy or falsey

            return gf.controls._doBind('gpStick', code.toString() + negative, action, fn);
        },
        //unbind an action from a keycode
        unbindKey: function(keycode, action) {
            return gf.controls._doUnbind('key', keycode, action);
        },
        //unbind an action to mouse event
        unbindMouse: function(evt, action) {
            return gf.controls._doUnbind('mouse', evt, action);
        },
        //unbind an action from a gamepad button
        unbindGamepadButton: function(code, action) {
            return gf.controls._doUnbind('gpButton', code, action);
        },
        //bind an action to a stick movement
        unbindGamepadStick: function(code, negative, action) {
            negative = !!negative; //I want negative to be true/false, not truthy or falsey

            return gf.controls._doUnbind('gpStick', code.toString() + negative, action);
        },
        //on keydown event set gf.controls keycode's action as active
        //and call any registered callbacks
        onKeyDown: function(e, override) {
            var which = override || e.keyCode || e.which;

            //if gf.controls key is bound
            if(gf.controls.key.binds[which]) {
                //Don't fire events for repeats on hold
                if(gf.controls.key.status[gf.controls.key.binds[which]] === true)
                    return gf.controls.preventDefault(e);

                //track that gf.controls action is active
                gf.controls.key.status[gf.controls.key.binds[which]] = true;

                //call each callback
                var cbs = gf.controls.key.callbacks[gf.controls.key.binds[which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        if(cbs[i].code === which)
                            cbs[i].fn(gf.controls.key.binds[which], true);
                    }
                }

                return gf.controls.preventDefault(e);
            }

            return gf.controls;
        },
        onKeyUp: function(e, override) {
            var which = override || e.keyCode || e.which;

            //if gf.controls key is bound
            if(gf.controls.key.binds[which]) {
                //Don't fire events for repeats
                if(gf.controls.key.status[gf.controls.key.binds[which]] === false)
                    return gf.controls.preventDefault(e);

                //track that gf.controls action is active
                gf.controls.key.status[gf.controls.key.binds[which]] = false;

                //call each callback
                var cbs = gf.controls.key.callbacks[gf.controls.key.binds[which]];
                if(cbs) {
                    for(var i = 0, il = cbs.length; i < il; ++i) {
                        if(cbs[i].code === which)
                            cbs[i].fn(gf.controls.key.binds[which], false);
                    }
                }

                return gf.controls.preventDefault(e);
            }

            return gf.controls;
        },
        //mouse/touch move event
        onMouseMove: function(e) {
            gf.controls.updateCoords(e);

            if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);

            return true;
        },
        //generic mouse event (click, down, up, etc)
        onMouse: function(e) {
            gf.controls.updateCoords(e);

            if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);

            //incase touch event button is undefined
            var keycode = gf.controls.mouse.binds[e.button || 0];

            if(keycode) {
                if(e.type === 'mousedown' || e.type === 'touchstart')
                    return gf.controls.onKeyDown(e, keycode);
                else
                    return gf.controls.onKeyUp(e, keycode);
            }

            return true;
        },
        onMouseWheel: function(e) {
            if(e.target === gf.game._renderer.domElement) {
                if(gf.controls.dispatchMouseEvent(e)) return gf.controls.preventDefault(e);
            }

            return true;
        },
        //generic touch event (tap, start, end, etc)
        onTouch: function(e) {
            gf.controls.updateCoords(e);

            return gf.controls.onMouse(e);
        },
        //update the mouse coords
        updateCoords: function(e) {
            gf.controls.mouse.touches.length = 0;

            var off = gf.controls.mouse.offset;

            //mouse event
            if(!e.touches) {
                gf.controls.mouse.touches.push({
                    x: e.pageX - off.left,
                    y: e.pageY - off.top,
                    id: 0
                });
            }
            //touch event
            else {
                for(var i = 0, il = e.changedTouches.length; i < il; ++i) {
                    var t = e.changedTouches[i];

                    gf.controls.mouse.touches.push({
                        x: t.clientX - off.left,
                        y: t.clientY - off.top
                    });
                }
            }
            gf.controls.mouse.position.set(gf.controls.mouse.touches[0].x, gf.controls.mouse.touches[0].y);
        },
        dispatchMouseEvent: function(e) {
            if(gf.controls.mouse.binds[e.type]) {
                //track that gf.controls action is active
                gf.controls.mouse.status[gf.controls.mouse.binds[e.type]] = true;

                //for each touch
                var cbs = gf.controls.mouse.callbacks[gf.controls.mouse.binds[e.type]];
                if(cbs) {
                    for(var t = 0, tl = gf.controls.mouse.touches.length; t < tl; ++t) {
                        //call each callback
                        for(var i = 0, il = cbs.length; i < il; ++i) {
                            if(cbs[i].code === e.type)
                                cbs[i].fn(gf.controls.mouse.binds[e.type], gf.controls.mouse.touches[t]);
                        }
                    }

                    return gf.controls.preventDefault(e);
                }

                return true;
            }
        },
        //helper to prevent default stuffs accross different browsers
        preventDefault: function(e) {
            if(e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true;

            if(e.preventDefault) e.preventDefault();
            else e.returnValue = false;

            return false;
        },
        //check if an action is active accross any binds
        isActionActive: function(action) {
            return gf.controls.key.status[action] ||
                    gf.controls.mouse.status[action] ||
                    gf.controls.gpButton.status[action] ||
                    gf.controls.gpStick.status[action];
        },
        _doBind: function(type, code, action, fn) {
            gf.controls[type].binds[code] = action;
            gf.controls[type].status[action] = false;

            if(!gf.controls[type].bindCount[action])
                gf.controls[type].bindCount[action] = 1;
            else
                gf.controls[type].bindCount[action]++;

            if(fn) {
                if(gf.controls[type].callbacks[action]) gf.controls[type].callbacks[action].push({ code: code, fn: fn });
                else gf.controls[type].callbacks[action] = [{ code: code, fn: fn }];
            }

            return gf.controls;
        },
        _doUnbind: function(type, code, action) {
            //remove the bind (code -> action)
            delete gf.controls[type].binds[code];

            //reduce bind count
            gf.controls[type].bindCount[action]--;

            //if this action isn't bound anymore clean it up
            if(gf.controls[type].bindCount[action] <= 0) {
                gf.controls[type].bindCount[action] = 0;
                delete gf.controls[type].status[action];
                delete gf.controls[type].callbacks[action];
            }

            return gf.controls;
        }
    };
})();
//Got some help from html5Rocks :)
//https://github.com/html5rocks/www.html5rocks.com/blob/master/content/tutorials/doodles/gamepad/static/gamepad-tester/gamepad.js

(function() {
    gf.gamepad = {
        // A number of typical buttons recognized by Gamepad API and mapped to
        // standard controls. Any extraneous buttons will have larger indexes.
        TYPICAL_BUTTON_COUNT: 16,

        // A number of typical axes recognized by Gamepad API and mapped to
        // standard controls. Any extraneous buttons will have larger indexes.
        TYPICAL_AXIS_COUNT: 4,

        // How “deep” does an analogue button need to be depressed to consider it
        // a button down.
        ANALOGUE_BUTTON_THRESHOLD: 0.4,

        AXIS_THRESHOLD: 0.5,

        //are we polling for status/connections?
        ticking: false,

        //the currently activated gamepads list
        pads: [],

        //timestamp tracking for state changes
        prevTimestamps: [],

        //have we initialized the controls already?
        _initialized: false,

        init: function() {
            if(gf.gamepad._initialized) return;

            //Firefox uses connect/disconnect events so listen to those
            window.addEventListener('MozGamepadConnected', gf.gamepad.onGamepadConnect, false);
            window.addEventListener('MozGamepadDisconnected', gf.gamepad.onGamepadDisconnect, false);

            //Since chrome only supports polling, we have to start looping immediately
            if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
                gf.gamepad.startPolling();
            }

            gf.gamepad._initialized = true;
        },
        //When a gamepad is connected (currently FF only)
        onGamepadConnect: function(event) {
            //add the gamepad to our list
            gf.gamepad.pads.push(event.gamepad);

            //start polling
            gf.gamepad.startPolling();
        },
        onGamepadDisconnect: function(event) {
            //remove the gamepad from our list
            for(var i = 0, il = gf.gamepad.pads.length; i < il; ++i) {
                if(gf.gamepad.pads[i].index === event.gamepad.index) {
                    gf.gamepad.pads.splice(i, 1);
                    break;
                }
            }

            //if no pads left connected, stop polling
            if(gf.gamepad.pads.length === 0)
                gf.gamepad.stopPolling();
        },
        startPolling: function() {
            if(gf.gamepad.ticking) return;

            gf.gamepad.ticking = true;
            gf.gamepad.update();
        },
        stopPolling: function() {
            gf.gamepad.ticking = false;
        },
        //called on Chrome, which doesn't do the connect/disconnect events
        pollGamepads: function() {
            //get a list of connected gamepads
            var rawPads = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;

            if(rawPads) {
                //reset the pads list
                gf.gamepad.pads = [];

                //don't use the raw array from the browser, since it can have "holes"
                //if you plug in 2, then remove the first the second one is still index 1 (not 0)
                for(var i = 0, il = rawPads.length; i < il; ++i) {
                    if(rawPads[i]) {
                        gf.gamepad.pads.push(rawPads[i]);
                    }
                }
            }
        },
        pollStatus: function() {
            for(var i = 0, il = gf.gamepad.pads.length; i < il; ++i) {
                var pad = gf.gamepad.pads[i];

                //don't do anything if the current timestamp is the same as the previous one
                //(meaning the state has not changed). This is a chrome-only feature right now,
                //so first we have to check if it is empty as well
                if(pad.timestamp && (pad.timestamp === gf.gamepad.prevTimestamps[i]))
                    continue;

                gf.gamepad.prevTimestamps[i] = pad.timestamp;

                //I would like to be able to emit events when something updates, but for now
                //just update the status of bound keys in controls; controls only has 1 "gamepad"
                //so this loop will blow away the changes each iteration (only the "last" gamepad is supported)
                for(var b = 0, bl = pad.buttons.length; b < bl; ++b) {
                    if(!gf.controls.gpButton.binds[b]) continue;

                    var pressed = (pad.buttons[b] > gf.gamepad.ANALOGUE_BUTTON_THRESHOLD);

                    if(!gf.controls.gpButton.buttons[b])
                        gf.controls.gpButton.buttons[b] = { pressed: false, code: b };

                    gf.controls.gpButton.buttons[b].val = pad.buttons[b];

                    //state changed
                    if(gf.controls.gpButton.buttons[b].pressed !== pressed) {
                        gf.controls.gpButton.buttons[b].pressed = pressed;
                        //call each callback
                        var cbs = gf.controls.gpButton.callbacks[gf.controls.gpButton.binds[b]];
                        if(cbs) {
                            for(var s = 0, sl = cbs.length; s < sl; ++s) {
                                if(cbs[s].code === b)
                                    cbs[s].fn(gf.controls.gpButton.binds[b], pressed);
                            }
                        }
                        gf.controls.gpButton.status[gf.controls.gpButton.binds[b]] = pressed;
                    }
                }

                for(var a = 0, al = pad.axes.length; a < al; ++a) {
                    var vs = ['true', 'false'];
                    for(var vsi = 0, vsil = vs.length; vsi < vsil; ++vsi) {
                        var v = vs[vsi];
                        if(!gf.controls.gpStick.binds[a + v]) continue;

                        var moved = v === 'true' ? (pad.axes[a] < -gf.gamepad.AXIS_THRESHOLD) : (pad.axes[a] > gf.gamepad.AXIS_THRESHOLD);

                        if(!gf.controls.gpStick.axes[a + v])
                            gf.controls.gpStick.axes[a + v] = { moved: false, code: a, negative: v === 'true' };

                        gf.controls.gpStick.axes[a + v].val = pad.axes[a];

                        //movement state updated
                        if(gf.controls.gpStick.axes[a + v].moved !== moved) {
                            gf.controls.gpStick.axes[a + v].moved = moved;
                            //call each callback
                            var cbs2 = gf.controls.gpStick.callbacks[gf.controls.gpStick.binds[a + v]];
                            if(cbs2) {
                                for(var s2 = 0, sl2 = cbs2.length; s2 < sl2; ++s2) {
                                    if(cbs2[s2].code === a)
                                        cbs2[s2].fn(gf.controls.gpStick.binds[a + v], pad.axes[a]);
                                }
                            }
                            gf.controls.gpStick.status[gf.controls.gpStick.binds[a + v]] = moved;
                        }
                    }
                }
            }
        },
        update: function() {
            if(!gf.gamepad.ticking) return;

            //DAMN YOU CHROME!
            gf.gamepad.pollGamepads();

            //poll for the status of our gamepads
            gf.gamepad.pollStatus();
        }
    };
})();
(function() {
    gf.debug = {
        //show fps counter
        showFps: false,
        fpsStyle: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            'z-index': 10
        },

        //provide detailed debug info such as player position, number of entities,
        // tiles the player is colliding with.
        showInfo: false,
        infoStyle: {
            position: 'absolute',
            top: '50px',
            left: '0px',
            'z-index': 10,
            color: '#fff',
            'font-size': '0.9em'
        },

        //draw hitboxes on entities
        showHitbox: false,

        //draw outline around entities
        showOutline: false,

        //provide access directly to the tiledmap layer shader uniforms
        accessTiledUniforms: false,
        tiledUniforms: [],

        //draw map collision points
        showMapColliders: false,

        //show gamepad info in the info box
        showGamepadInfo: false,

        /****************************************************************************
         * DebugInfo box that displays live-updaing debug info
         ****************************************************************************/
        Info: function() {
            var br = document.createElement('br');

            //container
            var container = document.createElement('div');
            container.id = 'gf-debug-info';

            //title
            var title = document.createElement('h3');
            title.id = 'gf-debug-info-title';
            title.textContent = 'Debug Info';
            title.style.cssText = 'margin:1px;display:block;';

            container.appendChild(title);

            //number of entities
            var ents = document.createElement('span'),
                entsVal = document.createElement('span');
            ents.id = 'gf-debug-info-entities';
            entsVal.id = 'gf-debug-info-entities-value';
            ents.textContent = 'Number of Objects: ';
            entsVal.textContent = '0';

            ents.appendChild(entsVal);
            container.appendChild(ents);
            container.appendChild(br.cloneNode());

            //gamepads
            var pads = document.createElement('span');
            pads.id = 'gf-debug-info-gamepads';

            container.appendChild(pads);

            //player position
            var pos = document.createElement('span'),
                posVal = document.createElement('span');
            pos.id = 'gf-debug-info-position';
            posVal.id = 'gf-debug-info-position-value';
            pos.textContent = 'Player Position: ';
            posVal.textContent = 'X: 0, Y: 0, Z: 0';

            pos.appendChild(posVal);
            container.appendChild(pos);
            container.appendChild(br.cloneNode());

            //colliding tiles
            var tiles = document.createElement('span'),
                tilesVal = document.createElement('span');
            tiles.id = 'gf-debug-info-tiles';
            tilesVal.id = 'gf-debug-info-tiles-value';
            tiles.textContent = 'Colliding Tiles: ';
            tilesVal.textContent = '';

            tiles.appendChild(tilesVal);
            container.appendChild(tiles);
            container.appendChild(br.cloneNode());

            return {
                REVISION: 1,
                domElement: container,
                update: function() {
                    entsVal.textContent = gf.game.numObjects;
                    posVal.textContent = gf.game.player ?
                                            'X: ' + gf.game.player._hitboxMesh.position.x.toFixed(1) +
                                                ', Y: ' + gf.game.player._hitboxMesh.position.y.toFixed(1) +
                                                ', Z: ' + gf.game.player._hitboxMesh.position.z.toFixed(1) :
                                            'none';

                    if(gf.debug._playerColliders && gf.debug._playerColliders.dirty) {
                        gf.debug._playerColliders.dirty = false;
                        tilesVal.innerHTML = '<br/>';
                        for(var i = 0, il = gf.debug._playerColliders.length; i < il; ++i) {
                            tilesVal.innerHTML += '&nbsp;&nbsp;&nbsp;Tile (' + gf.debug._playerColliders[i].axis + '): ' + 
                                                gf.debug._playerColliders[i].tile.type + 
                                                ' (' + (!!gf.debug._playerColliders[i].tile.normal ? 
                                                        gf.debug._playerColliders[i].tile.normal.x + ', ' + gf.debug._playerColliders[i].tile.normal.y :
                                                        '0, 0')
                                                    + ')<br/>';
                        }
                    }

                    if(gf.debug.showGamepadInfo) {
                        pads.innerHTML = '';
                        if(gf.gamepad.pads && gf.gamepad.pads.length) {
                            for(var i = 0, il = gf.gamepad.pads.length; i < il; ++i) {
                                var pad = gf.gamepad.pads[i];

                                pads.innerHTML += 'Gamepad: [' + pad.index + '] ' + pad.id + '<br/>';
                                pads.innerHTML += '&nbsp;&nbsp;&nbsp;Buttons:<br/>' + 
                                                    pad.buttons.map(function(v, i) { return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + gf.types.getGpButtonName(i) + ': ' + v.toFixed(2); }).join('<br/>') + '<br/>';
                                pads.innerHTML += '&nbsp;&nbsp;&nbsp;Axes:<br/>' + 
                                                    pad.axes.map(function(v, i) { return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + gf.types.getGpAxisName(i) + ': ' + v.toFixed(2); }).join('<br/>') + '<br/>';
                            }
                        }
                    }
                }
            }
        },
        /****************************************************************************
         * mrdoob's stats.js (stats.js r10 - http://github.com/mrdoob/stats.js)
         ****************************************************************************/
        FpsCounter:function(){var l=Date.now(),m=l,g=0,n=1E3,o=0,h=0,p=1E3,q=0,r=0,s=0,f=document.createElement("div");f.id="gf-stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
        i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
        k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
        "block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
        a+"px",m=b,r=0);return b},update:function(){l=this.end()}}}
    };
})();
/**
 * The base Sprite class. This class is the base for all images on the screen
 *
 * @module gf
 * @class Sprite
 * @extends PIXI.MovieClip
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the sprite
 * @param settings {Object} Settings to override the defauls, acceptable values
 *          are size {Vector}, name {String}, animations {Object}
 * @example
 *      var spr = new gf.Sprite([10, 1], { name: 'MySprite' });
 */
gf.Sprite = function(pos, settings) {
    /**
     * The size of the sprite
     *
     * @property size
     * @type gf.Vector
     * @default new gf.Vector(0, 0);
     */
    this.size = new gf.Vector(0, 0);

    /**
     * The name of this sprite
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    /**
     * The defined animations for this Sprite, this maps the names to the childIndexes
     *
     * @property anim
     * @private
     * @readOnly
     * @type Object
     */
    this.anim = {};

    /**
     * The currently active animation
     *
     * @property currentAnim
     * @private
     * @readOnly
     * @type Object
     */
    this.currentAnim = null;

    //call base ctor
    gf.DisplayObject.call(this);

    //mixin user's settings
    gf.utils.setValues(this, settings);

    //add the animations passed to ctor
    if(settings.animations) {
        for(var name in settings.animations) {
            this.addAnimation(name, settings.animations[name]);
        }
    }
};

gf.inherits(gf.Sprite, gf.DisplayObject, {
    /**
     * Defines a new animation on the Sprite
     *
     * @method addAnimation
     * @param name {String} The name of the animation, any string you want to name it
     * @param frames {Texture|Array} The frames of the animation, you can pass one gf.Texture
     *      as a frame, or an Array of gf.Texture's
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.addAnimation('walk-left', new gf.Texture())
     *          .addAnimation('walk-right', [new gf.Texture(), new gf.Texture()]);
     */
    addAnimation: function(name, frames, speed) {
        if(!frames)
            throw 'No textures passed to addAnimation()';

        //ensure all the items in the array are textures
        if(frames instanceof Array) {
            for(var i = 0, il = frames.length; i < il; ++i) {
                if(typeof frames[i] === 'string') {
                    if(!PIXI.TextureCache[frames[i]])
                        throw 'Texture ' + frames[i] + ' is not in cache, please load it first';

                    frames[i] = PIXI.TextureCache[frames[i]];
                }
            }
        }

        //if there is a single texture passed, then put it in an array
        if(frames instanceof gf.Texture)
            frames = [frames];

        //if a string is passed, get it from the texture cache
        if(typeof frames === 'string') {
            if(!PIXI.TextureCache[frames])
                throw 'Texture ' + frames + ' is not in cache, please load it first';

            frames = [PIXI.TextureCache[frames]];
        }

        //create a movie clip from the textures
        var clip = new PIXI.MovieClip(frames);
        clip.stop();
        clip.visible = false;
        clip.name = name;

        if(speed) clip.animationSpeed = speed;

        this.addChild(clip);

        this.anim[name] = clip.childIndex;

        return this;
    },
    /**
     * Sets the active animation of the sprite, and starts the animation at index 0
     *
     * @method setActiveAnimation
     * @param name {String} The name of the animation to play (defined with addAnimation());
     * @param cb {Function} Callback when the animation completes, NOT YET IMPLEMENTED
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.addAnimation('me', new gf.Texture())
     *          .setActiveAnimation('me');
     */
    setActiveAnimation: function(name, cb) {
        if(this.anim[name] !== undefined) {
            if(this.currentAnim) {
                this.currentAnim.stop();
                this.currentAnim.visible = false;
            }

            this.currentAnim = this.children[this.anim[name]];
            this.currentAnim.visible = true;
            this.currentAnim.gotoAndPlay(0);
            //TODO: Callback
            if(cb) setTimeout(cb, 1);
        } else {
            throw 'Unknown animation ' + name;
        }

        return this;
    },
    /**
     * Convenience method for setting the position of the Sprite.
     *
     * @method setPosition
     * @param x {Number|Array|Vector|Point} X coord to put the sprite at.
     *       If an Array, Vector, or Point is passed then the y parameter is ignored
     * @param y {Number} Y coord to put the sprite at
     * @return {Sprite} Returns itself for chainability
     * @example
     *      spr.setPosition(1, 1)
     *          .setPosition([5, 5])
     *          .setPosition(new gf.Point(10, 10))
     *          .setPosition(new gf.Vector(20, 20));
     */
    setPosition: function(x, y) {
        if(x instanceof gf.Vector || x instanceof gf.Point) {
            this.position.x = x.x;
            this.position.y = x.y;
        }
        else if(x instanceof Array) {
            this.position.x = x[0];
            this.position.y = x[1];
        } else {
            this.position.x = x;
            this.position.y = y;
        }

        return this;
    },
    /**
     * Checks if the name is the active animation
     *
     * @method isActiveAnimation
     * @param name {String} The name of the animation to check if it is currently active
     * @return {Boolean} true if the animation is active, false otherwise.
     * @example
     *      spr.addAnimation('walk-left', new gf.Texture())
     *          .isActiveAnimation('walk-left'); //false
     *
     *      spr.setActiveAnimation('walk-left')
     *          .isActiveAnimation('walk-left'); //true
     */
    isActiveAnimation: function(name) {
        return this.currentAnim.name === name;
    }
});
//Features TODO:
// * Methods (https://github.com/obiot/melonJS/blob/master/src/entity/entity.js)
//      - flipX
//      - flipY
//      - doWalk
//      - doClimb
//      - doJump
//      - forceJump
//      - checkSlope
//      - updateMovement (slopes/breakable tiles)

/**
 * The base Entity class. This class is the base for all entities interacting on the stage
 *
 * @module gf
 * @class Entity
 * @extends Sprite
 * @constructor
 * @param pos {Array|Vector|Point} The starting position of the entity
 * @param settings {Object} Settings to override the defauls, acceptable values
 *          are size {Vector}, name {String}, animations {Object}
 * @example
 *      var ent = new gf.Entity([10, 1], { name: 'MyEntity' });
 */
gf.Entity = function(pos, settings) {
    /**
     * The type of the entity
     *
     * @property type
     * @type String
     * @default 'neutral'
     */
    this.type = gf.types.ENTITY.NEUTRAL;

    /**
     * Can it collide with other entities
     *
     * @property collidable
     * @type Boolean
     * @default true
     */
    this.collidable = true;

    /**
     * Can collide with the map when moving
     *
     * @property mapCollidable
     * @type Boolean
     * @default true
     */
    this.mapCollidable = true;

    /**
     * Is an entity
     *
     * @property mapCollidable
     * @type Boolean
     * @default true
     * @readOnly
     */
    this.entity = true;

    /**
     * The velocity of the entity. You can set these in Tiled by using "x|y" notation
     * velocity of the entity (units per tick)
     *
     * @property velocity
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.velocity = new gf.Vector(0, 0);

    /**
     * Max velocity to cap the entity at (units per tick)
     *
     * @property maxVelocity
     * @type Vector
     * @default new gf.Vector(15, 15)
     */
    this.maxVelocity = new gf.Vector(15, 15);

    /**
     * Acceleration of the entity (units per second)
     *
     * @property accel
     * @type Vector
     * @default new gf.Vector(250, 250)
     */
    this.accel = new gf.Vector(250, 250);

    /**
     * Friction to apply to this entity
     *
     * @property friction
     * @type Vector
     * @default 0
     */
    this.friction = gf.game.friction || 0;

    /**
     * Gravity to apply to this entity
     *
     * @property gravity
     * @type Vector
     * @default 0.98 (earth's gravity)
     */
    this.gravity = gf.game.gravity !== undefined ? gf.game.gravity : 0.98;

    /**
     * Whether or not the entity is "alive", advisory only
     *
     * @property alive
     * @type Boolean
     * @default true
     */
    this.alive = true;

    /**
     * Whether the entity is falling (read only)
     *
     * @property falling
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.falling = false;

    /**
     * Whether the entity is jumping (read only)
     *
     * @property jumping
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.jumping = false;

    /**
     * Whether the entity is on a ladder tile (read only)
     *
     * @property onladder
     * @type Boolean
     * @default false
     * @readOnly
     */
    this.onladder = false;

    //call base ctor
    gf.Sprite.call(this, pos, settings);
};

gf.inherits(gf.Entity, gf.Sprite, {
    /**
     * Calculates distance between this object and another
     *
     * @method distanceTo
     * @param obj {Entity}
     * @return {Number} Distance between this entity and another
     */
    distanceTo: function(obj) {
        if(!obj || !obj.position)
            return -1;

        var dx = this.position.x - obj.position.x,
            dy = this.position.y - obj.position.y;

        return Math.sqrt(dx*dx + dy*dy);
    },
    /**
     * Computes the velocity taking into account gravity, friction, etc
     *
     * @method computeVelocity
     * @param vel {Vector} The Vector to apply the changes to
     * @return {Vector} The modified vector
     */
    computeVelocity: function(vel) {
        //apply gravity
        if(this.gravity) {
            vel.y -= !this.onladder ? (this.gravity * gf.game._delta) : 0;

            //check if falling/jumping
            this.falling = (vel.y < 0);
            this.jumping = this.falling ? false : this.jumping;
        }

        //apply friction
        if(this.friction.x) vel.x = this.applyFriction(vel.x, this.friction.x);
        if(this.friction.y) vel.y = this.applyFriction(vel.y, this.friction.y);

        //cap velocity
        if(vel.x) vel.x = gf.utils.clamp(vel.x, -this.maxVelocity.x, this.maxVelocity.x);
        if(vel.y) vel.y = gf.utils.clamp(vel.y, -this.maxVelocity.y, this.maxVelocity.y);

        return vel;
    },
    /**
     * Applies friction to a velocity, usually the current velocity
     *
     * @method applyFriction
     * @param vel {Number} The velocity to apply the friction to
     * @param friction {Number} The friction factor to apply
     * @return {Object} The modified velocity, with friction applied
     */
    applyFriction: function(vel, friction) {
        return (
                    vel + friction < 0 ?
                    vel + (friction * (gf.game._delta || 0)) :
                    (
                        vel - friction > 0 ?
                        vel - (friction * (gf.game._delta || 0)) :
                        0
                    )
                );
    },
    /**
     * Checks if this entity intersects with the passed object
     * from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
     *
     * @method intersects
     * @param obj {Entity} The Entity to check if this intersects with
     * @return {Boolean}
     */
    intersects: function(obj)  {
        return (Math.abs(this.position.x - obj.position.x) * 2 < (this.size.x + obj.size.x)) &&
                (Math.abs(this.position.y - obj.position.y) * 2 < (this.size.y + obj.size.y));
    },
    /**
     * Checks if this entity collides with the passed Entity, a penetration vector is calculated.
     * This method is called from gf.game.checkCollisions(ent); That method will use this to check
     * for any collisions between that entity and all the others on the stage.
     * from http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
     *
     * @method checkCollision
     * @param obj {Entity} The Entity to check if this entity collides with
     * @return {Vector}
     */
    checkCollision: function(obj) {
        //response vector
        var p = new gf.Vector(0, 0);

        //check if hitboxes intersect
        if(this.intersects(obj)) {
            //compute delta between this & entity
            var dx = this.position.x - obj.position.x,
                dy = this.position.y - obj.position.y;

            //compute penetration depth for both axis
            p.x = dx / 2;
            p.y = dy / 2;
        }

        return p;
    },
    /**
     * Calculate the velocity of the entity, and then apply it. This is different than moveEntity
     * because it checks for map collisions, and applies gravity and friction with computeVelocity
     *
     * @method updateMovement
     * @return {Array} Returns the map colliders that the entity is interacting with
     */
    updateMovement: function() {
        if(this.velocity.x === 0 && this.velocity.y === 0)
            return;

        //get the world colliders
        var colliders = (gf.game.world === undefined || !this.mapCollidable) ? [] : gf.game.world.checkCollision(this);

        //update flags
        this.onladder = false;

        //collisions
        for(var i = 0, il = colliders.length; i < il; ++i) {
            var collider = colliders[i],
                tile = collider.tile,
                axis = collider.axis;

            this.onladder = (tile.type === gf.types.COLLISION.LADDER ? true : this.onladder);

            //if a solid tile
            if(tile.type === gf.types.COLLISION.SOLID) {
                //if it is a slope, apply the normal
                if(tile.normal && (!this.velocity.x || !this.velocity.y)) {
                    var badMovement = tile.normal.clone().multiplyScalar(this.velocity.dot(tile.normal)),
                        newMovement = this.velocity.clone().sub(badMovement);

                    this.velocity.add(newMovement);
                    return false;
                }
                //otherwise just stop movement
                else {
                    this.velocity[axis] = 0;
                }
            }
        }

        //TODO: Edge rolling (if you are on the tip edge of a blocking tile, roll around it)

        //apply gravity, friction, etc to this velocity
        this.computeVelocity(this.velocity);

        //do the actual entity movement
        this.moveEntity();

        //for debug output if it is enabled
        gf.debug._playerColliders = colliders;
        gf.debug._playerColliders.dirty = true;

        return colliders;
    },
    /**
     * Moves the entity to a new position using the velocity.
     *
     * @method moveEntity
     * @param vel {Vector} The optional velocity to move the entity.
     * @return {Entity} Returns itself for chainability
     */
    moveEntity: function(vel) {
        //param will override the entities current velocity
        vel = vel || this.velocity;

        if(vel.x === 0 && vel.y === 0)
            return;

        //update the entity position
        this.position.x += vel.x;
        this.position.y += vel.y;

        //onMove event
        this.onMove(vel);

        return this;
    },
    /**
     * Overrides base update to do some calculations. Called internally on each frame
     *
     * @method update
     */
    update: function() {
        gf.Sprite.prototype.update.call(this);

        this.updateMovement();
    },
    /**
     * On Collision Event
     *      called when this object is collided into by another, by default if something collides with
     *      a collectable entity we remove the collectable
     *
     * @method onCollision
     * @param vel {Vector} Collision Vector
     * @param obj {Entity} Colliding object
     * @return {Entity} Returns itself for chainability
     */
    onCollision: function() {
        if(this.collidable && this.type === gf.types.ENTIY.COLLECTABLE)
            gf.game.removeObject(this);

        return this;
    },
    /**
     * On Move Event
     *      called when this entity moves
     *
     * @method onMove
     * @param vel {Vector} Velocity the entity moved
     * @return {Entity} Returns itself for chainability
     */
    onMove: function() {
        return this;
    },
    /**
     * On Break Tile Event
     *      called when a tile is broken
     *
     * @method onBreakTile
     * @param tile {Unkown} the tile that is broken
     * @return {Entity} Returns itself for chainability
     */
    onBreakTile: function() {
        return this;
    }
});
(function() {
    var entObjects = {};

    /**
     * Holds a pool of different Entities that can be created, makes it very
     * easy to quickly create different registered entities
     *
     * @module gf
     * @class entityPool
     */
    gf.entityPool = {
        /**
         * Adds an entity Object to the pool
         *
         * @method add
         * @param name {String} The user-defined name of the Entity to add
         * @param obj {Object} The Entity or decendant to add to the pool
         * @return {Object} Returns the passed object
         * @example
         *      //create a new ckass to be instantiated
         *      var Bug = gf.entityPool.add('bug', gf.Entity.extend({
         *          //ctor function
         *          init: function(pos, settings) {
         *              //call the base ctor
         *              this._super(pos, settings);
         *
         *              this.color = 'red';
         *          },
         *          beBug: function() {
         *              console.log("I'm a bug");
         *          }
         *      }));
         *
         *      //then later in your game code
         *      var mybug = gf.entityPool.create('bug', {
         *          pos: [10, 10]
         *      });
         */
        add: function(name, obj) {
            return entObjects[name] = obj;
        },
        /**
         * Checks if the entity exists in the pool
         *
         * @method add
         * @param name {String} The user-defined name of the Entity to check if is in the pool
         * @return {Boolean} Returns the passed object
         */
        has: function(name) {
            return !!entObjects[name];
        },
        /**
         * Creates a new entity from the pool
         *
         * @method add
         * @param name {String} The user-defined name of the Entity to check if is in the pool
         * @param props {Object} The properties that would normally be passed as the "settings" of the Entity
         * @return {Entity} Returns a new instance of the object from the pool
         * @example
         *      //create a new ckass to be instantiated
         *      var Bug = function(pos, settings) {
         *          gf.Entity.call(this, pos, settings);
         *          this.color = 'red';
         *      };
         *
         *      gf.inherits(Bug, gf.Entity, {
         *          beBug: function() {
         *              console.log("I'm a bug");
         *          }
         *      });
         *
         *      //then later in your game code
         *      var mybug = gf.entityPool.create('bug', {
         *          pos: [10, 10] //pos, and/or position properties get sent as the first param to the ctor
         *      });
         */
        create: function(name, props) {
            //if the name is in our pool, create it
            if(name && gf.entityPool.has(name)) {
                return new entObjects[name](props.pos || props.position || [props.x, props.y], props);
            }
            //otherwise create a general Entity
            else {
                return new gf.Entity(props.pos || props.position || [props.x, props.y], props);
            }
        }
    };
})();
(function() {
    gf.gui = {
        //have we initialized the gui already?
        _initialized: false,

        init: function() {
            if(gf.gui._initialized) return;

            gf.gui._initialized = true;
        }
    };
})();
(function() {
    gf.HUD = {
        //has the HUD been initialized
        initialized: false,

        init: function(settings) {
            if(this.initialized) return;

            //is the HUD visible?
            this.visible = true;

            //use the passed settings object ot override the default values above
            gf.utils.setValues(this, settings);

            //create the base div of this element
            this._createElement();

            this.initialized = true;

            //some private stuffs
            this.dirty = true;

            //the items in this HUD
            this.items = {};
            this.numItems = 0;
        },
        addItem: function(name, item) {
            //increment if a new item
            if(!this.items[name]) this.numItems++;

            item.name = name;
            this.items[name] = item;
            this.dirty = true;
            this.elm.appendChild(item.elm);
            return this;
        },
        removeItem: function(name) {
            if(this.items[name]) {
                this.items[name].elm.parentNode.removeChild(this.items[name].elm);
                delete this.items[name];
                this.numItems--;
                this.dirty = true;
            }

            return this;
        },
        setItemValue: function(name, value) {
            if(this.items[name]) {
                this.items[name].setValue(value);
                this.dirty = true;
            }

            return this;
        },
        getItemValue: function(name) {
            return (this.items[name] ? this.items[name].getValue() : null);
        },
        reset: function(name) {
            if(name !== undefined) {
                if(this.items[name]) this.items[name].reset();
                this.dirty = true;
            } else {
                this.resetAll();
            }

            return this;
        },
        resetAll: function() {
            for(var n in this.items) {
                this.items[n].reset();
            }

            return this;
        },
        update: function() {
            if(!this.dirty) return;

            for(var n in this.items) {
                if(this.items[n].visible) {
                    this.items[n].update();
                }
            }

            this.dirty = false;
        },
        _createElement: function() {
            this.elm = document.createElement('div');
            this.elm.className = 'gf-hud';

            this.elm.style.cssText = 'position: absolute; width: 100%; height: 100%; z-index: 6;';

            gf.game._cont.appendChild(this.elm);
        }
    };
})();

gf.HudItem = function(x, y, settings) {
    //can be dragged
    this.draggable = false;

    //is this item visible?
    this.visible = true;

    //value of the item
    this.value = typeof settings.value === 'string' ? '' : 0;

    this.name = '';

    //use the passed settings object ot override the default values above
    gf.utils.setValues(this, settings);

    this['default'] = this.value;

    //create the base div of this element
    this._createElement(x, y);

    //some private stuffs
    this.dirty = true;

    //dragging stuff
    this.dragging = false;
};

gf.inherits(gf.HudItem, Object, {
    reset: function() {
        this.set(this['default']);
        return this;
    },
    setValue: function(val) {
        this.value = val;
        this.dirty = true;
        return this;
    },
    getValue: function() {
        return this.value;
    },
    update: function() {
        if(!this.dirty) return;

        this.elm.innerText = this.value;
        return this;
    },
    //virtual events
    onClick: function() {},
    onDragStart: function() {},
    onDragEnd: function() {},
    onMouseDown: function(e) {
        if(!this.draggable) return;

        this.dragging = {
            x: e.clientX,
            y: e.clientY
        };
        this.onDragStart(e);
    },
    onMouseUp: function(e) {
        this.dragging = false;
        this.onDragEnd(e);
    },
    onMouseMove: function(e) {
        if(!this.draggable || !this.dragging) return;

        var diffX = e.clientX - this.dragging.x,
            diffY = e.clientY - this.dragging.y,
            pos = gf.utils.getPosition(this.elm);

        this.dragging.x = e.clientX;
        this.dragging.y = e.clientY;

        this.elm.style.top = pos.top + diffY;
        this.elm.style.left = pos.left + diffX;
    },
    //private functions
    _createElement: function(x, y) {
        this.elm = document.createElement('div');
        this.elm.className = 'gf-hud-item ' + this.name;

        this.elm.style.cssText = 'position: absolute; top: ' + y + 'px; left: ' + x + 'px;';

        this._bindEvents();
    },
    _bindEvents: function() {
        this.elm.addEventListener('click', this.onClick.bind(this), false);
        this.elm.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        this.elm.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        this.elm.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }
});

gf.AssetLoader = function(resources) {
    //mixin the Event Target methods
    PIXI.EventTarget.call(this);

    /**
    * The array of asset URLs that are going to be loaded
    * @property assetURLs
    * @type Array
    */
    this.resources = resources;
    this.loadCount = 0;
    this.assets = {};

    this.exts = {
        imgs: ['jpeg', 'jpg', 'png', 'gif'],
        sound: ['mp3', 'ogg', 'wma', 'wav'],
        data: ['json']
    };
};

gf.inherits(gf.AssetLoader, Object, {
    load: function() {
        for(var i = 0, il = this.resources.length; i < il; ++i) {
            var name = typeof this.resources[i] === 'string' ? this.resources[i] : this.resources[i].name,
                url = typeof this.resources[i] === 'string' ? this.resources[i] : this.resources[i].src,
                ext = url.split('.').pop().toLowerCase();

            //load a texture
            if(this.exts.imgs.indexOf(ext) !== -1) {
                this.loadTexture(name, url);
            }
            //load a sound clip
            else if(this.exts.sound.indexOf(ext) !== -1) {
                this.loadAudio(name, url);
            }
            //load a data file (world, spritesheet, etc)
            else if(this.exts.data.indexOf(ext) !== -1) {
                this.loadData(name, url);
            }
        }
    },
    loadTexture: function(name, url) {
        this.loadCount++;

        var self = this,
            texture = PIXI.Texture.fromImage(url);

        this._storeAsset(name, texture);

        if(!texture.baseTexture.hasLoaded) {
            texture.baseTexture.on('loaded', function() {
                self.onAssetLoaded(null, 'texture', texture);
            });
        } else {
            self.onAssetLoaded(null, 'texture', texture);
        }

        return texture;
    },
    loadAudio: function(name, url) {
        this.loadCount++;

        var self = this,
            audio = new Audio(url);

        audio.preload = 'auto';

        this._storeAsset(name, audio);

        audio.addEventListener('canplaythrough', function() {
            self.onAssetLoaded(null, 'audio', audio);
        }, false);

        audio.addEventListener('error', function() {
            self.onAssetLoaded(new Error('Failed to load audio "' + name + '" at url: ' + url), 'audio');
        }, false);

        audio.load();

        return audio;
    },
    loadData: function(name, url) {
        this.loadCount++;

        var self = this,
            baseUrl = url.replace(/[^\/]*$/, '');

        gf.utils.ajax({
            method: 'GET',
            url: url,
            dataType: 'json',
            load: function(data) {
                //check some properties to see if this is a TiledMap Object
                if(data.orientation && data.layers && data.tilesets && data.version) {
                    self._storeAsset(name, data);

                    //TODO: How to tell if all these are loaded (how to count them?)
                    //loop through each layer and load the sprites (objectgroup types)
                    for(var i = 0, il = data.layers.length; i < il; ++i) {
                        var layer = data.layers[i];
                        if(layer.type !== gf.types.LAYER.OBJECT_GROUP) continue;

                        //loop through each object, and load the textures
                        for(var o = 0, ol = layer.objects.length; o < ol; ++o) {
                            var obj = layer.objects[o];
                            if(!obj.properties.spritesheet) continue;

                            self.loadTexture(layer.name + '_' + obj.name + '_texture', obj.properties.spritesheet);
                        }
                    }

                    //loop through each tileset and load the texture
                    for(var s = 0, sl = data.tilesets.length; s < sl; ++s) {
                        var set = data.tilesets[s];
                        if(!set.image) continue;

                        self.loadTexture(set.name + '_texture', baseUrl + set.image);
                    }

                    self.onAssetLoaded(null, 'world', data);
                }
                //this is a sprite sheet (published from TexturePacker)
                else if(data.frames && data.meta) {
                    var textureUrl = baseUrl + data.meta.image,
                        texture =  PIXI.Texture.fromImage(textureUrl).baseTexture,
                        frames = data.frames,
                        assets = [];

                    for(var f in frames) {
                        var rect = frames[f].frame;

                        PIXI.TextureCache[f] = new PIXI.Texture(texture, { x: rect.x, y: rect.y, width: rect.w, height: rect.h });

                        if(frames[f].trimmed) {
                            PIXI.TextureCache[f].realSize = frames[f].spriteSourceSize;
                            PIXI.TextureCache[f].trim.x = 0;
                        }

                        assets.push(PIXI.TextureCache[f]);
                    }

                    self._storeAsset(name, assets);

                    if(texture.hasLoaded) {
                        self.onAssetLoaded(null, 'spritesheet', assets);
                    }
                    else {
                        texture.addEventListener('loaded', function() {
                            self.onAssetLoaded(null, 'spritesheet', assets);
                        });
                    }
                }
            },
            error: function(err) {
                self.onAssetLoaded(err);
            }
        });
    },
    onAssetLoaded: function(err, type, asset) {
        //texture (image)
        //audio
        //spritesheet (json sheet)
        //world (TiledEditor Json data)
        this.loadCount--;

        this.emit({ type: 'progress', error: err, assetType: type, asset: asset });
        if(this.onProgress) this.onProgress(err, type, asset);

        if(this.loadCount === 0) {
            this.dispatchEvent({ type: 'complete' });
            if(this.onComplete) this.onComplete();
        }
    },
    _storeAsset: function(name, asset) {
        this.assets[name] = asset;
        gf.assetCache[name] = asset;
    }
});

/**
 * Base Map implementation, provides common functions for all Map types
 *
 * @module gf
 * @class Map
 * @extends DisplayObjectContainer
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.Map = function(map) {
    /**
     * The size of the map
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.size = new gf.Vector(map.width, map.height);

    //call base ctor
    gf.DisplayObject.call(this);

    //mixin user's settings
    gf.utils.setValues(this, map);
};

gf.inherits(gf.Map, gf.DisplayObject, {
    /**
     * Gets a layer based on the layer's id or name
     *
     * @method getLayer
     * @param id {Number|String} The layer's number id or string name.
     * @return {Layer} Returns the found layer, or null if not found
     */
    getLayer: function(id) {
        if(typeof id === 'number')
            return this.layers[id] || null; //return null if not found

        if(typeof id === 'string')
            for(var i = 0, il = this.children.length; i < il; ++i)
                if(this.children[i].name === id)
                    return this.children[i];

        return null;
    }
});
/**
 * Base Layer implementation, provides common functions for all Layer types
 *
 * @module gf
 * @class Layer
 * @extends DisplayObjectContainer
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
gf.Layer = function(layer) {
    /**
     * The name of the layer
     *
     * @property name
     * @type String
     * @default ''
     */
    this.name = '';

    /**
     * The size of the layer
     *
     * @property size
     * @type Vector
     * @default new gf.Vector(1, 1)
     */
    this.size = new gf.Vector(layer.width || 0, layer.height || 0);

    //call base ctor
    gf.DisplayObject.call(this);

    //mixin user's settings
    gf.utils.setValues(this, layer);

    /**
     * Half of the size of the layer
     *
     * @property hSize
     * @type Vector
     * @private
     */
    this.hSize = this.size.clone().divideScalar(2);
};

gf.inherits(gf.Layer, gf.DisplayObject);
/**
 * Tiled map, expects a Tiled TMX file loaded by the gf.loader as the argument.
 * The loader knows to load all textures and other resources when loading a world TMX
 * file, and this expets that to already be done.
 *
 * @module gf
 * @class TiledMap
 * @extends Map
 * @constructor
 * @param map {Object} All the settings for the map
 */
gf.TiledMap = function(map) {
    gf.Map.call(this, map);

    this.scale.x = parseInt(map.properties.scale, 10) || 1;
    this.scale.y = parseInt(map.properties.scale, 10) || 1;

    /**
     * The tile size
     *
     * @property tileSize
     * @type Vector
     * @default new gf.Vector(0, 0)
     */
    this.tileSize = new gf.Vector(map.tilewidth, map.tileheight);

    /**
     * The user-defined properties
     *
     * @property properties
     * @type Object
     * @default {}
     */
    this.properties = map.properties || {};

    /**
     * The scaled size (size * tileSize * scale)
     *
     * @property scaledSize
     * @type Vector
     */
    this.scaledSize = new gf.Vector(
        this.size.x * this.tileSize.x * this.scale,
        this.size.y * this.tileSize.y * this.scale
    );

    /**
     * The orientation of the map, currently only 'orthogonal' is supported
     *
     * @property orientation
     * @type String
     */
    this.orientation = map.orientation;

    /**
     * The maximum extent of the map (largest x and y the map has)
     * assuming 0,0 is in the middle of the map, calculate the minimum
     * and maximum extent of the map
     *
     * @property extent
     * @type Object
     */
    this.extent = {
        x: {
            min: ~~(this.scaledSize.x / 2) - this.scaledSize.x,
            max: this.scaledSize.x - ~~(this.scaledSize.x / 2)
        },
        y: {
            min: ~~(this.scaledSize.y / 2) - this.scaledSize.y,
            max: this.scaledSize.y - ~~(this.scaledSize.y / 2)
        }
    };

    /**
     * The tilesets used by this map
     *
     * @property tilesets
     * @type Array
     */
    this.tilesets = [];

    for(var t = 0, tl = map.tilesets.length; t < tl; ++t) {
        this.tilesets.push(new gf.TiledTileset(map.tilesets[t]));
    }

    /**
     * The layer for collisions
     *
     * @property collisionLayer
     * @type Array
     */
    this.collisionLayer = [];

    /**
     * The tileset for the collision layer
     *
     * @property collisionTileset
     * @type TiledTileset
     */
    this.collisionTileset = null;

    /**
     * The version of this map
     *
     * @property version
     * @type String
     */
    this.version = map.version;

    //create the layers
    var numX = gf.game._renderer.view.width / this.tileSize.x,
        numY = gf.game._renderer.view.height / this.tileSize.y;

    for(var i = 0, il = map.layers.length; i < il; ++i) {
        var lyr;

        switch(map.layers[i].type) {
            case gf.types.LAYER.TILE_LAYER:
                lyr = new gf.TiledLayer(map.layers[i]);
                this.addChild(lyr);

                //lyr.scale = this.scale;
                lyr.renderTiles(this.position.x, this.position.y, numX, numY);

                if(lyr.name.toLowerCase().indexOf('collision') === 0) {
                    this.collisionLayer = lyr;

                    if(!gf.debug.showMapColliders)
                        lyr.visible = false;
                }
                break;

            case gf.types.LAYER.OBJECT_GROUP:
                lyr = new gf.TiledObjectGroup(map.layers[i]);
                this.addChild(lyr);

                //auto spawn the player object group
                if(lyr.name === 'player' && !lyr.properties.manual)
                    lyr.spawn();
        }
    }
};

gf.inherits(gf.TiledMap, gf.Map, {
    /**
     * Gets the tileset that an ID is associated with
     *
     * @method getTileset
     * @param tileId {Number} The id of the tile to find the tileset for
     * @return {TiledTileset}
     */
    getTileset: function(tileId) {
        for(var i = 0, il = this.tilesets.length; i < il; ++i)
            if(tileId >= this.tilesets[i].firstgid && tileId <= this.tilesets[i].lastgid)
                return this.tilesets[i];
    },
    /**
     * Checks an entities collision with the collision layer of this map
     * TODO: Fix this for new PIXI stuff
     *
     * @method checkCollision
     * @param mesh {Entity} The entity to check
     * @param sz {Vector} The size of the entity
     * @param pv {Vector} The potential movement vector
     */
    //if object is moved by pv get the tile it would be at
    checkCollision: function(mesh, sz, pv) {
        if(!this.collisionLayer || !this.collisionTileset) return [];

        var pos = new gf.Vector(mesh.position.x, mesh.position.y),
            size = sz.clone().divideScalar(2),
            left = pos.x - size.x,
            right = pos.x + size.x,
            top = pos.y + size.y,
            bottom = pos.y - size.y,
            x = (pv.x < 0) ? Math.floor(left + pv.x) : Math.ceil(right + pv.x),
            y = (pv.y < 0) ? Math.floor(bottom + pv.y) : Math.ceil(top + pv.y),
            res = [],
            tile = null;

        //check X movement
        if(x <= this.extent.x.min || x >= this.extent.x.max) {
            res.push({ axis: 'x', tile: { type: gf.types.COLLISION.SOLID } });
        } else if(pv.x) {
            //x, bottom corner
            tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(x, Math.floor(bottom)));
            if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                res.push({ axis: 'x', tile: tile });
            } else {
                //x, top corner
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId(x, Math.ceil(top)));
                if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                    res.push({ axis: 'x', tile: tile });
                }
            }
        }

        //check Y movement
        if(y <= this.extent.y.min || y >= this.extent.y.max) {
            res.push({ axis: 'y', tile: { type: gf.types.COLLISION.SOLID } });
        } else if(pv.y) {
            //y, left corner
            tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId((pv.x < 0) ? Math.floor(left) : Math.ceil(right), y));
            if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                res.push({ axis: 'y', tile: tile });
            } else {
                //y, right corner
                tile = this.collisionTileset.getTileProperties(this.collisionLayer.getTileId((pv.x < 0) ? Math.ceil(right) : Math.floor(left), y));
                if(tile && tile.isCollidable && (!tile.half || this._checkHalfBlock(tile.half, x, y))) {
                    res.push({ axis: 'y', tile: tile });
                }
            }
        }

        return res;
    },
    resize: function() {
        var numX = gf.game._renderer.view.width / this.tileSize.x,
            numY = gf.game._renderer.view.height / this.tileSize.y;

        for(var i = 0, il = this.children.length; i < il; ++i) {
            var o = this.children[i];

            if(o instanceof gf.TiledLayer && o.visible) {
                o.removeAllChildren();
                o.renderTiles(this.position.x, this.position.y, numX, numY);
            }
        }
    },
    //WIP
    _checkHalfBlock: function(half, x, y) {
        var tx = Math.floor(x / this.tileSize.x) * this.tileSize.x,
            ty = Math.floor(y / this.tileSize.y) * this.tileSize.y,
            midX = tx + ((this.tileSize.x) / 2),
            endX = tx + (this.tileSize.x),
            midY = ty - ((this.tileSize.y) / 2),
            endY = ty - (this.tileSize.y);

        switch(half) {
            case gf.types.HALF.LEFT:
                return (x > tx && x < midX);

            case gf.types.HALF.RIGHT:
                return (x > midX && x < endX);

            case gf.types.HALF.TOP:
                return (y > midY && y < ty);

            case gf.types.HALF.BOTTOM:
                return (y > endY && y < midY);
        }

        return false;
    }
});

/**
 * The TiledLayer is the visual tiled layer that actually displays on the screen
 *
 * This class will be created by the TiledMap, there shouldn't be a reason to
 * create an instance on your own.
 *
 * @module gf
 * @class TiledLayer
 * @extends Layer
 * @constructor
 * @param layer {Object} All the settings for the layer
 */
//see: https://github.com/GoodBoyDigital/pixi.js/issues/48
gf.TiledLayer = function(layer) {
    gf.Layer.call(this, layer);

    /**
     * The tile IDs of the tilemap
     *
     * @property name
     * @type Uint32Array
     */
    this.tiles = new Uint32Array(layer.data);

    /**
     * The sprite pool for rendering tiles
     *
     * @property tilePool
     * @type Array
     */
    this.spritePool = [];

    //translate some tiled properties to our inherited properties
    this.position.x = layer.x;
    this.position.y = layer.y;
    this.alpha = layer.opacity;
};

gf.inherits(gf.TiledLayer, gf.Layer, {
    /**
     * Creates all the tile sprites needed to display the layer
     *
     * @method renderTiles
     */
    renderTiles: function(startX, startY, numX, numY) {
        for(var x = startX; x < numX; ++x) {
            for(var y = startY; y < numY; ++y) {
                var id = (x + (y * this.size.x)),
                    tile = this.tiles[id],
                    set = this.parent.getTileset(tile);

                if(!set) continue;

                var spr = this.getTileSprite(tile, set);

                spr.position.x = x * this.parent.tileSize.x;
                spr.position.y = y * this.parent.tileSize.y;
                //spr.scale = this.scale;
                //spr.rotation = this.rotation;
                //spr.alpha = this.alpha;
                this.addChild(spr);
            }
        }
    },
    /**
     * Creates the sprite for a tile utilizing a pool for the sprites
     *
     * @method getTileSprite
     * @param tileId {Number} The id of the tile to get a sprite for
     * @param TiledTileset {tileset} The tileset to get the texture from
     * @return {PIXI.Sprite} The sprite to display
     */
    getTileSprite: function(id, tileset) {
        return this.spritePool.pop() || new PIXI.Sprite(tileset.getTileTexture(id));
    },
    /**
     * Frees a sprite back into the pool
     *
     * @method freeTileSprite
     * @param sprite {PIXI.Sprite} The sprite to release to the pool
     */
    freeTileSprite: function(spr) {
        this.spritePool.push(spr);
    },
    /**
     * Transforms an x,y coord into the index of a tile in the tiles array
     *
     * @method getTileIndex
     * @param x {Number|Vector} The x coord to transform, if a vector is passed it's x/y is used and the y param is ignored
     * @param y {Number} The y coord to transform
     * @return {Number}
     */
    getTileIndex: function(x, y) {
        x = x instanceof gf.Vector ? x.x : x;
        y = x instanceof gf.Vector ? x.y : y;

        //convert the position from units to tiles
        x = ~~(x / this.parent.tileSize.x);
        y = ~~(y / this.parent.tileSize.y);

        //calculate index of this tile
        return (x + (y * this.size.x));
    },
    /**
     * Transforms an x,y coord into the TiledTileset tile id
     *
     * @method getTileId
     * @param x {Number|Vector} The x coord to transform, if a vector is passed it's x/y is used and the y param is ignored
     * @param y {Number} The y coord to transform
     * @return {Number}
     */
    getTileId: function(x, y) {
        return this.tiles[this.getTileIndex(x, y)];
    }
});

/**
 * This object represents a tileset used by a TiledMap.
 * There can be multiple Tilesets in a map
 *
 * @module gf
 * @class TiledTileset
 * @extends Texture
 * @constructor
 * @param settings {Object} All the settings for the tileset
 */
gf.TiledTileset = function(settings) {
    if(!gf.assetCache[settings.name + '_texture']) {
        var loader = new gf.AssetLoader();
        loader.loadTexture(settings.name + '_texture', settings.image);
    }

    //initialize the base Texture class
    PIXI.Texture.call(this, gf.assetCache[settings.name + '_texture'].baseTexture);

    /**
     * The size of the tileset
     *
     * @property size
     * @type Vector
     */
    this.size = new gf.Vector(settings.imagewidth, settings.imageheight);

    /**
     * The size of a tile in the tileset
     *
     * @property tileSize
     * @type Vector
     */
    this.tileSize = new gf.Vector(settings.tilewidth, settings.tileheight);

    /**
     * The name of the tileset
     *
     * @property name
     * @type String
     */
    this.name = settings.name;

    /**
     * The margin around a tile in the tileset
     *
     * @property margin
     * @type Number
     */
    this.margin = settings.margin;

    /**
     * The spacing around a tile in the tileset
     *
     * @property spacing
     * @type Number
     */
    this.spacing = settings.spacing;

    /**
     * The number of tiles calculated based on size, margin, and spacing
     *
     * @property numTiles
     * @type Vector
     */
    this.numTiles = new gf.Vector(
        ~~((this.baseTexture.source.width - this.margin) / (this.tileSize.x + this.spacing)),
        ~~((this.baseTexture.source.height - this.margin) / (this.tileSize.y + this.spacing))
    );

    /**
     * The first tileId in the tileset
     *
     * @property firstgid
     * @type Number
     */
    this.firstgid = settings.firstgid;

    /**
     * The last tileId in the tileset
     *
     * @property lastgid
     * @type Number
     */
    this.lastgid = this.firstgid + (((this.numTiles.x * this.numTiles.y) - 1) || 0);

    /**
     * The properties of the tileset
     *
     * @property properties
     * @type Object
     */
    this.properties = settings.properties || {};

    /**
     * The properties of the tiles in the tileset (like collision stuff)
     *
     * @property tileproperties
     * @type Object
     */
    this.tileproperties = settings.tileproperties || {};

    //massage tile properties
    for(var i = 0, il = this.tileproperties.length; i < il; ++i) {
        var v = this.tileproperties[i];

        if(v.normal) v.normal = gf.utils.ensureVector(v.normal);

        if(v.isCollidable === 'true') v.isCollidable = true;
        if(v.isBreakable === 'true') v.isBreakable = true;
    }

    /**
     * The texture instances for each tile in the set
     *
     * @property textures
     * @type Array
     */
    this.textures = [];

    //generate tile textures
    for(var t = 0, tl = this.lastgid - this.firstgid; t < tl; ++t) {
        //convert the tileId to x,y coords of the tile in the Texture
        var y = ~~(t / this.numTiles.x),
            x = (t - (y * this.numTiles.x));

        this.textures.push(
            new PIXI.Texture(
                this.baseTexture,
                new PIXI.Rectangle(
                    x * this.tileSize.x,
                    y * this.tileSize.y,
                    this.tileSize.x,
                    this.tileSize.y
                )
            )
        );
    }
};

gf.inherits(gf.TiledTileset, PIXI.Texture, {
    /**
     * Gets the tile properties for a tile based on it's ID
     *
     * @method getTileProperties
     * @param tileId {Number} The id of the tile to get the properties for
     * @return {Object} The properties of the tile
     */
    getTileProperties: function(tileId) {
        if(tileId === undefined) return null;

        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        return this.tileproperties[tileId] ?
                //get this value
                this.tileproperties[tileId] :
                //set this id to default values and cache
                this.tileproperties[tileId] = {
                    isCollidable: false,
                    isBreakable: false,
                    type: gf.types.COLLISION.NONE
                };
    },
    /**
     * Gets the tile texture for a tile based on it's ID
     *
     * @method getTileTexture
     * @param tileId {Number} The id of the tile to get the texture for
     * @return {PIXI.Texture} The texture for the tile
     */
    getTileTexture: function(tileId) {
        if(tileId === undefined) return null;

        //get the internal ID of the tile in this set (0 indexed)
        tileId = tileId - this.firstgid;

        //if less than 0, then this id isn't in this tileset
        if(tileId < 0) return null;

        return this.textures[tileId];
    }
});

/**
 * Tiled object group is a special layer that contains entities
 *
 * @module gf
 * @class TiledObjectGroup
 * @extends Layer
 * @constructor
 * @param group {Object} All the settings for the layer
 */
 gf.TiledObjectGroup = function(group) {
    gf.Layer.call(this, group);

    /**
     * The user-defined properties of this group. Usually defined in the TiledEditor
     *
     * @property properties
     * @type Object
     */
    this.properties = group.properties || {};

    /**
     * The objects in this group that can be spawned
     *
     * @property objects
     * @type Array
     */
    this.objects = group.objects;

    //translate some tiled properties to our inherited properties
    this.position.x = group.x;
    this.position.y = group.y;
    this.alpha = group.opacity;
};

gf.inherits(gf.TiledObjectGroup, gf.Layer, {
    /**
     * Spawns all the entities associated with this layer, and properly sets their attributes
     *
     * @method spawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    spawn: function() {
        for(var i = 0, il = this.objects.length; i < il; ++i) {
            var o = this.objects[i],
                props = o.properties || {};

            props.name = o.name;
            props.type = o.type;
            props.size = [o.width, o.height];
            props.zIndex = this.zIndex;
            props.opacity = this.opacity;
            props.visible = this.visible;
            props.position = [o.x, o.y];
            //convert tiled x,y coords into world coords
            //tiled does x,y from top left. We do x,y from center
            /*props.position = [
                (o.x * this.map.scale) - (this.map.scaledSize.x / 2),
                -((o.y * this.map.scale) - (this.map.scaledSize.y / 2))
            ];*/

            //spawn from entity pool
            this.addChild(gf.entityPool.create(props.name, props));
        }

        return this;
    },
    /**
     * Despawns all the entities associated with this layer
     *
     * @method despawn
     * @return {TiledObjectGroup} Returns itself for chainability
     */
    despawn: function() {
        //remove each entity from the game
        for(var i = this.children.length; i > -1; --i) {
            this.removeChild(this.children[i]);
        }

        return this;
    }
});

//Great ideas taken from: https://github.com/obiot/melonJS/blob/master/src/plugin/plugin.js
(function() {
    gf.plugin = {
        Base: function() {},
        //patch a core function
        //For example, to patch the gf.game.update function:
        //
        //gf.plugin.patch(gf.game, 'update', function() {
        //    //display a console message
        //    console.log('doing update!');
        //    //call the original function
        //    this._super();
        //});
        patch: function(obj, name, fn) {
            if(obj.prototype !== undefined) {
                obj = obj.prototype;
            }

            if(typeof obj[name] === 'function' && typeof fn === 'function') {
                var _super = obj[name];

                obj[name] = (function(name, fn) {
                    return function() {
                        var tmp = this._super;

                        this._super = _super;

                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, fn);
            }
            else {
                throw (name + ' is not a function in the passed object.');
            }
        },
        //register a plugin
        //For example, to register a new plugin:
        //
        //gf.plugin.register(MyPluginObject, 'myPluginName');
        //
        //var plg = new gf.plugin.myPluginName();
        // //OR
        //gf.plugin.myPluginName.someFunction();
        register: function(plugin, name) {
            //ensure we don't overrite a name
            if(gf.plugin[name]) {
                throw 'plugin ' + name + ' already registered, skipping.';
            }

            if(plugin.prototype.gfVersion === undefined) {
                throw 'GradeFruitJS: Plugin gfVersion not defined for ' + name;
            } else if(gf.checkVersion(plugin.prototype.gfVersion) > 0) {
                throw 'GradeFruitJS: Plugin gfVersion mismatch, expected: ' + plugin.prototype.gfVersion + ', got: ' + gf.version;
            }

            //store the plugin in the namespace
            gf.plugin[name] = plugin;
        }
    };

    gf.plugin.Base.prototype.gfVersion = null;
})();


})(window);