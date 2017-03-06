(function(global) {
    var Observer = function(data) {
        if (!(this instanceof Observer)) { return new Observer(data); }
        this._eventBus = EventEmitter();
        this._data = Object.create(null);
        Object.defineProperty(this._data, '$watch', {
            enumerable: false,
            configurable: true,
            value: this._eventBus.on.bind(this._eventBus)
        });
        Object.defineProperty(this._data, '$emit', {
            enumerable: false,
            configurable: true,
            value: this._eventBus.emit.bind(this._eventBus)
        });
        return this.init(data);
    };

    /* Private methods */
    function isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    /* prototype methods */
    Observer.fn = Observer.prototype;
    Observer.fn._observerProperty = function (obj, data) {
        var self = this;
        Object.keys(data)
            .forEach(function(key) {
                var val = data[key];
                Object.defineProperty(obj, key, {
                    enumerable: true,
                    configurable: true,
                    get: function() {
                        printToScreen('你访问了 ' + key); return val;
                    },
                    set: function(newVal) {
                        if (newVal === val) { return; }
                        if (isObj(newVal)) {
                            val = Observer(newVal);
                        } else {
                            val = newVal;
                        }
                        printToScreen('你设置了 ' + key + ', 新的值为: ' + JSON.stringify(val));
                        self._data.$emit(key, val);
                    }
                });
                if (isObj(data[key])) { self._observerProperty(obj[key], data[key]); }
            });
    }
    Observer.fn.init = function(data) {
        this._observerProperty(this._data, data);
        return this._data;
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
}(window));

