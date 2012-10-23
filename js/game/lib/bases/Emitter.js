define([
    'game/vendor/eventemitter2/eventemitter2'
], function(EventEmitter2) {
    //small hack to be able to use EventEmitter2 in the class hierarchy
    EventEmitter2.extend = Class.extend;
    EventEmitter2.prototype.init = EventEmitter2;
    
    return EventEmitter2;
});