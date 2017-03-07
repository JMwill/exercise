(function(global) {
    /* Private methods */
    function isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    /* Observer实现 */
    var Observer = function(data, parent) {
        if (!(this instanceof Observer)) { return new Observer(data, parent); }
        if (parent && isObj(parent)) { this.parent = parent; }
        this.data = data;
        this.init();
    };

    Observer.fn = Observer.prototype;
    Observer._events = EventEmitter();
    Observer.$watch = Observer._events.on;
    Observer.$emit = Observer._events.emit;
    Observer.fn.traverseDataObj = function (obj, fn) {
        var self = this;
        Object.keys(obj)
            .forEach(function(key) {
                if (isObj(obj[key])) { self.traverseDataObj(obj[key], fn); }
                fn(obj, key);
        });
    }
    Observer.fn.observeProperty = function(obj, key) {
        var val = obj[key];
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                printToScreen('你访问了 ' + key); return val;
            },
            set: function(newVal) {
                if (newVal === val) { return; }
                if (isObj(newVal)) {
                    val = Observer(newVal, obj);
                } else {
                    val = newVal;
                }
                printToScreen('你设置了 ' + key + ', 新的值为: ' + JSON.stringify(val));
            }
        });
    }
    Observer.fn.init = function(data) {
        this.traverseDataObj(this.data, this.observeProperty);
    };

    /* EventEmitter */
    var EventEmitter = function() {
        if (!(this instanceof EventEmitter)) { return new EventEmitter(); }
        this._events = {};
    };
    EventEmitter.fn = EventEmitter.prototype;
    EventEmitter.fn.on = function(evt, fn) {
        if (!this._events[evt]) { this._events[evt] = []};
        this._events[evt].push(fn);
    }
    EventEmitter.fn.emit = function(evt) {
        if (this._events[evt]) {
            var args = [].slice.call(arguments, 1);
            var self = this;
            this._events[evt].forEach(function(fn) {
                fn.apply(self, args);
            });
        }
    }

    global.CustomObserver = Observer;
    global.EventEmitter = EventEmitter;
}(window));

